import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { SmsPreferences } from '@/components/parent/SmsPreferences';

export default async function FamilySettingsPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name, avatar_url, phone')
    .eq('id', user!.id)
    .single();

  const { data: prefs } = await supabase
    .from('notification_prefs')
    .select('*')
    .eq('user_id', user!.id)
    .single();

  return (
    <main className="space-y-6 p-6 max-w-2xl">
      <Topbar
        greeting="Family settings"
        subtitle="SMS and notification preferences for this student account"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />
      <SmsPreferences
        prefs={
          prefs ?? {
            user_id: user!.id,
            sms_homework: false,
            sms_class: false,
            sms_payment: true,
            sms_feedback: false,
            email_homework: true,
            email_class: true,
            email_payment: true,
            email_feedback: true,
            phone_verified: false,
            opted_in_at: null,
            updated_at: new Date().toISOString(),
          }
        }
        phone={profile?.phone ?? null}
      />
    </main>
  );
}
