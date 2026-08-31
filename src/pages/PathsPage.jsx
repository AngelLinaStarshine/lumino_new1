import React from 'react';
import { Container, SectionLabel, Card, Button, PageAmbient } from '../components';
import { CONSULTATION } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const SUBJECT_PATHS = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    promise: 'From understanding what AI is to building responsibly with it.',
    accent: theme.teal,
    continues:
      'Continues into: independent research projects, contest preparation, and university foundations.',
    levels: [
      {
        name: 'Foundations',
        ages: 'ages 9 to 11',
        bullets: [
          'What AI actually is, and what it isn\'t',
          'How computers "learn" from examples, without jargon',
          'Using AI tools thoughtfully: asking good questions, spotting wrong answers',
          'First guided experiments with visual AI tools',
        ],
      },
      {
        name: 'Building',
        ages: 'ages 12 to 14',
        bullets: [
          'Introduction to machine learning: how models learn from data',
          'First real Python projects: classifying, predicting, generating',
          'The mechanics of prompting: why the same question gets different answers',
          'The ethics of AI: bias, hallucination, and where human judgement wins',
        ],
      },
      {
        name: 'Depth',
        ages: 'ages 15 to 17',
        bullets: [
          'Neural networks and the mathematics behind them',
          'Working with modern LLMs: evaluation, fine tuning intuition, agents',
          'Building end to end AI projects in Python',
          'Preparing for university level ML coursework and technical interviews',
        ],
      },
    ],
  },
  {
    id: 'cyber',
    title: 'Cybersecurity (with Post Quantum Cryptography)',
    promise: 'Digital defence for today, and the post quantum world coming next.',
    accent: theme.navyLight,
    continues:
      'Continues into: independent security projects, PQC focused research, and CTF style competitions.',
    levels: [
      {
        name: 'Foundations',
        ages: 'ages 9 to 11',
        bullets: [
          'What "secret" means to a computer: an intuitive introduction to codes',
          'Everyday safety: passwords, phishing, and safe online life',
          'Why privacy matters, and who\'s on the other end of your data',
          'First hands on games with classical ciphers',
        ],
      },
      {
        name: 'Building',
        ages: 'ages 12 to 14',
        bullets: [
          'How real encryption works, from XOR to public key intuitions',
          'Threat modelling: thinking like both defender and attacker',
          'First encounter with post quantum cryptography: what "quantum threat" actually means',
          'Building simple secure systems: passwords, hashes, digital signatures',
        ],
      },
      {
        name: 'Depth',
        ages: 'ages 15 to 17',
        bullets: [
          'Modern cryptography: symmetric, asymmetric, and hash based systems',
          'Lattice based cryptography and hash based signatures: the real mathematics of the post quantum transition',
          'Hands on labs adapted from real cybersecurity workflows',
          'Preparation for cybersecurity contests and university coursework',
        ],
      },
    ],
  },
  {
    id: 'math-physics',
    title: 'Math + Physics',
    promise: 'Mathematics becomes powerful when it explains the universe. We teach them together.',
    accent: theme.brandOrange,
    continues:
      'Continues into: contest preparation (AMC, CEMC, Physics Olympiad), research projects, and university foundations.',
    levels: [
      {
        name: 'Foundations',
        ages: 'ages 9 to 11',
        bullets: [
          'Foundational arithmetic and pre algebra, taught through real problems',
          'First encounter with motion, force, and energy as physical intuitions',
          'Estimation, measurement, and the habit of checking your answer',
          'Puzzles and games that build genuine mathematical curiosity',
        ],
      },
      {
        name: 'Building',
        ages: 'ages 12 to 14',
        bullets: [
          'Algebra, geometry, and the foundations of trigonometry',
          'Newtonian mechanics: motion, forces, and conservation',
          'Problem solving as a discipline: reading, modelling, checking',
          'Introduction to mathematical proof and physical reasoning',
        ],
      },
      {
        name: 'Depth',
        ages: 'ages 15 to 17',
        bullets: [
          'Single variable calculus and the physics it unlocks',
          'Electricity, magnetism, and modern physics foundations',
          'Olympiad grade problem sets for students who want that rigour',
          'Preparation for university level math and physics coursework',
        ],
      },
    ],
  },
];

const sectionHeading = {
  fontFamily: font.display,
  fontSize: 'clamp(2rem, 3.6vw, 2.65rem)',
  color: theme.navy,
  marginBottom: 12,
  lineHeight: 1.2,
};

const bodyCopy = {
  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
  color: theme.muted,
  lineHeight: 1.75,
  margin: 0,
};

function LevelBlock({ level, accent }) {
  return (
    <div className="paths-level-block">
      <h3 className="paths-level-block__heading">
        <span className="paths-level-chip" style={{ borderColor: `${accent}55`, color: accent }}>
          {level.name}
        </span>
        <span className="paths-level-block__ages">{level.ages}</span>
      </h3>
      <ul className="home-pillar-list paths-level-block__list">
        {level.bullets.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function PathsPage() {
  usePageMeta({
    title: 'Learning Paths — LuminoLearn',
    description:
      "LuminoLearn's curriculum grows with your child across three subjects, AI, Cybersecurity (with PQC), and Math + Physics, and three levels from ages 9 to 17. Canadian built, taught by real Canadian educators.",
    path: '/learning-paths',
  });

  return (
    <div className="home-page inner-ambient-page paths-page">
      <PageAmbient />

      <section
        className="paths-hero"
        aria-labelledby="paths-hero-heading"
        style={{
          paddingTop: 'clamp(112px, 12vh, 148px)',
          paddingBottom: 'clamp(56px, 8vw, 72px)',
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.42) 0%, rgba(253, 250, 240, 0.78) 28%, ${theme.light} 55%, ${theme.light} 100%)`,
        }}
      >
        <Container narrow style={{ textAlign: 'center', width: '100%' }}>
          <SectionLabel>Learning paths</SectionLabel>
          <h1 id="paths-hero-heading" className="fade-up inner-ambient-page__hero-title">
            A clear path from curiosity to real capability.
          </h1>
          <p className="fade-up delay-1 inner-ambient-page__hero-lead" style={{ color: theme.muted, lineHeight: 1.72 }}>
            LuminoLearn&apos;s curriculum grows with your child across three subjects and three levels, from first
            intuitions at age 9 to Olympiad grade problem solving at 17. Every path is Canadian built, privacy
            first, and taught by real Canadian educators.
          </p>
          <div className="home-hero-cta-row fade-up delay-2">
            <Button to="/book">{CONSULTATION.cta}</Button>
            <Button to="/how-we-teach" variant="secondary">
              See how we teach
            </Button>
          </div>
          <p className="home-hero-trust fade-up delay-3" role="note">
            Not sure where your child fits? Our 20 minute consultation includes a free diagnostic.
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="structure-heading" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 820 }}>
          <h2 id="structure-heading" style={sectionHeading}>
            Three subjects. Three levels. One curriculum that grows.
          </h2>
          <p style={bodyCopy}>
            Every LuminoLearn student learns through a curriculum built on three subjects: Artificial Intelligence,
            Cybersecurity (with age appropriate Post Quantum Cryptography), and Math + Physics, organized into
            three progressive levels. Levels are guided by age, but placement is based on an actual diagnostic
            during your consultation, not a birthday. Students can study any single subject, combine two, or
            follow all three as an integrated combined course.
          </p>
        </Container>
      </section>

      <section className="home-section paths-matrix-section" aria-labelledby="matrix-heading" style={{ background: theme.light }}>
        <Container>
          <h2 id="matrix-heading" style={{ ...sectionHeading, textAlign: 'center', marginBottom: 16 }}>
            The three paths at a glance
          </h2>
          <p
            style={{
              ...bodyCopy,
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto 40px',
            }}
          >
            Three subjects, each with Foundations, Building, and Depth. Placement follows your child&apos;s diagnostic,
            not their age alone.
          </p>
          <div className="paths-matrix-grid">
            {SUBJECT_PATHS.map((subject) => (
              <article key={subject.id} className="paths-matrix-column">
                <Card hoverable={false} className="paths-matrix-card">
                  <h2
                    style={{
                      fontFamily: font.display,
                      fontSize: 'clamp(1.25rem, 2vw, 1.5rem)',
                      color: theme.navy,
                      marginBottom: 10,
                      lineHeight: 1.25,
                    }}
                  >
                    {subject.title}
                  </h2>
                  <p
                    style={{
                      fontSize: 'clamp(1rem, 1.3vw, 1.08rem)',
                      fontWeight: 600,
                      fontStyle: 'italic',
                      color: subject.accent,
                      marginBottom: 24,
                      lineHeight: 1.5,
                    }}
                  >
                    {subject.promise}
                  </p>
                  {subject.levels.map((level, index) => (
                    <React.Fragment key={level.name}>
                      {index > 0 && <div className="paths-level-divider" aria-hidden />}
                      <LevelBlock level={level} accent={subject.accent} />
                    </React.Fragment>
                  ))}
                  <p className="paths-continues-note">{subject.continues}</p>
                </Card>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="combined-heading" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 760 }}>
          <Card hoverable={false}>
            <h2
              id="combined-heading"
              style={{
                fontFamily: font.display,
                fontSize: 'clamp(1.5rem, 2.8vw, 1.85rem)',
                color: theme.navy,
                marginBottom: 16,
                lineHeight: 1.25,
              }}
            >
              The combined course: three subjects, one integrated curriculum
            </h2>
            <p style={{ ...bodyCopy, marginBottom: 16 }}>
              AI, Cybersecurity, and Math + Physics aren&apos;t separate subjects. They share a common mathematical
              foundation and reinforce each other in ways isolated study can&apos;t match. The same lattice mathematics
              behind post quantum cryptography underlies certain machine learning techniques, and both are best
              understood alongside the physics that grounds them.
            </p>
            <p style={{ ...bodyCopy, marginBottom: 24 }}>
              Students in our combined course study all three subjects together as an integrated curriculum, the
              deepest and most connected path LuminoLearn offers. It&apos;s our recommended option for students
              planning to stay with us for a full academic year or longer.
            </p>
            <Button to="/book">Ask about the combined course</Button>
          </Card>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="placement-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720, textAlign: 'center' }}>
          <h2 id="placement-heading" style={sectionHeading}>
            Not sure where your child fits?
          </h2>
          <p style={{ ...bodyCopy, marginBottom: 28 }}>
            Levels are guided by age, but placement is based on an actual diagnostic, not a birthday. Some
            10 year olds are ready for Building; some 14 year olds are best served by strengthening their
            Foundations first. Our free 20 minute consultation includes a diagnostic across the subjects
            you&apos;re considering, so we can place your child exactly where they&apos;ll grow fastest.
          </p>
          <Button to="/book">{CONSULTATION.cta}</Button>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="delivery-heading" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <h2 id="delivery-heading" style={sectionHeading}>
            Delivered the way that works for your child
          </h2>
          <p style={{ ...bodyCopy, marginBottom: 24 }}>
            Every path can be taught one on one online, one on one in person (Greater Toronto Area / York Region),
            or in a small group of up to six students matched by level and goals. The right format depends on
            how your child learns best. We&apos;ll help you decide during your consultation.
          </p>
          <Button to="/how-we-teach" variant="secondary">
            See the three formats
          </Button>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="schools-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <Card hoverable={false}>
            <h2
              id="schools-heading"
              style={{
                fontFamily: font.display,
                fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                color: theme.navy,
                marginBottom: 12,
              }}
            >
              For schools, districts, and organizations
            </h2>
            <p style={{ ...bodyCopy, marginBottom: 24 }}>
              Canadian school boards, private schools, and tutoring organizations can license the LuminoLearn
              curriculum, any single subject, any combination, or the full integrated program, for their
              classrooms.
            </p>
            <Button to="/schools" variant="secondary">
              Explore school licensing
            </Button>
          </Card>
        </Container>
      </section>

      <section
        className="cta-banner-section cta-banner-navy paths-final-cta"
        aria-labelledby="paths-final-cta-heading"
        style={{
          background: `linear-gradient(135deg, ${theme.navy} 0%, #1e3a5f 50%, #243a5c 100%)`,
          padding: 'clamp(56px, 8vw, 72px) 0',
          textAlign: 'center',
        }}
      >
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <h2
            id="paths-final-cta-heading"
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(1.75rem, 3.2vw, 2rem)',
              color: '#fff',
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Ready to find the right path?
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 'clamp(1rem, 1.4vw, 1.12rem)',
              marginBottom: 28,
              lineHeight: 1.72,
              maxWidth: 560,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Book a free 20 minute consultation. A real Canadian educator will run a short diagnostic and
            recommend the path that fits your child.
          </p>
          <Button variant="warm" to="/book">
            {CONSULTATION.cta}
          </Button>
        </Container>
      </section>
    </div>
  );
}
