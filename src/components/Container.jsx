import React from 'react';

export default function Container({ children, narrow, style }) {
  return (
    <div
      style={{
        width: '100%',
        maxWidth: narrow ? 'var(--container-narrow)' : 'var(--container-max)',
        margin: '0 auto',
        padding: '0 var(--container-pad-x, 24px)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
