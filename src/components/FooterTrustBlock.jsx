import React from 'react';
import { theme } from '../styles/theme';

const TRUST_ITEMS = [
  'Built in Canada',
  'PIPEDA aligned',
  'Canadian data residency',
  'Privacy first architecture',
  'Real Canadian educators',
];

/** Compact trust strip — homepage footer area, above site footer */
export default function FooterTrustBlock() {
  return (
    <section
      className="footer-trust-block"
      aria-label="Trust and compliance"
      style={{
        borderTop: `1px solid ${theme.border}`,
        background: `linear-gradient(180deg, ${theme.light} 0%, ${theme.bg} 100%)`,
        padding: 'clamp(20px, 3vw, 28px) 0',
      }}
    >
      <div className="footer-trust-block__inner">
        {TRUST_ITEMS.map((item, i) => (
          <React.Fragment key={item}>
            {i > 0 && (
              <span className="footer-trust-block__sep" aria-hidden>
                ·
              </span>
            )}
            <span className="footer-trust-block__badge">{item}</span>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}

export const HERO_TRUST_STRIP =
  'Built in Canada · Privacy first architecture · PIPEDA aligned · Real Canadian educators';
