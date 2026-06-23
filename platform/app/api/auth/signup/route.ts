import { NextResponse } from 'next/server';
import { isPublicSignupEnabled } from '@/lib/auth-config';
import { createAccount } from '@/lib/account/create-account';
import { markInviteUsed, validateInviteCode } from '@/lib/invites';
import type { UserRole } from '@/types/database';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { role, fullName, email, phone, password, familyPasscode, smsOptIn, inviteCode } = body as {
      role: UserRole;
      fullName: string;
      email: string;
      phone: string | null;
      password: string;
      familyPasscode?: string;
      smsOptIn?: boolean;
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

    const result = await createAccount({
      role: effectiveRole,
      fullName,
      email,
      phone,
      password,
      familyPasscode: effectiveRole === 'student' && !inviteFamilyHash ? familyPasscode : undefined,
      familyPasscodeHash: inviteFamilyHash,
      smsOptIn,
    });

    if (!result.ok) {
      return NextResponse.json({ error: result.error }, { status: 400 });
    }

    if (inviteId) {
      await markInviteUsed(inviteId, result.userId);
    }

    return NextResponse.json({ success: true, userId: result.userId });
  } catch (err) {
    console.error('Signup error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
