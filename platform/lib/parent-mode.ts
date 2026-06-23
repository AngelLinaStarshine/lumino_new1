/** Cookie set after a parent enters the correct family passcode on a student account */
export const FAMILY_PASSCODE_COOKIE = 'family_passcode_verified';

export const FAMILY_PASSCODE_MAX_AGE = 60 * 60 * 8; // 8 hours

export function isFamilyViewVerified(cookieValue: string | undefined, studentId: string) {
  return cookieValue === studentId;
}
