import { NextResponse, type NextRequest } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { isAdminRequestAuthorized } from '@/lib/admin-auth';
import { createAccount } from '@/lib/account/create-account';
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
  const roleFilter = request.nextUrl.searchParams.get('role');

  let query = admin
    .from('profiles')
    .select('id, role, full_name, email, phone, stage, created_at')
    .order('created_at', { ascending: false });

  if (roleFilter && ['student', 'teacher', 'admin'].includes(roleFilter)) {
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

  const { count: submissionCount } = await admin
    .from('submissions')
    .select('*', { count: 'exact', head: true });

  const { count: homeworkCount } = await admin
    .from('homework')
    .select('*', { count: 'exact', head: true });

  return NextResponse.json({
    stats: {
      students: studentCount ?? 0,
      teachers: teacherCount ?? 0,
      homeworkAssigned: homeworkCount ?? 0,
      submissions: submissionCount ?? 0,
    },
    users: profiles ?? [],
  });
}

export async function POST(request: NextRequest) {
  if (!(await authorize(request))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const body = await request.json();
  const { role, fullName, email, phone, password, familyPasscode, smsOptIn } = body as {
    role: 'student' | 'teacher' | 'admin';
    fullName: string;
    email: string;
    phone?: string | null;
    password: string;
    familyPasscode?: string;
    smsOptIn?: boolean;
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
  });

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    userId: result.userId,
    email: result.email,
    role: result.role,
  });
}
