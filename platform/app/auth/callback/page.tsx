'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

function AuthCallbackInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function completeSignIn() {
      const access_token = searchParams.get('access_token');
      const refresh_token = searchParams.get('refresh_token');
      const next = searchParams.get('next') || '/';
      const passcode = searchParams.get('passcode');

      if (!access_token || !refresh_token) {
        setError('Missing sign-in tokens. Please try logging in again.');
        return;
      }

      const supabase = createClient();
      const { error: sessionError } = await supabase.auth.setSession({
        access_token,
        refresh_token,
      });

      if (sessionError) {
        setError(sessionError.message);
        return;
      }

      if (passcode) {
        const passRes = await fetch('/api/student/verify-family-passcode', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ passcode }),
        });
        if (!passRes.ok) {
          const data = await passRes.json();
          await supabase.auth.signOut();
          setError(data.error ?? 'Incorrect family passcode');
          return;
        }
      }

      router.replace(next);
      router.refresh();
    }

    completeSignIn();
  }, [router, searchParams]);

  return (
    <div className="auth-shell">
      <div className="w-full max-w-md text-center space-y-3">
        {!error ? (
          <p className="text-muted-foreground">Signing you in…</p>
        ) : (
          <>
            <p className="text-sm text-destructive">{error}</p>
            <a href="/login" className="text-brand-teal font-semibold hover:underline text-sm">
              Back to sign in
            </a>
          </>
        )}
      </div>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <Suspense fallback={<div className="auth-shell text-center text-muted-foreground">Loading…</div>}>
      <AuthCallbackInner />
    </Suspense>
  );
}
