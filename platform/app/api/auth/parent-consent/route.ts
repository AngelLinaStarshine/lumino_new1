import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');
  if (!token) {
    return NextResponse.json({ error: 'Missing token' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data: consent } = await admin
    .from('parental_consents')
    .select('id, student_id, verified_at')
    .eq('token', token)
    .maybeSingle();

  if (!consent) {
    return NextResponse.json({ error: 'Invalid or expired link' }, { status: 404 });
  }

  if (!consent.verified_at) {
    await admin
      .from('parental_consents')
      .update({ verified_at: new Date().toISOString() })
      .eq('id', consent.id);

    await admin
      .from('profiles')
      .update({ account_status: 'active' })
      .eq('id', consent.student_id);

    await writeAuditLog({
      userId: consent.student_id,
      action: 'auth.parent_consent_verified',
    });
  }

  return NextResponse.json({ ok: true, message: 'Account activated. The student can now sign in.' });
}
