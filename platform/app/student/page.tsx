import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { CURRICULUM_SUBJECTS, firstName } from '@/lib/curriculum';
import { canJoinClass, fmtClassTime } from '@/lib/utils';
import { getStudentContext } from '@/lib/student/queries';

export default async function StudentDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const { profile, enrolments, assignments, nextClass, notes } = await getStudentContext(user.id);
  const name = firstName(profile?.first_name ?? profile?.full_name ?? 'Student');

  return (
    <div className="p-4 md:p-8 max-w-3xl mx-auto space-y-8">
      <header>
        <h1 className="text-2xl md:text-3xl font-display">Welcome back, {name}</h1>
        <p className="text-muted-foreground mt-1">Here is what is on your plate today.</p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your next live class</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {nextClass ? (
            <>
              <p className="text-sm text-muted-foreground">{fmtClassTime(nextClass.scheduled_at)}</p>
              <div className="flex flex-wrap gap-2 items-center">
                <Badge>{nextClass.subjects?.name ?? 'Class'}</Badge>
                <Badge variant="outline">{nextClass.format?.replace('_', ' ')}</Badge>
              </div>
              <p className="text-sm">
                With {(nextClass.educator as { full_name?: string })?.full_name ?? 'your educator'}
              </p>
              {nextClass.join_url ? (
                canJoinClass(nextClass.scheduled_at) ? (
                  <Button asChild size="lg" className="min-h-12">
                    <a href={nextClass.join_url} target="_blank" rel="noopener noreferrer">
                      Join class
                    </a>
                  </Button>
                ) : (
                  <Button size="lg" className="min-h-12" disabled>
                    Join class (opens 10 min before)
                  </Button>
                )
              ) : (
                <Button size="lg" disabled className="min-h-12">
                  Join link coming soon
                </Button>
              )}
            </>
          ) : (
            <p className="text-muted-foreground">No upcoming classes scheduled yet.</p>
          )}
        </CardContent>
      </Card>

      <section>
        <h2 className="text-xl font-display mb-4">Today&apos;s practice</h2>
        <div className="space-y-3">
          {assignments.length ? (
            assignments.map((task) => (
              <Card key={task.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <Badge className="mb-2">{task.subject}</Badge>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">About {task.minutes} min</p>
                  </div>
                  <Button asChild size="lg" className="min-h-12 shrink-0">
                    <Link href={`/student/practice/${task.taskId}`}>Start</Link>
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="p-6 text-muted-foreground">No practice assigned for today. Check back soon!</CardContent>
            </Card>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-display mb-4">Your progress</h2>
        <div className="space-y-4">
          {enrolments.length ? (
            enrolments.map((e) => {
              const meta = CURRICULUM_SUBJECTS[e.subjectSlug as keyof typeof CURRICULUM_SUBJECTS];
              return (
                <div key={e.id} className="rounded-xl border border-black/10 bg-white/90 p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{e.subjectName}</span>
                    <span className="text-muted-foreground">{e.tierLabel}</span>
                  </div>
                  <ProgressBar value={e.mastery_pct ?? 0} indicatorClassName={meta?.barColor} />
                  <p className="text-xs text-muted-foreground mt-1">{e.mastery_pct ?? 0}% mastery in this tier</p>
                </div>
              );
            })
          ) : (
            <p className="text-muted-foreground text-sm">Your educator will enroll you in subjects soon.</p>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-display mb-4">Recent notes from your educator</h2>
        <div className="space-y-2">
          {notes.length ? (
            notes.map((n, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-sm">
                  <p>{n.body}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {(n.educator as { full_name?: string })?.full_name} ·{' '}
                    {new Date(n.created_at).toLocaleDateString('en-CA')}
                  </p>
                </CardContent>
              </Card>
            ))
          ) : (
            <p className="text-muted-foreground text-sm">No notes yet.</p>
          )}
        </div>
      </section>
    </div>
  );
}
