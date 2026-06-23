import { createHmac, timingSafeEqual } from 'crypto';
import type { NextRequest } from 'next/server';

export const ADMIN_SESSION_COOKIE = 'luminolearn_admin_session';

function sessionToken(): string | null {
  const secret = process.env.ADMIN_SECRET;
  if (!secret) return null;
  return createHmac('sha256', secret).update('luminolearn-admin-session').digest('hex');
}

export function isAdminSecretConfigured(): boolean {
  return Boolean(process.env.ADMIN_SECRET && process.env.ADMIN_SECRET.length >= 16);
}

export function verifyAdminSecret(secret: string): boolean {
  const expected = process.env.ADMIN_SECRET;
  if (!expected || !secret) return false;
  try {
    return timingSafeEqual(Buffer.from(secret), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function getAdminSessionValue(): string | null {
  return sessionToken();
}

export function verifyAdminSession(value: string | undefined): boolean {
  const expected = sessionToken();
  if (!expected || !value) return false;
  try {
    return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
  } catch {
    return false;
  }
}

export function isAdminRequestAuthorized(
  request: NextRequest,
  profileRole?: string | null
): boolean {
  if (profileRole === 'admin') return true;
  return verifyAdminSession(request.cookies.get(ADMIN_SESSION_COOKIE)?.value);
}
