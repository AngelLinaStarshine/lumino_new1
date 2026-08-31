'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AdminShell, type AdminTab } from '@/components/shells/AdminShell';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { cn, fmtCAD } from '@/lib/utils';

function InviteForm({ onCreated }: { onCreated: () => void }) {
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteNote, setInviteNote] = useState('');
  const [lastInvite, setLastInvite] = useState<{ code: string; signupUrl: string } | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/admin/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role, email: inviteEmail || undefined, note: inviteNote || undefined, expiresInDays: 14 }),
    });
    const data = await res.json();
    setLoading(false);
    if (res.ok) {
      setLastInvite({ code: data.code, signupUrl: data.signupUrl });
      setInviteEmail('');
      setInviteNote('');
      onCreated();
    }
  }

  return (
    <form onSubmit={submit} className="space-y-3">
      <div className="flex gap-2">
        {(['student', 'teacher'] as const).map((r) => (
          <button key={r} type="button" onClick={() => setRole(r)} className={cn('flex-1 border rounded-lg p-2 text-sm capitalize', role === r && 'border-brand-teal bg-brand-mint/20')}>
            {r === 'teacher' ? 'educator' : r}
          </button>
        ))}
      </div>
      <Input placeholder="Lock to email (optional)" value={inviteEmail} onChange={(e) => setInviteEmail(e.target.value)} />
      <Input placeholder="Note (optional)" value={inviteNote} onChange={(e) => setInviteNote(e.target.value)} />
      <Button type="submit" disabled={loading}>Generate invite</Button>
      {lastInvite && (
        <div className="text-sm bg-brand-warm p-3 rounded-lg">
          Code: <code className="font-mono">{lastInvite.code}</code>
          <br />
          <a href={lastInvite.signupUrl} className="text-brand-teal underline break-all">{lastInvite.signupUrl}</a>
        </div>
      )}
    </form>
  );
}

type UserRow = {
  id: string;
  role: string;
  full_name: string;
  email: string;
  phone: string | null;
  account_status?: string;
  created_at: string;
};

interface Catalog {
  students: { id: string; full_name: string; email: string }[];
  educators: { id: string; full_name: string; email: string }[];
  subjects: { id: string; name: string }[];
  levels: { id: string; subject_id: string; tier: string; name: string; subjects?: { name: string } }[];
  groups: { id: string; name: string; format: string }[];
}

export function AdminDashboard() {
  const router = useRouter();
  const [tab, setTab] = useState<AdminTab>('overview');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [users, setUsers] = useState<UserRow[]>([]);
  const [stats, setStats] = useState({ students: 0, teachers: 0, pendingPayments: 0, activeGroups: 0 });
  const [catalog, setCatalog] = useState<Catalog | null>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [paymentSummary, setPaymentSummary] = useState({ pending: 0, paid: 0, pendingCents: 0 });
  const [classes, setClasses] = useState<any[]>([]);
  const [groups, setGroups] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [invites, setInvites] = useState<any[]>([]);

  // Create user form
  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [familyPasscode, setFamilyPasscode] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [createdUser, setCreatedUser] = useState<{ email: string; password: string } | null>(null);

  // Assign educator
  const [assignStudentId, setAssignStudentId] = useState('');
  const [assignEducatorId, setAssignEducatorId] = useState('');

  // Group
  const [groupName, setGroupName] = useState('');
  const [groupEducatorId, setGroupEducatorId] = useState('');
  const [groupSubjectId, setGroupSubjectId] = useState('');
  const [groupFormat, setGroupFormat] = useState<'group' | 'online' | 'in_person'>('group');
  const [groupStudentIds, setGroupStudentIds] = useState<string[]>([]);
  const [addToGroupId, setAddToGroupId] = useState('');
  const [addToGroupStudentId, setAddToGroupStudentId] = useState('');

  // Class schedule
  const [classStudentId, setClassStudentId] = useState('');
  const [classEducatorId, setClassEducatorId] = useState('');
  const [classSubjectId, setClassSubjectId] = useState('');
  const [classFormat, setClassFormat] = useState<'online' | 'in_person' | 'group'>('online');
  const [classScheduledAt, setClassScheduledAt] = useState('');
  const [classJoinUrl, setClassJoinUrl] = useState('');
  const [classGroupId, setClassGroupId] = useState('');

  // Payment
  const [payStudentId, setPayStudentId] = useState('');
  const [payAmount, setPayAmount] = useState('');
  const [payDescription, setPayDescription] = useState('Tuition');
  const [payDueDate, setPayDueDate] = useState('');
  const [payMethod, setPayMethod] = useState('interac');

  // Enrolment
  const [enrolStudentId, setEnrolStudentId] = useState('');
  const [enrolSubjectId, setEnrolSubjectId] = useState('');
  const [enrolLevelId, setEnrolLevelId] = useState('');

  // Edit user
  const [editUserId, setEditUserId] = useState('');
  const [editFullName, setEditFullName] = useState('');
  const [editStatus, setEditStatus] = useState('active');

  const loadAll = useCallback(async () => {
    const [usersRes, catalogRes, payRes, classRes, groupRes, assignRes, inviteRes] = await Promise.all([
      fetch('/api/admin/users'),
      fetch('/api/admin/catalog'),
      fetch('/api/admin/payments'),
      fetch('/api/admin/classes'),
      fetch('/api/admin/groups'),
      fetch('/api/admin/assignments'),
      fetch('/api/admin/invites'),
    ]);

    if (usersRes.status === 401) {
      router.push('/admin/login');
      return;
    }

    const usersData = await usersRes.json();
    setUsers(usersData.users ?? []);
    setStats(usersData.stats ?? { students: 0, teachers: 0, pendingPayments: 0, activeGroups: 0 });

    if (catalogRes.ok) setCatalog(await catalogRes.json());
    if (payRes.ok) {
      const d = await payRes.json();
      setPayments(d.payments ?? []);
      setPaymentSummary(d.summary ?? { pending: 0, paid: 0, pendingCents: 0 });
    }
    if (classRes.ok) setClasses((await classRes.json()).classes ?? []);
    if (groupRes.ok) setGroups((await groupRes.json()).groups ?? []);
    if (assignRes.ok) setAssignments((await assignRes.json()).assignments ?? []);
    if (inviteRes.ok) setInvites((await inviteRes.json()).invites ?? []);
  }, [router]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  async function apiPost(url: string, body: object) {
    setError(null);
    setMessage(null);
    setLoading(true);
    const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
    const data = await res.json();
    setLoading(false);
    if (!res.ok) {
      setError(data.error ?? 'Request failed');
      return false;
    }
    setMessage('Saved successfully');
    loadAll();
    return true;
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setCreatedUser(null);
    const ok = await apiPost('/api/admin/users', {
      role,
      fullName,
      email,
      phone: phone || null,
      password,
      familyPasscode: role === 'student' ? familyPasscode : undefined,
      dateOfBirth: role === 'student' ? dateOfBirth : undefined,
    });
    if (ok) {
      setCreatedUser({ email, password });
      setFullName('');
      setEmail('');
      setPhone('');
      setPassword('');
      setFamilyPasscode('');
      setDateOfBirth('');
    }
  }

  async function handleUpdateUser(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const res = await fetch('/api/admin/users', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: editUserId, fullName: editFullName, accountStatus: editStatus }),
    });
    setLoading(false);
    if (res.ok) {
      setMessage('User updated');
      loadAll();
    } else {
      const d = await res.json();
      setError(d.error);
    }
  }

  function selectUserForEdit(u: UserRow) {
    setEditUserId(u.id);
    setEditFullName(u.full_name);
    setEditStatus(u.account_status ?? 'active');
    setTab('users');
  }

  const levelsForSubject = catalog?.levels.filter((l) => l.subject_id === enrolSubjectId) ?? [];

  return (
    <AdminShell userName="Administrator" activeTab={tab} onTabChange={setTab}>
      <div className="p-6 max-w-6xl mx-auto space-y-6">
        {error && <p className="text-sm text-destructive bg-destructive/10 p-3 rounded-lg">{error}</p>}
        {message && <p className="text-sm text-brand-teal bg-brand-mint/20 p-3 rounded-lg">{message}</p>}

        {createdUser && (
          <div className="rounded-xl border border-brand-teal/30 bg-brand-mint/15 p-4 text-sm">
            <p className="font-semibold">Account created — share login details:</p>
            <p>Email: {createdUser.email} · Password: {createdUser.password}</p>
          </div>
        )}

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
              <CardHeader>
                <CardTitle>Recent users</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 max-h-80 overflow-y-auto">
                {users.slice(0, 15).map((u) => (
                  <div key={u.id} className="flex justify-between items-center border rounded-lg p-3 text-sm bg-white/80">
                    <div>
                      <p className="font-medium">{u.full_name}</p>
                      <p className="text-xs text-muted-foreground">{u.email}</p>
                    </div>
                    <Badge variant="outline">{u.role}</Badge>
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
              <CardContent>
                <form onSubmit={handleCreateUser} className="space-y-3">
                  <div className="flex gap-2">
                    {(['student', 'teacher', 'admin'] as const).map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() => setRole(r)}
                        className={cn('flex-1 border rounded-lg p-2 text-sm capitalize', role === r ? 'border-brand-teal bg-brand-mint/20' : '')}
                      >
                        {r === 'teacher' ? 'educator' : r}
                      </button>
                    ))}
                  </div>
                  <Input placeholder="Full name" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
                  <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  <Input placeholder="Phone (optional)" value={phone} onChange={(e) => setPhone(e.target.value)} />
                  {role === 'student' && (
                    <Input type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} />
                  )}
                  <Input placeholder="Password (min 8)" value={password} onChange={(e) => setPassword(e.target.value)} minLength={8} required />
                  {role === 'student' && (
                    <Input placeholder="Family passcode 4-6 digits" inputMode="numeric" value={familyPasscode} onChange={(e) => setFamilyPasscode(e.target.value.replace(/\D/g, ''))} required />
                  )}
                  <Button type="submit" disabled={loading}>Create account</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Modify user</CardTitle>
                <CardDescription>Click a user below to edit, or select from the list.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <form onSubmit={handleUpdateUser} className="space-y-3">
                  <Select value={editUserId} onValueChange={(id) => {
                    const u = users.find((x) => x.id === id);
                    if (u) selectUserForEdit(u);
                  }}>
                    <SelectTrigger><SelectValue placeholder="Select user" /></SelectTrigger>
                    <SelectContent>
                      {users.map((u) => (
                        <SelectItem key={u.id} value={u.id}>{u.full_name} ({u.role})</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input value={editFullName} onChange={(e) => setEditFullName(e.target.value)} placeholder="Full name" />
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="pending_parent_verification">Pending parent verification</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button type="submit" variant="secondary" disabled={!editUserId}>Save changes</Button>
                </form>
                <div className="max-h-48 overflow-y-auto space-y-1">
                  {users.map((u) => (
                    <button key={u.id} type="button" onClick={() => selectUserForEdit(u)} className="w-full text-left text-sm p-2 rounded hover:bg-brand-warm/50">
                      {u.full_name} · {u.role}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {tab === 'assignments' && catalog && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Assignments</h1>

            <Card>
              <CardHeader><CardTitle>Assign student to educator (1:1)</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-3">
                <Select value={assignStudentId} onValueChange={setAssignStudentId}>
                  <SelectTrigger><SelectValue placeholder="Student" /></SelectTrigger>
                  <SelectContent>
                    {catalog.students.map((s) => <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={assignEducatorId} onValueChange={setAssignEducatorId}>
                  <SelectTrigger><SelectValue placeholder="Educator" /></SelectTrigger>
                  <SelectContent>
                    {catalog.educators.map((e) => <SelectItem key={e.id} value={e.id}>{e.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button
                  disabled={!assignStudentId || !assignEducatorId || loading}
                  onClick={() => apiPost('/api/admin/assignments', { studentId: assignStudentId, educatorId: assignEducatorId })}
                >
                  Assign
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Create group & assign students</CardTitle></CardHeader>
              <CardContent className="space-y-3">
                <div className="grid sm:grid-cols-2 gap-3">
                  <Input placeholder="Group name" value={groupName} onChange={(e) => setGroupName(e.target.value)} />
                  <Select value={groupFormat} onValueChange={(v) => setGroupFormat(v as typeof groupFormat)}>
                    <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="group">Small group (online)</SelectItem>
                      <SelectItem value="online">Online</SelectItem>
                      <SelectItem value="in_person">In-person (GTA)</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={groupEducatorId} onValueChange={setGroupEducatorId}>
                    <SelectTrigger><SelectValue placeholder="Educator" /></SelectTrigger>
                    <SelectContent>
                      {catalog.educators.map((e) => <SelectItem key={e.id} value={e.id}>{e.full_name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                  <Select value={groupSubjectId} onValueChange={setGroupSubjectId}>
                    <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
                    <SelectContent>
                      {catalog.subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-wrap gap-2">
                  {catalog.students.map((s) => (
                    <label key={s.id} className="flex items-center gap-1 text-sm border rounded px-2 py-1">
                      <input
                        type="checkbox"
                        checked={groupStudentIds.includes(s.id)}
                        onChange={(e) => {
                          setGroupStudentIds((ids) =>
                            e.target.checked ? [...ids, s.id] : ids.filter((x) => x !== s.id)
                          );
                        }}
                      />
                      {s.full_name}
                    </label>
                  ))}
                </div>
                <Button
                  disabled={!groupName.trim() || loading}
                  onClick={() =>
                    apiPost('/api/admin/groups', {
                      action: 'create_group',
                      name: groupName,
                      educatorId: groupEducatorId || null,
                      subjectId: groupSubjectId || null,
                      format: groupFormat,
                      studentIds: groupStudentIds,
                    }).then((ok) => ok && setGroupName(''))
                  }
                >
                  Create group
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Add student to existing group</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-3 gap-3">
                <Select value={addToGroupId} onValueChange={setAddToGroupId}>
                  <SelectTrigger><SelectValue placeholder="Group" /></SelectTrigger>
                  <SelectContent>
                    {groups.map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={addToGroupStudentId} onValueChange={setAddToGroupStudentId}>
                  <SelectTrigger><SelectValue placeholder="Student" /></SelectTrigger>
                  <SelectContent>
                    {catalog.students.map((s) => <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button
                  disabled={!addToGroupId || !addToGroupStudentId}
                  onClick={() =>
                    apiPost('/api/admin/groups', {
                      action: 'add_to_group',
                      groupId: addToGroupId,
                      studentId: addToGroupStudentId,
                    })
                  }
                >
                  Add to group
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader><CardTitle>Enrol student in subject</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-4 gap-3">
                <Select value={enrolStudentId} onValueChange={setEnrolStudentId}>
                  <SelectTrigger><SelectValue placeholder="Student" /></SelectTrigger>
                  <SelectContent>
                    {catalog.students.map((s) => <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={enrolSubjectId} onValueChange={setEnrolSubjectId}>
                  <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
                  <SelectContent>
                    {catalog.subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={enrolLevelId} onValueChange={setEnrolLevelId}>
                  <SelectTrigger><SelectValue placeholder="Level" /></SelectTrigger>
                  <SelectContent>
                    {levelsForSubject.map((l) => (
                      <SelectItem key={l.id} value={l.id}>{l.tier}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  disabled={!enrolStudentId || !enrolSubjectId}
                  onClick={() =>
                    apiPost('/api/admin/enrolments', {
                      studentId: enrolStudentId,
                      subjectId: enrolSubjectId,
                      levelId: enrolLevelId || null,
                    })
                  }
                >
                  Enrol
                </Button>
              </CardContent>
            </Card>

            <div className="border rounded-xl overflow-hidden bg-white/90">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Educator</TableHead>
                    <TableHead>Assigned</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {assignments.map((a, i) => (
                    <TableRow key={i}>
                      <TableCell>{(a.student as { full_name?: string })?.full_name ?? '—'}</TableCell>
                      <TableCell>{(a.educator as { full_name?: string })?.full_name ?? '—'}</TableCell>
                      <TableCell>{a.assigned_at ? new Date(a.assigned_at).toLocaleDateString('en-CA') : '—'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {tab === 'classes' && catalog && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Schedule classes</h1>
            <Card>
              <CardHeader>
                <CardTitle>Schedule online, in-person, or group class</CardTitle>
              </CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-3">
                <Select value={classStudentId} onValueChange={setClassStudentId}>
                  <SelectTrigger><SelectValue placeholder="Student" /></SelectTrigger>
                  <SelectContent>
                    {catalog.students.map((s) => <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={classEducatorId} onValueChange={setClassEducatorId}>
                  <SelectTrigger><SelectValue placeholder="Educator" /></SelectTrigger>
                  <SelectContent>
                    {catalog.educators.map((e) => <SelectItem key={e.id} value={e.id}>{e.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={classSubjectId} onValueChange={setClassSubjectId}>
                  <SelectTrigger><SelectValue placeholder="Subject" /></SelectTrigger>
                  <SelectContent>
                    {catalog.subjects.map((s) => <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Select value={classFormat} onValueChange={(v) => setClassFormat(v as typeof classFormat)}>
                  <SelectTrigger><SelectValue placeholder="Format" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="online">Online (1:1)</SelectItem>
                    <SelectItem value="in_person">In-person (GTA)</SelectItem>
                    <SelectItem value="group">Group session</SelectItem>
                  </SelectContent>
                </Select>
                <Input type="datetime-local" value={classScheduledAt} onChange={(e) => setClassScheduledAt(e.target.value)} />
                <Input placeholder="Join URL (online)" value={classJoinUrl} onChange={(e) => setClassJoinUrl(e.target.value)} />
                <Select value={classGroupId} onValueChange={setClassGroupId}>
                  <SelectTrigger><SelectValue placeholder="Link to group (optional)" /></SelectTrigger>
                  <SelectContent>
                    {groups.map((g) => <SelectItem key={g.id} value={g.id}>{g.name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Button
                  className="sm:col-span-2"
                  disabled={!classStudentId || !classScheduledAt}
                  onClick={() =>
                    apiPost('/api/admin/classes', {
                      studentId: classStudentId,
                      educatorId: classEducatorId || null,
                      subjectId: classSubjectId || null,
                      format: classFormat,
                      scheduledAt: new Date(classScheduledAt).toISOString(),
                      joinUrl: classJoinUrl || null,
                      groupId: classGroupId || null,
                    })
                  }
                >
                  Schedule class
                </Button>
              </CardContent>
            </Card>
            <div className="border rounded-xl overflow-hidden bg-white/90">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>When</TableHead>
                    <TableHead>Student</TableHead>
                    <TableHead>Format</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {classes.map((c) => (
                    <TableRow key={c.id}>
                      <TableCell>{new Date(c.scheduled_at).toLocaleString('en-CA')}</TableCell>
                      <TableCell>{(c.student as { full_name?: string })?.full_name}</TableCell>
                      <TableCell>{c.format}</TableCell>
                      <TableCell>{c.status}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {tab === 'payments' && catalog && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Payments</h1>
            <div className="grid sm:grid-cols-3 gap-3">
              <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Pending</p><p className="text-xl font-display">{paymentSummary.pending}</p></CardContent></Card>
              <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Paid</p><p className="text-xl font-display">{paymentSummary.paid}</p></CardContent></Card>
              <Card><CardContent className="p-4"><p className="text-xs text-muted-foreground">Outstanding</p><p className="text-xl font-display">{fmtCAD(paymentSummary.pendingCents)}</p></CardContent></Card>
            </div>
            <Card>
              <CardHeader><CardTitle>Record offline payment</CardTitle></CardHeader>
              <CardContent className="grid sm:grid-cols-2 gap-3">
                <Select value={payStudentId} onValueChange={setPayStudentId}>
                  <SelectTrigger><SelectValue placeholder="Student" /></SelectTrigger>
                  <SelectContent>
                    {catalog.students.map((s) => <SelectItem key={s.id} value={s.id}>{s.full_name}</SelectItem>)}
                  </SelectContent>
                </Select>
                <Input placeholder="Amount CAD e.g. 1150" value={payAmount} onChange={(e) => setPayAmount(e.target.value)} />
                <Input placeholder="Description" value={payDescription} onChange={(e) => setPayDescription(e.target.value)} />
                <Input type="date" value={payDueDate} onChange={(e) => setPayDueDate(e.target.value)} />
                <Select value={payMethod} onValueChange={setPayMethod}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="interac">Interac e-transfer</SelectItem>
                    <SelectItem value="cash">Cash / offline</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  disabled={!payStudentId || !payAmount}
                  onClick={() => {
                    const cents = Math.round(parseFloat(payAmount) * 100);
                    if (Number.isNaN(cents)) return;
                    apiPost('/api/admin/payments', {
                      studentId: payStudentId,
                      parentId: payStudentId,
                      amountCents: cents,
                      description: payDescription,
                      dueDate: payDueDate || null,
                      paymentMethod: payMethod,
                      status: 'pending',
                    });
                  }}
                >
                  Record payment
                </Button>
              </CardContent>
            </Card>
            <div className="border rounded-xl overflow-hidden bg-white/90">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Student</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Due</TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {payments.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell>{(p.student as { full_name?: string })?.full_name}</TableCell>
                      <TableCell>{fmtCAD(p.amount_cents)}</TableCell>
                      <TableCell><Badge variant={p.status === 'paid' ? 'success' : 'warning'}>{p.status}</Badge></TableCell>
                      <TableCell>{p.due_date ?? '—'}</TableCell>
                      <TableCell>
                        {p.status !== 'paid' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => fetch('/api/admin/payments', {
                              method: 'PATCH',
                              headers: { 'Content-Type': 'application/json' },
                              body: JSON.stringify({ paymentId: p.id, status: 'paid' }),
                            }).then(() => loadAll())}
                          >
                            Mark paid
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}

        {tab === 'invites' && (
          <div className="space-y-6">
            <h1 className="text-2xl font-display">Invites</h1>
            <Card>
              <CardHeader><CardTitle>Generate invite code</CardTitle></CardHeader>
              <CardContent>
                <InviteForm onCreated={loadAll} />
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Invite history</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                {invites.length === 0 && <p className="text-sm text-muted-foreground">No invites.</p>}
                {invites.map((inv) => (
                  <div key={inv.id} className="border rounded-lg p-3 text-sm bg-white/80">
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
