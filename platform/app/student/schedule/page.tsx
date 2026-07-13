import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { ScheduleList } from '@/components/student/ScheduleList';

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

export default async function StudentSchedulePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user!.id).single();

  /* Real weekly schedule: enrollments (student → course) → schedule_slots */
  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('course_id')
    .eq('student_id', user!.id);

  const courseIds = (enrollments ?? []).map((e: any) => e.course_id).filter(Boolean);

  let scheduleSlots: { day: string; time: string; course: string; teacher: string }[] = [];

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

    scheduleSlots = (slots ?? [])
      .map((s: any) => ({
        day: DAY_NAMES[s.day_of_week] ?? '',
        time: fmtTime(s.start_time),
        course: s.course?.name ?? 'Class',
        teacher: s.teacher?.full_name ?? 'Teacher TBD',
        _dow: s.day_of_week,
        _start: s.start_time,
      }))
      .sort((a: any, b: any) => (a._dow - b._dow) || String(a._start).localeCompare(String(b._start)))
      .map(({ day, time, course, teacher }: any) => ({ day, time, course, teacher }));
  }

  return (
    <main className="space-y-6 p-6 max-w-3xl">
      <Topbar greeting="Schedule" name={profile?.full_name ?? ''} avatar={profile?.avatar_url} />
      <ScheduleList slots={scheduleSlots} />
    </main>
  );
}
