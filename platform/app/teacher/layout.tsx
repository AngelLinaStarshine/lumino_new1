import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { NavSidebar } from '@/components/shared/NavSidebar';

export default async function TeacherLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || (profile.role !== 'teacher' && profile.role !== 'admin')) {
    redirect(`/${profile?.role ?? 'login'}`);
  }

  return (
    <div className="flex min-h-screen">
      <NavSidebar role="teacher" userName={profile.full_name} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
