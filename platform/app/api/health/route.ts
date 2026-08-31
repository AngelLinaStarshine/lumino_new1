import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getConfiguredDatabaseRegion, isCanadianDatabaseRegion } from '@/lib/region';

export const dynamic = 'force-dynamic';

export async function GET() {
  const region = getConfiguredDatabaseRegion();
  const regionOk = isCanadianDatabaseRegion(region);

  let dbOk = false;
  try {
    const admin = createAdminClient();
    const { error } = await admin.from('subjects').select('id').limit(1);
    dbOk = !error;
  } catch {
    dbOk = false;
  }

  const healthy = regionOk && dbOk;

  return NextResponse.json(
    {
      status: healthy ? 'ok' : 'degraded',
      database: { connected: dbOk, region, regionCanadian: regionOk },
      timestamp: new Date().toISOString(),
    },
    { status: healthy ? 200 : 503 }
  );
}
