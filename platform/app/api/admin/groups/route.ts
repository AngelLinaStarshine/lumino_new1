import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { requireAdmin } from '@/lib/admin/authorize';

export async function GET(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const admin = createAdminClient();
  const { data: groups, error } = await admin
    .from('student_groups')
    .select(`
      *,
      educator:profiles!student_groups_educator_id_fkey(full_name),
      subjects(name),
      levels(tier, name),
      members:student_group_members(student_id, student:profiles(full_name, email))
    `)
    .order('created_at', { ascending: false });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ groups: groups ?? [] });
}

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const body = await request.json();
  const { action } = body;

  const admin = createAdminClient();

  if (action === 'create_group') {
    const { name, educatorId, subjectId, levelId, format, maxSize, notes, studentIds } = body;
    if (!name?.trim()) return NextResponse.json({ error: 'Group name required' }, { status: 400 });

    const { data: group, error } = await admin
      .from('student_groups')
      .insert({
        name: name.trim(),
        educator_id: educatorId ?? null,
        subject_id: subjectId ?? null,
        level_id: levelId ?? null,
        format: format ?? 'group',
        max_size: maxSize ?? 6,
        notes: notes ?? null,
      })
      .select('id')
      .single();

    if (error || !group) return NextResponse.json({ error: error?.message ?? 'Failed' }, { status: 400 });

    if (studentIds?.length) {
      await admin.from('student_group_members').insert(
        studentIds.map((sid: string) => ({ group_id: group.id, student_id: sid }))
      );
    }

    await writeAuditLog({
      userId: auth.adminUserId,
      action: 'admin.create_group',
      resourceType: 'student_group',
      resourceId: group.id,
    });

    return NextResponse.json({ ok: true, groupId: group.id });
  }

  if (action === 'add_to_group') {
    const { groupId, studentId } = body;
    if (!groupId || !studentId) {
      return NextResponse.json({ error: 'groupId and studentId required' }, { status: 400 });
    }

    const { data: group } = await admin.from('student_groups').select('max_size').eq('id', groupId).single();
    const { count } = await admin
      .from('student_group_members')
      .select('*', { count: 'exact', head: true })
      .eq('group_id', groupId);

    if (group && count !== null && count >= group.max_size) {
      return NextResponse.json({ error: 'Group is full' }, { status: 400 });
    }

    const { error } = await admin
      .from('student_group_members')
      .upsert({ group_id: groupId, student_id: studentId }, { onConflict: 'group_id,student_id' });

    if (error) return NextResponse.json({ error: error.message }, { status: 400 });

    await writeAuditLog({
      userId: auth.adminUserId,
      action: 'admin.assign_group',
      resourceType: 'student',
      resourceId: studentId,
      metadata: { groupId },
    });

    return NextResponse.json({ ok: true });
  }

  if (action === 'remove_from_group') {
    const { groupId, studentId } = body;
    await admin.from('student_group_members').delete().eq('group_id', groupId).eq('student_id', studentId);
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: 'Unknown action' }, { status: 400 });
}

export async function PATCH(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { groupId, ...updates } = await request.json();
  if (!groupId) return NextResponse.json({ error: 'groupId required' }, { status: 400 });

  const admin = createAdminClient();
  const allowed: Record<string, unknown> = {};
  if (updates.name !== undefined) allowed.name = updates.name;
  if (updates.educatorId !== undefined) allowed.educator_id = updates.educatorId;
  if (updates.subjectId !== undefined) allowed.subject_id = updates.subjectId;
  if (updates.format !== undefined) allowed.format = updates.format;
  if (updates.active !== undefined) allowed.active = updates.active;
  if (updates.notes !== undefined) allowed.notes = updates.notes;

  const { error } = await admin.from('student_groups').update(allowed).eq('id', groupId);
  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  return NextResponse.json({ ok: true });
}
