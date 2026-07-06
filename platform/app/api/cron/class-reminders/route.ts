import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendEmail } from '@/lib/email';

function verifyCron(request: Request) {
  const auth = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

/* Format a time like "14:30:00" → "2:30 PM" */
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

export async function GET(request: Request) {
  if (!verifyCron(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  // day_of_week: 0 = Sunday … 6 = Saturday (matches schedule_slots check constraint)
  const todayDow = new Date().getDay();

  /* 1. Today's active classes, with course + teacher info */
  const { data: slots } = await admin
    .from('schedule_slots')
    .select(`
      id,
      start_time,
      course_id,
      teacher:profiles!schedule_slots_teacher_id_fkey(full_name),
      course:courses(id, name)
    `)
    .eq('active', true)
    .eq('day_of_week', todayDow);

  if (!slots || slots.length === 0) {
    return NextResponse.json({ ok: true, classesToday: 0, emailsSent: 0 });
  }

  let emailsSent = 0;
  let parentsChecked = 0;

  for (const slot of slots) {
    const course = (slot as any).course;
    const teacher = (slot as any).teacher;
    const courseName = course?.name ?? 'your class';
    const teacherName = teacher?.full_name ?? '';
    const classTime = fmtTime((slot as any).start_time);

    /* 2. Students enrolled in this course */
    const { data: enrollments } = await admin
      .from('enrollments')
      .select('student_id, student:profiles!enrollments_student_id_fkey(full_name)')
      .eq('course_id', slot.course_id)
      .eq('status', 'active');

    for (const enr of enrollments ?? []) {
      const studentId = (enr as any).student_id;
      const studentName = (enr as any).student?.full_name ?? 'your child';
      if (!studentId) continue;

      /* 3. Parents linked to this student */
      const { data: links } = await admin
        .from('family_links')
        .select('parent_id')
        .eq('student_id', studentId);

      for (const link of links ?? []) {
        const parentId = (link as any).parent_id;
        if (!parentId) continue;
        parentsChecked++;

        const result = await sendEmail({
          userId: parentId,
          event: 'class_today',
          context: {
            studentName,
            courseName,
            teacherName,
            classTime,
            link: `${appUrl}/student/family`,
          },
        });
        if (result.success) emailsSent++;
      }
    }
  }

  return NextResponse.json({
    ok: true,
    classesToday: slots.length,
    parentsChecked,
    emailsSent,
    checkedAt: new Date().toISOString(),
  });
}