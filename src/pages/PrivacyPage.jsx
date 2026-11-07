import React from 'react';
import privacySource from '../legal/privacy-policy.md?raw';
import { usePageMeta } from '../hooks/usePageMeta';
import { LegalDocPage } from './LegalDocPage';

export default function PrivacyPage() {
  usePageMeta({
    title: 'Privacy Policy — LuminoLearn',
    description:
      'How Luminolearn Inc. collects, uses and protects personal information, in line with PIPEDA. We collect only what learning needs: no ads, no trackers.',
    path: '/privacy',
  });

  return <LegalDocPage source={privacySource} />;
}
