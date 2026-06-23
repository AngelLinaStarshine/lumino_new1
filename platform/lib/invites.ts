import bcrypt from 'bcryptjs';
import { randomBytes } from 'crypto';
import { createAdminClient } from '@/lib/supabase/admin';
import type { UserRole } from '@/types/database';

export function generateInviteCode(): string {
  return randomBytes(4).toString('hex').toUpperCase();
}

export async function hashInviteCode(code: string): Promise<string> {
  return bcrypt.hash(code.normalize().toUpperCase(), 10);
}

export async function verifyInviteCode(code: string, hash: string): Promise<boolean> {
  return bcrypt.compare(code.normalize().toUpperCase(), hash);
}

interface CreateInviteInput {
  role: 'student' | 'teacher';
  email?: string | null;
  note?: string | null;
  familyPasscode?: string | null;
  expiresInDays?: number;
}

export async function createInvite(input: CreateInviteInput) {
  const admin = createAdminClient();
  const code = generateInviteCode();
  const code_hash = await hashInviteCode(code);
  const code_hint = code.slice(-4);

  let family_passcode_hash: string | null = null;
  if (input.role === 'student' && input.familyPasscode) {
    if (!/^\d{4,6}$/.test(input.familyPasscode)) {
      throw new Error('Family passcode must be 4–6 digits');
    }
    family_passcode_hash = await bcrypt.hash(input.familyPasscode, 10);
  }

  const expires_at = input.expiresInDays
    ? new Date(Date.now() + input.expiresInDays * 86400000).toISOString()
    : null;

  const { data, error } = await admin
    .from('account_invites')
    .insert({
      code_hash,
      code_hint,
      email: input.email?.trim().toLowerCase() || null,
      role: input.role,
      family_passcode_hash,
      note: input.note?.trim() || null,
      expires_at,
    })
    .select('id, role, email, note, expires_at, created_at, code_hint')
    .single();

  if (error) throw new Error(error.message);

  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3001';
  const signupUrl = `${appUrl}/signup?invite=${code}`;

  return { invite: data, code, signupUrl };
}

interface ValidatedInvite {
  id: string;
  role: UserRole;
  email: string | null;
  family_passcode_hash: string | null;
}

export async function validateInviteCode(
  code: string,
  signupEmail: string
): Promise<{ ok: true; invite: ValidatedInvite } | { ok: false; error: string }> {
  const admin = createAdminClient();
  const normalizedEmail = signupEmail.trim().toLowerCase();

  const { data: invites, error } = await admin
    .from('account_invites')
    .select('id, code_hash, email, role, family_passcode_hash, expires_at, used_at')
    .is('used_at', null);

  if (error) return { ok: false, error: 'Could not verify invite' };

  for (const row of invites ?? []) {
    const matches = await verifyInviteCode(code, row.code_hash);
    if (!matches) continue;

    if (row.used_at) return { ok: false, error: 'This invite has already been used' };
    if (row.expires_at && new Date(row.expires_at) < new Date()) {
      return { ok: false, error: 'This invite has expired' };
    }
    if (row.email && row.email !== normalizedEmail) {
      return { ok: false, error: 'This invite is for a different email address' };
    }
    if (!['student', 'teacher'].includes(row.role)) {
      return { ok: false, error: 'Invalid invite' };
    }

    return {
      ok: true,
      invite: {
        id: row.id,
        role: row.role as UserRole,
        email: row.email,
        family_passcode_hash: row.family_passcode_hash,
      },
    };
  }

  return { ok: false, error: 'Invalid or expired invite code' };
}

export async function markInviteUsed(inviteId: string, userId: string) {
  const admin = createAdminClient();
  await admin
    .from('account_invites')
    .update({ used_at: new Date().toISOString(), used_by: userId })
    .eq('id', inviteId)
    .is('used_at', null);
}
