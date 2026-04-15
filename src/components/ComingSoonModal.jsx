import React, { useEffect } from 'react';
import { theme, font } from '../styles/theme';

export default function ComingSoonModal({
  open,
  onClose,
  title,
  message,
  children,
  closeLabel = 'OK',
  wide,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="coming-soon-overlay"
      onClick={onClose}
      role="presentation"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        background: 'rgba(15, 23, 42, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 24,
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="coming-soon-title"
        onClick={(e) => e.stopPropagation()}
        style={{
          background: theme.card,
          borderRadius: 16,
          padding: '32px 28px',
          maxWidth: wide ? 520 : 400,
          width: '100%',
          boxShadow: '0 24px 48px rgba(15, 23, 42, 0.15)',
          border: `1px solid ${theme.border}`,
        }}
      >
        <h2
          id="coming-soon-title"
          style={{
            fontFamily: font.display,
            fontSize: 26,
            color: theme.navy,
            margin: '0 0 12px',
            lineHeight: 1.2,
          }}
        >
          {title}
        </h2>
        {children ? (
          <div style={{ margin: '0 0 24px' }}>{children}</div>
        ) : (
          <p
            style={{
              fontSize: 16,
              color: theme.muted,
              lineHeight: 1.65,
              margin: '0 0 24px',
            }}
          >
            {message}
          </p>
        )}
        <button
          type="button"
          onClick={onClose}
          style={{
            width: '100%',
            padding: '12px 18px',
            borderRadius: 10,
            border: 'none',
            background: theme.teal,
            color: '#fff',
            fontFamily: font.body,
            fontSize: 16,
            fontWeight: 600,
            cursor: 'pointer',
          }}
        >
          {closeLabel}
        </button>
      </div>
    </div>
  );
}
