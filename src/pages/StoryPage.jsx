import React from 'react';
import { Container, SectionLabel, Card, CtaBanner } from '../components';
import {
  STORY_HERO_PARAGRAPHS,
  BELIEFS,
  STORY_TEACH_NARRATIVE,
  TEACHING_DETAILS,
  SUBJECT_PHILOSOPHY_INTRO,
  SUBJECT_PHILOSOPHY,
  AI_POSITION_TEXT,
  STORY_VISION_MISSION_VALUES,
  STORY_TEAM_BODY,
  TEAM_PLACEHOLDER_ROLES,
  STORY_HIRING,
  DISCOVERY_CALL_FORM_URL,
} from '../data/siteData';
import { theme, font } from '../styles/theme';

const editorial = {
  fontSize: 18,
  lineHeight: 1.8,
  color: theme.muted,
};

export default function StoryPage() {
  const vmv = STORY_VISION_MISSION_VALUES;

  return (
    <>
      {/* Section 1: Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 80, background: theme.warm }}>
        <Container narrow>
          <SectionLabel>Our Story</SectionLabel>
          <h1
            className="fade-up hero-title"
            style={{
              fontFamily: font.display,
              fontSize: 44,
              color: theme.navy,
              marginBottom: 28,
              lineHeight: 1.15,
            }}
          >
            We didn&apos;t start with a business plan.
            <br />
            We started with a question.
          </h1>
          <div className="fade-up delay-1" style={{ width: '100%' }}>
            {STORY_HERO_PARAGRAPHS.map((para, i) => (
              <p
                key={i}
                style={{
                  ...editorial,
                  marginBottom: i === STORY_HERO_PARAGRAPHS.length - 1 ? 0 : 22,
                  fontWeight: i === 0 ? 600 : 400,
                  color: i === 0 ? theme.navy : theme.muted,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 2: Beliefs */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <SectionLabel>Our Beliefs</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 36,
              color: theme.navy,
              marginBottom: 40,
            }}
          >
            Six things we hold to be true
          </h2>
          <div className="grid-2 story-beliefs-grid">
            {BELIEFS.map((b, i) => (
              <Card
                key={b.num}
                style={{
                  padding: 28,
                  background: i % 2 === 0 ? theme.warm : theme.card,
                }}
              >
                <div
                  style={{
                    fontFamily: font.display,
                    fontSize: 28,
                    color: theme.teal,
                    marginBottom: 12,
                    lineHeight: 1,
                  }}
                >
                  {b.num}
                </div>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 20,
                    color: theme.navy,
                    marginBottom: 12,
                    lineHeight: 1.35,
                  }}
                >
                  {b.title}
                </h3>
                <p style={{ fontSize: 16, color: theme.muted, lineHeight: 1.65 }}>{b.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 3: How we teach */}
      <section style={{ padding: '80px 0', background: theme.light }}>
        <Container>
          <SectionLabel>Our Approach</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 36,
              color: theme.navy,
              marginBottom: 40,
            }}
          >
            Small groups. Real teachers. Honest feedback.
          </h2>
          <div className="story-how-grid">
            <div>
              {STORY_TEACH_NARRATIVE.map((block, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 17,
                    color: i === 0 ? theme.navy : theme.text,
                    fontWeight: i === 0 ? 700 : 400,
                    lineHeight: 1.75,
                    marginBottom: i === STORY_TEACH_NARRATIVE.length - 1 ? 0 : 20,
                  }}
                >
                  {block}
                </p>
              ))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {TEACHING_DETAILS.map((item) => (
                <Card key={item.title} style={{ padding: 22 }}>
                  <div style={{ fontSize: 26, marginBottom: 10 }}>{item.icon}</div>
                  <h3 style={{ fontFamily: font.display, fontSize: 18, color: theme.navy, marginBottom: 8 }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.65 }}>{item.detail}</p>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Section 4: Subjects */}
      <section style={{ padding: '80px 0' }}>
        <Container narrow>
          <SectionLabel>What We Teach and Why</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 28,
              textAlign: 'center',
            }}
          >
            Math, Language, and Computer Science aren&apos;t random choices.
          </h2>
        </Container>
        <div
          style={{
            background: theme.warm,
            padding: '48px 24px',
            marginBottom: 48,
            borderTop: `1px solid ${theme.border}`,
            borderBottom: `1px solid ${theme.border}`,
          }}
        >
          <Container narrow>
            <div style={{ textAlign: 'center' }}>
              {SUBJECT_PHILOSOPHY_INTRO.map((p, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 17,
                    color: theme.text,
                    lineHeight: 1.8,
                    marginBottom: i === SUBJECT_PHILOSOPHY_INTRO.length - 1 ? 0 : 18,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>
          </Container>
        </div>
        <Container>
          <div
            className="grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {SUBJECT_PHILOSOPHY.map((s) => (
              <Card key={s.title} style={{ padding: 26 }}>
                <div style={{ fontSize: 32, marginBottom: 14 }}>{s.icon}</div>
                <h3 style={{ fontFamily: font.display, fontSize: 20, color: theme.navy, marginBottom: 12 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.7 }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: AI */}
      <section style={{ padding: '80px 0', background: theme.light }}>
        <Container narrow>
          <SectionLabel>Technology &amp; Ethics</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 32,
              color: theme.navy,
              marginBottom: 28,
              lineHeight: 1.25,
            }}
          >
            We&apos;re an education company that&apos;s skeptical of EdTech. Here&apos;s why.
          </h2>
          <div style={{ width: '100%' }}>
            {AI_POSITION_TEXT.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 17,
                  color: theme.text,
                  lineHeight: 1.8,
                  marginBottom: i === AI_POSITION_TEXT.length - 1 ? 0 : 20,
                }}
              >
                {para}
              </p>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 6: Vision, Mission, Values */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <SectionLabel>Who We Are</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 40,
              textAlign: 'center',
            }}
          >
            What we&apos;re building, and why it matters
          </h2>
          <div
            className="grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28 }}
          >
            <Card style={{ padding: 28 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: theme.teal,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Vision
              </div>
              <p style={{ fontSize: 16, color: theme.text, lineHeight: 1.7 }}>{vmv.vision}</p>
            </Card>
            <Card style={{ padding: 28 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: theme.teal,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Mission
              </div>
              <p style={{ fontSize: 16, color: theme.text, lineHeight: 1.7 }}>{vmv.mission}</p>
            </Card>
            <Card style={{ padding: 28 }}>
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  color: theme.teal,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  marginBottom: 14,
                }}
              >
                Values
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {vmv.values.map((line) => (
                  <span
                    key={line}
                    style={{
                      fontSize: 15,
                      color: theme.text,
                      lineHeight: 1.55,
                      display: 'block',
                    }}
                  >
                    <span style={{ color: theme.teal, marginRight: 8 }}>›</span>
                    {line}
                  </span>
                ))}
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Section 7: Team */}
      <section style={{ padding: '80px 0', background: theme.warm }}>
        <Container narrow>
          <SectionLabel>Our Team</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 28,
              textAlign: 'center',
            }}
          >
            Built by educators, not just engineers
          </h2>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            {STORY_TEAM_BODY.map((p, i) => (
              <p
                key={i}
                style={{
                  ...editorial,
                  marginBottom: i === STORY_TEAM_BODY.length - 1 ? 20 : 18,
                }}
              >
                {p}
              </p>
            ))}
            <a
              href={STORY_HIRING.href}
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: theme.teal,
                textDecoration: 'underline',
                textUnderlineOffset: 4,
              }}
            >
              {STORY_HIRING.label}
            </a>
          </div>
        </Container>
        <Container>
          <div className="story-team-grid">
            {TEAM_PLACEHOLDER_ROLES.map((role) => (
              <Card
                key={role}
                style={{
                  padding: 24,
                  textAlign: 'center',
                  minHeight: 140,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <p style={{ fontFamily: font.display, fontSize: 17, color: theme.navy, marginBottom: 8 }}>
                  {role}
                </p>
                <p style={{ fontSize: 13, color: theme.muted }}>Photo and bio coming soon</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner
        variant="navy"
        headline="Want to see if we're the right fit for your family?"
        subtext="Book a free 30 minute discovery call. No pitch, no pressure, just an honest conversation about your child and what they need."
        primaryLabel="Book Free Discovery Call"
        primaryHref={DISCOVERY_CALL_FORM_URL}
        secondaryLabel="Explore Learning Paths"
        secondaryTo="/learning-paths"
      />
    </>
  );
}
