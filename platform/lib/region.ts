/** Canadian data residency — build-time and runtime checks */

export const ALLOWED_DATABASE_REGIONS = [
  'ca-central-1',
  'canada-central',
  'ca-central',
  'toronto',
  'montreal',
] as const;

export function normalizeRegion(value: string | undefined | null): string {
  return (value ?? '').trim().toLowerCase();
}

export function isCanadianDatabaseRegion(value: string | undefined | null): boolean {
  const region = normalizeRegion(value);
  if (!region) return false;
  return ALLOWED_DATABASE_REGIONS.some(
    (allowed) => region === allowed || region.includes(allowed) || region.includes('ca-central')
  );
}

/** Fail production builds when DATABASE_REGION is not Canadian. */
export function assertCanadianDatabaseRegion(): void {
  if (process.env.NODE_ENV !== 'production') return;

  const region = process.env.DATABASE_REGION ?? process.env.SUPABASE_REGION;
  if (!isCanadianDatabaseRegion(region)) {
    throw new Error(
      `[LuminoLearn] Production DATABASE_REGION must be Canadian (ca-central-1 / Toronto). Got: "${region ?? 'unset'}"`
    );
  }
}

export function getConfiguredDatabaseRegion(): string | null {
  return process.env.DATABASE_REGION ?? process.env.SUPABASE_REGION ?? null;
}
