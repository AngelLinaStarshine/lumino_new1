import React from 'react';
import { Container, Card, Button, PageAmbient, SectionLabel, RelatedLinks } from '../components';
import { CONSULTATION } from '../data/siteData';
import {
  PLATFORM_AUDIENCES,
  PLATFORM_DIFFERENCES,
  PLATFORM_SCREENSHOTS,
  PLATFORM_COURSES,
  HUB_AVAILABLE,
  PLATFORM_JOIN,
  PLATFORM_FAQ,
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

function ScreenFrame({ src, alt, eager = false }) {
  return (
    <div className="platform-screen__window">
      <div className="platform-screen__bar" aria-hidden>
        <span />
        <span />
        <span />
      </div>
      <img
        src={src}
        alt={alt}
        width="1600"
        height="869"
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
      />
    </div>
  );
}

export default function PlatformPage() {
  usePageMeta({
    title: 'The LuminoLearn Hub — LuminoLearn',
    description:
      'The LuminoLearn Hub: students practise real Python in the browser with exact marking, teachers stay in charge, and families see real progress. Ages 12–18, aligned with the Ontario curriculum.',
    path: '/platform',
  });

  return (
    <div className="home-page inner-ambient-page">
      <PageAmbient />

      <section
        className="platform-hero"
        aria-labelledby="platform-hero-heading"
        style={{
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.42) 0%, rgba(253, 250, 240, 0.78) 28%, ${theme.light} 55%, ${theme.light} 100%)`,
        }}
      >
        <Container>
          <div className="platform-hero__grid">
            <div className="platform-hero__text fade-up">
              <SectionLabel>Platform</SectionLabel>
              <h1 id="platform-hero-heading" className="inner-ambient-page__hero-title">
                The LuminoLearn Hub
              </h1>
              <p className="inner-ambient-page__hero-lead" style={{ color: theme.muted, lineHeight: 1.72 }}>
                Where students practise between classes, teachers stay in charge, and families see real progress.
              </p>
              <p className="platform-hero__labels">
                Ages 12–18 · Aligned with the Ontario curriculum · Privacy by design
              </p>
              <div className="platform-hero__ctas">
                <Button to="/book">{CONSULTATION.ctaLong}</Button>
                <Button to="/schools" variant="secondary">
                  For schools
                </Button>
              </div>
            </div>
            <div className="platform-hero__screen fade-up delay-1">
              <ScreenFrame
                src="/images/platform/hub-lesson.webp"
                alt="A Hub lesson with Python code checked by real tests, with instant feedback and hints."
                eager
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="people-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="people-heading" style={sectionHeading}>
            Built for three people
          </h2>
          <div className="platform-people-grid">
            {PLATFORM_AUDIENCES.map((group) => (
              <Card key={group.id} hoverable={false} className="platform-card">
                <div className="platform-people__shot">
                  <ScreenFrame src={group.image} alt={group.alt} />
                </div>
                <h3 style={cardTitle}>{group.title}</h3>
                <ul className="tuition-checklist" aria-label={group.title}>
                  {group.points.map((point) => (
                    <li key={point}>
                      <span className="tuition-checklist__mark" aria-hidden>
                        ✓
                      </span>
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="different-heading" style={{ background: theme.light }}>
        <Container>
          <h2 id="different-heading" style={sectionHeading}>
            What makes it different
          </h2>
          <div className="home-pillars-grid">
            {PLATFORM_DIFFERENCES.map((item, index) => (
              <Card key={item.id} hoverable={false} className="platform-card platform-catalogue-card">
                <p className="platform-catalogue-card__no">No. {String(index + 1).padStart(2, '0')}</p>
                <h3 style={cardTitle}>{item.title}</h3>
                <p style={bodyCopy}>{item.body}</p>
                {item.stamp ? (
                  <span className="platform-stamp" aria-label={`${item.stamp} stamp`}>
                    {item.stamp}
                  </span>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="home-section platform-screens-section"
        aria-labelledby="tour-heading"
        style={{ background: theme.bg }}
      >
        <Container>
          <h2 id="tour-heading" style={sectionHeading}>
            A look inside
          </h2>
          <div className="platform-tour">
            {PLATFORM_SCREENSHOTS.map((shot, index) => (
              <figure
                key={shot.src}
                className={`platform-tour__row${index % 2 === 1 ? ' platform-tour__row--flip' : ''}`}
              >
                <div className="platform-tour__image">
                  <ScreenFrame src={shot.src} alt={shot.alt} />
                </div>
                <figcaption className="platform-tour__text">
                  <h3 style={cardTitle}>{shot.heading}</h3>
                  <p style={bodyCopy}>{shot.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="courses-heading" style={{ background: theme.light }}>
        <Container>
          <h2 id="courses-heading" style={sectionHeading}>
            Courses and the Ontario curriculum
          </h2>
          <p style={sectionLead}>Each course connects to Ontario courses your child takes in Grades 8 to 12.</p>
          <div className="home-pillars-grid">
            {PLATFORM_COURSES.map((course) => (
              <Card key={course.id} hoverable={false} className="platform-card">
                <h3 style={cardTitle}>{course.title}</h3>
                <p style={{ ...bodyCopy, marginBottom: 16 }}>{course.body}</p>
                <p className="pillar-card-tag">Ontario curriculum</p>
                <ul className="platform-ontario-list">
                  {course.ontario.map((link) => (
                    <li key={link.label}>
                      <a href={link.href} target="_blank" rel="noopener noreferrer">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
          <div className="platform-available">
            <h3 style={cardTitle}>Available on the Hub</h3>
            <p style={bodyCopy}>
              <strong style={{ color: theme.navy }}>Available now:</strong> {HUB_AVAILABLE.now.join(' · ')}
            </p>
            <p style={{ ...bodyCopy, marginTop: 8 }}>
              <strong style={{ color: theme.navy }}>Coming in 2027:</strong> {HUB_AVAILABLE.coming2027.join(' · ')}
            </p>
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="join-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="join-heading" style={sectionHeading}>
            Ways to join
          </h2>
          <div className="home-audience-grid">
            {PLATFORM_JOIN.map((option) => (
              <Card key={option.id} hoverable={false} className="platform-card platform-join-card">
                <h3 style={cardTitle}>{option.title}</h3>
                <p style={{ ...bodyCopy, marginBottom: 20 }}>{option.body}</p>
                <Button to={option.to} variant="secondary">
                  {option.ctaLabel}
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="faq-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 820 }}>
          <h2 id="faq-heading" style={sectionHeading}>
            Questions
          </h2>
          <div className="platform-faq">
            {PLATFORM_FAQ.map((item) => (
              <details key={item.q} className="platform-faq__item">
                <summary>{item.q}</summary>
                <p style={bodyCopy}>{item.a}</p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      <section className="platform-closing" aria-labelledby="closing-heading">
        <Container narrow style={{ maxWidth: 820, textAlign: 'center' }}>
          <h2 id="closing-heading" className="platform-closing__title">
            Curious how it would work for your child or your class?
          </h2>
          <div className="platform-hero__ctas platform-closing__ctas">
            <Button to="/book">{CONSULTATION.ctaLong}</Button>
            <Button to="/schools" variant="secondary">
              For schools
            </Button>
          </div>
        </Container>
      </section>

      <section className="home-section" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 720 }}>
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
