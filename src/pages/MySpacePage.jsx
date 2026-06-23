import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LOGIN_PATH } from '../lib/platformUrl';

/** Legacy /my-space → sign in */
export default function MySpacePage() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(LOGIN_PATH, { replace: true });
  }, [navigate]);

  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, minHeight: '40vh', textAlign: 'center' }}>
      <p style={{ fontSize: 16, color: '#64748b' }}>Redirecting to sign in…</p>
    </section>
  );
}
