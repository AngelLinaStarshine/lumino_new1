import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { PracticeRunner } from '@/components/student/PracticeRunner';
import type { PracticeContent } from '@/lib/curriculum';

export default async function PracticePage({ params }: { params: { taskId: string } }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const { data: task } = await admin
    .from('practice_tasks')
    .select('*, levels(subjects(name))')
    .eq('id', params.taskId)
    .single();

  if (!task) notFound();

  const content = task.content_json as PracticeContent;

  return (
    <PracticeRunner
      taskId={params.taskId}
      title={task.title}
      subject={task.levels?.subjects?.name ?? 'Practice'}
      content={content}
    />
  );
}
