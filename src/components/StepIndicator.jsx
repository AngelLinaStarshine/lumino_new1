import React from 'react';
import { theme, font } from '../styles/theme';

export default function StepIndicator({ steps, columns = 4 }) {
  return (
    <div
      className={`step-indicator-grid step-indicator-cols-${columns}`}
      style={{
        gap: columns >= 5 ? 24 : 32,
      }}
    >
      {steps.map((s, i) => (
        <div key={i} className={`fade-up delay-${Math.min(i + 1, 5)}`} style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: '50%',
              background: theme.navy,
              color: '#fff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: font.display,
              fontSize: 22,
              margin: '0 auto 16px',
            }}
          >
            {s.step}
          </div>
          <h3 style={{ fontFamily: font.display, fontSize: 17, color: theme.navy, marginBottom: 8 }}>
            {s.title}
          </h3>
          <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.6 }}>{s.desc}</p>
        </div>
      ))}
    </div>
  );
}
