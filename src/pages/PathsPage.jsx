import React, { useState } from 'react';
import { Container, SectionLabel, Card, Button } from '../components';
import { COURSES, AGE_GROUPS, DISCOVERY_CALL_FORM_URL } from '../data/siteData';
import { theme, font } from '../styles/theme';

const JOURNEY = [
  { name: 'Discovery call', sub: 'Free · Google Form', color: theme.teal },
  { name: 'LuminoStart™', sub: '4 weeks', color: theme.navy },
  { name: 'LuminoCore™', sub: '12 weeks', color: theme.navy },
  { name: 'LuminoPath™', sub: '3 to 12 months', color: theme.accent },
];

export default function PathsPage() {
  const [selectedCourse, setSelectedCourse] = useState(null);

  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 60, background: theme.light }}>
        <Container narrow style={{ textAlign: 'center' }}>
          <SectionLabel>Learning Paths</SectionLabel>
          <h1
            className="fade-up"
            style={{
              fontFamily: font.display,
              fontSize: 44,
              color: theme.navy,
              marginBottom: 16,
            }}
          >
            Find the right path for your child
          </h1>
          <p
            className="fade-up delay-1"
            style={{ fontSize: 17, color: theme.muted, lineHeight: 1.7 }}
          >
            Same focus as our home page: Mathematics, Language, and Computer Science for ages 9 to
            17, with small groups and placement by ability. Every family starts with a free discovery
            call, then LuminoStart™ assessment, then LuminoCore™ or LuminoPath™ cycles.
          </p>
        </Container>
      </section>

      {/* Course Selector */}
      <section style={{ padding: '64px 0' }}>
        <Container>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 28,
              color: theme.navy,
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            Choose a subject
          </h2>
          <div
            className="grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginBottom: 56,
            }}
          >
            {COURSES.map((c) => (
              <Card
                key={c.id}
                hoverable
                onClick={() =>
                  setSelectedCourse(selectedCourse === c.id ? null : c.id)
                }
                style={{
                  borderColor: selectedCourse === c.id ? c.color : theme.border,
                  borderWidth: 2,
                  textAlign: 'center',
                }}
              >
                <div style={{ fontSize: 44, marginBottom: 12 }}>{c.icon}</div>
                <div
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: c.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: 4,
                  }}
                >
                  {c.tagline}
                </div>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 22,
                    color: theme.navy,
                    marginBottom: 8,
                  }}
                >
                  {c.label}
                </h3>
                <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.6 }}>{c.desc}</p>
              </Card>
            ))}
          </div>

          {/* Age Groups */}
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 28,
              color: theme.navy,
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            Age groups
          </h2>
          <p
            style={{
              fontSize: 15,
              color: theme.muted,
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            Students are placed by ability and learning style within their age group, not just by
            grade.
          </p>
          <div
            className="grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginBottom: 56,
            }}
          >
            {AGE_GROUPS.map((a, i) => (
              <Card key={a.id} className={`fade-up delay-${i + 1}`}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: theme.teal,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {a.tag}
                  </span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      background: theme.light,
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme.navy,
                    }}
                  >
                    {a.label}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 15,
                    color: theme.muted,
                    lineHeight: 1.6,
                    marginBottom: 16,
                  }}
                >
                  {a.desc}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {COURSES.map((c) => (
                    <span
                      key={c.id}
                      style={{
                        padding: '3px 10px',
                        borderRadius: 12,
                        background: `${c.color}12`,
                        fontSize: 12,
                        color: c.color,
                        fontWeight: 500,
                      }}
                    >
                      {c.label}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Journey Map */}
          <div
            style={{
              background: theme.light,
              borderRadius: 20,
              padding: 48,
              textAlign: 'center',
            }}
          >
            <h2
              style={{
                fontFamily: font.display,
                fontSize: 28,
                color: theme.navy,
                marginBottom: 32,
              }}
            >
              The learning journey
            </h2>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                flexWrap: 'wrap',
              }}
            >
              {JOURNEY.map((s, i) => (
                <div
                  key={i}
                  style={{ display: 'flex', alignItems: 'center', gap: 16 }}
                >
                  <div
                    style={{
                      background: s.color,
                      color: '#fff',
                      borderRadius: 12,
                      padding: '16px 24px',
                      minWidth: 140,
                    }}
                  >
                    <div style={{ fontSize: 15, fontWeight: 600 }}>{s.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.8, marginTop: 2 }}>{s.sub}</div>
                  </div>
                  {i < JOURNEY.length - 1 && (
                    <div style={{ color: theme.muted, fontSize: 20 }}>›</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '48px 0', textAlign: 'center' }}>
        <Container>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 28,
              color: theme.navy,
              marginBottom: 12,
            }}
          >
            Ready to find the right fit?
          </h2>
          <p style={{ fontSize: 16, color: theme.muted, marginBottom: 32 }}>
            Start with a free discovery call (same link as the home page). Then review plans and
            tuition, or go straight to enrollment when you are ready.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href={DISCOVERY_CALL_FORM_URL}>Book Free Discovery Call</Button>
            <Button variant="secondary" to="/tuition">
              Plans & Tuition
            </Button>
            <Button variant="secondary" to="/luminopro">
              LuminoPro (schools & teams)
            </Button>
            <Button variant="secondary" to="/enroll">
              Enroll Your Child
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
