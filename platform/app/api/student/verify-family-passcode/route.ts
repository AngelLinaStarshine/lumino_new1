import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { FAMILY_PASSCODE_COOKIE, FAMILY_PASSCODE_MAX_AGE } from '@/lib/parent-mode';

export async function POST(request: Request) {
  const { passcode } = await request.json();
  if (!passcode || typeof passcode !== 'string') {
    return NextResponse.json({ error: 'Passcode required' }, { status: 400 });
  }

  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (profile?.role !== 'student') {
    return NextResponse.json({ error: 'Family passcode is only for student accounts' }, { status: 403 });
  }

  const { data: link } = await supabase
    .from('family_links')
    .select('passcode_hash')
    .eq('student_id', user.id)
    .maybeSingle();

  if (!link?.passcode_hash) {
    return NextResponse.json({ error: 'No family passcode set for this account. Contact Luminolearn.' }, { status: 404 });
  }

  const valid = await bcrypt.compare(passcode, link.passcode_hash);
  if (!valid) {
    return NextResponse.json({ error: 'Incorrect passcode' }, { status: 401 });
  }

  cookies().set(FAMILY_PASSCODE_COOKIE, user.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: FAMILY_PASSCODE_MAX_AGE,
    path: '/',
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  cookies().delete(FAMILY_PASSCODE_COOKIE);
  return NextResponse.json({ success: true });
}
