import { createClient } from '@/lib/supabase/server';
import { Topbar } from '@/components/shared/Topbar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ProgressChart } from '@/components/student/ProgressChart';
import Link from 'next/link';

export default async function FamilyOverviewPage() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user!.id)
    .single();

  const { data: assessments } = await supabase
    .from('assessments')
    .select('*')
    .eq('student_id', user!.id)
    .order('taken_at', { ascending: true });

  const { data: enrollments } = await supabase
    .from('enrollments')
    .select('*, courses(name, subject)')
    .eq('student_id', user!.id);

  return (
    <main className="space-y-6 p-6 max-w-5xl">
      <Topbar
        greeting="Family overview"
        subtitle="Read-only progress and account review for parents"
        name={profile?.full_name ?? ''}
        avatar={profile?.avatar_url}
      />

      <div className="rounded-xl border border-brand-accent/25 bg-brand-warm px-4 py-3 text-sm text-brand-navy">
        You are in <strong>parent view</strong>. Homework and classes stay on the student side of the
        account — here you can review progress and manage family settings.
      </div>

      <section>
        <h2 className="text-base font-medium mb-3">{profile?.full_name}&apos;s progress</h2>
        <ProgressChart assessments={assessments ?? []} />
      </section>

      <section>
        <h2 className="text-base font-medium mb-3">Enrolled courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {enrollments?.length ? (
            enrollments.map((e) => (
              <Card key={e.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">{e.courses?.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Badge variant="secondary">Week {e.week_progress}</Badge>
                  <p className="text-xs text-muted-foreground">Status: {e.status}</p>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-8 text-sm text-muted-foreground">
                No enrollments yet.
              </CardContent>
            </Card>
          )}
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Tuition history and downloadable receipts.
            </p>
            <Link href="/student/family/payments" className="text-sm text-primary font-medium hover:underline">
              View payment history →
            </Link>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">SMS notifications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-3">
              Control homework, class, and payment text alerts.
            </p>
            <Link href="/student/family/settings" className="text-sm text-primary font-medium hover:underline">
              Manage preferences →
            </Link>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
