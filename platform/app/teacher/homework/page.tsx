import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { HomeworkAssigner } from '@/components/teacher/HomeworkAssigner';

export default async function TeacherHomeworkPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user!.id)
    .single();

  const { data: lessons } = await supabase
    .from('lessons')
    .select('id, title, week, courses(name)')
    .order('week', { ascending: true });

  return (
    <main className="space-y-6 p-6 max-w-3xl">
      <Topbar
        greeting="Homework assigner"
        subtitle="Create assignments with due dates and file requirements"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />
      <HomeworkAssigner lessons={(lessons ?? []) as never} />
    </main>
  );
}
