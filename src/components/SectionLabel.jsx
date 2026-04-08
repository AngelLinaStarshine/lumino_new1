import React from 'react';
import { theme } from '../styles/theme';

export default function SectionLabel({ children }) {
  return (
    <div
      style={{
        display: 'inline-block',
        padding: '6px 14px',
        borderRadius: 8,
        background: 'rgba(45, 155, 132, 0.1)',
        border: `1px solid rgba(45, 155, 132, 0.28)`,
        color: theme.navy,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.06em',
        textTransform: 'uppercase',
        marginBottom: 16,
      }}
    >
      {children}
    </div>
  );
}
