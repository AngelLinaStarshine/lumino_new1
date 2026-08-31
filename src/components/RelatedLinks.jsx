import React from 'react';
import { Link } from 'react-router-dom';
import { theme } from '../styles/theme';

const linkStyle = {
  color: theme.teal,
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
  fontSize: 'clamp(0.98rem, 1.25vw, 1.08rem)',
};

/**
 * Compact cross-links between related marketing pages.
 */
export default function RelatedLinks({ links, label = 'Related pages' }) {
  if (!links?.length) return null;

  return (
    <nav
      className="related-links"
      aria-label={label}
      style={{
        marginTop: 28,
        paddingTop: 20,
        borderTop: `1px solid ${theme.border}`,
        fontSize: 'clamp(0.98rem, 1.25vw, 1.08rem)',
        color: theme.muted,
        lineHeight: 1.65,
      }}
    >
      <span style={{ marginRight: 6 }}>{label}:</span>
      {links.map((item, index) => (
        <React.Fragment key={item.to}>
          {index > 0 && <span aria-hidden style={{ margin: '0 6px', opacity: 0.45 }}>·</span>}
          <Link to={item.to} style={linkStyle}>
            {item.label}
          </Link>
        </React.Fragment>
      ))}
    </nav>
  );
}
