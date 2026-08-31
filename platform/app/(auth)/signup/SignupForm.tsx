'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { isUnder13 } from '@/lib/curriculum';
import type { UserRole } from '@/types/database';

const ROLES: { id: UserRole; label: string; description: string }[] = [
  { id: 'student', label: 'Student', description: 'Learn, practice, and join live classes.' },
  { id: 'parent', label: 'Parent', description: 'Review progress and messages (linked to your child).' },
  { id: 'teacher', label: 'Educator', description: 'Roster, assignments, and class delivery.' },
  { id: 'admin', label: 'Admin', description: 'Platform administration (invite-only).' },
];

export default function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [publicSignup, setPublicSignup] = useState(false);
  const [configLoaded, setConfigLoaded] = useState(false);
  const [role, setRole] = useState<UserRole>('student');
  const [inviteCode, setInviteCode] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [parentEmail, setParentEmail] = useState('');
  const [familyPasscode, setFamilyPasscode] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inviteOnly = configLoaded && !publicSignup;
  const needsParentEmail = role === 'student' && dateOfBirth && isUnder13(dateOfBirth);

  useEffect(() => {
    const fromUrl = searchParams.get('invite');
    if (fromUrl) setInviteCode(fromUrl.toUpperCase());

    fetch('/api/auth/signup-config')
      .then((r) => r.json())
      .then((data) => {
        setPublicSignup(Boolean(data.publicSignupEnabled));
        setConfigLoaded(true);
      })
      .catch(() => setConfigLoaded(true));
  }, [searchParams]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        role,
        fullName,
        email,
        phone: phone || null,
        password,
        dateOfBirth: role === 'student' ? dateOfBirth : undefined,
        parentEmail: needsParentEmail ? parentEmail : undefined,
        familyPasscode: role === 'student' ? familyPasscode : undefined,
        smsOptIn,
        inviteCode: inviteOnly ? inviteCode : undefined,
      }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Signup failed');
      setLoading(false);
      return;
    }

    if (data.pendingParentVerification) {
      router.push('/login?pending=parent');
      return;
    }

    router.push('/login?registered=1');
  }

  if (!configLoaded) {
    return (
      <Card>
        <CardContent className="py-10 text-center text-sm text-muted-foreground">Loading…</CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{inviteOnly ? 'Complete your registration' : 'Create your account'}</CardTitle>
        <CardDescription>
          {inviteOnly
            ? 'Enter the invite code from Luminolearn to set up your account.'
            : 'Choose your role and create your LuminoLearn account.'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          {inviteOnly && (
            <div className="space-y-2">
              <Label htmlFor="inviteCode">Invite code</Label>
              <Input
                id="inviteCode"
                value={inviteCode}
                onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                placeholder="e.g. A1B2C3D4"
                className="font-mono tracking-wider"
                required
              />
            </div>
          )}

          {publicSignup && (
            <div className="space-y-2">
              <Label>I am a…</Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      'text-left border rounded-lg p-3 transition-colors min-h-12',
                      role === r.id
                        ? 'border-brand-teal bg-brand-mint/20 shadow-sm'
                        : 'border-black/10 hover:border-brand-teal/40 bg-white/60'
                    )}
                  >
                    <div className="text-sm font-medium">{r.label}</div>
                    <div className="text-xs text-muted-foreground">{r.description}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="fullName">Full name</Label>
            <Input id="fullName" value={fullName} onChange={(e) => setFullName(e.target.value)} required />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          {role === 'student' && (
            <div className="space-y-2">
              <Label htmlFor="dob">Date of birth</Label>
              <Input id="dob" type="date" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)} required />
            </div>
          )}

          {needsParentEmail && (
            <div className="space-y-2 rounded-xl border border-brand-teal/30 bg-brand-mint/10 p-4">
              <Label htmlFor="parentEmail">Parent or guardian email</Label>
              <Input
                id="parentEmail"
                type="email"
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                required
              />
              <p className="text-xs text-muted-foreground">
                Required for students under 13. We will email your parent to verify before your account activates.
              </p>
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
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
                type="password"
                inputMode="numeric"
                value={familyPasscode}
                onChange={(e) => setFamilyPasscode(e.target.value.replace(/\D/g, ''))}
                required={publicSignup}
              />
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full min-h-12" disabled={loading}>
            {loading ? 'Creating account…' : 'Create account'}
          </Button>
        </form>

        <p className="text-sm text-muted-foreground text-center mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-brand-teal font-semibold hover:underline">
            Sign in
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
