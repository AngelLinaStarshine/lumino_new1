import { headers } from 'next/headers';
import { createAdminClient } from '@/lib/supabase/admin';

export type AuditAction =
  | 'auth.sign_in'
  | 'auth.sign_out'
  | 'auth.sign_up'
  | 'auth.password_reset'
  | 'auth.email_verify'
  | 'auth.parent_consent_sent'
  | 'auth.parent_consent_verified'
  | 'role.elevation_attempt'
  | 'student_data.read'
  | 'student_data.write'
  | 'practice.submit';

export interface AuditEntry {
  userId?: string | null;
  action: AuditAction | string;
  resourceType?: string;
  resourceId?: string;
  metadata?: Record<string, unknown>;
  ipAddress?: string | null;
  userAgent?: string | null;
}

function requestMeta() {
  try {
    const h = headers();
    return {
      ip: h.get('x-forwarded-for')?.split(',')[0]?.trim() ?? h.get('x-real-ip') ?? null,
      ua: h.get('user-agent'),
    };
  } catch {
    return { ip: null, ua: null };
  }
}

/** Structured audit log — never log secrets or full student answers. */
export async function writeAuditLog(entry: AuditEntry): Promise<void> {
  const meta = requestMeta();
  const admin = createAdminClient();

  const safeMetadata = entry.metadata ? { ...entry.metadata } : {};
  delete safeMetadata.password;
  delete safeMetadata.token;

  await admin.from('audit_logs').insert({
    user_id: entry.userId ?? null,
    action: entry.action,
    resource_type: entry.resourceType ?? null,
    resource_id: entry.resourceId ?? null,
    ip_address: entry.ipAddress ?? meta.ip,
    user_agent: entry.userAgent ?? meta.ua,
    metadata: safeMetadata,
  });
}
