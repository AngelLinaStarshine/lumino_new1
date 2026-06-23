'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GraduationCap, Users } from 'lucide-react';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const SUPPORT_EMAIL = 'lumino@luminolearn.org';

type LoginMode = 'parent' | 'teacher';

export default function LoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<LoginMode>('parent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (authError) {
      setError(authError.message);
      setLoading(false);
      return;
    }

    const { data: profileData } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', authData.user.id)
      .single();

    const role = (profileData as { role: string } | null)?.role;

    if (mode === 'teacher') {
      if (role !== 'teacher' && role !== 'admin') {
        await supabase.auth.signOut();
        setError('This account is not registered as a teacher. Try signing in as Parent / Family.');
        setLoading(false);
        return;
      }
      router.push(role === 'admin' ? '/admin' : '/teacher');
      router.refresh();
      return;
    }

    /* Parent / family mode — uses the student household login */
    if (role !== 'student') {
      await supabase.auth.signOut();
      setError('Parent sign-in uses the student family account. Try signing in as Teacher.');
      setLoading(false);
      return;
    }

    if (!passcode) {
      router.push('/student');
      router.refresh();
      return;
    }

    if (passcode.length < 4) {
      setError('Family passcode must be 4–6 digits.');
      setLoading(false);
      return;
    }

    const passRes = await fetch('/api/student/verify-family-passcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });

    const passData = await passRes.json();
    if (!passRes.ok) {
      await supabase.auth.signOut();
      setError(passData.error ?? 'Incorrect family passcode');
      setLoading(false);
      return;
    }

    router.push('/student/family');
    router.refresh();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome back</CardTitle>
        <CardDescription>Choose how you are signing in, then enter your credentials.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => {
                setMode('parent');
                setError(null);
              }}
              className={cn(
                'flex items-start gap-3 text-left border rounded-xl p-3 transition-colors',
                mode === 'parent'
                  ? 'border-brand-teal bg-brand-mint/20 shadow-sm ring-1 ring-brand-teal/20'
                  : 'border-black/10 bg-white/60 hover:border-brand-teal/40'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                  mode === 'parent' ? 'border-brand-teal bg-brand-teal text-white' : 'border-black/20'
                )}
                aria-hidden
              >
                {mode === 'parent' && (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-current">
                    <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
              </span>
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy">
                  <Users className="h-4 w-4 text-brand-teal" />
                  Parent / Family
                </span>
                <span className="block text-xs text-muted-foreground mt-1 leading-snug">
                  Student account email + password, then family passcode
                </span>
              </span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMode('teacher');
                setError(null);
                setPasscode('');
              }}
              className={cn(
                'flex items-start gap-3 text-left border rounded-xl p-3 transition-colors',
                mode === 'teacher'
                  ? 'border-brand-teal bg-brand-mint/20 shadow-sm ring-1 ring-brand-teal/20'
                  : 'border-black/10 bg-white/60 hover:border-brand-teal/40'
              )}
            >
              <span
                className={cn(
                  'mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded border',
                  mode === 'teacher' ? 'border-brand-teal bg-brand-teal text-white' : 'border-black/20'
                )}
                aria-hidden
              >
                {mode === 'teacher' && (
                  <svg viewBox="0 0 12 12" className="h-2.5 w-2.5 fill-current">
                    <path d="M10 3L4.5 8.5 2 6" stroke="currentColor" strokeWidth="2" fill="none" />
                  </svg>
                )}
              </span>
              <span>
                <span className="flex items-center gap-1.5 text-sm font-semibold text-brand-navy">
                  <GraduationCap className="h-4 w-4 text-brand-teal" />
                  Teacher
                </span>
                <span className="block text-xs text-muted-foreground mt-1 leading-snug">
                  Your teacher email / username and password
                </span>
              </span>
            </button>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email / username</Label>
            <Input
              id="email"
              type="email"
              autoComplete="username email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={mode === 'teacher' ? 'you@luminolearn.org' : 'student family email'}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {mode === 'parent' && (
            <div className="space-y-2">
              <Label htmlFor="passcode">Family passcode (parents)</Label>
              <Input
                id="passcode"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                maxLength={6}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ''))}
                placeholder="4–6 digits — leave blank for student"
              />
              <p className="text-xs text-muted-foreground">
                <strong>Parents:</strong> enter the passcode for payments and progress.{' '}
                <strong>Students:</strong> leave blank to open your dashboard.
              </p>
            </div>
          )}

          {error && <p className="text-sm text-destructive">{error}</p>}

          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in…' : mode === 'parent' ? 'Sign in as parent' : 'Sign in as teacher'}
          </Button>
        </form>

        <div className="mt-6 rounded-xl border border-black/[0.06] bg-brand-warm/50 px-4 py-3 text-sm text-center space-y-1">
          <p className="text-muted-foreground">Don&apos;t have an account?</p>
          <p>
            Contact your Luminolearn administrator or{' '}
            <a
              href={`mailto:${SUPPORT_EMAIL}?subject=Luminolearn%20account%20request`}
              className="text-brand-teal font-semibold hover:underline"
            >
              request assistance
            </a>
            .
          </p>
          <p className="text-xs text-muted-foreground pt-1">
            Consultation & enrollment:{' '}
            <a href={`mailto:${SUPPORT_EMAIL}`} className="text-brand-teal hover:underline">
              {SUPPORT_EMAIL}
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
