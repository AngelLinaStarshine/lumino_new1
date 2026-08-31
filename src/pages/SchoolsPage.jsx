import React from 'react';
import { Container, SectionLabel, Card, Button, RelatedLinks } from '../components';
import { CONTACT } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

export default function SchoolsPage() {
  usePageMeta({
    title: 'School Licensing — LuminoLearn',
    description:
      'License LuminoLearn\'s AI, Cybersecurity, and Math + Physics curriculum for Canadian schools and districts. Canadian data residency and PIPEDA alignment.',
    path: '/schools',
  });

  return (
    <section style={{ paddingTop: 140, paddingBottom: 80 }}>
      <Container narrow style={{ maxWidth: 720 }}>
        <SectionLabel>For schools & districts</SectionLabel>
        <h1
          style={{
            fontFamily: font.display,
            fontSize: 'clamp(2rem, 4vw, 2.75rem)',
            color: theme.navy,
            marginBottom: 16,
            lineHeight: 1.2,
          }}
        >
          AI, Cybersecurity & Math + Physics for Canadian classrooms
        </h1>
        <p
          style={{
            fontSize: 'clamp(1.05rem, 1.5vw, 1.2rem)',
            color: theme.muted,
            lineHeight: 1.72,
            marginBottom: 32,
          }}
        >
          License LuminoLearn&apos;s curriculum for your school or district, with Canadian data residency,
          PIPEDA alignment, and real Canadian educators supporting implementation.
        </p>

        <Card hoverable={false} style={{ marginBottom: 24 }}>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
              color: theme.navy,
              marginBottom: 16,
            }}
          >
            Request a pilot
          </h2>
          <ul
            style={{
              fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
              color: theme.muted,
              lineHeight: 1.75,
              paddingLeft: 20,
              marginBottom: 24,
            }}
          >
            <li>Adaptive AI + Cybersecurity (including post quantum readiness) + Math + Physics</li>
            <li>Small group live instruction model adaptable to classroom use</li>
            <li>Privacy first architecture with federated learning principles</li>
            <li>Progress reporting for educators and administrators</li>
          </ul>
          <Button
            href={`mailto:${CONTACT.email}?subject=LuminoLearn%20school%20pilot%20request`}
            style={{ fontSize: 'clamp(1rem, 1.3vw, 1.1rem)', marginBottom: 12 }}
          >
            Request a pilot
          </Button>
          <Button to="/contact" variant="secondary">
            Contact our team
          </Button>
        </Card>

        <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65, marginBottom: 0 }}>
          Or email us directly at{' '}
          <a href={`mailto:${CONTACT.email}`} style={{ color: theme.teal, fontWeight: 600 }}>
            {CONTACT.email}
          </a>
        </p>

        <RelatedLinks
          links={[
            { to: '/technology', label: 'Our technology' },
            { to: '/learning-paths', label: 'Curriculum paths' },
            { to: '/how-we-teach', label: 'How we teach' },
          ]}
        />
      </Container>
    </section>
  );
}
