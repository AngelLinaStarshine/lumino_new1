import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { requireAdmin } from '@/lib/admin/authorize';
import { createAccount } from '@/lib/account/create-account';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const admin = createAdminClient();
  const roleFilter = request.nextUrl.searchParams.get('role');

  let query = admin
    .from('profiles')
    .select('id, role, full_name, email, phone, stage, account_status, created_at')
    .order('created_at', { ascending: false });

  if (roleFilter && ['student', 'teacher', 'admin', 'parent'].includes(roleFilter)) {
    query = query.eq('role', roleFilter);
  }

  const { data: profiles, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const { count: studentCount } = await admin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'student');

  const { count: teacherCount } = await admin
    .from('profiles')
    .select('*', { count: 'exact', head: true })
    .eq('role', 'teacher');

  const { count: pendingPayments } = await admin
    .from('payments')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'pending');

  const { count: groupCount } = await admin
    .from('student_groups')
    .select('*', { count: 'exact', head: true })
    .eq('active', true);

  return NextResponse.json({
    stats: {
      students: studentCount ?? 0,
      teachers: teacherCount ?? 0,
      pendingPayments: pendingPayments ?? 0,
      activeGroups: groupCount ?? 0,
    },
    users: profiles ?? [],
  });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const body = await request.json();
  const { role, fullName, email, phone, password, familyPasscode, smsOptIn, dateOfBirth } = body as {
    role: 'student' | 'teacher' | 'admin';
    fullName: string;
    email: string;
    phone?: string | null;
    password: string;
    familyPasscode?: string;
    smsOptIn?: boolean;
    dateOfBirth?: string;
  };

  if (!fullName?.trim() || !email?.trim() || !password || password.length < 8) {
    return NextResponse.json({ error: 'Name, email, and password (8+ chars) are required' }, { status: 400 });
  }

  if (!['student', 'teacher', 'admin'].includes(role)) {
    return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
  }

  const result = await createAccount({
    role,
    fullName: fullName.trim(),
    email: email.trim(),
    phone: phone ?? null,
    password,
    familyPasscode: role === 'student' ? familyPasscode : undefined,
    smsOptIn,
    dateOfBirth,
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  await writeAuditLog({
    userId: auth.adminUserId,
    action: 'admin.create_user',
    resourceType: 'profile',
    resourceId: result.userId,
    metadata: { role },
  });

  return NextResponse.json({
    success: true,
    userId: result.userId,
    email: result.email,
    role: result.role,
  });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { userId, fullName, phone, accountStatus, role } = await request.json();
  if (!userId) return NextResponse.json({ error: 'userId required' }, { status: 400 });

  const updates: Record<string, unknown> = {};
  if (fullName !== undefined) updates.full_name = fullName;
  if (phone !== undefined) updates.phone = phone;
  if (accountStatus !== undefined) updates.account_status = accountStatus;
  if (role !== undefined && ['student', 'teacher', 'admin', 'parent'].includes(role)) {
    updates.role = role;
  }

  const admin = createAdminClient();
  const { error } = await admin.from('profiles').update(updates).eq('id', userId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await writeAuditLog({
    userId: auth.adminUserId,
    action: 'admin.update_user',
    resourceType: 'profile',
    resourceId: userId,
    metadata: updates,
  });

  return NextResponse.json({ ok: true });
}
