import { redirect } from 'next/navigation';

export default function LegacyParentSettingsRedirect() {
  redirect('/student/family/settings');
}
