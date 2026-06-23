'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { UserRole } from '@/types/database';

const ROLES: { id: UserRole; label: string; description: string }[] = [
  {
    id: 'student',
    label: 'Student / Family',
    description: 'One login for the learner. Parents unlock extra review with a passcode.',
  },
  { id: 'teacher', label: 'Teacher', description: 'Manage students, lessons, and assignments' },
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
  const [familyPasscode, setFamilyPasscode] = useState('');
  const [smsOptIn, setSmsOptIn] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const inviteOnly = configLoaded && !publicSignup;

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
        familyPasscode: familyPasscode || undefined,
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
            : 'Students get one family login. Parents use the same sign-in, then enter a passcode for payments and progress review.'}
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
              <p className="text-xs text-muted-foreground">
                Don&apos;t have a code? Contact your Luminolearn coordinator — accounts are created by
                invitation only.
              </p>
            </div>
          )}

          {publicSignup && (
            <div className="space-y-2">
              <Label>I am a…</Label>
              <div className="grid grid-cols-1 gap-2">
                {ROLES.map((r) => (
                  <button
                    key={r.id}
                    type="button"
                    onClick={() => setRole(r.id)}
                    className={cn(
                      'text-left border rounded-lg p-3 transition-colors',
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

          <div className="space-y-2">
            <Label htmlFor="phone">Family phone (optional, for SMS)</Label>
            <Input id="phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+1…" />
          </div>

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

          <div className="space-y-2">
            <Label htmlFor="familyPasscode">
              Family passcode (4–6 digits)
              {inviteOnly && ' — optional if set on your invite'}
            </Label>
            <Input
              id="familyPasscode"
              type="password"
              inputMode="numeric"
              pattern="[0-9]{4,6}"
              value={familyPasscode}
              onChange={(e) => setFamilyPasscode(e.target.value.replace(/\D/g, ''))}
              placeholder="Parents enter this after signing in"
              required={publicSignup && role === 'student'}
            />
            <p className="text-xs text-muted-foreground">
              Share this passcode with parents so they can unlock payment and progress review on
              this account.
            </p>
          </div>

          <label className="flex items-start gap-2 text-xs text-muted-foreground">
            <input
              type="checkbox"
              checked={smsOptIn}
              onChange={(e) => setSmsOptIn(e.target.checked)}
              className="mt-0.5"
            />
            <span>
              I agree to receive SMS notifications from Luminolearn about homework, classes, and
              payments. Message and data rates may apply. Reply STOP to opt out.
            </span>
          </label>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
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
