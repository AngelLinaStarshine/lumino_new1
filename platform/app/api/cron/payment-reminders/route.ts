import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { triggerSms } from '@/lib/sms';
import { fmtCAD } from '@/lib/utils';

function verifyCron(request: Request) {
  const auth = request.headers.get('authorization');
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  return auth === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!verifyCron(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const in7Days = new Date(today);
  in7Days.setDate(in7Days.getDate() + 7);

  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const fmt = (d: Date) => d.toISOString().slice(0, 10);

  const { data: upcoming } = await admin
    .from('payments')
    .select('*, parent:profiles!payments_parent_id_fkey(id, full_name)')
    .eq('status', 'pending')
    .eq('due_date', fmt(in7Days));

  const { data: overdue } = await admin
    .from('payments')
    .select('*, parent:profiles!payments_parent_id_fkey(id, full_name)')
    .eq('status', 'pending')
    .eq('due_date', fmt(yesterday));

  let remindersSent = 0;
  let overdueSent = 0;

  for (const payment of upcoming ?? []) {
    const notifyUserId = payment.student_id ?? payment.parent_id;
    if (!notifyUserId) continue;
    const result = await triggerSms({
      userId: notifyUserId,
      event: 'payment_reminder',
      context: {
        amount: fmtCAD(payment.amount_cents),
        dueDate: payment.due_date ?? '',
        link: `${appUrl}/student/family/payments`,
      },
    });
    if (result.success) remindersSent++;
  }

  for (const payment of overdue ?? []) {
    const notifyUserId = payment.student_id ?? payment.parent_id;
    if (!notifyUserId) continue;
    const result = await triggerSms({
      userId: notifyUserId,
      event: 'payment_overdue',
      context: {
        amount: fmtCAD(payment.amount_cents),
        link: `${appUrl}/student/family/payments`,
      },
    });
    if (result.success) overdueSent++;
  }

  return NextResponse.json({
    ok: true,
    remindersSent,
    overdueSent,
    checkedAt: new Date().toISOString(),
  });
}
