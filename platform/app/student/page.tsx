/* ─────────────────────────────────────────────────────────────
   Student Dashboard
   /app/student/page.tsx
   ───────────────────────────────────────────────────────────── */

import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Topbar }              from '@/components/shared/Topbar';
import { CycleProgressStrip }  from '@/components/student/CycleProgressStrip';
import { CourseCard }          from '@/components/student/CourseCard';
import { HomeworkRow }         from '@/components/student/HomeworkRow';
import { ScheduleList }        from '@/components/student/ScheduleList';
import { ProgressChart }       from '@/components/student/ProgressChart';
import { StatCard }            from '@/components/shared/StatCard';
import { STAGES, type StageKey } from '@/lib/constants';

export default async function StudentDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  /* Fetch student profile */
  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'student') redirect('/');

  /* Fetch enrollments with course info */
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select(`
      *,
      courses(*),
      teacher:profiles!enrollments_teacher_id_fkey(full_name)
    `)
    .eq('student_id', user.id);

  /* Fetch upcoming homework */
  const { data: homework } = await supabase
    .from('homework')
    .select(`
      *,
      lessons(course_id, courses(subject, name)),
      submissions(id, status, score, submitted_at)
    `)
    .order('due_date', { ascending: true })
    .limit(5);

  /* Fetch assessments for progress chart */
  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', user.id)
    .order('taken_at', { ascending: true });

  const stageKey = (profile.stage ?? 'growth') as StageKey;
  const stage = STAGES[stageKey];

  return (
    <main className="space-y-6 p-6 max-w-6xl mx-auto">
      <Topbar
        greeting={`Welcome back, ${profile.full_name.split(' ')[0]}`}
        subtitle={`${enrollments?.length ?? 0} active courses · 2 assignments due this week`}
        stagePill={`${stage.name} stage · ages ${stage.ageRange}`}
        avatar={profile.avatar_url}
        name={profile.full_name}
      />

      <CycleProgressStrip currentStep="lumino_core" weekProgress={6} totalWeeks={12} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Active subjects" value={enrollments?.length ?? 0} icon="books" sub="Math · Language · CS" />
        <StatCard label="Next class"      value="3:00 PM"                  icon="clock" sub="Number Ninjas in 2h" />
        <StatCard label="Cycle progress"  value="78%"                      icon="target" sub="+6% this month" />
        <StatCard label="Streak"          value="12 days"                  icon="flame" sub="Keep it going" />
      </div>

      <section>
        <h2 className="text-base font-medium mb-3">My pathway</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {enrollments?.map(enrollment => (
            <CourseCard key={enrollment.id} enrollment={enrollment} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-base font-medium mb-3">Homework &amp; assignments</h2>
        <div className="border rounded-lg overflow-hidden">
          {homework?.map(hw => <HomeworkRow key={hw.id} homework={hw} />)}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <ScheduleList />
        <ProgressChart assessments={assessments ?? []} />
      </div>
    </main>
  );
}
