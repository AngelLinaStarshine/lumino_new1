import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { triggerSms } from '@/lib/sms';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase.from('profiles').select('role, full_name').eq('id', user.id).single();
  if (profile?.role !== 'teacher' && profile?.role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const body = await request.json();
  const { lesson_id, title, instructions, due_date, max_score, allow_google_docs, attachment_types } = body;

  const { data: homework, error } = await supabase
    .from('homework')
    .insert({
      lesson_id,
      title,
      instructions,
      due_date,
      max_score,
      allow_google_docs,
      attachment_types,
      created_by: user.id,
    })
    .select('id, title, lesson_id, lessons(course_id, courses(name))')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  const admin = createAdminClient();
  const lesson = homework.lessons as unknown as { course_id: string; courses: { name: string } } | null;
  const courseId = lesson?.course_id;
  if (!courseId) return NextResponse.json({ homework });

  const { data: enrollments } = await admin
    .from('enrollments')
    .select('student_id, courses(name)')
    .eq('course_id', courseId);

  const courseName = lesson?.courses?.name ?? 'your course';
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

  for (const enrollment of enrollments ?? []) {
    await triggerSms({
      userId: enrollment.student_id,
      event: 'homework_assigned',
      context: {
        courseName,
        homeworkTitle: title,
        dueDate: new Date(due_date).toLocaleDateString('en-CA'),
        link: `${appUrl}/student/homework/${homework.id}`,
      },
    });
  }

  return NextResponse.json({ homework });
}
