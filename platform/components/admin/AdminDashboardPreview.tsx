'use client';

import { useState } from 'react';
import { AdminShell, type AdminTab } from '@/components/shells/AdminShell';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { cn, fmtCAD, fmtClassTime } from '@/lib/utils';

const MOCK = {
  stats: { students: 42, teachers: 8, pendingPayments: 5, activeGroups: 3 },
  users: [
    { id: '1', full_name: 'Alex Rivera', email: 'alex@example.com', role: 'student' },
    { id: '2', full_name: 'Jordan Kim', email: 'jordan@luminolearn.ca', role: 'teacher' },
    { id: '3', full_name: 'Maya Patel', email: 'maya@example.com', role: 'student' },
    { id: '4', full_name: 'Sam Okonkwo', email: 'sam@example.com', role: 'student' },
  ],
  assignments: [
    { student: 'Alex Rivera', educator: 'Jordan Kim', subject: 'AI' },
    { student: 'Maya Patel', educator: 'Jordan Kim', subject: 'Math' },
  ],
  groups: [
    { name: 'Cybersecurity Cohort A', educator: 'Jordan Kim', members: 4, format: 'group' },
    { name: 'Physics Lab — GTA', educator: 'Priya Sharma', members: 6, format: 'in_person' },
  ],
  classes: [
    { student: 'Alex Rivera', educator: 'Jordan Kim', subject: 'AI', format: 'online', scheduled_at: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString() },
    { student: 'Group: Cyber A', educator: 'Jordan Kim', subject: 'Cybersecurity', format: 'group', scheduled_at: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString() },
  ],
  payments: [
    { student: 'Alex Rivera', amount_cents: 14900, status: 'pending', method: null, period: '2026-09' },
    { student: 'Maya Patel', amount_cents: 14900, status: 'paid', method: 'stripe', period: '2026-08' },
    { student: 'Sam Okonkwo', amount_cents: 14900, status: 'paid', method: 'offline', period: '2026-08' },
  ],
  invites: [
    { role: 'student', email: 'new.family@example.com', used_at: null, note: 'Fall intake' },
    { role: 'teacher', email: null, used_at: '2026-08-20', note: 'Educator onboarding' },
  ],
};

/** Public demo — admin dashboard (no login required). */
export function AdminDashboardPreview() {
  const [tab, setTab] = useState<AdminTab>('overview');
  const { stats, users, assignments, groups, classes, payments, invites } = MOCK;

  return (
    <AdminShell userName="Preview Admin" activeTab={tab} onTabChange={setTab}>
      <div className="bg-brand-mint/20 border-b border-brand-mint/40 px-4 py-2 text-xs text-brand-teal font-medium text-center">
        Preview mode — sample admin dashboard (demo data, no login required)
      </div>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {tab === 'overview' && (
          <>
            <h1 className="text-2xl font-display">Admin overview</h1>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: 'Students', value: stats.students },
                { label: 'Educators', value: stats.teachers },
                { label: 'Pending payments', value: stats.pendingPayments },
                { label: 'Active groups', value: stats.activeGroups },
              ].map(({ label, value }) => (
                <Card key={label}>
                  <CardContent className="p-4 text-center">
                    <p className="text-2xl font-display">{value}</p>
                    <p className="text-xs text-muted-foreground">{label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card>
              <CardHeader><CardTitle>Recent users</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {users.map((u) => (
                  <div key={u.id} className="flex justify-between items-center border rounded-lg p-3 text-sm bg-white/80">
                    <div>
                      <p className="font-medium">{u.full_name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <Badge variant="outline">{u.role === 'teacher' ? 'educator' : u.role}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </>
        )}

        {tab === 'users' && (
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Add student or educator</CardTitle>
                <CardDescription>Create accounts directly. Share credentials with the family or educator.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  {(['student', 'teacher', 'admin'] as const).map((r) => (
                    <button key={r} type="button" className={cn('flex-1 border rounded-lg p-2 text-sm capitalize', r === 'student' && 'border-brand-teal bg-brand-mint/20')}>
                      {r === 'teacher' ? 'educator' : r}
                    </button>
                  ))}
                </div>
                <Input placeholder="Full name" defaultValue="New Student" disabled />
                <Input placeholder="Email" defaultValue="student@example.com" disabled />
                <Input placeholder="Password (min 8)" defaultValue="••••••••" disabled />
                <Button disabled>Create account</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Modify user</CardTitle>
                <CardDescription>Update name, status, or subject enrolment.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                {users.map((u) => (
                  <div key={u.id} className="flex justify-between items-center border rounded-lg p-3 text-sm bg-white/80">
                    <span>{u.full_name}</span>
                    <Badge variant="outline">{u.role}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'assignments' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Assignments</h1>
            <Card>
              <CardHeader><CardTitle>Assign student to educator (1:1)</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-3">
                <Input placeholder="Student" defaultValue="Alex Rivera" disabled />
                <Input placeholder="Educator" defaultValue="Jordan Kim" disabled />
                <Button disabled>Assign</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Current assignments</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Educator</TableHead>
                      <TableHead>Subject</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {assignments.map((a, i) => (
                      <TableRow key={i}>
                        <TableCell>{a.student}</TableCell>
                        <TableCell>{a.educator}</TableCell>
                        <TableCell>{a.subject}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Groups</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {groups.map((g) => (
                  <div key={g.name} className="flex justify-between items-center border rounded-lg p-3 text-sm bg-white/80">
                    <div>
                      <p className="font-medium">{g.name}</p>
                      <p className="text-xs text-muted-foreground">{g.educator} · {g.members} members</p>
                    </div>
                    <Badge variant="outline">{g.format}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'classes' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Classes</h1>
            <Card>
              <CardHeader><CardTitle>Schedule class</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-3">
                <Input placeholder="Student or group" disabled />
                <Input placeholder="Educator" defaultValue="Jordan Kim" disabled />
                <Input type="datetime-local" disabled />
                <div className="flex gap-2">
                  {(['online', 'in_person', 'group'] as const).map((f) => (
                    <Badge key={f} variant={f === 'online' ? 'default' : 'outline'}>{f}</Badge>
                  ))}
                </div>
                <Button disabled className="sm:col-span-2">Schedule class</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Upcoming classes</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {classes.map((c, i) => (
                  <div key={i} className="border rounded-lg p-3 text-sm bg-white/80 flex justify-between items-center">
                    <div>
                      <p className="font-medium">{c.student}</p>
                      <p className="text-xs text-muted-foreground">{c.educator} · {c.subject}</p>
                      <p className="text-xs text-muted-foreground">{fmtClassTime(c.scheduled_at)}</p>
                    </div>
                    <Badge variant="outline">{c.format}</Badge>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'payments' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Payments</h1>
            <div className="grid sm:grid-cols-2 gap-3">
              <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Pending</p><p className="text-xl font-display">{fmtCAD(14900)}</p></CardContent></Card>
              <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Collected (Aug)</p><p className="text-xl font-display">{fmtCAD(29800)}</p></CardContent></Card>
            </div>
            <Card>
              <CardHeader><CardTitle>Record offline payment</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-3">
                <Input placeholder="Student" defaultValue="Alex Rivera" disabled />
                <Input placeholder="Amount" defaultValue="$149.00" disabled />
                <Button disabled>Record payment</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Payment records</CardTitle></CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Period</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Method</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((p, i) => (
                      <TableRow key={i}>
                        <TableCell>{p.student}</TableCell>
                        <TableCell>{p.period}</TableCell>
                        <TableCell>{fmtCAD(p.amount_cents)}</TableCell>
                        <TableCell>{p.method ?? '—'}</TableCell>
                        <TableCell><Badge variant={p.status === 'paid' ? 'default' : 'outline'}>{p.status}</Badge></TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'invites' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Invites</h1>
            <Card>
              <CardHeader><CardTitle>Generate invite code</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-2">
                  <button type="button" className="flex-1 border rounded-lg p-2 text-sm border-brand-teal bg-brand-mint/20">student</button>
                  <button type="button" className="flex-1 border rounded-lg p-2 text-sm">educator</button>
                </div>
                <Input placeholder="Lock to email (optional)" disabled />
                <Button disabled>Generate invite</Button>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Invite history</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {invites.map((inv, i) => (
                  <div key={i} className="border rounded-lg p-3 text-sm bg-white/80">
                    {inv.role} · {inv.used_at ? 'used' : 'pending'} · {inv.email ?? 'any email'}
                    {inv.note && <span className="text-muted-foreground"> · {inv.note}</span>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
