import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { writeAuditLog } from '@/lib/audit';
import { roleDashboardPath } from '@/lib/roles';

export async function POST(request: Request) {
  const supabase = createClient();
  const body = await request.json().catch(() => ({}));
  const { email, password } = body as { email?: string; password?: string };

  if (!email || !password) {
    return NextResponse.json({ error: 'Email and password required' }, { status: 400 });
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.trim().toLowerCase(),
    password,
  });

  if (error || !data.user) {
    return NextResponse.json({ error: error?.message ?? 'Sign in failed' }, { status: 401 });
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, account_status')
    .eq('id', data.user.id)
    .single();

  if (profile?.account_status === 'pending_parent_verification') {
    await supabase.auth.signOut();
    return NextResponse.json(
      { error: 'Your account is waiting for parent verification. Check the email we sent your parent.' },
      { status: 403 }
    );
  }

  await writeAuditLog({ userId: data.user.id, action: 'auth.sign_in' });

  return NextResponse.json({
    ok: true,
    role: profile?.role,
    redirect: roleDashboardPath(profile?.role ?? 'student'),
  });
}
