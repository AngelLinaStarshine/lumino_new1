import { NextResponse, type NextRequest } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { writeAuditLog } from '@/lib/audit';
import { requireAdmin } from '@/lib/admin/authorize';

export async function POST(request: NextRequest) {
  const auth = await requireAdmin(request);
  if (!auth.ok) return auth.response;

  const { studentId, subjectId, levelId, masteryPct } = await request.json();
  if (!studentId || !subjectId) {
    return NextResponse.json({ error: 'studentId and subjectId required' }, { status: 400 });
  }

  const admin = createAdminClient();
  const { error } = await admin.from('subject_enrolments').upsert(
    {
      student_id: studentId,
      subject_id: subjectId,
      level_id: levelId ?? null,
      mastery_pct: masteryPct ?? 0,
    },
    { onConflict: 'student_id,subject_id' }
  );

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });

  await writeAuditLog({
    userId: auth.adminUserId,
    action: 'admin.enrol_subject',
    resourceType: 'student',
    resourceId: studentId,
    metadata: { subjectId, levelId },
  });

  return NextResponse.json({ ok: true });
}
