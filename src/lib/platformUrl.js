/** Base URL for the Next.js learning platform */
export const PLATFORM_URL = import.meta.env.VITE_PLATFORM_URL || 'http://localhost:3001';

/** In-app login route on the marketing site (full form) */
export const LOGIN_PATH = '/login';

/** Legacy external login URL — prefer LOGIN_PATH on marketing site */
export const PLATFORM_LOGIN_URL = `${PLATFORM_URL}/login`;

export function platformAuthCallbackUrl({ accessToken, refreshToken, next, passcode }) {
  const params = new URLSearchParams({
    access_token: accessToken,
    refresh_token: refreshToken,
    next: next || '/',
  });
  if (passcode) params.set('passcode', passcode);
  return `${PLATFORM_URL}/auth/callback?${params.toString()}`;
}
