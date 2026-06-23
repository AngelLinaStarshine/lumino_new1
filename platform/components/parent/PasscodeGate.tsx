'use client';

import { useState } from 'react';
import { Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface PasscodeGateProps {
  onVerified: () => void;
}

export function PasscodeGate({ onVerified }: PasscodeGateProps) {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await fetch('/api/student/verify-family-passcode', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ passcode }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? 'Incorrect passcode');
      setLoading(false);
      return;
    }

    onVerified();
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <Card className="w-full max-w-sm">
        <CardHeader className="text-center">
          <div className="w-12 h-12 rounded-full bg-brand-mint/25 flex items-center justify-center mx-auto mb-2">
            <Lock className="w-5 h-5 text-brand-teal" />
          </div>
          <CardTitle>Parent view</CardTitle>
          <CardDescription>
            Sign in with the student account, then enter your 4–6 digit family passcode to review
            progress, payments, and notification settings.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="passcode">Passcode</Label>
              <Input
                id="passcode"
                type="password"
                inputMode="numeric"
                autoComplete="off"
                maxLength={6}
                value={passcode}
                onChange={(e) => setPasscode(e.target.value.replace(/\D/g, ''))}
                placeholder="••••"
                required
              />
            </div>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <Button type="submit" className="w-full" disabled={loading || passcode.length < 4}>
              {loading ? 'Verifying…' : 'Unlock parent features'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
