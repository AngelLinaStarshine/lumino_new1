import { Suspense } from 'react';
import ParentConsentClient from './ParentConsentClient';

export default function ParentConsentPage() {
  return (
    <Suspense fallback={<p className="text-center p-8 text-muted-foreground">Loading…</p>}>
      <ParentConsentClient />
    </Suspense>
  );
}
