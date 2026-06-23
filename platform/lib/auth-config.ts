/** Public self-service signup is off by default — accounts are admin-created or invite-only. */
export function isPublicSignupEnabled(): boolean {
  return process.env.PUBLIC_SIGNUP_ENABLED === 'true';
}
