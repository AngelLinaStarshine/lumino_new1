/** @type {import('next').NextConfig} */

// Fail production builds when DATABASE_REGION is explicitly set to a non-Canadian region
if (process.env.NODE_ENV === 'production') {
  const region = (process.env.DATABASE_REGION ?? process.env.SUPABASE_REGION ?? '').toLowerCase();
  if (region) {
    const allowed = ['ca-central-1', 'canada-central', 'ca-central', 'toronto', 'montreal'];
    const ok = allowed.some((a) => region.includes(a));
    if (!ok) {
      throw new Error(
        `[LuminoLearn] Production DATABASE_REGION must be Canadian (ca-central-1). Got: "${region}"`
      );
    }
  } else if (process.env.ENFORCE_CA_REGION === 'true') {
    throw new Error('[LuminoLearn] ENFORCE_CA_REGION=true but DATABASE_REGION is unset');
  }
}

module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: '**.supabase.co' }],
  },
  async redirects() {
    return [{ source: '/health', destination: '/api/health', permanent: false }];
  },
};
