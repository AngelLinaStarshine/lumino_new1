import { redirect } from 'next/navigation';

export default function LegacyParentRedirect() {
  redirect('/student/family/unlock');
}
