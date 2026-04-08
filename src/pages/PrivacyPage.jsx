import React from 'react';
import privacySource from '../legal/privacy-policy.md?raw';
import { LegalDocPage } from './LegalDocPage';

export default function PrivacyPage() {
  return <LegalDocPage source={privacySource} />;
}
