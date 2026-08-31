import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { TIER_LABELS, ageFromDob } from '@/lib/curriculum';
import { ProfileSettings } from '@/components/student/ProfileSettings';

export default async function StudentProfilePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const admin = createAdminClient();
  const { data: enrolments } = await admin
    .from('subject_enrolments')
    .select('*, subjects(name), levels(tier, name)')
    .eq('student_id', user.id);

  const age = profile?.date_of_birth ? ageFromDob(profile.date_of_birth) : null;
  const ageBand =
    age === null ? 'Not set' : age <= 11 ? '9 to 11' : age <= 14 ? '12 to 14' : '15 to 17';

  return (
    <div className="p-4 md:p-8 max-w-2xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-display">Your profile</h1>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">About you</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p><span className="text-muted-foreground">Display name:</span> {profile?.full_name}</p>
          <p><span className="text-muted-foreground">Age band:</span> {ageBand}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Subjects & levels</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {(enrolments ?? []).map((e) => (
            <div key={e.id} className="flex flex-wrap items-center gap-2">
              <Badge>{e.subjects?.name}</Badge>
              <span className="text-sm text-muted-foreground">
                {TIER_LABELS[e.levels?.tier as keyof typeof TIER_LABELS] ?? e.levels?.name}
              </span>
            </div>
          ))}
          {!enrolments?.length && <p className="text-muted-foreground text-sm">Not enrolled yet.</p>}
        </CardContent>
      </Card>

      <ProfileSettings highContrast={profile?.high_contrast ?? false} userId={user.id} />
    </div>
  );
}
