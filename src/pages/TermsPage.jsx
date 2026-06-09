import React from 'react';
import termsSource from '../legal/terms-of-service.md?raw';
import { LegalDocPage } from './LegalDocPage';

export default function TermsPage() {
  return <LegalDocPage source={termsSource} />;
}
