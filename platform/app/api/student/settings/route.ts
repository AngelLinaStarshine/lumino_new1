import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function PATCH(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { highContrast } = await request.json();
  const admin = createAdminClient();
  await admin.from('profiles').update({ high_contrast: Boolean(highContrast) }).eq('id', user.id);

  return NextResponse.json({ ok: true });
}
