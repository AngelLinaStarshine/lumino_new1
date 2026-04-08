import React, { useState } from 'react';
import { theme } from '../styles/theme';

export default function Card({ children, style, onClick, hoverable, className }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={className}
      style={{
        background: theme.card,
        borderRadius: 18,
        border: `1px solid ${theme.border}`,
        padding: 32,
        transition: 'all 0.3s ease',
        transform: hoverable && hovered ? 'translateY(-2px)' : 'none',
        boxShadow: hoverable && hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        cursor: hoverable ? 'pointer' : 'default',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
