import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { requireAdmin } from '@/lib/admin/authorize';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const admin = createAdminClient();
  const { data, error } = await admin
    .from('educator_students')
    .select(`
      assigned_at,
      educator:profiles!educator_students_educator_id_fkey(id, full_name),
      student:profiles!educator_students_student_id_fkey(id, full_name, email)
    `)
    .order('assigned_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ assignments: data ?? [] });
}

/** Assign student to educator (1:1) */
export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { studentId, educatorId } = await request.json();
  if (!studentId || !educatorId) {
    return NextResponse.json({ error: 'studentId and educatorId required' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from('educator_students').upsert(
    { student_id: studentId, educator_id: educatorId },
    { onConflict: 'educator_id,student_id' }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await writeAuditLog({
    userId: auth.adminUserId,
    action: 'admin.assign_educator',
    resourceType: 'student',
    resourceId: studentId,
    metadata: { educatorId },
  });

  return NextResponse.json({ ok: true });
}

export async function DELETE(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const studentId = request.nextUrl.searchParams.get('studentId');
  const educatorId = request.nextUrl.searchParams.get('educatorId');
  if (!studentId || !educatorId) {
    return NextResponse.json({ error: 'studentId and educatorId required' }, { status: 400 });
  }

  const admin = createAdminClient();
  await admin.from('educator_students').delete().eq('student_id', studentId).eq('educator_id', educatorId);

  return NextResponse.json({ ok: true });
}
