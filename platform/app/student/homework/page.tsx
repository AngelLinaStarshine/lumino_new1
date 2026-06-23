import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { HomeworkRow } from '@/components/student/HomeworkRow';

export default async function StudentHomeworkListPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user!.id)
    .single();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('student_id', user!.id);

  const courseIds = enrollments?.map((e) => e.course_id) ?? [];

  const { data: homework } = await supabase
    .from('homework')
    .select(`
      *,
      lessons!inner(course_id, courses(subject, name)),
      submissions(id, status, score, submitted_at)
    `)
    .in('lessons.course_id', courseIds.length ? courseIds : ['00000000-0000-0000-0000-000000000000'])
    .order('due_date', { ascending: true });

  return (
    <main className="space-y-6 p-6 max-w-3xl">
      <Topbar
        greeting="Homework"
        subtitle="All assignments for your enrolled courses"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />
      <div className="border rounded-lg overflow-hidden bg-card">
        {homework?.length ? (
          homework.map((hw) => <HomeworkRow key={hw.id} homework={hw} />)
        ) : (
          <p className="text-sm text-muted-foreground p-8 text-center">No homework assigned yet</p>
        )}
      </div>
    </main>
  );
}
