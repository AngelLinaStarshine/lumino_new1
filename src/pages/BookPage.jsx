import React from 'react';
import { Container, SectionLabel, Card, Button } from '../components';
import { CONTACT, CALENDLY_BOOKING_URL } from '../data/siteData';
import { theme, font } from '../styles/theme';

export default function BookPage() {
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
            <SectionLabel>Free Session</SectionLabel>
            <h1
              style={{
                fontFamily: font.display,
                fontSize: 40,
                color: theme.navy,
                marginBottom: 16,
                lineHeight: 1.2,
              }}
            >
              Book a free 30 minute session
            </h1>
            <p
              style={{
                fontSize: 17,
                color: theme.muted,
                lineHeight: 1.7,
                marginBottom: 32,
              }}
            >
              This is not a sales pitch. It's a conversation about your child: their strengths,
              goals, and where they might benefit from structured support. We'll answer your
              questions and, if it's a good fit, suggest a path forward.
            </p>

            <div
              style={{
                background: theme.light,
                borderRadius: 12,
                padding: 24,
                marginBottom: 24,
              }}
            >
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: theme.navy,
                  marginBottom: 12,
                }}
              >
                What to expect:
              </h3>
              {[
                '30 minute video or phone call',
                "Learn about your child's level and goals",
                'See how our learning paths work',
                'Get honest guidance: no pressure to enroll',
                "If it's a fit, we'll help you start LuminoStart™",
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 6 }}>
                  <span style={{ color: theme.teal }}>✓</span>
                  <span style={{ fontSize: 14, color: theme.text }}>{item}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: 14, color: theme.muted }}>
              <p style={{ marginBottom: 8 }}>📧 {CONTACT.email}</p>
              <p>📞 {CONTACT.phone}</p>
            </div>
          </div>

          <Card style={{ padding: 36 }}>
            <h3
              style={{
                fontFamily: font.display,
                fontSize: 22,
                color: theme.navy,
                marginBottom: 16,
              }}
            >
              Pick a time on Calendly
            </h3>
            <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.7, marginBottom: 28 }}>
              Choose a slot that works for you. You'll get a confirmation email with the video or
              phone details.
            </p>
            <Button fullWidth href={CALENDLY_BOOKING_URL} style={{ marginBottom: 16 }}>
              Open Calendly: schedule free session
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
