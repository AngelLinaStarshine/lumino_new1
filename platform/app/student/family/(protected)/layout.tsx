import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/lib/supabase/server';
import { FAMILY_PASSCODE_COOKIE, isFamilyViewVerified } from '@/lib/parent-mode';

export default async function FamilyLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const verified = isFamilyViewVerified(
    cookies().get(FAMILY_PASSCODE_COOKIE)?.value,
    user.id
  );

  if (!verified) {
    redirect('/student/family/unlock');
  }

  return <>{children}</>;
}
