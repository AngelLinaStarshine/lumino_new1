import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdminRequestAuthorized } from '@/lib/admin-auth';
import { createInvite } from '@/lib/invites';
import { createAdminClient } from '@/lib/supabase/admin';

async function authorize(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let profileRole: string | null = null;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    profileRole = profile?.role ?? null;
  }
  return isAdminRequestAuthorized(request, profileRole);
}

export async function GET(request: NextRequest) {
  if (!(await authorize(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('account_invites')
    .select('id, role, email, note, code_hint, expires_at, used_at, created_at')
    .order('created_at', { ascending: false })
    .limit(50);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ invites: data ?? [] });
}

export async function POST(request: NextRequest) {
  if (!(await authorize(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { role, email, note, familyPasscode, expiresInDays } = body as {
      role: 'student' | 'teacher';
      email?: string;
      note?: string;
      familyPasscode?: string;
      expiresInDays?: number;
    };

    if (!['student', 'teacher'].includes(role)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const result = await createInvite({ role, email, note, familyPasscode, expiresInDays });
    return NextResponse.json(result);
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Failed to create invite';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!(await authorize(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const id = request.nextUrl.searchParams.get('id');
  if (!id) {
    return NextResponse.json({ error: 'Invite id required' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from('account_invites').delete().eq('id', id).is('used_at', null);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
