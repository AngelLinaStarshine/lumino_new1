import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { MessageThread } from '@/components/student/MessageThread';

export default async function StudentMessagesPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const { data: link } = await admin
    .from('educator_students')
    .select('educator_id, educator:profiles!educator_students_educator_id_fkey(full_name)')
    .eq('student_id', user.id)
    .limit(1)
    .maybeSingle();

  let threadId: string | null = null;
  let messages: Array<{ id: string; body: string; sender_id: string; created_at: string; delivered_at: string | null }> = [];

  if (link?.educator_id) {
    const { data: thread } = await admin
      .from('message_threads')
      .select('id')
      .eq('student_id', user.id)
      .eq('educator_id', link.educator_id)
      .maybeSingle();

    threadId = thread?.id ?? null;

    if (!threadId) {
      const { data: created } = await admin
        .from('message_threads')
        .insert({ student_id: user.id, educator_id: link.educator_id })
        .select('id')
        .single();
      threadId = created?.id ?? null;
    }

    if (threadId) {
      const { data: msgs } = await admin
        .from('messages')
        .select('id, body, sender_id, created_at, delivered_at, held_for_review')
        .eq('thread_id', threadId)
        .eq('held_for_review', false)
        .order('created_at', { ascending: true });
      messages = msgs ?? [];
    }
  }

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-4 h-full flex flex-col">
      <header>
        <h1 className="text-2xl font-display">Messages</h1>
        <p className="text-muted-foreground text-sm">
          Chat with your educator only. Parents receive a copy of educator messages.
        </p>
      </header>
      {link?.educator_id && threadId ? (
        <MessageThread
          threadId={threadId}
          educatorName={(link.educator as { full_name?: string })?.full_name ?? 'Educator'}
          initialMessages={messages}
          currentUserId={user.id}
        />
      ) : (
        <p className="text-muted-foreground">Your educator will connect with you here once assigned.</p>
      )}
    </div>
  );
}
