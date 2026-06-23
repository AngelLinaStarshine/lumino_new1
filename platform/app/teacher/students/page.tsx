import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { StudentRoster } from '@/components/teacher/StudentRoster';

export default async function TeacherStudentsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url')
    .eq('id', user!.id)
    .single();

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      id, week_progress, status,
      student:profiles!enrollments_student_id_fkey(id, full_name, email, stage),
      courses(subject, name, stage)
    `)
    .eq('teacher_id', user!.id)
    .order('enrolled_at', { ascending: false });

  return (
    <main className="space-y-6 p-6 max-w-5xl">
      <Topbar
        greeting="Student roster"
        subtitle="All students in your assigned classes"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />
      <StudentRoster enrollments={(enrollments ?? []) as never} />
    </main>
  );
}
