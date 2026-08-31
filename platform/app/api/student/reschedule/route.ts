import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request: Request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { classId, reason } = await request.json();
  const admin = createAdminClient();

  await admin.from('reschedule_requests').insert({
    class_id: classId,
    student_id: user.id,
    reason,
  });

  await admin.from('live_classes').update({ status: 'reschedule_pending' }).eq('id', classId);

  return NextResponse.json({ ok: true });
}
