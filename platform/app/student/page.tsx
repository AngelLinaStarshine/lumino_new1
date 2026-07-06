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

const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function fmtTime(t: string | null): string {
  if (!t) return '';
  const [hStr, mStr] = t.split(':');
  let h = parseInt(hStr, 10);
  const m = mStr ?? '00';
  const ampm = h >= 12 ? 'PM' : 'AM';
  h = h % 12;
  if (h === 0) h = 12;
  return `${h}:${m} ${ampm}`;
}

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

  /* Fetch this student's real weekly schedule.
     Chain: enrollments (student → course) → schedule_slots (course → day/time). */
  const courseIds = (enrollments ?? [])
    .map((e: any) => e.course_id)
    .filter(Boolean);

  let scheduleSlots: {
    day: string;
    time: string;
    course: string;
    teacher: string;
    dow: number;
    start: string;
  }[] = [];

  if (courseIds.length > 0) {
    const { data: slots } = await supabase
      .from('schedule_slots')
      .select(`
        day_of_week,
        start_time,
        course:courses(name),
        teacher:profiles!schedule_slots_teacher_id_fkey(full_name)
      `)
      .in('course_id', courseIds)
      .eq('active', true);

    scheduleSlots = (slots ?? []).map((s: any) => ({
      day: DAY_NAMES[s.day_of_week] ?? '',
      time: fmtTime(s.start_time),
      course: s.course?.name ?? 'Class',
      teacher: s.teacher?.full_name ?? 'Teacher TBD',
      dow: s.day_of_week,
      start: s.start_time,
    }));

    // Sort by day of week, then time
    scheduleSlots.sort((a, b) => (a.dow - b.dow) || a.start.localeCompare(b.start));
  }

  /* Real stats */
  const activeCourses = enrollments?.length ?? 0;
  const weeklyClasses = scheduleSlots.length;
  const assignmentsDue = homework?.length ?? 0;

  /* Real week progress, from the furthest-along enrollment (fallback 0/12) */
  const weekProgress = Math.max(
    0,
    ...(enrollments ?? []).map((e: any) => e.week_progress ?? 0),
    0,
  );

  const stageKey = (profile.stage ?? 'growth') as StageKey;
  const stage = STAGES[stageKey];

  return (
    <main className="space-y-6 p-6 max-w-6xl mx-auto">
      <Topbar
        greeting={`Welcome back, ${profile.full_name.split(' ')[0]}`}
        subtitle={`${activeCourses} active courses · ${assignmentsDue} assignment${assignmentsDue === 1 ? '' : 's'} to review`}
        stagePill={`${stage.name} stage · ages ${stage.ageRange}`}
        avatar={profile.avatar_url}
        name={profile.full_name}
      />

      <CycleProgressStrip currentStep="lumino_core" weekProgress={weekProgress} totalWeeks={12} />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Active subjects"  value={activeCourses}  icon="books"  sub="Enrolled courses" />
        <StatCard label="Weekly classes"   value={weeklyClasses}  icon="clock"  sub="Scheduled sessions" />
        <StatCard label="Assignments"      value={assignmentsDue} icon="target" sub="To review" />
        <StatCard label="Week"             value={weekProgress}   icon="flame"  sub="of 12" />
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
        <ScheduleList slots={scheduleSlots.map(s => ({ day: s.day, time: s.time, course: s.course, teacher: s.teacher }))} />
        <ProgressChart assessments={assessments ?? []} />
      </div>
    </main>
  );
}
