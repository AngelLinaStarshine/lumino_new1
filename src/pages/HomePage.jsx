import React from 'react';
import { Container, SectionLabel, Card, Button, StepIndicator, CtaBanner, useLenis } from '../components';
import {
  COURSES,
  AGE_GROUPS,
  HOW_IT_WORKS,
  VALUES,
  DISCOVERY_CALL_FORM_URL,
  getEnrollmentLink,
  PROBLEM_PARENT_VOICES,
  PROBLEM_LUMINO_ANSWERS,
  HOME_SUBJECT_DETAILS,
  AI_ETHICS_INTRO,
  AI_PRINCIPLES,
  PERSONALIZATION_STEPS,
  SKILLS_THAT_MATTER,
  HOME_QUICK_LINKS,
} from '../data/siteData';
import { theme, font } from '../styles/theme';

export default function HomePage() {
  const lenis = useLenis();
  const scrollToHowItWorks = () => {
    const el = document.getElementById('how-it-works');
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { duration: 1 });
    else el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <>
      {/* Section 1: Hero */}
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          background: theme.bg,
        }}
      >
        <Container>
          <div className="fade-up" style={{ width: '100%' }}>
            <div className="hero-brand-stack">
              <div className="hero-wordmark-shell">
                <p className="hero-wordmark">LuminoLearn Academy</p>
              </div>
              <span className="hero-eyebrow-badge">Small groups · Real teachers · Ages 9 to 17</span>
            </div>
            <h1
              className="hero-title"
              style={{
                fontFamily: font.display,
                fontSize: 48,
                lineHeight: 1.18,
                color: theme.navy,
                marginBottom: 20,
              }}
            >
              Your child doesn&apos;t need more screen time.
              <br />
              They need the right learning, with the right people.
            </h1>
            <p
              style={{
                fontSize: 19,
                lineHeight: 1.7,
                color: theme.muted,
                marginBottom: 36,
              }}
            >
              LuminoLearn Academy is a structured, human first learning space where children ages 9 to
              17 build real skills in Mathematics, Language, and Computer Science through
              small group instruction, personalized pathways, and teachers who know them by name.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button href={DISCOVERY_CALL_FORM_URL}>Book a Free Discovery Call ›</Button>
              <Button variant="secondary" onClick={scrollToHowItWorks}>
                See How It Works
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Program hubs: match navbar destinations */}
      <section style={{ padding: '48px 0 56px', borderBottom: `1px solid ${theme.border}` }}>
        <Container>
          <p
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: theme.teal,
              marginBottom: 12,
              textAlign: 'center',
            }}
          >
            Where to go next
          </p>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 28,
              color: theme.navy,
              marginBottom: 28,
              textAlign: 'center',
              lineHeight: 1.25,
            }}
          >
            Paths, pricing, and professional programs
          </h2>
          <div className="home-hub-grid">
            {HOME_QUICK_LINKS.map((item) => (
              <Card key={item.to} className="home-hub-card" style={{ padding: 24 }}>
                <div style={{ fontSize: 32, marginBottom: 10 }}>{item.icon}</div>
                <h3 style={{ fontFamily: font.display, fontSize: 20, color: theme.navy, marginBottom: 10 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65, marginBottom: 18 }}>
                  {item.desc}
                </p>
                <Button to={item.to} variant="secondary" fullWidth style={{ fontSize: 14 }}>
                  {item.to === '/tuition'
                    ? 'See pricing'
                    : item.to === '/luminopro'
                      ? 'About LuminoPro'
                      : 'Explore paths'}
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 2: Problem */}
      <section style={{ padding: '80px 0', background: theme.light }}>
        <Container>
          <SectionLabel>Why LuminoLearn Exists</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 36,
              color: theme.navy,
              marginBottom: 40,
            }}
          >
            The gap between what schools teach and what your child actually needs
          </h2>
          <div
            className="grid-2"
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 32,
              alignItems: 'start',
            }}
          >
            <div>
              <h3
                style={{
                  fontFamily: font.display,
                  fontSize: 20,
                  color: theme.navy,
                  marginBottom: 20,
                }}
              >
                What parents tell us
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {PROBLEM_PARENT_VOICES.map((item, i) => (
                  <Card key={i} style={{ padding: 24 }}>
                    <p style={{ fontWeight: 700, color: theme.navy, marginBottom: 10, fontSize: 16 }}>
                      {item.quote}
                    </p>
                    <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.65 }}>{item.body}</p>
                  </Card>
                ))}
              </div>
            </div>
            <div>
              <h3
                style={{
                  fontFamily: font.display,
                  fontSize: 20,
                  color: theme.navy,
                  marginBottom: 20,
                }}
              >
                What we do instead
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {PROBLEM_LUMINO_ANSWERS.map((item, i) => (
                  <Card key={i} style={{ padding: 24 }}>
                    <p style={{ fontWeight: 700, color: theme.teal, marginBottom: 10, fontSize: 16 }}>
                      {item.title}
                    </p>
                    <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.65 }}>{item.body}</p>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: Subjects */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <SectionLabel>What We Teach</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 36,
              color: theme.navy,
              marginBottom: 12,
            }}
          >
            Three subjects. Three age groups. One clear structure.
          </h2>
          <p style={{ fontSize: 17, color: theme.muted, marginBottom: 48, lineHeight: 1.7 }}>
            We teach Math, Language, and Computer Science, and we teach them well. Each subject has a
            defined curriculum designed for three developmental stages. Students are placed by ability
            and learning style, not by school grade.
          </p>
          <div
            className="grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {COURSES.map((c, i) => {
              const detail = HOME_SUBJECT_DETAILS[c.id];
              return (
                <Card key={c.id} hoverable className={`fade-up delay-${i + 1}`}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
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
                      marginBottom: 6,
                    }}
                  >
                    {c.label}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme.navy,
                      marginBottom: 16,
                      fontStyle: 'italic',
                    }}
                  >
                    {detail?.curriculumTagline}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: theme.navy, marginBottom: 8 }}>
                    What students learn
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    {detail?.levels.map((lvl) => (
                      <div key={lvl.label} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: theme.teal, marginBottom: 4 }}>
                          ▸ {lvl.label}
                        </div>
                        {lvl.points.map((pt) => (
                          <p key={pt} style={{ fontSize: 14, color: theme.muted, lineHeight: 1.55, marginLeft: 8 }}>
                            {pt}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: theme.navy, marginBottom: 6 }}>
                    Our approach
                  </p>
                  <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65, marginBottom: 18 }}>
                    {detail?.approach}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {AGE_GROUPS.map((a) => {
                      const { href, isForm } = getEnrollmentLink(a.id, c.id);
                      return (
                        <a
                          key={a.id}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="home-age-pill"
                          title={
                            isForm
                              ? `Registration form: ${c.label} (${a.label})`
                              : `Book a call: ${c.label} (${a.label})`
                          }
                        >
                          {a.label}
                        </a>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Section 4: AI */}
      <section style={{ padding: '80px 0', background: theme.warm }}>
        <Container>
          <SectionLabel>Our Position on AI</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 24,
            }}
          >
            We teach AI. We also teach when not to use it.
          </h2>
          <div
            style={{
              background: theme.card,
              borderRadius: 16,
              padding: '32px 36px',
              border: `1px solid ${theme.border}`,
              marginBottom: 40,
            }}
          >
            {AI_ETHICS_INTRO.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 17,
                  color: theme.text,
                  lineHeight: 1.75,
                  marginBottom: i === AI_ETHICS_INTRO.length - 1 ? 0 : 16,
                }}
              >
                {para}
              </p>
            ))}
          </div>
          <div
            className="grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {AI_PRINCIPLES.map((card, i) => (
              <Card key={i} style={{ padding: 24 }}>
                <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
                <h3 style={{ fontFamily: font.display, fontSize: 18, color: theme.navy, marginBottom: 10 }}>
                  {card.title}
                </h3>
                <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.6 }}>{card.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: Personalization */}
      <section style={{ padding: '80px 0' }}>
        <Container>
          <SectionLabel>Personalized Learning</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 12,
            }}
          >
            &quot;Personalized&quot; isn&apos;t a buzzword here. It&apos;s how we operate.
          </h2>
          <p style={{ fontSize: 17, color: theme.muted, marginBottom: 48, lineHeight: 1.7 }}>
            Every child who joins LuminoLearn begins with a 4 week assessment phase (LuminoStart™)
            that maps their actual skill level, learning pace, confidence patterns, and areas of
            strength. From that data, we build a learning path that&apos;s theirs, not a generic
            syllabus assigned by age.
          </p>
          <StepIndicator steps={PERSONALIZATION_STEPS} columns={5} />
        </Container>
      </section>

      {/* Section 6: Skills */}
      <section style={{ padding: '80px 0', background: theme.light }}>
        <Container>
          <SectionLabel>Why These Skills, Why Now</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 40,
            }}
          >
            We teach the skills your child&apos;s school probably doesn&apos;t, yet.
          </h2>
          <div
            className="grid-2"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 20,
            }}
          >
            {SKILLS_THAT_MATTER.map((s, i) => (
              <Card key={i} style={{ padding: 24 }}>
                <div style={{ fontSize: 26, marginBottom: 10 }}>{s.icon}</div>
                <h3 style={{ fontFamily: font.display, fontSize: 18, color: theme.navy, marginBottom: 8 }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65 }}>{s.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 7: How it works */}
      <section id="how-it-works" style={{ padding: '80px 0' }}>
        <Container>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <SectionLabel>Getting Started</SectionLabel>
            <h2 style={{ fontFamily: font.display, fontSize: 34, color: theme.navy }}>
              From first call to first class: no confusion, no pressure
            </h2>
          </div>
          <StepIndicator steps={HOW_IT_WORKS} columns={4} />
          <div
            style={{
              marginTop: 40,
              background: theme.card,
              border: `1px solid ${theme.border}`,
              borderRadius: 12,
              padding: '18px 22px',
              fontSize: 15,
              color: theme.navy,
              lineHeight: 1.6,
            }}
          >
            <span style={{ marginRight: 8 }}>ℹ️</span>
            Accounts are set up by our team after enrollment. You don&apos;t create an account
            yourself. We handle the setup so your child&apos;s first experience is smooth and personal.
          </div>
        </Container>
      </section>

      {/* Section 8: Values */}
      <section style={{ padding: '56px 0', background: theme.warm }}>
        <Container
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          {VALUES.map((v, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: theme.teal,
                }}
              />
              <span style={{ fontSize: 16, fontWeight: 500, color: theme.navy }}>{v}</span>
            </div>
          ))}
        </Container>
      </section>

      <CtaBanner
        variant="navy"
        headline="Every child deserves to feel capable, challenged, and known."
        subtext="Book a free 30 minute discovery call. We'll listen to what your child needs, and tell you honestly whether LuminoLearn is the right fit."
        primaryLabel="Book Free Discovery Call"
        primaryHref={DISCOVERY_CALL_FORM_URL}
        secondaryLabel="Explore Learning Paths"
        secondaryTo="/learning-paths"
        tertiaryLabel="Plans & Tuition"
        tertiaryTo="/tuition"
      />
    </>
  );
}
