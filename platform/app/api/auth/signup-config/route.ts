import { NextResponse } from 'next/server';
import { isPublicSignupEnabled } from '@/lib/auth-config';

export async function GET() {
  return NextResponse.json({ publicSignupEnabled: isPublicSignupEnabled() });
}
