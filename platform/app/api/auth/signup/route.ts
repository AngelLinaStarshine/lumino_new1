import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createAccount } from '@/lib/account/create-account';
import { writeAuditLog } from '@/lib/audit';
import { isPublicSignupEnabled } from '@/lib/auth-config';
import { isUnder13 } from '@/lib/curriculum';
import { createAdminClient } from '@/lib/supabase/admin';
import { sendParentConsentEmail } from '@/lib/email';
import { markInviteUsed, validateInviteCode } from '@/lib/invites';
import type { UserRole } from '@/types/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      role,
      fullName,
      email,
      phone,
      password,
      dateOfBirth,
      parentEmail,
      familyPasscode,
      inviteCode,
    } = body as {
      role: UserRole;
      fullName: string;
      email: string;
      phone?: string;
      password: string;
      dateOfBirth?: string;
      parentEmail?: string;
      familyPasscode?: string;
      inviteCode?: string;
    };

    let effectiveRole = role;
    let inviteFamilyHash: string | null = null;
    let inviteId: string | null = null;

    if (!isPublicSignupEnabled()) {
      if (!inviteCode?.trim()) {
        return NextResponse.json(
          { error: 'An invite code is required. Contact Luminolearn to get access.' },
          { status: 403 }
        );
      }
      const inviteCheck = await validateInviteCode(inviteCode, email);
      if (!inviteCheck.ok) {
        return NextResponse.json({ error: inviteCheck.error }, { status: 403 });
      }
      effectiveRole = inviteCheck.invite.role;
      inviteFamilyHash = inviteCheck.invite.family_passcode_hash;
      inviteId = inviteCheck.invite.id;
    }

    if (!['student', 'teacher', 'parent', 'admin'].includes(effectiveRole)) {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const needsParentConsent = effectiveRole === 'student' && dateOfBirth && isUnder13(dateOfBirth);
    if (needsParentConsent && !parentEmail) {
      return NextResponse.json({ error: 'Parent email is required for students under 13' }, { status: 400 });
    }

    const result = await createAccount({
      role: effectiveRole,
      fullName,
      email,
      phone,
      password,
      familyPasscode: effectiveRole === 'student' && !inviteFamilyHash ? familyPasscode : undefined,
      familyPasscodeHash: inviteFamilyHash,
      dateOfBirth,
      accountStatus: needsParentConsent ? 'pending_parent_verification' : 'active',
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (inviteId) {
      await markInviteUsed(inviteId, result.userId);
    }

    await writeAuditLog({
      userId: result.userId,
      action: 'auth.sign_up',
      metadata: { role: effectiveRole, under13: Boolean(needsParentConsent) },
    });

    if (needsParentConsent && parentEmail) {
      const admin = createAdminClient();
      const token = crypto.randomBytes(32).toString('hex');
      await admin.from('parental_consents').insert({
        student_id: result.userId,
        parent_email: parentEmail.trim().toLowerCase(),
        token,
      });
      const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3005';
      await sendParentConsentEmail({
        to: parentEmail,
        studentName: fullName,
        verifyUrl: `${appUrl}/auth/parent-consent?token=${token}`,
      });
      await writeAuditLog({
        userId: result.userId,
        action: 'auth.parent_consent_sent',
        metadata: { parentEmailDomain: parentEmail.split('@')[1] },
      });
    }

    return NextResponse.json({
      success: true,
      pendingParentVerification: Boolean(needsParentConsent),
    });
  } catch {
    console.error('Signup error');
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
