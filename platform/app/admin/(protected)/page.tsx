'use client';

import { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BrandMark } from '@/components/shared/BrandMark';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface InviteRow {
  id: string;
  role: string;
  email: string | null;
  note: string | null;
  code_hint: string;
  expires_at: string | null;
  used_at: string | null;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [tab, setTab] = useState<'overview' | 'create' | 'invite' | 'invites'>('overview');
  const [invites, setInvites] = useState<InviteRow[]>([]);
  const [users, setUsers] = useState<
    { id: string; role: string; full_name: string; email: string; created_at: string }[]
  >([]);
  const [stats, setStats] = useState({
    students: 0,
    teachers: 0,
    homeworkAssigned: 0,
    submissions: 0,
  });
  const [lastInvite, setLastInvite] = useState<{ code: string; signupUrl: string } | null>(null);
  const [createdUser, setCreatedUser] = useState<{ email: string; password: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [role, setRole] = useState<'student' | 'teacher' | 'admin'>('student');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [familyPasscode, setFamilyPasscode] = useState('');
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteNote, setInviteNote] = useState('');
  const [inviteFamilyPasscode, setInviteFamilyPasscode] = useState('');

  const loadOverview = useCallback(async () => {
    const res = await fetch('/api/admin/users');
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    const data = await res.json();
    setUsers(data.users ?? []);
    setStats(data.stats ?? { students: 0, teachers: 0, homeworkAssigned: 0, submissions: 0 });
  }, [router]);

  const loadInvites = useCallback(async () => {
    const res = await fetch('/api/admin/invites');
    if (res.status === 401) {
      router.push('/admin/login');
      return;
    }
    const data = await res.json();
    setInvites(data.invites ?? []);
  }, [router]);

  useEffect(() => {
    loadOverview();
    loadInvites();
  }, [loadOverview, loadInvites]);

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setCreatedUser(null);
    setLoading(true);

    const res = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role,
        fullName,
        email,
        phone: phone || null,
        password,
        familyPasscode: role === 'student' ? familyPasscode : undefined,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? 'Failed to create user');
      return;
    }

    setCreatedUser({ email, password });
    setFullName('');
    setEmail('');
    setPhone('');
    setPassword('');
    setFamilyPasscode('');
    loadOverview();
  }

  async function handleCreateInvite(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLastInvite(null);
    setLoading(true);

    const res = await fetch('/api/admin/invites', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role,
        email: inviteEmail || undefined,
        note: inviteNote || undefined,
        familyPasscode: role === 'student' && inviteFamilyPasscode ? inviteFamilyPasscode : undefined,
        expiresInDays: 14,
      }),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      setError(data.error ?? 'Failed to create invite');
      return;
    }

    setLastInvite({ code: data.code, signupUrl: data.signupUrl });
    setInviteEmail('');
    setInviteNote('');
    setInviteFamilyPasscode('');
    loadInvites();
  }

  async function revokeInvite(id: string) {
    await fetch(`/api/admin/invites?id=${id}`, { method: 'DELETE' });
    loadInvites();
  }

  async function signOutAdmin() {
    await fetch('/api/admin/session', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-start justify-between gap-4">
        <BrandMark subtitle="Admin — accounts & monitoring" />
        <Button type="button" variant="outline" size="sm" onClick={signOutAdmin}>
          Lock admin
        </Button>
      </div>

      <p className="text-sm text-muted-foreground">
        Create accounts, send invites, and review students & teachers. Public signup is disabled.
      </p>

      <div className="flex gap-2 flex-wrap">
        {(['overview', 'create', 'invite', 'invites'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium transition-colors',
              tab === t ? 'nav-link-active' : 'bg-white/60 text-muted-foreground hover:text-foreground'
            )}
          >
            {t === 'overview' && 'Overview'}
            {t === 'create' && 'Create account'}
            {t === 'invite' && 'Generate invite'}
            {t === 'invites' && 'Invite history'}
          </button>
        ))}
      </div>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {createdUser && (
        <div className="rounded-xl border border-brand-teal/30 bg-brand-mint/15 p-4 text-sm space-y-1">
          <p className="font-semibold text-brand-teal">Account created — share these login details:</p>
          <p>
            <strong>Email:</strong> {createdUser.email}
          </p>
          <p>
            <strong>Password:</strong> {createdUser.password}
          </p>
        </div>
      )}

      {lastInvite && (
        <div className="rounded-xl border border-brand-accent/30 bg-brand-warm p-4 text-sm space-y-2">
          <p className="font-semibold">Invite created — copy and send to the user:</p>
          <p>
            <strong>Code:</strong>{' '}
            <code className="font-mono bg-white/80 px-2 py-0.5 rounded">{lastInvite.code}</code>
          </p>
          <p className="break-all">
            <strong>Link:</strong>{' '}
            <a href={lastInvite.signupUrl} className="text-brand-teal underline">
              {lastInvite.signupUrl}
            </a>
          </p>
        </div>
      )}

      {tab === 'overview' && (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Students', value: stats.students },
              { label: 'Teachers', value: stats.teachers },
              { label: 'Homework assigned', value: stats.homeworkAssigned },
              { label: 'Submissions', value: stats.submissions },
            ].map(({ label, value }) => (
              <div key={label} className="platform-card p-4 text-center">
                <p className="text-2xl font-display">{value}</p>
                <p className="text-xs text-muted-foreground mt-1">{label}</p>
              </div>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>All users</CardTitle>
              <CardDescription>Students, teachers, and admins in your Luminolearn workspace.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 max-h-96 overflow-y-auto">
              {users.length === 0 && (
                <p className="text-sm text-muted-foreground">No users yet — create accounts in the Create account tab.</p>
              )}
              {users.map((u) => (
                <div
                  key={u.id}
                  className="flex items-center justify-between gap-3 border border-black/[0.06] rounded-lg p-3 text-sm bg-white/60"
                >
                  <div>
                    <p className="font-medium">{u.full_name}</p>
                    <p className="text-muted-foreground text-xs">{u.email}</p>
                  </div>
                  <span className="text-xs font-semibold uppercase tracking-wide px-2 py-0.5 rounded-full bg-brand-mint/25 text-brand-teal">
                    {u.role}
                  </span>
                </div>
              ))}
            </CardContent>
          </Card>
          <p className="text-xs text-muted-foreground">
            Tip: sign in as <strong>Teacher</strong> with your admin email to open teacher tools, or stay here
            with your admin secret. Full activity logs are also in Supabase → Table Editor.
          </p>
        </>
      )}

      {tab === 'create' && (
        <Card>
          <CardHeader>
            <CardTitle>Create account directly</CardTitle>
            <CardDescription>
              You set the password and send login details to the user — same workflow as pgAdmin.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div className="flex gap-2 flex-wrap">
                {(['student', 'teacher', 'admin'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={cn(
                      'flex-1 min-w-[80px] border rounded-lg p-2 text-sm capitalize',
                      role === r ? 'border-brand-teal bg-brand-mint/20' : 'border-black/10'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="fullName">Full name</Label>
                <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone (optional)</Label>
                <Input id="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password (you share with user)</Label>
                <Input
                  id="password"
                  type="text"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  minLength={8}
                  required
                />
              </div>
              {role === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="familyPasscode">Family passcode (4–6 digits)</Label>
                  <Input
                    id="familyPasscode"
                    inputMode="numeric"
                    value={familyPasscode}
                    onChange={(e) => setFamilyPasscode(e.target.value.replace(/\D/g, ''))}
                    required
                  />
                </div>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? 'Creating…' : 'Create account'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {tab === 'invite' && (
        <Card>
          <CardHeader>
            <CardTitle>Generate invite</CardTitle>
            <CardDescription>
              User completes signup themselves with your code. Expires in 14 days. Optional: lock to a
              specific email or pre-set the family passcode.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateInvite} className="space-y-4">
              <div className="flex gap-2">
                {(['student', 'teacher'] as const).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={cn(
                      'flex-1 border rounded-lg p-2 text-sm capitalize',
                      role === r ? 'border-brand-teal bg-brand-mint/20' : 'border-black/10'
                    )}
                  >
                    {r}
                  </button>
                ))}
              </div>
              <div className="space-y-2">
                <Label htmlFor="inviteEmail">Lock to email (optional)</Label>
                <Input
                  id="inviteEmail"
                  type="email"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                  placeholder="Leave blank for any email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="inviteNote">Note (optional)</Label>
                <Input
                  id="inviteNote"
                  value={inviteNote}
                  onChange={(e) => setInviteNote(e.target.value)}
                  placeholder="e.g. Alex Rivera — fall 2025"
                />
              </div>
              {role === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="inviteFamilyPasscode">Family passcode (optional)</Label>
                  <Input
                    id="inviteFamilyPasscode"
                    inputMode="numeric"
                    value={inviteFamilyPasscode}
                    onChange={(e) => setInviteFamilyPasscode(e.target.value.replace(/\D/g, ''))}
                    placeholder="Pre-set for parents"
                  />
                </div>
              )}
              <Button type="submit" disabled={loading}>
                {loading ? 'Generating…' : 'Generate invite'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {tab === 'invites' && (
        <Card>
          <CardHeader>
            <CardTitle>Recent invites</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {invites.length === 0 && (
              <p className="text-sm text-muted-foreground">No invites yet.</p>
            )}
            {invites.map((inv) => (
              <div
                key={inv.id}
                className="flex items-start justify-between gap-3 border border-black/[0.06] rounded-lg p-3 text-sm bg-white/60"
              >
                <div>
                  <p className="font-medium capitalize">
                    {inv.role}
                    {inv.used_at ? ' · used' : ' · pending'}
                    <span className="text-muted-foreground font-normal"> · …{inv.code_hint}</span>
                  </p>
                  {inv.email && <p className="text-muted-foreground">{inv.email}</p>}
                  {inv.note && <p className="text-muted-foreground">{inv.note}</p>}
                </div>
                {!inv.used_at && (
                  <Button type="button" variant="ghost" size="sm" onClick={() => revokeInvite(inv.id)}>
                    Revoke
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
