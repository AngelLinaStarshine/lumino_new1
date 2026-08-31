import React from 'react';
import { Container, Card, Button, PageAmbient, FooterTrustBlock, HERO_TRUST_STRIP } from '../components';
import { CONSULTATION } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const PILLARS = [
  {
    id: 'ai',
    icon: '🤖',
    title: 'Artificial Intelligence',
    promise:
      'Not just how to use AI. Learn how it works, where it fails, and how to build with it responsibly.',
    bullets: [
      'How machine learning models actually learn (from linear regression to LLMs)',
      'Prompting, evaluation, and the limits of generative AI',
      'Building small AI projects in Python',
      'The ethics: bias, hallucination, agency, and what humans still do best',
    ],
    accent: theme.teal,
  },
  {
    id: 'cyber',
    icon: '🛡️',
    title: 'Cybersecurity (with Post Quantum Readiness)',
    promise: 'Digital defence for the world today, and the post quantum world coming next.',
    bullets: [
      'Foundations of encryption, authentication, and threat modelling',
      'Everyday security: passwords, phishing, privacy, and safe online life',
      'An age appropriate introduction to post quantum cryptography (PQC): the mathematics reshaping the internet\'s next decade',
      'Hands on labs adapted from real cybersecurity workflows',
    ],
    accent: theme.navyLight,
  },
  {
    id: 'math',
    icon: '⚛️',
    title: 'Math + Physics',
    promise: 'Math becomes powerful when it explains the universe. We teach them together.',
    bullets: [
      'Algebra, geometry, and calculus taught through motion, force, and energy',
      'Physics problem solving as applied mathematics',
      'Problem sets calibrated to the student, not the average',
      'Deep intuition first, then Olympiad grade rigour for those who want it',
    ],
    accent: theme.brandOrange,
  },
];

const HOW_IT_WORKS = [
  {
    num: '1',
    title: 'Assessment',
    body: '30 minute diagnostic pinpoints exactly where the student is across each subject.',
  },
  {
    num: '2',
    title: 'Personalized path',
    body: "The platform builds an adaptive curriculum aligned to the student's level, pace, and goals.",
  },
  {
    num: '3',
    title: 'Live small group classes',
    body: 'A real Canadian educator teaches groups of 3 to 6 online, weekly.',
  },
  {
    num: '4',
    title: 'Continuous adaptation',
    body: 'Between classes, the AI adjusts practice, flags gaps, and reports progress to parents.',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Built in Canada, for Canada first',
    body: "Curriculum aligned to Canadian provincial standards. Data stored in Canada. Educators based in Canada. We're building the AI and security literacy Canada's next generation will need.",
  },
  {
    title: 'Privacy first by design',
    body: "Federated learning and differential privacy mean students' data supports learning without ever leaving their control.",
  },
  {
    title: 'Post quantum cryptography for young learners',
    body: "We're one of the first platforms anywhere teaching PQC concepts to students under 18, because the cryptographic transition happening right now will define the internet they inherit.",
  },
  {
    title: 'Human educators at the centre',
    body: 'AI adapts. Teachers teach. Kids learn best when both are present.',
  },
];

const sectionHeading = {
  fontFamily: font.display,
  fontSize: 'clamp(2rem, 3.6vw, 2.65rem)',
  color: theme.navy,
  marginBottom: 12,
  lineHeight: 1.2,
};

const sectionLead = {
  fontSize: 'clamp(1.05rem, 1.45vw, 1.25rem)',
  color: theme.muted,
  marginBottom: 40,
  lineHeight: 1.72,
  maxWidth: 720,
};

export default function HomePage() {
  usePageMeta({
    title: 'LuminoLearn — AI, Cybersecurity & Math + Physics for ages 9 to 17 (Canada)',
    description:
      'Canadian built learning platform teaching AI, Cybersecurity (including post quantum cryptography), and Math + Physics to students ages 9 to 17. Small groups, real Canadian teachers, adaptive AI, privacy first.',
    path: '/',
  });

  return (
    <div className="home-page">
      <PageAmbient />

      <section
        className="home-hero-section"
        aria-labelledby="home-hero-heading"
        style={{
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.35) 0%, rgba(253, 250, 240, 0.82) 22%, ${theme.bg} 48%, ${theme.bg} 100%)`,
        }}
      >
        <Container style={{ width: '100%', maxWidth: '100%' }}>
          <div className="home-hero fade-up">
            <h1 id="home-hero-heading" className="home-hero-title">
              The three subjects that will define the next generation.
            </h1>
            <p className="home-hero-lead">
              LuminoLearn teaches AI, Cybersecurity, and Math + Physics to students ages 9 to 17, through real
              Canadian educators, small groups, and an adaptive, privacy first platform built in Canada.
            </p>
            <div className="home-hero-cta-row">
              <Button to="/book">{CONSULTATION.ctaLong}</Button>
              <Button to="/schools" variant="secondary">
                For schools & districts
              </Button>
            </div>
            <p className="home-hero-trust" role="note">
              {HERO_TRUST_STRIP}
            </p>
          </div>
        </Container>
      </section>

      <section
        className="home-section"
        aria-labelledby="home-pillars-heading"
        style={{ background: theme.light }}
      >
        <Container>
          <h2 id="home-pillars-heading" style={sectionHeading}>
            The three pillars
          </h2>
          <p style={sectionLead}>
            AI, Cybersecurity, and Math fused with Physics, taught with depth, not hype.
          </p>
          <div className="home-pillars-grid">
            {PILLARS.map((pillar, i) => (
              <Card key={pillar.id} hoverable className={`fade-up delay-${Math.min(i + 1, 5)}`}>
                <div
                  className="home-pillar-icon"
                  aria-hidden
                  style={{ fontSize: 'clamp(2rem, 4vw, 2.5rem)', marginBottom: 12 }}
                >
                  {pillar.icon}
                </div>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                    color: theme.navy,
                    marginBottom: 12,
                    lineHeight: 1.25,
                  }}
                >
                  {pillar.title}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.3vw, 1.1rem)',
                    fontWeight: 600,
                    color: pillar.accent,
                    fontStyle: 'italic',
                    marginBottom: 16,
                    lineHeight: 1.5,
                  }}
                >
                  {pillar.promise}
                </p>
                <ul className="home-pillar-list">
                  {pillar.bullets.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section
        id="how-it-works"
        className="home-section"
        aria-labelledby="home-how-heading"
        style={{ background: theme.bg, scrollMarginTop: 96 }}
      >
        <Container>
          <h2 id="home-how-heading" style={{ ...sectionHeading, marginBottom: 40 }}>
            How it works
          </h2>
          <div className="home-timeline-grid">
            {HOW_IT_WORKS.map((step, index) => (
              <React.Fragment key={step.num}>
                {index > 0 ? (
                  <span className="home-timeline-connector" aria-hidden>
                    →
                  </span>
                ) : null}
                <article className="home-timeline-step">
                  <Card hoverable={false}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span className="operate-step-num" aria-hidden>
                        {step.num}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <h3
                          style={{
                            fontFamily: font.display,
                            fontSize: 'clamp(1.15rem, 1.8vw, 1.4rem)',
                            color: theme.navy,
                            marginBottom: 8,
                            lineHeight: 1.25,
                          }}
                        >
                          {step.title}
                        </h3>
                        <p
                          style={{
                            fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
                            color: theme.muted,
                            lineHeight: 1.7,
                            margin: 0,
                          }}
                        >
                          {step.body}
                        </p>
                      </div>
                    </div>
                  </Card>
                </article>
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="home-why-heading" style={{ background: theme.light }}>
        <Container>
          <h2 id="home-why-heading" style={sectionHeading}>
            Why LuminoLearn
          </h2>
          <p style={sectionLead}>Canadian, privacy first, and built for the subjects that matter most.</p>
          <div className="home-why-grid">
            {DIFFERENTIATORS.map((d) => (
              <article key={d.title} className="home-why-block">
                <Card hoverable={false}>
                  <h3
                    style={{
                      fontFamily: font.display,
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                      color: theme.teal,
                      marginBottom: 10,
                      lineHeight: 1.3,
                    }}
                  >
                    {d.title}
                  </h3>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
                      color: theme.muted,
                      lineHeight: 1.72,
                      margin: 0,
                    }}
                  >
                    {d.body}
                  </p>
                </Card>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="home-audience-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="home-audience-heading" className="visually-hidden">
            Get started
          </h2>
          <div className="home-audience-grid">
            <Card hoverable={false}>
              <h3
                style={{
                  fontFamily: font.display,
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                  color: theme.navy,
                  marginBottom: 12,
                }}
              >
                For parents
              </h3>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
                  color: theme.muted,
                  lineHeight: 1.72,
                  marginBottom: 24,
                }}
              >
                Give your child a decisive advantage in the subjects that matter most, with small classes, real
                Canadian teachers, and progress you can see.
              </p>
              <Button to="/book">{CONSULTATION.ctaLong}</Button>
            </Card>
            <Card hoverable={false}>
              <h3
                style={{
                  fontFamily: font.display,
                  fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                  color: theme.navy,
                  marginBottom: 12,
                }}
              >
                For Canadian schools & districts
              </h3>
              <p
                style={{
                  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
                  color: theme.muted,
                  lineHeight: 1.72,
                  marginBottom: 24,
                }}
              >
                License our AI, Cybersecurity (including PQC), and Math + Physics curriculum for your classrooms,
                with Canadian data residency and full PIPEDA alignment.
              </p>
              <Button to="/schools" variant="secondary">
                Request a pilot
              </Button>
            </Card>
          </div>
        </Container>
      </section>

      <FooterTrustBlock />
    </div>
  );
}
