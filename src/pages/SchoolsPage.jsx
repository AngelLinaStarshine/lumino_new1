import React from 'react';
import { Container, Card, Button, PageAmbient, PageHero, RelatedLinks } from '../components';
import { CONTACT } from '../data/siteData';
import { SCHOOL_OFFERINGS, PRIVACY_PROMISE, PRIVACY_SUMMARY } from '../data/pillars';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

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

export default function SchoolsPage() {
  usePageMeta({
    title: 'For Schools — LuminoLearn',
    description:
      'LuminoLearn for Canadian schools: the Founding Schools pilot, teacher training, classroom kits, and privacy by design in line with PIPEDA.',
    path: '/schools',
  });

  return (
    <div className="home-page inner-ambient-page">
      <PageAmbient />

      <PageHero
        id="schools-hero-heading"
        label="For schools"
        title="AI, Cybersecurity, and Math + Physics for Canadian classrooms"
        lead="Our curriculum and learning platform, with support for your teachers."
      >
        <div className="home-hero-cta-row fade-up delay-2">
          <Button href={SCHOOL_OFFERINGS[0].ctaHref}>{SCHOOL_OFFERINGS[0].ctaLabel}</Button>
          <Button to="/platform" variant="secondary">
            See the platform
          </Button>
        </div>
      </PageHero>

      <section className="home-section" aria-labelledby="schools-offer-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="schools-offer-heading" style={{ ...sectionHeading, marginBottom: 32 }}>
            What we offer schools
          </h2>
          <div className="home-pillars-grid">
            {SCHOOL_OFFERINGS.map((offer) => (
              <Card key={offer.id} hoverable={false}>
                {offer.status ? <span className="status-badge">{offer.status}</span> : null}
                <h3 style={cardTitle}>{offer.title}</h3>
                <p style={{ ...bodyCopy, marginBottom: offer.ctaHref ? 20 : 0 }}>{offer.body}</p>
                {offer.ctaHref ? (
                  <Button href={offer.ctaHref} variant="secondary">
                    {offer.ctaLabel}
                  </Button>
                ) : null}
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="schools-privacy-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <h2 id="schools-privacy-heading" style={sectionHeading}>
            Privacy summary
          </h2>
          <p style={{ ...bodyCopy, marginBottom: 20 }}>{PRIVACY_PROMISE}</p>
          <ul className="tuition-checklist" aria-label="Privacy commitments">
            {PRIVACY_SUMMARY.map((item) => (
              <li key={item}>
                <span className="tuition-checklist__mark" aria-hidden>
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <p style={{ ...bodyCopy, marginTop: 24 }}>
            Questions? Email{' '}
            <a href={`mailto:${CONTACT.email}`} style={{ color: theme.teal, fontWeight: 600 }}>
              {CONTACT.email}
            </a>
            .
          </p>
          <RelatedLinks
            links={[
              { to: '/privacy', label: 'Privacy policy' },
              { to: '/platform', label: 'Learning platform' },
              { to: '/about', label: 'About us' },
            ]}
          />
        </Container>
      </section>
    </div>
  );
}
