import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from '@/lib/admin-auth';

export default async function AdminProtectedLayout({ children }: { children: React.ReactNode }) {
  const hasSession = verifyAdminSession(cookies().get(ADMIN_SESSION_COOKIE)?.value);

  if (!hasSession) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) {
      const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
      if (profile?.role !== 'admin') {
        redirect('/admin/login');
      }
    } else {
      redirect('/admin/login');
    }
  }

  return children;
}
