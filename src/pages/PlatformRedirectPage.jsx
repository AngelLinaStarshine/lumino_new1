import { useEffect } from 'react';

/**
 * Full-page redirect to the Next.js platform (different origin/port in dev).
 */
export default function PlatformRedirectPage({ targetUrl, label = 'sign in' }) {
  useEffect(() => {
    window.location.replace(targetUrl);
  }, [targetUrl]);

  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, minHeight: '40vh', textAlign: 'center' }}>
      <p style={{ fontSize: 16, color: '#64748b' }}>Redirecting to {label}…</p>
      <p style={{ fontSize: 14, color: '#94a3b8', marginTop: 12 }}>
        If nothing happens,{' '}
        <a href={targetUrl} style={{ color: '#115e59', fontWeight: 600 }}>
          open the learning platform
        </a>
        .
      </p>
    </section>
  );
}
