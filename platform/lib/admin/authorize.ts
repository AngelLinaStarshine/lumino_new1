import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdminRequestAuthorized } from '@/lib/admin-auth';

export async function requireAdmin(request: NextRequest) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  let profileRole: string | null = null;
  let adminUserId: string | null = user?.id ?? null;

  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    profileRole = profile?.role ?? null;
  }

  if (!isAdminRequestAuthorized(request, profileRole)) {
    return { ok: false as const, response: NextResponse.json({ error: 'Unauthorized' }, { status: 401 }) };
  }

  return { ok: true as const, adminUserId, profileRole };
}
