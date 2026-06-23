/* ─────────────────────────────────────────────────────────────
   Auth + role-based route protection
   Runs on every request before page loads
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

  const { data: { user } } = await supabase.auth.getUser();
  const { pathname } = request.nextUrl;

  /* Admin routes use ADMIN_SECRET / admin role — not student/teacher session */
  if (pathname.startsWith('/admin') || pathname.startsWith('/api/admin')) {
    return response;
  }

  /* Public routes */
  const publicPaths = ['/login', '/signup', '/', '/preview', '/auth/callback', '/api/stripe/webhook', '/api/auth/signup', '/api/auth/signup-config', '/admin/login', '/api/admin/session'];
  if (publicPaths.some((p) => pathname.startsWith(p))) return response;

  /* Cron routes — verify secret */
  if (pathname.startsWith('/api/cron/')) {
    const auth = request.headers.get('authorization');
    if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    return response;
  }

  /* Require auth for everything else */
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  /* Role-based protection */
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile) return NextResponse.redirect(new URL('/login', request.url));

  if (profile.role === 'parent') {
    return NextResponse.redirect(new URL('/student/family/unlock', request.url));
  }

  if (pathname.startsWith('/parent')) {
    if (pathname.startsWith('/parent/payments')) {
      return NextResponse.redirect(new URL('/student/family/payments', request.url));
    }
    if (pathname.startsWith('/parent/settings')) {
      return NextResponse.redirect(new URL('/student/family/settings', request.url));
    }
    return NextResponse.redirect(new URL('/student/family/unlock', request.url));
  }

  if (pathname.startsWith('/student') && profile.role !== 'student') {
    return NextResponse.redirect(new URL(`/${profile.role}`, request.url));
  }
  if (pathname.startsWith('/teacher') && profile.role !== 'teacher' && profile.role !== 'admin') {
    return NextResponse.redirect(new URL(`/${profile.role}`, request.url));
  }

  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'],
};
