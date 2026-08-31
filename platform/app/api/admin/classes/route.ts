import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { requireAdmin } from '@/lib/admin/authorize';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const admin = createAdminClient();
  const limit = Number(request.nextUrl.searchParams.get('limit') ?? 50);

  const { data, error } = await admin
    .from('live_classes')
    .select(`
      *,
      subjects(name),
      student:profiles!live_classes_student_id_fkey(full_name),
      educator:profiles!live_classes_educator_id_fkey(full_name)
    `)
    .order('scheduled_at', { ascending: false })
    .limit(limit);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ classes: data ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const {
    studentId,
    educatorId,
    subjectId,
    format,
    scheduledAt,
    joinUrl,
    groupName,
    groupId,
  } = await request.json();

  if (!studentId || !scheduledAt) {
    return NextResponse.json({ error: 'studentId and scheduledAt required' }, { status: 400 });
  }

  const admin = createAdminClient();

  let resolvedGroupName = groupName ?? null;
  if (groupId && !resolvedGroupName) {
    const { data: g } = await admin.from('student_groups').select('name').eq('id', groupId).single();
    resolvedGroupName = g?.name ?? null;
  }

  const { data, error } = await admin
    .from('live_classes')
    .insert({
      student_id: studentId,
      educator_id: educatorId ?? null,
      subject_id: subjectId ?? null,
      format: format ?? 'online',
      scheduled_at: scheduledAt,
      join_url: joinUrl ?? null,
      group_name: resolvedGroupName,
      status: 'scheduled',
    })
    .select('id')
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await writeAuditLog({
    userId: auth.adminUserId,
    action: 'admin.schedule_class',
    resourceType: 'live_class',
    resourceId: data.id,
    metadata: { format, studentId },
  });

  return NextResponse.json({ ok: true, classId: data.id });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { classId, ...updates } = await request.json();
  if (!classId) return NextResponse.json({ error: 'classId required' }, { status: 400 });

  const admin = createAdminClient();
  const allowed: Record<string, unknown> = {};
  if (updates.format !== undefined) allowed.format = updates.format;
  if (updates.scheduledAt !== undefined) allowed.scheduled_at = updates.scheduledAt;
  if (updates.joinUrl !== undefined) allowed.join_url = updates.joinUrl;
  if (updates.status !== undefined) allowed.status = updates.status;
  if (updates.educatorId !== undefined) allowed.educator_id = updates.educatorId;

  const { error } = await admin.from('live_classes').update(allowed).eq('id', classId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
