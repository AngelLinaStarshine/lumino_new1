import Link from 'next/link';
import { EducatorShell } from '@/components/shells/EducatorShell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fmtClassTime } from '@/lib/utils';

const MOCK = {
  nextClass: {
    student: 'Alex Rivera',
    subject: 'AI',
    format: 'online',
    scheduled_at: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
  },
  todayRoster: [
    { id: 's1', name: 'Alex Rivera', subject: 'AI' },
    { id: 's2', name: 'Sam Okonkwo', subject: 'Cybersecurity' },
    { id: 's3', name: 'Maya Patel', subject: 'Math + Physics' },
  ],
  inactive: [{ name: 'Jordan Lee' }],
};

/** Public demo — educator dashboard (no login required). /teacher redirects to /educator in production. */
export default function EducatorAccountPreview() {
  const { nextClass, todayRoster, inactive } = MOCK;

  return (
    <EducatorShell userName="Jordan Kim">
      <div className="bg-brand-mint/20 border-b border-brand-mint/40 px-4 py-2 text-xs text-brand-teal font-medium text-center">
        Preview mode — sample educator dashboard (demo data, no login required)
      </div>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        <header>
          <h1 className="text-2xl font-display">Educator dashboard</h1>
        </header>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Your next class</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <p className="font-medium">{nextClass.student}</p>
            <div className="flex gap-2">
              <Badge>{nextClass.subject}</Badge>
              <Badge variant="outline">{nextClass.format}</Badge>
            </div>
            <p className="text-sm text-muted-foreground">{fmtClassTime(nextClass.scheduled_at)}</p>
            <Button disabled>Start class (10 min before)</Button>
          </CardContent>
        </Card>

        <section>
          <h2 className="text-lg font-display mb-3">Today&apos;s roster</h2>
          <div className="border rounded-xl overflow-hidden bg-white/90">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Student</TableHead>
                  <TableHead>Subject</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {todayRoster.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.subject}</TableCell>
                    <TableCell>
                      <Link href="/preview/teacher/students" className="text-brand-teal text-sm hover:underline">
                        View student
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </section>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Attention needed</CardTitle>
          </CardHeader>
          <CardContent className="text-sm space-y-2">
            {inactive.map((s) => (
              <p key={s.name}>{s.name} — no login for 5+ days</p>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link href="/preview/teacher">Assign practice</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/preview/teacher">Schedule a class</Link>
          </Button>
          <Button asChild variant="secondary">
            <Link href="/preview/teacher">Send a message</Link>
          </Button>
        </div>
      </div>
    </EducatorShell>
  );
}
