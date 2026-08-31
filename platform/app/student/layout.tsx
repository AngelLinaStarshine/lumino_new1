import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { StudentShell } from '@/components/shells/StudentShell';
import { FAMILY_PASSCODE_COOKIE, isFamilyViewVerified } from '@/lib/parent-mode';

export default async function StudentLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, account_status')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'student') redirect(`/${profile?.role === 'teacher' ? 'educator' : profile?.role ?? 'login'}`);

  if (profile.account_status === 'pending_parent_verification') {
    redirect('/login?pending=parent');
  }

  const familyViewUnlocked = isFamilyViewVerified(
    cookies().get(FAMILY_PASSCODE_COOKIE)?.value,
    user.id
  );

  if (familyViewUnlocked && !children) {
    /* family routes keep old layout */
  }

  return <StudentShell userName={profile.full_name}>{children}</StudentShell>;
}
