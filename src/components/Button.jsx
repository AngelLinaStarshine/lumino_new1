import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme, font } from '../styles/theme';

const variants = {
  primary: {
    background: `linear-gradient(120deg, ${theme.accentYellow}, ${theme.accent})`,
    color: '#111',
    border: 'none',
    boxShadow: '0 10px 22px rgba(15, 23, 42, 0.12)',
  },
  secondary: {
    background: 'rgba(255, 255, 255, 0.85)',
    color: theme.navy,
    border: `1px solid ${theme.border}`,
    boxShadow: '0 4px 14px rgba(15, 23, 42, 0.06)',
  },
  warm: {
    background: `linear-gradient(120deg, ${theme.accentYellow}, ${theme.accent})`,
    color: '#111',
    border: 'none',
    boxShadow: '0 10px 22px rgba(15, 23, 42, 0.12)',
  },
  ghost: {
    background: 'transparent',
    color: theme.navy,
    border: 'none',
    padding: '14px 0',
  },
};

export default function Button({ children, variant = 'primary', to, href, onClick, style, fullWidth }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const lift =
    hovered && variant !== 'ghost'
      ? { transform: 'translateY(-2px)', boxShadow: '0 14px 28px rgba(15, 23, 42, 0.14)' }
      : {};

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: fullWidth ? 'center' : undefined,
    gap: 8,
    padding: '14px 28px',
    borderRadius: 12,
    fontSize: 15,
    fontWeight: 700,
    fontFamily: font.body,
    cursor: 'pointer',
    transition: 'transform 0.18s ease, box-shadow 0.18s ease, filter 0.18s ease, background 0.2s ease',
    textDecoration: 'none',
    letterSpacing: '0.02em',
    width: fullWidth ? '100%' : undefined,
    ...variants[variant],
    ...style,
    ...(hovered && variant === 'secondary'
      ? { background: theme.navy, color: '#fff', borderColor: theme.navy }
      : {}),
    ...lift,
  };

  const handleClick = (e) => {
    if (to) {
      e.preventDefault();
      navigate(to);
    }
    onClick?.(e);
  };

  if (href) {
    const isExternal = typeof href === 'string' && /^https?:\/\//i.test(href);
    return (
      <a
        href={href}
        {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        style={base}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      style={base}
      onClick={handleClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}
