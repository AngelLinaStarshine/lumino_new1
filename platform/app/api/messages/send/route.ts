import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { containsFlaggedWord, copyMessageToParentInbox, loadModerationWords } from '@/lib/messaging';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { threadId, body } = await request.json();
  if (!threadId || !body?.trim()) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: thread } = await admin
    .from('message_threads')
    .select('student_id, educator_id')
    .eq('id', threadId)
    .single();

  if (!thread) return NextResponse.json({ error: 'Thread not found' }, { status: 404 });

  const isStudent = user.id === thread.student_id;
  const isEducator = user.id === thread.educator_id;
  if (!isStudent && !isEducator) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  const words = await loadModerationWords();
  const flagged = containsFlaggedWord(body, words);
  const recipientId = isStudent ? thread.educator_id : thread.student_id;

  const { data: message, error } = await admin
    .from('messages')
    .insert({
      thread_id: threadId,
      sender_id: user.id,
      recipient_id: recipientId,
      body: body.trim(),
      moderated: Boolean(flagged),
      held_for_review: Boolean(flagged),
      delivered_at: flagged ? null : new Date().toISOString(),
    })
    .select('id, body, sender_id, created_at, delivered_at')
    .single();

  if (error || !message) {
    return NextResponse.json({ error: 'Failed to send' }, { status: 500 });
  }

  if (!flagged && isEducator) {
    await copyMessageToParentInbox(message.id, thread.student_id);
  }

  if (flagged) {
    return NextResponse.json({
      ok: true,
      held: true,
      message: 'Your message is being reviewed before delivery.',
    });
  }

  return NextResponse.json({ ok: true, message });
}
