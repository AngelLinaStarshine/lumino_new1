import React from 'react';
import { Container, Card, Button, PageAmbient, PageHero } from '../components';
import { CONTACT, CONSULTATION } from '../data/siteData';
import { SAFETY_POINTS } from '../data/pillars';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const sectionHeading = {
  fontFamily: font.display,
  fontSize: 'clamp(2rem, 3.6vw, 2.65rem)',
  color: theme.navy,
  marginBottom: 16,
  lineHeight: 1.2,
};

const bodyCopy = {
  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
  color: theme.muted,
  lineHeight: 1.72,
  margin: 0,
};

export default function AboutPage() {
  usePageMeta({
    title: 'About — LuminoLearn',
    description:
      'About LuminoLearn: our story, how we keep students safe, accessibility, and how to contact us. Based in Ontario, Canada.',
    path: '/about',
  });

  return (
    <div className="home-page inner-ambient-page">
      <PageAmbient />

      <PageHero
        id="about-hero-heading"
        label="About"
        title="About LuminoLearn"
        lead="A Canadian company teaching AI, Cybersecurity, and Math + Physics to students ages 12 to 18."
      />

      <section className="home-section" aria-labelledby="about-story-heading" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <h2 id="about-story-heading" style={sectionHeading}>
            Our story
          </h2>
          <p style={{ ...bodyCopy, marginBottom: 20 }}>
            We built LuminoLearn to teach AI, cybersecurity, and math + physics as a structured curriculum, taught by
            Canadian educators. We&apos;re based in Ontario and serve families across the Greater Toronto Area and
            online across Canada.
          </p>
          <Button to="/our-story" variant="secondary">
            Read our full story
          </Button>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="about-safety-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <h2 id="about-safety-heading" style={sectionHeading}>
            Safety
          </h2>
          <ul className="tuition-checklist" aria-label="How we keep students safe">
            {SAFETY_POINTS.map((item) => (
              <li key={item}>
                <span className="tuition-checklist__mark" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="about-access-heading" style={{ background: theme.bg }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <h2 id="about-access-heading" style={sectionHeading}>
            Accessibility
          </h2>
          <p style={{ ...bodyCopy, marginBottom: 16 }}>
            We aim to meet WCAG 2.1 AA on this site and on the learning platform. If something is hard to use, email{' '}
            <a href={`mailto:${CONTACT.email}`} style={{ color: theme.teal, fontWeight: 600 }}>
              {CONTACT.email}
            </a>{' '}
            and we&apos;ll fix it.
          </p>
          <p style={bodyCopy}>
            If cost or logistics would make it hard for your family to take part, mention it during your consultation.
            The conversation is confidential.
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="about-contact-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <Card hoverable={false}>
            <h2 id="about-contact-heading" style={{ ...sectionHeading, fontSize: 'clamp(1.5rem, 2.6vw, 1.9rem)' }}>
              Contact
            </h2>
            <p style={{ ...bodyCopy, color: theme.navy, marginBottom: 8 }}>
              <strong>Email:</strong>{' '}
              <a href={`mailto:${CONTACT.email}`} style={{ color: theme.teal, fontWeight: 600 }}>
                {CONTACT.email}
              </a>
            </p>
            <p style={{ ...bodyCopy, color: theme.navy, marginBottom: 24 }}>
              <strong>Phone:</strong> {CONTACT.phone}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
              <Button to="/book">{CONSULTATION.cta}</Button>
              <Button to="/contact" variant="secondary">
                Partnerships and other inquiries
              </Button>
            </div>
          </Card>
        </Container>
      </section>
    </div>
  );
}
