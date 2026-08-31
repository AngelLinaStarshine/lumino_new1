'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export default function ParentConsentClient() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setStatus('error');
      setMessage('This verification link is invalid.');
      return;
    }
    fetch(`/api/auth/parent-consent?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        const data = await r.json();
        if (!r.ok) throw new Error(data.error);
        setStatus('ok');
        setMessage(data.message);
      })
      .catch((e) => {
        setStatus('error');
        setMessage(e.message ?? 'Verification failed');
      });
  }, [token]);

  return (
    <Card className="max-w-md mx-auto mt-12">
      <CardHeader>
        <CardTitle>Parent verification</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {status === 'loading' && <p className="text-muted-foreground">Verifying…</p>}
        {status !== 'loading' && <p>{message}</p>}
        {status === 'ok' && (
          <Button asChild>
            <Link href="/login">Go to sign in</Link>
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
