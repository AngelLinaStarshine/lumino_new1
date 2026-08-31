import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const admin = createAdminClient();
  const { data: links } = await admin
    .from('educator_students')
    .select('student:profiles!educator_students_student_id_fkey(id, full_name)')
    .eq('educator_id', user.id);

  const { data: tasks } = await admin
    .from('practice_tasks')
    .select('id, title, estimated_minutes, levels(subjects(name))')
    .limit(50);

  return NextResponse.json({
    students: (links ?? []).map((l) => {
      const s = l.student as { id: string; full_name: string } | { id: string; full_name: string }[] | null;
      const student = Array.isArray(s) ? s[0] : s;
      return { id: student?.id ?? '', name: student?.full_name ?? 'Student' };
    }),
    tasks: (tasks ?? []).map((t) => ({
      id: t.id,
      title: t.title,
      estimated_minutes: t.estimated_minutes,
      subject: (t.levels as { subjects?: { name?: string } } | null)?.subjects?.name ?? '',
    })),
  });
}

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { studentId, taskIds, instructionNote } = await request.json();
  const admin = createAdminClient();

  const rows = (taskIds as string[]).map((taskId) => ({
    student_id: studentId,
    task_id: taskId,
    assigned_by: user.id,
    instruction_note: instructionNote ?? null,
  }));

  await admin.from('practice_assignments').insert(rows);
  return NextResponse.json({ ok: true });
}
