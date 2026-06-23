import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';

const PASSCODE_COOKIE = 'parent_passcode_verified';
const MAX_AGE = 60 * 60 * 8;

export async function POST(request: Request) {
  const { passcode } = await request.json();
  if (!passcode || typeof passcode !== 'string') {
    return NextResponse.json({ error: 'Passcode required' }, { status: 400 });
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: links } = await supabase
    .from('family_links')
    .select('passcode_hash')
    .eq('parent_id', user.id);

  if (!links?.length) {
    return NextResponse.json({ error: 'No passcode configured' }, { status: 404 });
  }

  const valid = await Promise.any(
    links.map((link) => bcrypt.compare(passcode, link.passcode_hash))
  ).catch(() => false);

  if (!valid) {
    return NextResponse.json({ error: 'Incorrect passcode' }, { status: 401 });
  }

  cookies().set(PASSCODE_COOKIE, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: MAX_AGE,
    path: '/',
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  cookies().delete(PASSCODE_COOKIE);
  return NextResponse.json({ success: true });
}
