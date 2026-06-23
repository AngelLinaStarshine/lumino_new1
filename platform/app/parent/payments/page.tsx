import { redirect } from 'next/navigation';

export default function LegacyParentPaymentsRedirect() {
  redirect('/student/family/payments');
}
