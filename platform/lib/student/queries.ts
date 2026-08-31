import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { TIER_LABELS } from '@/lib/curriculum';

export async function getStudentContext(userId: string) {
  const supabase = createClient();
  const admin = createAdminClient();

  await writeAuditLog({
    userId,
    action: 'student_data.read',
    resourceType: 'student_dashboard',
    resourceId: userId,
  });

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', userId).single();

  const { data: enrolments } = await admin
    .from('subject_enrolments')
    .select('*, subjects(name, slug), levels(tier, name)')
    .eq('student_id', userId);

  const { data: assignments } = await admin
    .from('practice_assignments')
    .select('*, practice_tasks(id, title, estimated_minutes, level_id, levels(subject_id, subjects(name, slug)))')
    .eq('student_id', userId)
    .is('completed_at', null)
    .order('assigned_at', { ascending: true })
    .limit(3);

  const now = new Date().toISOString();
  const { data: nextClass } = await admin
    .from('live_classes')
    .select('*, subjects(name), educator:profiles!live_classes_educator_id_fkey(full_name)')
    .eq('student_id', userId)
    .gte('scheduled_at', now)
    .eq('status', 'scheduled')
    .order('scheduled_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data: notes } = await admin
    .from('student_educator_notes')
    .select('body, created_at, educator:profiles!student_educator_notes_educator_id_fkey(full_name)')
    .eq('student_id', userId)
    .order('created_at', { ascending: false })
    .limit(3);

  return {
    profile,
    enrolments: (enrolments ?? []).map((e) => ({
      ...e,
      tierLabel: TIER_LABELS[e.levels?.tier as keyof typeof TIER_LABELS] ?? e.levels?.name,
      subjectName: e.subjects?.name,
      subjectSlug: e.subjects?.slug,
    })),
    assignments: (assignments ?? []).map((a) => ({
      id: a.id,
      taskId: a.task_id,
      title: a.practice_tasks?.title,
      subject: a.practice_tasks?.levels?.subjects?.name ?? 'Practice',
      minutes: a.practice_tasks?.estimated_minutes ?? 10,
    })),
    nextClass,
    notes: notes ?? [],
  };
}
