import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const form = await request.formData().catch(() => null);
  let requestId: string | undefined;
  let action: string | undefined;

  if (form) {
    requestId = form.get('requestId')?.toString();
    action = form.get('action')?.toString();
  } else {
    const body = await request.json();
    requestId = body.requestId;
    action = body.action;
  }

  const admin = createAdminClient();
  await admin.from('reschedule_requests').update({ status: action === 'approve' ? 'approved' : 'denied' }).eq('id', requestId);

  return NextResponse.redirect(new URL('/educator/schedule', request.url));
}
