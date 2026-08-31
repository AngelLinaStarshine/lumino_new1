import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { requireAdmin } from '@/lib/admin/authorize';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const admin = createAdminClient();
  const status = request.nextUrl.searchParams.get('status');

  let query = admin
    .from('payments')
    .select(`
      *,
      parent:profiles!payments_parent_id_fkey(full_name, email),
      student:profiles!payments_student_id_fkey(full_name, email)
    `)
    .order('created_at', { ascending: false })
    .limit(100);

  if (status) query = query.eq('status', status);

  const { data, error } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const summary = {
    pending: (data ?? []).filter((p) => p.status === 'pending').length,
    paid: (data ?? []).filter((p) => p.status === 'paid').length,
    pendingCents: (data ?? [])
      .filter((p) => p.status === 'pending')
      .reduce((s, p) => s + (p.amount_cents ?? 0), 0),
  };

  return NextResponse.json({ payments: data ?? [], summary });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const {
    parentId,
    studentId,
    amountCents,
    description,
    dueDate,
    paymentMethod,
    notes,
    status,
  } = await request.json();

  if (!studentId || !amountCents) {
    return NextResponse.json({ error: 'studentId and amountCents required' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('payments')
    .insert({
      parent_id: parentId ?? studentId,
      student_id: studentId,
      amount_cents: amountCents,
      currency: 'CAD',
      description: description ?? 'Tuition',
      due_date: dueDate ?? null,
      payment_method: paymentMethod ?? 'interac',
      notes: notes ?? null,
      status: status ?? 'pending',
      recorded_by: auth.adminUserId,
    })
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await writeAuditLog({
    userId: auth.adminUserId,
    action: 'admin.record_payment',
    resourceType: 'payment',
    resourceId: data.id,
    metadata: { amountCents, status: status ?? 'pending' },
  });

  return NextResponse.json({ ok: true, paymentId: data.id });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { paymentId, status, notes, paidAt } = await request.json();
  if (!paymentId) return NextResponse.json({ error: 'paymentId required' }, { status: 400 });

  const admin = createAdminClient();
  const updates: Record<string, unknown> = {};
  if (status) updates.status = status;
  if (notes !== undefined) updates.notes = notes;
  if (status === 'paid') updates.paid_at = paidAt ?? new Date().toISOString();

  const { error } = await admin.from('payments').update(updates).eq('id', paymentId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await writeAuditLog({
    userId: auth.adminUserId,
    action: 'admin.update_payment',
    resourceType: 'payment',
    resourceId: paymentId,
    metadata: { status },
  });

  return NextResponse.json({ ok: true });
}
