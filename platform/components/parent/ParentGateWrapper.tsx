'use client';

import { useState } from 'react';
import { PasscodeGate } from '@/components/parent/PasscodeGate';

interface ParentGateWrapperProps {
  children: React.ReactNode;
  verified: boolean;
}

export function ParentGateWrapper({ children, verified: initialVerified }: ParentGateWrapperProps) {
  const [verified, setVerified] = useState(initialVerified);

  if (!verified) {
    return <PasscodeGate onVerified={() => setVerified(true)} />;
  }

  return <>{children}</>;
}
