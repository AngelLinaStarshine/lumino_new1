import React from 'react';
import { Container, SectionLabel, Card, Button, RelatedLinks } from '../components';
import { CONTACT } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact — LuminoLearn',
    description:
      'Contact LuminoLearn for research partnerships, school licensing, educator inquiries, and platform questions. Built in Canada.',
    path: '/contact',
  });

  return (
    <section style={{ paddingTop: 140, paddingBottom: 80 }}>
      <Container narrow style={{ maxWidth: 640 }}>
        <SectionLabel>Contact</SectionLabel>
        <h1
          style={{
            fontFamily: font.display,
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            color: theme.navy,
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          Research, partnerships, and inquiries
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
            color: theme.muted,
            lineHeight: 1.72,
            marginBottom: 32,
          }}
        >
          For federated learning research, post quantum pedagogy collaborations, school licensing, educator
          opportunities, or general questions about the LuminoLearn platform.
        </p>

        <Card hoverable={false}>
          <p style={{ fontSize: 16, color: theme.muted, lineHeight: 1.7, marginBottom: 20 }}>
            Email our team and we will route your message to the right group (research, schools, family
            enrollment, or educators).
          </p>
          <p style={{ fontSize: 16, color: theme.navy, marginBottom: 8 }}>
            <strong>Email:</strong>{' '}
            <a href={`mailto:${CONTACT.email}`} style={{ color: theme.teal, fontWeight: 600 }}>
              {CONTACT.email}
            </a>
          </p>
          <p style={{ fontSize: 16, color: theme.navy, marginBottom: 28 }}>
            <strong>Phone:</strong> {CONTACT.phone}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            <Button href={`mailto:${CONTACT.email}?subject=LuminoLearn%20research%20partnership`}>
              Contact our research team
            </Button>
            <Button to="/book" variant="secondary">
              Book a family consultation
            </Button>
          </div>
        </Card>

        <RelatedLinks
          links={[
            { to: '/schools', label: 'School licensing' },
            { to: '/technology', label: 'Our technology' },
            { to: '/our-story', label: 'Our story' },
          ]}
        />
      </Container>
    </section>
  );
}
