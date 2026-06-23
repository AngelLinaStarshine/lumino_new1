import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { ScheduleList } from '@/components/student/ScheduleList';

export default async function StudentSchedulePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single();

  return (
    <main className="space-y-6 p-6 max-w-3xl">
      <Topbar greeting="Schedule" name={profile?.full_name ?? ''} avatar={profile?.avatar_url} />
      <ScheduleList />
    </main>
  );
}
