import React from 'react';
import Container from './Container';
import Button from './Button';
import { theme, font } from '../styles/theme';
import { DISCOVERY_CALL_FORM_URL } from '../data/siteData';

const LIGHT_DEFAULTS = {
  headline: 'Ready to see if LuminoLearn is right for your family?',
  subtext:
    "Book a free 30 minute session. No commitment: just a conversation about your child's learning.",
  primaryLabel: 'Book Free Discovery Call',
  primaryHref: DISCOVERY_CALL_FORM_URL,
  secondaryLabel: 'Explore Learning Paths',
  secondaryTo: '/learning-paths',
  tertiaryLabel: 'Plans & Tuition',
  tertiaryTo: '/tuition',
};

export default function CtaBanner({
  variant = 'light',
  headline,
  subtext,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryTo,
  tertiaryLabel,
  tertiaryTo,
}) {
  const h = headline ?? LIGHT_DEFAULTS.headline;
  const st = subtext ?? LIGHT_DEFAULTS.subtext;
  const pl = primaryLabel ?? LIGHT_DEFAULTS.primaryLabel;
  const ph = primaryHref ?? LIGHT_DEFAULTS.primaryHref;
  const sl = secondaryLabel ?? LIGHT_DEFAULTS.secondaryLabel;
  const sto = secondaryTo ?? LIGHT_DEFAULTS.secondaryTo;
  const tl = tertiaryLabel ?? LIGHT_DEFAULTS.tertiaryLabel;
  const tto = tertiaryTo ?? LIGHT_DEFAULTS.tertiaryTo;

  if (variant === 'navy') {
    return (
      <section
        className="cta-banner-section cta-banner-navy"
        style={{
          background: `linear-gradient(135deg, ${theme.navy} 0%, #1e3a5f 50%, #243a5c 100%)`,
          padding: '72px 0',
          textAlign: 'center',
        }}
      >
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 32,
              color: '#fff',
              marginBottom: 12,
              lineHeight: 1.2,
            }}
          >
            {h}
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: 17,
              marginBottom: 32,
              lineHeight: 1.65,
            }}
          >
            {st}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button variant="warm" href={ph}>
              {pl}
            </Button>
            <Button
              variant="secondary"
              to={sto}
              style={{
                borderColor: 'rgba(255,255,255,0.5)',
                color: '#fff',
                background: 'rgba(255,255,255,0.08)',
              }}
            >
              {sl}
            </Button>
            {tl && tto ? (
              <Button
                variant="secondary"
                to={tto}
                style={{
                  borderColor: 'rgba(255,255,255,0.35)',
                  color: 'rgba(255,255,255,0.95)',
                  background: 'rgba(255,255,255,0.06)',
                }}
              >
                {tl}
              </Button>
            ) : null}
          </div>
        </Container>
      </section>
    );
  }

  return (
    <section
      className="cta-banner-section"
      style={{
        background: `linear-gradient(125deg, ${theme.light} 0%, #e4f5f1 32%, #f0e8f8 65%, #fff4e0 100%)`,
        padding: '72px 0',
        textAlign: 'center',
        borderTop: `1px solid ${theme.border}`,
      }}
    >
      <Container style={{ position: 'relative', zIndex: 1 }}>
        <h2
          style={{
            fontFamily: font.display,
            fontSize: 32,
            color: theme.navy,
            marginBottom: 12,
          }}
        >
          {h}
        </h2>
        <p
          style={{
            color: theme.muted,
            fontSize: 17,
            marginBottom: 32,
            lineHeight: 1.65,
          }}
        >
          {st}
        </p>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Button variant="warm" href={ph}>
            {pl}
          </Button>
          <Button variant="secondary" to={sto}>
            {sl}
          </Button>
          {tl && tto ? <Button variant="secondary" to={tto}>{tl}</Button> : null}
        </div>
      </Container>
    </section>
  );
}
