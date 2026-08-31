import React from 'react';
import { Container, SectionLabel, Card, Button, RelatedLinks } from '../components';
import { CONTACT, CALENDLY_BOOKING_URL, CONSULTATION } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const RELATED = [
  { to: '/learning-paths', label: 'Learning paths' },
  { to: '/how-we-teach', label: 'How we teach' },
  { to: '/our-story', label: 'Our story' },
];

export default function BookPage() {
  usePageMeta({
    title: 'Book a Consultation — LuminoLearn',
    description:
      'Book a free consultation with a real Canadian educator. Discuss your child\'s level, goals, and the right path through AI, Cybersecurity, and Math + Physics.',
    path: '/book',
  });

  return (
    <section style={{ paddingTop: 140, paddingBottom: 80 }}>
      <Container>
        <div
          className="grid-2"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 64,
            alignItems: 'start',
          }}
        >
          <div>
            <SectionLabel>Consultation</SectionLabel>
            <h1
              style={{
                fontFamily: font.display,
                fontSize: 40,
                color: theme.navy,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              {CONSULTATION.name}
            </h1>
            <p
              style={{
                fontSize: 17,
                color: theme.muted,
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              This is not a sales pitch. It&apos;s a conversation about your child: their strengths,
              goals, and where they might benefit from structured support. We&apos;ll answer your
              questions and, if it&apos;s a good fit, suggest a path forward.
            </p>

            <div
              style={{
                background: theme.light,
                borderRadius: 12,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.navy,
                  marginBottom: 12,
                }}
              >
                What to expect
              </h2>
              {[
                '20 minute video or phone call with a Canadian educator',
                "Learn about your child's level and goals across subjects",
                'Short diagnostic to recommend Foundations, Building, or Depth',
                'Honest guidance on format: online, in person, or small group',
                'No pressure to enroll',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: theme.teal }} aria-hidden>
                    ✓
                  </span>
                  <span style={{ fontSize: 14, color: theme.text }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 14, color: theme.muted }}>
              <p style={{ marginBottom: 8 }}>{CONTACT.email}</p>
              <p>{CONTACT.phone}</p>
            </div>

            <RelatedLinks links={RELATED} />
          </div>

          <Card style={{ padding: 36 }}>
            <h2
              style={{
                fontFamily: font.display,
                fontSize: 22,
                color: theme.navy,
                marginBottom: 16,
              }}
            >
              Pick a time on Calendly
            </h2>
            <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.7, marginBottom: 28 }}>
              Choose a slot that works for you. You&apos;ll get a confirmation email with the video or
              phone details.
            </p>
            <Button fullWidth href={CALENDLY_BOOKING_URL} style={{ marginBottom: 16 }}>
              {CONSULTATION.scheduleCta}
            </Button>
            <p
              style={{ fontSize: 13, color: theme.muted, textAlign: 'center', marginBottom: 24 }}
            >
              Opens in a new tab. No commitment.
            </p>
            <div
              style={{
                borderTop: `1px solid ${theme.border}`,
                paddingTop: 24,
                fontSize: 14,
                color: theme.muted,
                lineHeight: 1.6,
              }}
            >
              Prefer email first?{' '}
              <a href={`mailto:${CONTACT.email}`} style={{ color: theme.teal, fontWeight: 600 }}>
                {CONTACT.email}
              </a>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
