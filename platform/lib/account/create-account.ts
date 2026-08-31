import bcrypt from 'bcryptjs';
import { createAdminClient } from '@/lib/supabase/admin';
import { DEFAULT_NOTIFICATION_PREFS } from '@/lib/constants';
import type { UserRole } from '@/types/database';

export interface CreateAccountInput {
  role: UserRole;
  fullName: string;
  email: string;
  phone?: string | null;
  password: string;
  familyPasscode?: string;
  familyPasscodeHash?: string | null;
  smsOptIn?: boolean;
  dateOfBirth?: string;
  accountStatus?: 'active' | 'pending_parent_verification' | 'suspended';
}

export async function createAccount(input: CreateAccountInput) {
  const {
    role,
    fullName,
    email,
    phone,
    password,
    familyPasscode,
    familyPasscodeHash,
    smsOptIn,
    dateOfBirth,
    accountStatus = 'active',
  } = input;

  const effectiveRole = role === 'parent' ? 'parent' : role;

  if (!['student', 'teacher', 'admin', 'parent'].includes(role)) {
    return { ok: false as const, error: 'Invalid role' };
  }

  if (effectiveRole === 'student' && !familyPasscodeHash && (!familyPasscode || !/^\d{4,6}$/.test(familyPasscode))) {
    return { ok: false as const, error: 'Family passcode must be 4–6 digits' };
  }

  const admin = createAdminClient();

  const { data: authData, error: authError } = await admin.auth.admin.createUser({
    email: email.trim().toLowerCase(),
    password,
    email_confirm: true,
    user_metadata: { full_name: fullName, role: effectiveRole },
  });

  if (authError || !authData.user) {
    return { ok: false as const, error: authError?.message ?? 'Failed to create user' };
  }

  const userId = authData.user.id;

  const firstName = fullName.trim().split(/\s+/)[0] ?? fullName;

  const { error: profileError } = await admin.from('profiles').insert({
    id: userId,
    role: effectiveRole,
    full_name: fullName,
    first_name: firstName,
    email: email.trim().toLowerCase(),
    phone: phone ?? null,
    date_of_birth: dateOfBirth ?? null,
    account_status: accountStatus,
  });

  if (profileError) {
    await admin.auth.admin.deleteUser(userId);
    return { ok: false as const, error: profileError.message };
  }

  await admin.from('notification_prefs').insert({
    user_id: userId,
    ...DEFAULT_NOTIFICATION_PREFS,
    sms_homework: Boolean(smsOptIn),
    sms_class: Boolean(smsOptIn),
    sms_feedback: Boolean(smsOptIn),
    phone_verified: false,
    opted_in_at: smsOptIn ? new Date().toISOString() : null,
  });

  if (effectiveRole === 'student') {
    const passcode_hash =
      familyPasscodeHash ?? (familyPasscode ? await bcrypt.hash(familyPasscode, 10) : null);
    if (passcode_hash) {
      await admin.from('family_links').insert({
        student_id: userId,
        passcode_hash,
        relationship: 'family',
      });
    }
  }

  return { ok: true as const, userId, email: email.trim().toLowerCase(), role: effectiveRole };
}
