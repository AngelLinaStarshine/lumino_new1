import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { canJoinClass, fmtClassTime } from '@/lib/utils';
import { firstName } from '@/lib/curriculum';

function profileRow(row: unknown): { full_name?: string; updated_at?: string } | null {
  if (!row) return null;
  if (Array.isArray(row)) return row[0] ?? null;
  return row as { full_name?: string; updated_at?: string };
}

import { joinRow } from '@/lib/utils';

export default async function EducatorDashboard() {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  const admin = createAdminClient();
  const now = new Date();
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date(now);
  todayEnd.setHours(23, 59, 59, 999);

  const { data: nextClass } = await admin
    .from('live_classes')
    .select('*, subjects(name), student:profiles!live_classes_student_id_fkey(full_name)')
    .eq('educator_id', user.id)
    .gte('scheduled_at', now.toISOString())
    .order('scheduled_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  const { data: todayClasses } = await admin
    .from('live_classes')
    .select('student_id, subjects(name), student:profiles!live_classes_student_id_fkey(full_name, date_of_birth)')
    .eq('educator_id', user.id)
    .gte('scheduled_at', todayStart.toISOString())
    .lte('scheduled_at', todayEnd.toISOString());

  const studentIds = [...new Set((todayClasses ?? []).map((c) => c.student_id))];

  const { data: roster } = await admin
    .from('educator_students')
    .select('student_id, student:profiles!educator_students_student_id_fkey(full_name, updated_at)')
    .eq('educator_id', user.id);

  const inactive = (roster ?? []).filter((r) => {
    const student = profileRow(r.student);
    const updated = student?.updated_at ? new Date(student.updated_at) : null;
    if (!updated) return true;
    return Date.now() - updated.getTime() > 5 * 24 * 60 * 60 * 1000;
  });

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-display">Educator dashboard</h1>
      </header>

      <Card>
        <CardHeader><CardTitle className="text-base">Your next class</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {nextClass ? (
            <>
              <p className="font-medium">
                {(nextClass.student as { full_name?: string })?.full_name ?? nextClass.group_name ?? 'Group'}
              </p>
              <div className="flex gap-2">
                <Badge>{nextClass.subjects?.name}</Badge>
                <Badge variant="outline">{nextClass.format}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{fmtClassTime(nextClass.scheduled_at)}</p>
              {nextClass.join_url && canJoinClass(nextClass.scheduled_at) ? (
                <Button asChild><a href={nextClass.join_url}>Start class</a></Button>
              ) : (
                <Button disabled>Start class (10 min before)</Button>
              )}
            </>
          ) : (
            <p className="text-muted-foreground text-sm">No upcoming classes.</p>
          )}
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
              {(todayClasses ?? []).map((c: {
                student_id: string;
                subjects?: { name?: string } | { name?: string }[];
                student?: { full_name?: string } | { full_name?: string }[];
              }, i) => (
                <TableRow key={i}>
                  <TableCell>{profileRow(c.student)?.full_name}</TableCell>
                  <TableCell>{joinRow<{ name?: string }>(c.subjects)?.name}</TableCell>
                  <TableCell>
                    <Link href={`/educator/students/${c.student_id}`} className="text-brand-teal text-sm hover:underline">
                      View student
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
              {!todayClasses?.length && (
                <TableRow>
                  <TableCell colSpan={3} className="text-muted-foreground">No classes today.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </section>

      <Card>
        <CardHeader><CardTitle className="text-base">Attention needed</CardTitle></CardHeader>
        <CardContent className="text-sm space-y-2">
          {inactive.length ? (
            inactive.map((r) => (
              <p key={r.student_id}>
                {profileRow(r.student)?.full_name} — no login for 5+ days
              </p>
            ))
          ) : (
            <p className="text-muted-foreground">All students recently active.</p>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-wrap gap-3">
        <Button asChild><Link href="/educator/assign">Assign practice</Link></Button>
        <Button asChild variant="secondary"><Link href="/educator/schedule">Schedule a class</Link></Button>
        <Button asChild variant="secondary"><Link href="/educator/messages">Send a message</Link></Button>
      </div>
    </div>
  );
}
