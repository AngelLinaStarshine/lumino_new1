import React from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import { LUMINO_Q_META } from '../data/siteData';
import { theme, font } from '../styles/theme';

/**
 * Minimal placeholder so /lumino-q is not a dead route.
 * Primary UX is the “coming soon” modal from the navbar.
 */
export default function LuminoQPage() {
  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, minHeight: '55vh', background: theme.bg }}>
      <Container narrow style={{ textAlign: 'center', maxWidth: 480 }}>
        <h1
          style={{
            fontFamily: font.display,
            fontSize: 36,
            color: theme.navy,
            marginBottom: 16,
          }}
        >
          {LUMINO_Q_META.title}
        </h1>
        <p style={{ fontSize: 17, color: theme.muted, lineHeight: 1.7, marginBottom: 28 }}>
          {LUMINO_Q_META.comingSoonMessage}
        </p>
        <Link
          to="/"
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: theme.teal,
            textDecoration: 'underline',
            textUnderlineOffset: 3,
          }}
        >
          Back to home
        </Link>
      </Container>
    </section>
  );
}
