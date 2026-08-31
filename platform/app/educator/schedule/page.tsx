import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fmtClassTime } from '@/lib/utils';

export default async function EducatorSchedulePage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const start = new Date();
  start.setDate(start.getDate() - start.getDay());
  const end = new Date(start);
  end.setDate(end.getDate() + 7);

  const { data: classes } = await admin
    .from('live_classes')
    .select('*, subjects(name), student:profiles!live_classes_student_id_fkey(full_name)')
    .eq('educator_id', user.id)
    .gte('scheduled_at', start.toISOString())
    .lte('scheduled_at', end.toISOString())
    .order('scheduled_at', { ascending: true });

  const { data: pending } = await admin
    .from('reschedule_requests')
    .select('*, live_classes(scheduled_at, student:profiles!live_classes_student_id_fkey(full_name))')
    .eq('status', 'pending');

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-display">Schedule</h1>

      {pending?.length ? (
        <section>
          <h2 className="text-lg font-medium mb-2">Reschedule requests</h2>
          <div className="space-y-2">
            {pending.map((r) => (
              <Card key={r.id}>
                <CardContent className="p-4 flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium">
                      {(r.live_classes as { student?: { full_name?: string } })?.student?.full_name}
                    </p>
                    <p className="text-sm text-muted-foreground">{r.reason}</p>
                  </div>
                  <form action="/api/educator/reschedule" method="post">
                    <input type="hidden" name="requestId" value={r.id} />
                    <input type="hidden" name="action" value="approve" />
                    <Button type="submit" size="sm">Approve</Button>
                  </form>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      <section className="space-y-2">
        {(classes ?? []).map((c) => (
          <Card key={c.id}>
            <CardContent className="p-4 flex flex-wrap gap-2 items-center">
              <Badge>{c.subjects?.name}</Badge>
              <span className="text-sm">{(c.student as { full_name?: string })?.full_name}</span>
              <span className="text-sm text-muted-foreground">{fmtClassTime(c.scheduled_at)}</span>
            </CardContent>
          </Card>
        ))}
      </section>
    </div>
  );
}
