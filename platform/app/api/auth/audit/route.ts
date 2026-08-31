import { NextResponse } from 'next/server';
import { writeAuditLog } from '@/lib/audit';

/** Lightweight audit endpoint for client-triggered auth events (no PII). */
export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const { action, userId, ...metadata } = body as { action: string; userId?: string };
  if (!action) return NextResponse.json({ error: 'action required' }, { status: 400 });
  await writeAuditLog({ userId: userId ?? null, action, metadata });
  return NextResponse.json({ ok: true });
}
