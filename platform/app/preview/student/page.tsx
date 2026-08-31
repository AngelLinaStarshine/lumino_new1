import Link from 'next/link';
import { StudentShell } from '@/components/shells/StudentShell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ProgressBar } from '@/components/ui/progress';
import { CURRICULUM_SUBJECTS } from '@/lib/curriculum';
import { fmtClassTime } from '@/lib/utils';

const MOCK = {
  name: 'Alex',
  nextClass: {
    scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    subject: 'AI',
    format: 'online',
    educator: 'Ms. Chen',
  },
  assignments: [
    { id: 'a1', taskId: 'demo-1', title: 'What is machine learning?', subject: 'AI', minutes: 8 },
    { id: 'a2', taskId: 'demo-2', title: 'Spot the phishing email', subject: 'Cybersecurity', minutes: 10 },
  ],
  enrolments: [
    { id: 'e1', subjectName: 'AI', subjectSlug: 'ai', tierLabel: 'Building', mastery_pct: 62 },
    { id: 'e2', subjectName: 'Cybersecurity', subjectSlug: 'cybersecurity', tierLabel: 'Foundations', mastery_pct: 45 },
    { id: 'e3', subjectName: 'Math + Physics', subjectSlug: 'math_physics', tierLabel: 'Building', mastery_pct: 71 },
  ],
  notes: [
    { body: 'Great work on last week\'s practice. Focus on the inference questions this week.', educator: 'Ms. Chen', created_at: new Date(Date.now() - 2 * 86400000).toISOString() },
  ],
};

/** Public demo — new student dashboard (no login required) */
export default function StudentAccountPreview() {
  const { name, nextClass, assignments, enrolments, notes } = MOCK;

  return (
    <StudentShell userName="Alex Rivera">
      <div className="bg-brand-mint/20 border-b border-brand-mint/40 px-4 py-2 text-xs text-brand-teal font-medium text-center">
        Preview mode — sample student dashboard (demo data, no login required)
      </div>
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
            <p className="text-sm text-muted-foreground">{fmtClassTime(nextClass.scheduled_at)}</p>
            <div className="flex flex-wrap gap-2 items-center">
              <Badge>{nextClass.subject}</Badge>
              <Badge variant="outline">{nextClass.format}</Badge>
            </div>
            <p className="text-sm">With {nextClass.educator}</p>
            <Button size="lg" className="min-h-12" disabled>
              Join class (opens 10 min before)
            </Button>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-xl font-display mb-4">Today&apos;s practice</h2>
          <div className="space-y-3">
            {assignments.map((task) => (
              <Card key={task.id} className="hover:shadow-card transition-shadow">
                <CardContent className="p-4 flex flex-col sm:flex-row sm:items-center gap-4">
                  <div className="flex-1">
                    <Badge className="mb-2">{task.subject}</Badge>
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">About {task.minutes} min</p>
                  </div>
                  <Button asChild size="lg" className="min-h-12 shrink-0">
                    <Link href="/preview/student">Start</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display mb-4">Your progress</h2>
          <div className="space-y-4">
            {enrolments.map((e) => {
              const meta = CURRICULUM_SUBJECTS[e.subjectSlug as keyof typeof CURRICULUM_SUBJECTS];
              return (
                <div key={e.id} className="rounded-xl border border-black/10 bg-white/90 p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">{e.subjectName}</span>
                    <span className="text-muted-foreground">{e.tierLabel}</span>
                  </div>
                  <ProgressBar value={e.mastery_pct} indicatorClassName={meta?.barColor} />
                  <p className="text-xs text-muted-foreground mt-1">{e.mastery_pct}% mastery in this tier</p>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-display mb-4">Recent notes from your educator</h2>
          <div className="space-y-2">
            {notes.map((n, i) => (
              <Card key={i}>
                <CardContent className="p-4 text-sm">
                  <p>{n.body}</p>
                  <p className="text-xs text-muted-foreground mt-2">
                    {n.educator} · {new Date(n.created_at).toLocaleDateString('en-CA')}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      </div>
    </StudentShell>
  );
}
