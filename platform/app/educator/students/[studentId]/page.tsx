import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { StudentDetailTabs } from '@/components/educator/StudentDetailTabs';
import { TIER_LABELS } from '@/lib/curriculum';

export default async function EducatorStudentDetailPage({ params }: { params: { studentId: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const { data: link } = await admin
    .from('educator_students')
    .select('student_id')
    .eq('educator_id', user.id)
    .eq('student_id', params.studentId)
    .maybeSingle();

  if (!link) notFound();

  const { data: profile } = await admin.from('profiles').select('*').eq('id', params.studentId).single();
  const { data: enrolments } = await admin
    .from('subject_enrolments')
    .select('*, subjects(name), levels(tier, name)')
    .eq('student_id', params.studentId);
  const { data: submissions } = await admin
    .from('practice_submissions')
    .select('*, practice_tasks(title)')
    .eq('student_id', params.studentId)
    .order('submitted_at', { ascending: false })
    .limit(50);
  const { data: classes } = await admin
    .from('live_classes')
    .select('*, subjects(name)')
    .eq('student_id', params.studentId)
    .order('scheduled_at', { ascending: false })
    .limit(20);
  const { data: notes } = await admin
    .from('educator_notes')
    .select('*')
    .eq('student_id', params.studentId)
    .eq('educator_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <StudentDetailTabs
        educatorId={user.id}
        student={{ id: params.studentId, name: profile?.full_name ?? 'Student' }}
        enrolments={(enrolments ?? []).map((e) => ({
          subject: e.subjects?.name,
          tier: TIER_LABELS[e.levels?.tier as keyof typeof TIER_LABELS] ?? e.levels?.name,
          mastery: e.mastery_pct,
        }))}
        submissions={submissions ?? []}
        classes={classes ?? []}
        notes={notes ?? []}
      />
    </div>
  );
}
