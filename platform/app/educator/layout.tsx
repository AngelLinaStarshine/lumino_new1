import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { EducatorShell } from '@/components/shells/EducatorShell';
import { isEducatorRole } from '@/lib/roles';

export default async function EducatorLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || !isEducatorRole(profile.role)) {
    redirect(profile?.role === 'student' ? '/student' : '/login');
  }

  return <EducatorShell userName={profile.full_name}>{children}</EducatorShell>;
}
