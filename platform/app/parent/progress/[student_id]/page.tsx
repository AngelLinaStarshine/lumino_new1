import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { ProgressChart } from '@/components/student/ProgressChart';

interface Props {
  params: { student_id: string };
}

export default async function ParentProgressPage({ params }: Props) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user!.id)
    .single();

  const { data: student } = await supabase
    .from('profiles')
    .select('full_name, stage')
    .eq('id', params.student_id)
    .single();

  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', params.student_id)
    .order('taken_at', { ascending: true });

  return (
    <main className="space-y-6 p-6 max-w-3xl">
      <Topbar
        greeting={`${student?.full_name ?? 'Student'} progress`}
        subtitle="Read-only progress report"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />
      <ProgressChart assessments={assessments ?? []} />
    </main>
  );
}
