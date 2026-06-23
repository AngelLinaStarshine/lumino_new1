import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { ProgressChart } from '@/components/student/ProgressChart';

export default async function StudentProgressPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single();

  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', user!.id)
    .order('taken_at', { ascending: true });

  return (
    <main className="space-y-6 p-6 max-w-3xl">
      <Topbar greeting="Progress" name={profile?.full_name ?? ''} avatar={profile?.avatar_url} />
      <ProgressChart assessments={assessments ?? []} />
    </main>
  );
}
