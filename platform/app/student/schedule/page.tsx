import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fmtClassTime } from '@/lib/utils';
import { RescheduleForm } from '@/components/student/RescheduleForm';

export default async function StudentSchedulePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const start = new Date();
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 14);

  const { data: classes } = await admin
    .from('live_classes')
    .select('*, subjects(name), educator:profiles!live_classes_educator_id_fkey(full_name)')
    .eq('student_id', user.id)
    .gte('scheduled_at', start.toISOString())
    .lte('scheduled_at', end.toISOString())
    .order('scheduled_at', { ascending: true });

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-display">Your schedule</h1>
        <p className="text-muted-foreground">Upcoming live classes for the next two weeks.</p>
      </header>

      <div className="space-y-3">
        {(classes ?? []).map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4 space-y-2">
              <div className="flex flex-wrap gap-2">
                <Badge>{c.subjects?.name}</Badge>
                <Badge variant="outline">{c.format?.replace('_', ' ')}</Badge>
              </div>
              <p className="font-medium">{fmtClassTime(c.scheduled_at)}</p>
              <p className="text-sm text-muted-foreground">
                {(c.educator as { full_name?: string })?.full_name ?? 'Educator'}
              </p>
              {c.status === 'reschedule_pending' ? (
                <p className="text-sm text-brand-accent">Reschedule request pending educator approval</p>
              ) : (
                <RescheduleForm classId={c.id} />
              )}
            </CardContent>
          </Card>
        ))}
        {!classes?.length && (
          <Card>
            <CardContent className="p-6 text-muted-foreground">No classes in this window.</CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
