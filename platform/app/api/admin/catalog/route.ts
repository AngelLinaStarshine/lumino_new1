import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { requireAdmin } from '@/lib/admin/authorize';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const admin = createAdminClient();

  const [
    { data: students },
    { data: educators },
    { data: subjects },
    { data: levels },
    { data: groups },
  ] = await Promise.all([
    admin.from('profiles').select('id, full_name, email').eq('role', 'student').order('full_name'),
    admin.from('profiles').select('id, full_name, email').eq('role', 'teacher').order('full_name'),
    admin.from('subjects').select('id, name, slug').order('name'),
    admin.from('levels').select('id, subject_id, tier, name, subjects(name)').order('tier'),
    admin
      .from('student_groups')
      .select('id, name, format, max_size, educator_id, subject_id, active')
      .eq('active', true)
      .order('name'),
  ]);

  const { data: assignments } = await admin
    .from('educator_students')
    .select('educator_id, student_id, assigned_at');

  const { data: groupMembers } = await admin
    .from('student_group_members')
    .select('group_id, student_id, joined_at');

  return NextResponse.json({
    students: students ?? [],
    educators: educators ?? [],
    subjects: subjects ?? [],
    levels: levels ?? [],
    groups: groups ?? [],
    educatorAssignments: assignments ?? [],
    groupMembers: groupMembers ?? [],
  });
}
