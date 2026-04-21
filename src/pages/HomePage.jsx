import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Button, useLenis, PageAmbient } from '../components';
import { DISCOVERY_CALL_URL } from '../data/siteData';
import { theme, font } from '../styles/theme';

const HOW_IT_WORKS_STEPS = [
  {
    num: '1',
    title: 'Tell us about your child',
    body:
      'A 30 minute call where we listen. What are they good at? Where do they struggle? What lights them up?',
  },
  {
    num: '2',
    title: 'We build their plan',
    body:
      'Placement assessment, personalized pathway, and a small group matched to their level and learning style.',
  },
  {
    num: '3',
    title: 'They start learning',
    body:
      'Structured sessions with a teacher who knows their name, tracks their progress, and adjusts as they grow.',
  },
];

const HOME_SUBJECT_CARDS = [
  {
    id: 'math',
    icon: '🧮',
    programName: 'Number Ninjas',
    subject: 'Mathematics',
    color: '#2A7B6F',
    tagline: 'Build the thinking, not just the answers.',
    approach:
      'Students move forward when they own the concept, not when the class does. We build mathematical thinking, not just calculation speed.',
    curriculumTo: '/learning-paths#mathematics',
  },
  {
    id: 'language',
    icon: '📖',
    programName: 'Word Wizards',
    subject: 'Language',
    color: '#8B6914',
    tagline: 'Read carefully. Write precisely. Speak with confidence.',
    approach:
      'Reading and writing are inseparable. Students read carefully, discuss honestly, and write with increasing precision, building voice and structure at the same time.',
    curriculumTo: '/learning-paths#language',
  },
  {
    id: 'cs',
    icon: '💻',
    programName: 'Code Explorers',
    subject: 'Computer Science',
    color: '#4A5899',
    tagline: "Learn to solve problems that don't have a textbook answer.",
    approach:
      'We teach thinking, not tools. Students learn to break down problems, design solutions, and build things that work, and to use technology responsibly, not just skillfully.',
    curriculumTo: '/learning-paths#cs',
  },
];

const HOME_WALK_AWAY_SKILLS = [
  {
    num: '1',
    label: 'Mathematical reasoning',
    desc: "The ability to estimate, prove, and know when an answer doesn't make sense.",
    color: theme.teal,
  },
  {
    num: '2',
    label: 'Structured writing',
    desc: 'Not just grammar. Argument, evidence, and a voice that is unmistakably theirs.',
    color: theme.brandOrange,
  },
  {
    num: '3',
    label: 'Computational thinking',
    desc: 'Breaking big problems into small, solvable ones. The skill underneath every tech career.',
    color: theme.navyLight,
  },
  {
    num: '4',
    label: 'AI literacy',
    desc: 'Understanding how AI works well enough to use it wisely and question it honestly.',
    color: '#7c3aed',
  },
  {
    num: '5',
    label: 'Communication',
    desc: 'Presenting ideas clearly, listening carefully, and holding your own in a room.',
    color: theme.brandMint,
  },
  {
    num: '6',
    label: 'Data reasoning',
    desc: 'Reading numbers, charts, and claims without being fooled by them.',
    color: theme.teal,
  },
];

export default function HomePage() {
  const lenis = useLenis();

  const scrollToHowItWorks = (e) => {
    e.preventDefault();
    const el = document.getElementById('how-it-works');
    if (!el) return;
    if (lenis) {
      lenis.scrollTo(el, { offset: -88 });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const linkMuted = {
    fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
    fontWeight: 600,
    color: theme.teal,
    textDecoration: 'underline',
    textUnderlineOffset: 3,
    fontFamily: font.body,
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    padding: 0,
  };

  return (
    <div className="home-page">
      <PageAmbient />

      {/* Section 2: Hero (full viewport below nav) */}
      <section
        className="home-hero-section"
        style={{
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.35) 0%, rgba(253, 250, 240, 0.82) 22%, ${theme.bg} 48%, ${theme.bg} 100%)`,
        }}
      >
        <Container style={{ width: '100%', maxWidth: '100%' }}>
          <div className="home-hero fade-up">
            <h1 className="home-hero-title">
              In a classroom of 30, your child disappears.
              <br />
              In ours, they can&apos;t.
            </h1>
            <p className="home-hero-lead">
              LuminoLearn Academy is a structured, human-first learning space where children ages 9 to 17 build real
              skills in Mathematics, Language, and Computer Science through small group instruction, personalized
              pathways, and teachers who know them by name.
            </p>
            <p className="home-hero-slogan">Light the path they&apos;ll lead.</p>
            <p className="home-hero-credo">Personalized education, anywhere anytime.</p>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 20,
              }}
            >
              <Button href={DISCOVERY_CALL_URL}>Talk to us about your child →</Button>
              <button type="button" onClick={scrollToHowItWorks} style={linkMuted}>
                See how it works ↓
              </button>
            </div>
          </div>
        </Container>
      </section>

      {/* Section 3: How it works */}
      <section
        id="how-it-works"
        style={{ padding: 'clamp(56px, 8vw, 88px) 0', background: theme.bg, scrollMarginTop: 96 }}
        aria-labelledby="home-how-heading"
      >
        <Container>
          <h2
            id="home-how-heading"
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(2rem, 3.6vw, 2.65rem)',
              color: theme.navy,
              marginBottom: 40,
              lineHeight: 1.2,
            }}
          >
            How it works
          </h2>
          <div className="home-how-grid">
            {HOW_IT_WORKS_STEPS.map((step, index) => (
              <React.Fragment key={step.num}>
                {index > 0 ? <span className="home-how-connector" aria-hidden>→</span> : null}
                <Card hoverable={false}>
                  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 14 }}>
                    <span className="operate-step-num" style={{ flexShrink: 0 }}>
                      {step.num}
                    </span>
                    <div style={{ minWidth: 0 }}>
                      <h3
                        style={{
                          fontFamily: font.display,
                          fontSize: 'clamp(1.25rem, 2vw, 1.6rem)',
                          color: theme.navy,
                          marginBottom: 10,
                          lineHeight: 1.25,
                        }}
                      >
                        {step.title}
                      </h3>
                      <p style={{ fontSize: 'clamp(1.02rem, 1.35vw, 1.2rem)', color: theme.muted, lineHeight: 1.72, margin: 0 }}>
                        {step.body}
                      </p>
                    </div>
                  </div>
                </Card>
              </React.Fragment>
            ))}
          </div>
          <div style={{ marginTop: 36, textAlign: 'center' }}>
            <a
              href={DISCOVERY_CALL_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 'clamp(1.02rem, 1.35vw, 1.2rem)',
                fontWeight: 700,
                color: theme.teal,
                textDecoration: 'none',
                borderBottom: `2px solid rgba(17, 94, 89, 0.35)`,
                paddingBottom: 2,
              }}
            >
              Talk to us about your child →
            </a>
          </div>
        </Container>
      </section>

      {/* Section 4: What your child will learn */}
      <section style={{ padding: '80px 0', background: theme.light }}>
        <Container>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(2rem, 3.6vw, 2.65rem)',
              color: theme.navy,
              marginBottom: 12,
            }}
          >
            What your child will learn
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.45vw, 1.25rem)',
              color: theme.muted,
              marginBottom: 48,
              lineHeight: 1.72,
              maxWidth: 680,
            }}
          >
            Three subjects taught with depth and care, placed by ability, not by age.
          </p>
          <div
            className="grid-3"
            style={{ display: 'grid', gap: 24, gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}
          >
            {HOME_SUBJECT_CARDS.map((c, i) => (
              <Card key={c.id} hoverable className={`fade-up delay-${Math.min(i + 1, 5)}`}>
                <div style={{ fontSize: 'clamp(2.1rem, 4vw, 2.5rem)', marginBottom: 12 }}>{c.icon}</div>
                <div
                  style={{
                    fontSize: 'clamp(0.9rem, 1.2vw, 1rem)',
                    fontWeight: 700,
                    color: theme.navy,
                    marginBottom: 4,
                    fontFamily: font.display,
                  }}
                >
                  {c.programName}
                </div>
                <div
                  style={{
                    fontSize: 'clamp(0.78rem, 1vw, 0.9rem)',
                    fontWeight: 600,
                    color: c.color,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    marginBottom: 10,
                  }}
                >
                  {c.subject}
                </div>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.35vw, 1.15rem)',
                    fontWeight: 600,
                    color: theme.navy,
                    fontStyle: 'italic',
                    marginBottom: 14,
                    lineHeight: 1.45,
                  }}
                >
                  {c.tagline}
                </p>
                <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.12rem)', color: theme.muted, lineHeight: 1.7, marginBottom: 20 }}>
                  {c.approach}
                </p>
                <Link
                  to={c.curriculumTo}
                  style={{
                    fontSize: 'clamp(1rem, 1.25vw, 1.1rem)',
                    fontWeight: 700,
                    color: theme.teal,
                    textDecoration: 'none',
                    borderBottom: '2px solid rgba(17, 94, 89, 0.35)',
                    paddingBottom: 2,
                  }}
                >
                  See the full curriculum →
                </Link>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 5: What parents say (hidden until real quotes are ready) */}

      {/* Section 6: What your child walks away with */}
      <section style={{ padding: 'clamp(56px, 8vw, 88px) 0', background: theme.bg }} aria-labelledby="home-walk-heading">
        <Container>
          <h2
            id="home-walk-heading"
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(1.95rem, 3.4vw, 2.55rem)',
              color: theme.navy,
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            What your child walks away with
          </h2>
          <p
            style={{
              fontSize: 'clamp(1.05rem, 1.45vw, 1.25rem)',
              color: theme.muted,
              marginBottom: 40,
              lineHeight: 1.72,
              maxWidth: 760,
            }}
          >
            The skills schools rarely teach in depth, and the values we refuse to skip.
          </p>
          <div className="home-walkaway-grid">
            {HOME_WALK_AWAY_SKILLS.map((s) => (
              <Card key={s.num} hoverable={false}>
                <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <span
                    className="operate-step-num"
                    style={{
                      flexShrink: 0,
                      background: s.color,
                      borderColor: 'transparent',
                    }}
                  >
                    {s.num}
                  </span>
                  <div style={{ minWidth: 0 }}>
                    <h3
                      style={{
                        fontFamily: font.display,
                        fontSize: 'clamp(1.12rem, 1.75vw, 1.35rem)',
                        color: theme.navy,
                        marginBottom: 8,
                        lineHeight: 1.3,
                      }}
                    >
                      {s.label}
                    </h3>
                    <p style={{ fontSize: 'clamp(1rem, 1.3vw, 1.12rem)', color: theme.muted, lineHeight: 1.7, margin: 0 }}>
                      {s.desc}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Section 7: Bottom CTA */}
      <section
        style={{
          padding: 'clamp(64px, 9vw, 96px) 0',
          background: `linear-gradient(180deg, ${theme.light} 0%, ${theme.bg} 100%)`,
          borderTop: `1px solid ${theme.border}`,
        }}
      >
        <Container narrow style={{ textAlign: 'center', maxWidth: 640 }}>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(1.9rem, 4.5vw, 2.55rem)',
              color: theme.navy,
              marginBottom: 18,
              lineHeight: 1.22,
            }}
          >
            Ready when you are
          </h2>
          <p style={{ fontSize: 'clamp(1.08rem, 1.6vw, 1.3rem)', color: theme.muted, lineHeight: 1.72, marginBottom: 32 }}>
            Book a short call to see if we are a fit, or explore our learning paths first.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
            <Button
              href={DISCOVERY_CALL_URL}
              style={{ fontSize: 'clamp(1.05rem, 1.45vw, 1.2rem)', padding: '16px 32px' }}
            >
              Talk to us about your child →
            </Button>
            <Link
              to="/learning-paths"
              style={{
                fontSize: 'clamp(1.02rem, 1.35vw, 1.15rem)',
                fontWeight: 600,
                color: theme.teal,
                textDecoration: 'underline',
                textUnderlineOffset: 3,
              }}
            >
              Or explore our learning paths first →
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
