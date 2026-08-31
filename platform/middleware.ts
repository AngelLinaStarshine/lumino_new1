/* ─────────────────────────────────────────────────────────────
   Auth + role-based route protection
   ───────────────────────────────────────────────────────────── */

import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) { return request.cookies.get(name)?.value; },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({ name, value, ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value, ...options });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({ name, value: '', ...options });
          response = NextResponse.next({ request: { headers: request.headers } });
          response.cookies.set({ name, value: '', ...options });
        },
      },
    }
  );

  const { pathname } = request.nextUrl;

  /* Legacy educator paths */
  if (pathname.startsWith('/teacher')) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.replace(/^\/teacher/, '/educator');
    return NextResponse.redirect(url);
  }

  /* Health is public */
  if (pathname === '/api/health' || pathname === '/health') {
    return response;
  }

  /* Admin login + session API are public */
  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/admin/session')) {
    return response;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    if (!user) return NextResponse.redirect(new URL('/admin/login', request.url));
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role !== 'admin') {
      if (profile?.role === 'teacher') {
        return new NextResponse('Forbidden', { status: 403 });
      }
      return NextResponse.redirect(new URL('/login', request.url));
    }
    return response;
  }

  const publicPaths = [
    '/login', '/signup', '/', '/preview', '/auth/callback', '/auth/parent-consent',
    '/forgot-password', '/api/stripe/webhook', '/api/auth/signup', '/api/auth/signup-config',
    '/api/auth/signin', '/api/auth/parent-consent', '/admin/login', '/api/admin/session',
  ];
  if (publicPaths.some((p) => pathname.startsWith(p))) return response;

  if (pathname.startsWith('/api/cron/')) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return response;
  }

  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, account_status')
    .eq('id', user.id)
    .single();

  if (!profile) return NextResponse.redirect(new URL('/login', request.url));

  if (profile.account_status === 'pending_parent_verification' && !pathname.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/login?pending=parent', request.url));
  }

  const role = profile.role;
  const dashboard = role === 'teacher' ? '/educator' : `/${role}`;

  if (pathname.startsWith('/student') && role !== 'student') {
    return NextResponse.redirect(new URL(dashboard, request.url));
  }

  if (pathname.startsWith('/educator')) {
    if (role === 'admin') return response;
    if (role !== 'teacher') {
      if (role === 'student') return NextResponse.redirect(new URL('/student', request.url));
      return NextResponse.redirect(new URL(dashboard, request.url));
    }
  }

  if (role === 'parent' && !pathname.startsWith('/student/family')) {
    return NextResponse.redirect(new URL('/student/family/unlock', request.url));
  }

  if (pathname.startsWith('/parent')) {
    return NextResponse.redirect(new URL('/student/family/unlock', request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
