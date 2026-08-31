import React from 'react';
import {
  Container,
  SectionLabel,
  Card,
  Button,
  PageAmbient,
  RelatedLinks,
} from '../components';
import { CONSULTATION } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const FORMATS = [
  {
    id: 'online',
    label: 'One on one, online',
    description:
      'A dedicated Canadian educator teaches your child live over video, on a schedule that fits your family. Fully personalized pacing, direct attention, and the flexibility of learning from home.',
    bestFor: [
      'Students who thrive with focused, undivided attention',
      'Families with busy or unpredictable schedules',
      'Accelerated learners preparing for contests or advanced coursework',
      'Anywhere in Canada. No commute required',
    ],
    accent: theme.teal,
  },
  {
    id: 'in-person',
    label: 'One on one, in person',
    description:
      'The same personalized one on one experience, delivered face to face. Available in the Greater Toronto Area and York Region.',
    bestFor: [
      'Students who learn better in a physical, distraction free setting',
      'Younger students who benefit from in person guidance',
      'Families in the GTA / York Region who prefer traditional tutoring',
      'Building confidence through direct human presence',
    ],
    accent: theme.navyLight,
  },
  {
    id: 'group',
    label: 'Small group, up to 6 students',
    description:
      'Live online classes with a maximum of six students, matched by level and goals. Small enough for every student to be seen, collaborative enough to spark real discussion.',
    bestFor: [
      'Students who thrive learning alongside peers',
      'Families who want an engaging, discussion driven environment',
      'Building communication skills alongside subject mastery',
      'Reaching the same educators and curriculum as our one on one students',
    ],
    accent: theme.brandOrange,
  },
];

const SUBJECTS = [
  {
    title: 'Artificial Intelligence',
    body: 'How machine learning actually works, how to use it responsibly, and how to build with it.',
  },
  {
    title: 'Cybersecurity (with Post Quantum Cryptography)',
    body: "Digital defence for today, and an age appropriate introduction to the post quantum cryptography reshaping the internet's next decade.",
  },
  {
    title: 'Math + Physics',
    body: 'Mathematics taught alongside the physics that gives it meaning, from foundational algebra to Olympiad grade problem solving.',
  },
];

const INCLUDED_COL_1 = [
  'Live classes with a real Canadian educator',
  'Access to the adaptive LuminoLearn platform between classes',
  "Personalized practice calibrated to your child's level",
  'Weekly progress updates for parents',
  "Direct messaging with your child's educator between classes",
];

const INCLUDED_COL_2 = [
  'Full curriculum in AI, Cybersecurity (with PQC), and Math + Physics',
  'Canadian built, PIPEDA aligned technology',
  "Canadian data residency. Your child's data stays in Canada",
  'Monthly one on one parent check ins available on request',
  'No long term contract. You can adjust or pause any month',
];

const HOW_IT_STARTS = [
  {
    num: '1',
    title: 'Book a free consultation',
    body: 'A 20 minute conversation with a real Canadian educator. No sales pressure, no obligation.',
  },
  {
    num: '2',
    title: 'Diagnostic and plan',
    body: "We assess your child's current level across the subjects you're considering, and recommend the format that fits.",
  },
  {
    num: '3',
    title: 'Start learning',
    body: 'Your child begins in the format we\'ve chosen together, online, in person, or in a small group, with a Canadian educator matched to their needs.',
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
  maxWidth: 760,
};

const bodyCopy = {
  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
  color: theme.muted,
  lineHeight: 1.75,
  margin: 0,
};

function CheckList({ items }) {
  return (
    <ul className="tuition-checklist" aria-label="Included benefits">
      {items.map((item) => (
        <li key={item}>
          <span className="tuition-checklist__mark" aria-hidden>
            ✓
          </span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export default function TuitionPage() {
  usePageMeta({
    title: 'How We Teach — LuminoLearn',
    description:
      'LuminoLearn teaches AI, Cybersecurity, and Math + Physics to students ages 9 to 17, one on one online, one on one in person, or in small groups of up to six. Real Canadian educators. Book a free consultation.',
    path: '/how-we-teach',
  });

  return (
    <div className="home-page inner-ambient-page tuition-page">
      <PageAmbient />

      <section
        className="tuition-hero"
        aria-labelledby="tuition-hero-heading"
        style={{
          paddingTop: 'clamp(112px, 12vh, 148px)',
          paddingBottom: 'clamp(56px, 8vw, 72px)',
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.42) 0%, rgba(253, 250, 240, 0.78) 28%, ${theme.light} 55%, ${theme.light} 100%)`,
        }}
      >
        <Container narrow style={{ textAlign: 'center', width: '100%' }}>
          <SectionLabel>How we teach</SectionLabel>
          <h1 id="tuition-hero-heading" className="fade-up inner-ambient-page__hero-title">
            Learning that fits how your child learns best.
          </h1>
          <p className="fade-up delay-1 inner-ambient-page__hero-lead" style={{ color: theme.muted, lineHeight: 1.72 }}>
            LuminoLearn teaches AI, Cybersecurity (including post quantum cryptography), and Math + Physics to
            students ages 9 to 17, in the format that works for your family. One on one online, one on one in
            person, or in a small group of no more than six students.
          </p>
          <div className="home-hero-cta-row fade-up delay-2">
            <Button to="/book">{CONSULTATION.cta}</Button>
            <Button to="/schools" variant="secondary">
              For schools & districts
            </Button>
          </div>
          <p className="home-hero-trust fade-up delay-3" role="note">
            Real Canadian educators · Personalized to your child · No long term contracts
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="formats-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="formats-heading" style={sectionHeading}>
            Three ways to learn
          </h2>
          <p style={{ ...sectionLead, maxWidth: 680 }}>
            Every child learns differently. Choose the format that fits yours, or combine them across subjects.
          </p>
          <div className="home-pillars-grid tuition-formats-grid">
            {FORMATS.map((format) => (
              <Card key={format.id} hoverable className="tuition-format-card">
                <p
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: format.accent,
                    marginBottom: 12,
                  }}
                >
                  {format.label}
                </p>
                <p style={{ ...bodyCopy, marginBottom: 20 }}>{format.description}</p>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 'clamp(1.05rem, 1.6vw, 1.2rem)',
                    color: theme.navy,
                    marginBottom: 10,
                  }}
                >
                  Best for
                </h3>
                <ul className="home-pillar-list">
                  {format.bestFor.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="subjects-heading" style={{ background: theme.light }}>
        <Container>
          <h2 id="subjects-heading" style={sectionHeading}>
            The three subjects
          </h2>
          <p style={sectionLead}>
            Whichever format you choose, your child can study any of our three subjects, or combine them.
          </p>
          <div className="tuition-subjects-grid">
            {SUBJECTS.map((subject) => (
              <article key={subject.title}>
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
                    {subject.title}
                  </h3>
                  <p style={bodyCopy}>{subject.body}</p>
                </Card>
              </article>
            ))}
          </div>
          <p
            style={{
              ...bodyCopy,
              marginTop: 28,
              textAlign: 'center',
              maxWidth: 640,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Students can study a single subject, combine any two, or take all three as an integrated combined
            course. We&apos;ll help you decide during your consultation.
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="included-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="included-heading" style={sectionHeading}>
            What&apos;s included, in every format
          </h2>
          <div className="tuition-included-grid">
            <CheckList items={INCLUDED_COL_1} />
            <CheckList items={INCLUDED_COL_2} />
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="how-starts-heading" style={{ background: theme.light }}>
        <Container>
          <h2 id="how-starts-heading" style={{ ...sectionHeading, marginBottom: 40 }}>
            How it starts
          </h2>
          <div className="tuition-starts-grid">
            {HOW_IT_STARTS.map((step, index) => (
              <React.Fragment key={step.num}>
                {index > 0 ? (
                  <span className="home-timeline-connector tuition-starts-connector" aria-hidden>
                    →
                  </span>
                ) : null}
                <article>
                  <Card hoverable={false}>
                    <div style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                      <span className="operate-step-num" aria-hidden>
                        {step.num}
                      </span>
                      <div style={{ minWidth: 0 }}>
                        <h3
                          style={{
                            fontFamily: font.display,
                            fontSize: 'clamp(1.1rem, 1.7vw, 1.3rem)',
                            color: theme.navy,
                            marginBottom: 8,
                            lineHeight: 1.25,
                          }}
                        >
                          {step.title}
                        </h3>
                        <p style={bodyCopy}>{step.body}</p>
                      </div>
                    </div>
                  </Card>
                </article>
              </React.Fragment>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="schools-block-heading" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <Card hoverable={false}>
            <h2
              id="schools-block-heading"
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
              Canadian school boards, private schools, and tutoring organizations can license LuminoLearn&apos;s
              curriculum and platform for their classrooms. Pilot programs are available for Canadian institutions.
            </p>
            <Button to="/schools" variant="secondary">
              Request a school licensing conversation
            </Button>
          </Card>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="accessibility-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <h2 id="accessibility-heading" style={sectionHeading}>
            Making LuminoLearn accessible
          </h2>
          <p style={bodyCopy}>
            We believe every Canadian child deserves access to serious, forward looking education. If cost or
            logistics would otherwise be a barrier for your family, please mention it during your consultation.
            The conversation is confidential.
          </p>
          <RelatedLinks
            links={[
              { to: '/learning-paths', label: 'Learning paths' },
              { to: '/our-story', label: 'Our story' },
            ]}
          />
        </Container>
      </section>

      <section
        className="cta-banner-section cta-banner-navy tuition-final-cta"
        aria-labelledby="tuition-final-cta-heading"
        style={{
          background: `linear-gradient(135deg, ${theme.navy} 0%, #1e3a5f 50%, #243a5c 100%)`,
          padding: 'clamp(56px, 8vw, 72px) 0',
          textAlign: 'center',
        }}
      >
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <h2
            id="tuition-final-cta-heading"
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(1.75rem, 3.2vw, 2rem)',
              color: '#fff',
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            Ready to find the right fit?
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
            Book a free 20 minute consultation. A real Canadian educator will help you choose the format that
            fits your child, and answer any questions you have.
          </p>
          <Button variant="warm" to="/book">
            {CONSULTATION.cta}
          </Button>
          <p
            style={{
              marginTop: 20,
              fontSize: 'clamp(0.78rem, 1.1vw, 0.88rem)',
              color: 'rgba(255,255,255,0.75)',
              lineHeight: 1.55,
            }}
          >
            Consultations are conducted by real Canadian educators. No sales pressure. No obligation.
          </p>
        </Container>
      </section>
    </div>
  );
}
