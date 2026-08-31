import { createAdminClient } from '@/lib/supabase/admin';

const DEFAULT_FLAGGED = ['password', 'address', 'phone number', 'meet me', 'snapchat', 'instagram dm'];

export async function loadModerationWords(): Promise<string[]> {
  const admin = createAdminClient();
  const { data } = await admin.from('moderation_wordlist').select('word');
  if (!data?.length) return DEFAULT_FLAGGED;
  return data.map((r) => r.word.toLowerCase());
}

export function containsFlaggedWord(body: string, words: string[]): string | null {
  const lower = body.toLowerCase();
  for (const w of words) {
    if (lower.includes(w.toLowerCase())) return w;
  }
  return null;
}

export async function copyMessageToParentInbox(messageId: string, studentId: string): Promise<void> {
  const admin = createAdminClient();

  const { data: links } = await admin
    .from('family_links')
    .select('parent_id')
    .eq('student_id', studentId);

  if (links?.length) {
    await admin.from('parent_message_copies').insert(
      links.filter((l) => l.parent_id).map((l) => ({
        message_id: messageId,
        parent_id: l.parent_id,
      }))
    );
    return;
  }

  const { data: consent } = await admin
    .from('parental_consents')
    .select('parent_email')
    .eq('student_id', studentId)
    .not('verified_at', 'is', null)
    .order('verified_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (consent?.parent_email) {
    await admin.from('parent_message_copies').insert({
      message_id: messageId,
      parent_email: consent.parent_email,
    });
  }
}
