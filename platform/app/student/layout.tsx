import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { StudentNavSidebar } from '@/components/student/StudentNavSidebar';
import { FAMILY_PASSCODE_COOKIE, isFamilyViewVerified } from '@/lib/parent-mode';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'student') redirect(`/${profile?.role ?? 'login'}`);

  const familyViewUnlocked = isFamilyViewVerified(
    cookies().get(FAMILY_PASSCODE_COOKIE)?.value,
    user.id
  );

  return (
    <div className="flex min-h-screen">
      <StudentNavSidebar userName={profile.full_name} familyViewUnlocked={familyViewUnlocked} />
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}
