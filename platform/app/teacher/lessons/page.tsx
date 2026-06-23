import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { LessonBuilder } from '@/components/teacher/LessonBuilder';

export default async function TeacherLessonsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user!.id)
    .single();

  const { data: courses } = await supabase.from('courses').select('*').order('name');

  return (
    <main className="space-y-6 p-6 max-w-3xl">
      <Topbar
        greeting="Lesson builder"
        subtitle="Create structured lesson plans with chapters"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />
      <LessonBuilder courses={courses ?? []} />
    </main>
  );
}
