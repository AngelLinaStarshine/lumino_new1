import React from 'react';
import { Container, Card, Button, PageAmbient, PageHero, RelatedLinks } from '../components';
import { CONSULTATION } from '../data/siteData';
import {
  PLATFORM_FEATURES,
  PLATFORM_SCREENSHOTS,
  PLATFORM_COURSES,
  FAMILY_PLANS,
  PRIVACY_PROMISE,
} from '../data/pillars';
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

export default function PlatformPage() {
  usePageMeta({
    title: 'Learning Platform — LuminoLearn',
    description:
      'The LuminoLearn platform: a coding lab with instant feedback, practice set by your child’s educator, and progress reports for parents. Courses connect to the Ontario curriculum.',
    path: '/platform',
  });

  return (
    <div className="home-page inner-ambient-page">
      <PageAmbient />

      <PageHero
        id="platform-hero-heading"
        label="Platform"
        title="The learning platform"
        lead="Where students practise between classes and parents follow progress."
      />

      <section className="home-section" aria-labelledby="lab-heading" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 820 }}>
          <h2 id="lab-heading" style={sectionHeading}>
            What the coding lab does
          </h2>
          <ul className="tuition-checklist" aria-label="Coding lab features">
            {PLATFORM_FEATURES.map((item) => (
              <li key={item}>
                <span className="tuition-checklist__mark" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p style={{ ...bodyCopy, marginTop: 24 }}>{PRIVACY_PROMISE}</p>
        </Container>
      </section>

      <section
        className="home-section platform-screens-section"
        aria-labelledby="screens-heading"
        style={{ background: theme.light }}
      >
        <Container>
          <h2 id="screens-heading" style={sectionHeading}>
            Screenshots
          </h2>
          <div className="platform-screens-grid">
            {PLATFORM_SCREENSHOTS.map((shot, index) => (
              <figure key={shot.src} className="platform-screen">
                <div className="platform-screen__window">
                  <div className="platform-screen__bar" aria-hidden>
                    <span />
                    <span />
                    <span />
                  </div>
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    width="1600"
                    height="869"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <figcaption>{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="courses-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="courses-heading" style={sectionHeading}>
            Courses and the Ontario curriculum
          </h2>
          <p style={sectionLead}>Each course connects to parts of the Ontario curriculum your child studies at school.</p>
          <div className="home-pillars-grid">
            {PLATFORM_COURSES.map((course) => (
              <Card key={course.id} hoverable={false}>
                <h3 style={cardTitle}>{course.title}</h3>
                <p style={{ ...bodyCopy, marginBottom: 16 }}>{course.body}</p>
                <p className="pillar-card-tag">Ontario curriculum</p>
                <ul className="platform-ontario-list">
                  {course.ontario.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="family-plans-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <Card hoverable={false}>
            <span className="status-badge">{FAMILY_PLANS.status}</span>
            <h2 id="family-plans-heading" style={{ ...cardTitle, fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)' }}>
              Family plans
            </h2>
            <p style={{ ...bodyCopy, marginBottom: 20 }}>{FAMILY_PLANS.body}</p>
            <Button to="/book" variant="secondary">
              {CONSULTATION.cta}
            </Button>
          </Card>
          <RelatedLinks
            links={[
              { to: '/technology', label: 'How the technology works' },
              { to: '/programs', label: 'Programs' },
              { to: '/schools', label: 'For schools' },
            ]}
          />
        </Container>
      </section>
    </div>
  );
}
