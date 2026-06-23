'use client';

import { useRouter } from 'next/navigation';
import { PasscodeGate } from '@/components/parent/PasscodeGate';

export default function FamilyUnlockPage() {
  const router = useRouter();

  return (
    <PasscodeGate
      onVerified={() => {
        router.push('/student/family');
        router.refresh();
      }}
    />
  );
}
