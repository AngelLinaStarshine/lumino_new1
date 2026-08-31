import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';

function normalizeAnswer(v: unknown): string {
  if (typeof v === 'string') return v.trim().toLowerCase();
  if (v && typeof v === 'object' && 'value' in v) {
    return String((v as { value: unknown }).value).trim().toLowerCase();
  }
  return String(v ?? '').trim().toLowerCase();
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { taskId, answer } = await request.json();
  if (!taskId) return NextResponse.json({ error: 'taskId required' }, { status: 400 });

  const admin = createAdminClient();
  const { data: task } = await admin
    .from('practice_tasks')
    .select('correct_answer_json, explanation')
    .eq('id', taskId)
    .single();

  if (!task) return NextResponse.json({ error: 'Task not found' }, { status: 404 });

  const expected = normalizeAnswer(task.correct_answer_json?.value ?? task.correct_answer_json);
  const given = normalizeAnswer(answer?.value ?? answer);
  const isCorrect = expected === given || expected.includes(given) || given.includes(expected);

  await admin.from('practice_submissions').insert({
    student_id: user.id,
    task_id: taskId,
    answer_json: answer,
    is_correct: isCorrect,
  });

  await admin
    .from('practice_assignments')
    .update({ completed_at: new Date().toISOString() })
    .eq('student_id', user.id)
    .eq('task_id', taskId)
    .is('completed_at', null);

  await writeAuditLog({
    userId: user.id,
    action: 'practice.submit',
    resourceType: 'practice_task',
    resourceId: taskId,
    metadata: { isCorrect },
  });

  return NextResponse.json({ isCorrect, explanation: task.explanation });
}
