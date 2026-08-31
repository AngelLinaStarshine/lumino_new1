import React from 'react';
import termsSource from '../legal/terms-of-service.md?raw';
import { usePageMeta } from '../hooks/usePageMeta';
import { LegalDocPage } from './LegalDocPage';

export default function TermsPage() {
  usePageMeta({
    title: 'Terms of Service — LuminoLearn',
    description:
      'Terms of Service for LuminoLearn Inc., a Canadian educational technology company delivering AI, Cybersecurity, and Math + Physics programs to students ages 9–17.',
    path: '/terms',
  });

  return <LegalDocPage source={termsSource} />;
}
