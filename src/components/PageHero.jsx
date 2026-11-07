import React from 'react';
import Container from './Container';
import SectionLabel from './SectionLabel';
import { theme } from '../styles/theme';

export default function PageHero({ id, label, title, lead, children }) {
  return (
    <section
      className="tuition-hero"
      aria-labelledby={id}
      style={{
        paddingTop: 'clamp(112px, 12vh, 148px)',
        paddingBottom: 'clamp(48px, 7vw, 64px)',
        background: `linear-gradient(180deg, rgba(253, 250, 240, 0.42) 0%, rgba(253, 250, 240, 0.78) 28%, ${theme.light} 55%, ${theme.light} 100%)`,
      }}
    >
      <Container narrow style={{ textAlign: 'center', width: '100%' }}>
        <SectionLabel>{label}</SectionLabel>
        <h1 id={id} className="fade-up inner-ambient-page__hero-title">
          {title}
        </h1>
        {lead ? (
          <p
            className="fade-up delay-1 inner-ambient-page__hero-lead"
            style={{ color: theme.muted, lineHeight: 1.72 }}
          >
            {lead}
          </p>
        ) : null}
        {children}
      </Container>
    </section>
  );
}
