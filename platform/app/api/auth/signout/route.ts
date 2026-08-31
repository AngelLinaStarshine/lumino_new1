import { NextResponse } from 'next/server';
import { writeAuditLog } from '@/lib/audit';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await writeAuditLog({ userId: user.id, action: 'auth.sign_out' });
  }

  await supabase.auth.signOut();
  return NextResponse.json({ ok: true });
}
