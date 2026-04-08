import React from 'react';
import { Container, SectionLabel, Card, Button, StepIndicator } from '../components';
import { PRO_AUDIENCES, PRO_STEPS, CALENDLY_BOOKING_URL } from '../data/siteData';
import { theme, font } from '../styles/theme';

export default function ProPage() {
  return (
    <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 60,
          background: `linear-gradient(180deg, ${theme.navy} 0%, ${theme.navyLight} 100%)`,
          color: '#fff',
        }}
      >
        <Container narrow>
          <SectionLabel>
            <span style={{ color: theme.accent }}>Professional Learning</span>
          </SectionLabel>
          <h1
            className="fade-up"
            style={{
              fontFamily: font.display,
              fontSize: 44,
              lineHeight: 1.2,
              marginBottom: 16,
            }}
          >
            LuminoPro for schools, teachers & adult learners
          </h1>
          <p
            className="fade-up delay-1"
            style={{ fontSize: 18, opacity: 0.8, lineHeight: 1.7 }}
          >
            Structured professional development designed for real classrooms and workplaces. No
            jargon. No fluff. Just practical learning you can use the next day.
          </p>
          <div style={{ marginTop: 32 }}>
            <Button variant="warm" href={CALENDLY_BOOKING_URL}>
              Book a Short Call
            </Button>
          </div>
        </Container>
      </section>

      <section style={{ padding: '20px 0', background: theme.bg, borderBottom: `1px solid ${theme.border}` }}>
        <Container narrow>
          <Card
            style={{
              padding: '20px 22px',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 16,
            }}
          >
            <p style={{ fontSize: 15, color: theme.text, lineHeight: 1.6, margin: 0, flex: '1 1 240px', minWidth: 0 }}>
              <strong style={{ color: theme.navy }}>Student academy?</strong> LuminoPro is for
              schools and professionals. For children ages 9 to 17, use Learning Paths and
              tuition instead.
            </p>
            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <Button to="/learning-paths" variant="warm" style={{ padding: '10px 18px', fontSize: 14 }}>
                Learning Paths
              </Button>
              <Button to="/tuition" variant="secondary" style={{ padding: '10px 18px', fontSize: 14 }}>
                Plans & Tuition
              </Button>
            </div>
          </Card>
        </Container>
      </section>

      {/* Audiences */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 32,
              color: theme.navy,
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            Who LuminoPro serves
          </h2>
          <div
            className="grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
            }}
          >
            {PRO_AUDIENCES.map((g, i) => (
              <Card key={i}>
                <div style={{ fontSize: 36, marginBottom: 16 }}>{g.icon}</div>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 20,
                    color: theme.navy,
                    marginBottom: 16,
                  }}
                >
                  {g.title}
                </h3>
                {g.items.map((item, j) => (
                  <div
                    key={j}
                    style={{
                      display: 'flex',
                      gap: 8,
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ color: theme.teal, flexShrink: 0 }}>✓</span>
                    <span style={{ fontSize: 14, color: theme.muted, lineHeight: 1.5 }}>
                      {item}
                    </span>
                  </div>
                ))}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* How it works */}
      <section style={{ padding: '64px 0', background: theme.light }}>
        <Container>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 28,
              color: theme.navy,
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            How LuminoPro works
          </h2>
          <StepIndicator steps={PRO_STEPS} columns={3} />
        </Container>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 0', textAlign: 'center' }}>
        <Container narrow>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 28,
              color: theme.navy,
              marginBottom: 12,
            }}
          >
            Start a conversation
          </h2>
          <p style={{ fontSize: 16, color: theme.muted, marginBottom: 32 }}>
            Share a bit about your school or context. We'll respond with a concrete proposal: no
            pressure.
          </p>
          <div
            style={{
              display: 'flex',
              gap: 16,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <Button href={CALENDLY_BOOKING_URL}>Book a Short Call</Button>
            <Button variant="secondary" href="mailto:lumino@luminolearn.org">
              Email the Team
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
