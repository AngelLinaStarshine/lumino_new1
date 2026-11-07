import React from 'react';
import { Container, Card, Button, PageAmbient, PageHero, RelatedLinks } from '../components';
import { CONSULTATION } from '../data/siteData';
import { PROGRAMS, CAMPS } from '../data/pillars';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

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
  marginBottom: 36,
  lineHeight: 1.72,
  maxWidth: 720,
  marginLeft: 'auto',
  marginRight: 'auto',
};

const bodyCopy = {
  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
  color: theme.muted,
  lineHeight: 1.72,
  margin: 0,
};

const cardTitle = {
  fontFamily: font.display,
  fontSize: 'clamp(1.2rem, 1.9vw, 1.4rem)',
  color: theme.navy,
  marginBottom: 8,
  lineHeight: 1.25,
};

const MORE_DETAIL = [
  {
    title: 'Subjects and levels',
    body: 'AI, Cybersecurity, and Math + Physics, each at three levels: Foundations, Building, and Depth.',
    to: '/learning-paths',
    cta: 'See learning paths',
  },
  {
    title: 'Formats',
    body: 'One on one online, one on one in person in the GTA / York Region, or a small online group of up to six.',
    to: '/how-we-teach',
    cta: 'See how we teach',
  },
];

export default function ProgramsPage() {
  usePageMeta({
    title: 'Programs — LuminoLearn',
    description:
      'LuminoLearn tutoring and courses in AI, Cybersecurity, and Math + Physics for ages 9 to 17: LuminoStart, LuminoCore, after-school and homeschool groups, a free taster class, and camps.',
    path: '/programs',
  });

  return (
    <div className="home-page inner-ambient-page">
      <PageAmbient />

      <PageHero
        id="programs-hero-heading"
        label="Programs"
        title="Tutoring and courses"
        lead="Live classes with Canadian educators in AI, Cybersecurity, and Math + Physics, for students ages 9 to 17."
      >
        <div className="home-hero-cta-row fade-up delay-2">
          <Button to="/book">{CONSULTATION.cta}</Button>
        </div>
      </PageHero>

      <section className="home-section" aria-labelledby="programs-list-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="programs-list-heading" style={sectionHeading}>
            Our programs
          </h2>
          <p style={sectionLead}>New students start with LuminoStart, then continue in the program that fits.</p>
          <div className="pillar-card-grid">
            {PROGRAMS.map((program) => (
              <Card key={program.id} hoverable={false}>
                <p className="pillar-card-tag">{program.tag}</p>
                <h3 style={cardTitle}>{program.name}</h3>
                <p style={bodyCopy}>{program.body}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="camps-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <Card hoverable={false}>
            <h2 id="camps-heading" style={{ ...cardTitle, fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)' }}>
              {CAMPS.title}
            </h2>
            <p style={{ ...bodyCopy, marginBottom: 20 }}>{CAMPS.body}</p>
            <Button href={CAMPS.ctaHref} variant="secondary">
              {CAMPS.ctaLabel}
            </Button>
          </Card>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="programs-detail-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="programs-detail-heading" style={sectionHeading}>
            More detail
          </h2>
          <div className="home-why-grid">
            {MORE_DETAIL.map((item) => (
              <Card key={item.to} hoverable={false}>
                <h3 style={cardTitle}>{item.title}</h3>
                <p style={{ ...bodyCopy, marginBottom: 20 }}>{item.body}</p>
                <Button to={item.to} variant="secondary">
                  {item.cta}
                </Button>
              </Card>
            ))}
          </div>
          <RelatedLinks
            links={[
              { to: '/platform', label: 'Learning platform' },
              { to: '/enroll', label: 'Enroll' },
              { to: '/about', label: 'About us' },
            ]}
          />
        </Container>
      </section>
    </div>
  );
}
