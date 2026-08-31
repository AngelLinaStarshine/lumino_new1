import React from 'react';

const TRUST_ITEMS = [
  'Built in Canada',
  'PIPEDA aligned',
  'Canadian data residency',
  'Privacy first architecture',
  'Real Canadian educators',
];

function TrustMarqueeTrack({ items, classPrefix }) {
  const sequence = [...items, ...items];

  return (
    <div className={`${classPrefix}__track`} aria-hidden="true">
      {sequence.map((item, index) => (
        <span key={`${item}-${index}`} className={`${classPrefix}__item`}>
          <span className={`${classPrefix}__badge`}>{item}</span>
          <span className={`${classPrefix}__sep`} aria-hidden>·</span>
        </span>
      ))}
    </div>
  );
}

/** Compact trust strip — homepage footer area, above site footer */
export default function FooterTrustBlock() {
  return (
    <section className="footer-trust-block footer-trust-marquee" aria-label="Trust and compliance">
      <p className="visually-hidden">{TRUST_ITEMS.join('. ')}</p>
      <div className="footer-trust-marquee__viewport">
        <TrustMarqueeTrack items={TRUST_ITEMS} classPrefix="footer-trust-marquee" />
      </div>
    </section>
  );
}

export const HERO_TRUST_STRIP =
  'Built in Canada · Privacy first architecture · PIPEDA aligned · Real Canadian educators';

export { TRUST_ITEMS };
