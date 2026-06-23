import { NextResponse } from 'next/server';
import {
  ADMIN_SESSION_COOKIE,
  getAdminSessionValue,
  isAdminSecretConfigured,
  verifyAdminSecret,
} from '@/lib/admin-auth';

export async function POST(request: Request) {
  if (!isAdminSecretConfigured()) {
    return NextResponse.json({ error: 'Admin access is not configured' }, { status: 503 });
  }

  const { secret } = (await request.json()) as { secret?: string };
  if (!secret || !verifyAdminSecret(secret)) {
    return NextResponse.json({ error: 'Invalid admin secret' }, { status: 401 });
  }

  const token = getAdminSessionValue();
  if (!token) {
    return NextResponse.json({ error: 'Admin session unavailable' }, { status: 503 });
  }

  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8,
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
