import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { EducatorRoster } from '@/components/educator/EducatorRoster';
import { joinRow } from '@/lib/utils';

export default async function EducatorStudentsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const { data: links } = await admin
    .from('educator_students')
    .select(`
      student_id,
      student:profiles!educator_students_student_id_fkey(id, full_name, date_of_birth, updated_at)
    `)
    .eq('educator_id', user.id);

  const rows = await Promise.all(
    (links ?? []).map(async (l) => {
      const sid = l.student_id;
      const { data: enrolments } = await admin
        .from('subject_enrolments')
        .select('subjects(name), levels(tier)')
        .eq('student_id', sid);
      const { data: nextClass } = await admin
        .from('live_classes')
        .select('scheduled_at')
        .eq('student_id', sid)
        .gte('scheduled_at', new Date().toISOString())
        .order('scheduled_at', { ascending: true })
        .limit(1)
        .maybeSingle();
      return {
        id: sid,
        name: (l.student as { full_name?: string })?.full_name ?? 'Student',
        dob: (l.student as { date_of_birth?: string })?.date_of_birth,
        lastActive: (l.student as { updated_at?: string })?.updated_at,
        subjects: (enrolments ?? []).map((e) => joinRow<{ name?: string }>(e.subjects)?.name).filter(Boolean),
        nextClass: nextClass?.scheduled_at,
      };
    })
  );

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-4">
      <h1 className="text-2xl font-display">Student roster</h1>
      <EducatorRoster students={rows} />
    </div>
  );
}
