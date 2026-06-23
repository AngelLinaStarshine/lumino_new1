import { useState } from 'react';
import Container from '../components/Container';
import { theme, font } from '../styles/theme';
import { createSupabaseClient, isSupabaseConfigured } from '../lib/supabase';
import { PLATFORM_URL, platformAuthCallbackUrl } from '../lib/platformUrl';

const SUPPORT_EMAIL = 'lumino@luminolearn.org';

const cardStyle = {
  background: theme.card,
  borderRadius: 16,
  border: `1px solid ${theme.border}`,
  boxShadow: '0 10px 28px rgba(15, 23, 42, 0.08)',
  padding: '28px 24px',
  maxWidth: 520,
  margin: '0 auto',
};

function ModeOption({ active, onClick, title, description, icon }) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        textAlign: 'left',
        width: '100%',
        padding: 14,
        borderRadius: 14,
        border: active ? `2px solid ${theme.teal}` : `1px solid ${theme.border}`,
        background: active ? 'rgba(125, 207, 182, 0.18)' : 'rgba(255,255,255,0.72)',
        cursor: 'pointer',
        fontFamily: font.body,
        transition: 'all 0.2s ease',
      }}
    >
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: 4,
          border: active ? `2px solid ${theme.teal}` : `2px solid rgba(0,0,0,0.15)`,
          background: active ? theme.teal : 'transparent',
          flexShrink: 0,
          marginTop: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          fontSize: 11,
        }}
        aria-hidden
      >
        {active ? '✓' : ''}
      </span>
      <span>
        <span style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 15, fontWeight: 600, color: theme.navy }}>
          <span>{icon}</span> {title}
        </span>
        <span style={{ display: 'block', fontSize: 12, color: theme.muted, marginTop: 4, lineHeight: 1.45 }}>
          {description}
        </span>
      </span>
    </button>
  );
}

const inputStyle = {
  width: '100%',
  height: 44,
  padding: '0 14px',
  borderRadius: 10,
  border: `1px solid rgba(0,0,0,0.1)`,
  background: 'rgba(255,255,255,0.92)',
  fontSize: 15,
  fontFamily: font.body,
  color: theme.text,
  boxSizing: 'border-box',
};

const labelStyle = {
  display: 'block',
  fontSize: 13,
  fontWeight: 600,
  color: theme.navy,
  marginBottom: 6,
  fontFamily: font.body,
};

export default function LoginPage() {
  const [mode, setMode] = useState('parent');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const supabaseReady = isSupabaseConfigured();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    if (!supabaseReady) {
      setError('Sign-in is not configured yet. Use the platform link below or contact support.');
      return;
    }

    setLoading(true);

    try {
      const supabase = createSupabaseClient();
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      const session = authData.session;
      if (!session) {
        setError('Could not start a session. Please try again.');
        setLoading(false);
        return;
      }

      const { data: profileData } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', authData.user.id)
        .single();

      const role = profileData?.role;

      if (mode === 'teacher') {
        if (role !== 'teacher' && role !== 'admin') {
          await supabase.auth.signOut();
          setError('This account is not registered as a teacher. Try Parent / Family.');
          setLoading(false);
          return;
        }
        window.location.href = platformAuthCallbackUrl({
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          next: role === 'admin' ? '/admin' : '/teacher',
        });
        return;
      }

      if (role !== 'student') {
        await supabase.auth.signOut();
        setError('Parent sign-in uses the student family account. Try Teacher.');
        setLoading(false);
        return;
      }

      if (!passcode) {
        window.location.href = platformAuthCallbackUrl({
          accessToken: session.access_token,
          refreshToken: session.refresh_token,
          next: '/student',
        });
        return;
      }

      if (passcode.length < 4) {
        setError('Family passcode must be 4–6 digits.');
        setLoading(false);
        return;
      }

      window.location.href = platformAuthCallbackUrl({
        accessToken: session.access_token,
        refreshToken: session.refresh_token,
        next: '/student/family',
        passcode,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Sign-in failed');
      setLoading(false);
    }
  }

  return (
    <section style={{ paddingTop: 108, paddingBottom: 72, minHeight: '70vh' }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 28 }}>
          <h1
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(1.6rem, 4vw, 2rem)',
              color: theme.navy,
              margin: '0 0 8px',
            }}
          >
            Sign in to Luminolearn
          </h1>
          <p style={{ fontSize: 15, color: theme.muted, margin: 0 }}>
            Choose your role, then enter your credentials.
          </p>
        </div>

        <div style={cardStyle}>
          {!supabaseReady && (
            <div
              style={{
                marginBottom: 20,
                padding: '12px 14px',
                borderRadius: 10,
                background: 'rgba(255, 222, 89, 0.25)',
                border: '1px solid rgba(255, 154, 61, 0.35)',
                fontSize: 13,
                color: theme.navy,
                lineHeight: 1.5,
              }}
            >
              <strong>Setup needed:</strong> copy Supabase keys into a <code>.env</code> file (see{' '}
              <code>.env.example</code>). Or open the platform directly:{' '}
              <a href={`${PLATFORM_URL}/login`} style={{ color: theme.teal, fontWeight: 600 }}>
                {PLATFORM_URL}/login
              </a>
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10 }}>
              <ModeOption
                active={mode === 'parent'}
                onClick={() => {
                  setMode('parent');
                  setError(null);
                }}
                icon="👪"
                title="Parent / Family"
                description="Student account email + password. Parents also enter the family passcode."
              />
              <ModeOption
                active={mode === 'teacher'}
                onClick={() => {
                  setMode('teacher');
                  setError(null);
                  setPasscode('');
                }}
                icon="🎓"
                title="Teacher"
                description="Your teacher email / username and password."
              />
            </div>

            <div>
              <label htmlFor="login-email" style={labelStyle}>
                Email / username
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="username email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                placeholder={mode === 'teacher' ? 'you@luminolearn.org' : 'student family email'}
                required
                style={inputStyle}
              />
            </div>

            <div>
              <label htmlFor="login-password" style={labelStyle}>
                Password
              </label>
              <input
                id="login-password"
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
                required
                style={inputStyle}
              />
            </div>

            {mode === 'parent' && (
              <div>
                <label htmlFor="login-passcode" style={labelStyle}>
                  Family passcode (parents)
                </label>
                <input
                  id="login-passcode"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={6}
                  value={passcode}
                  onChange={(ev) => setPasscode(ev.target.value.replace(/\D/g, ''))}
                  placeholder="4–6 digits — leave blank for student"
                  style={inputStyle}
                />
                <p style={{ fontSize: 12, color: theme.muted, margin: '8px 0 0', lineHeight: 1.45 }}>
                  <strong>Parents:</strong> enter passcode for payments & progress.{' '}
                  <strong>Students:</strong> leave blank for your dashboard.
                </p>
              </div>
            )}

            {error && (
              <p style={{ fontSize: 14, color: '#b91c1c', margin: 0 }} role="alert">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                height: 46,
                border: 'none',
                borderRadius: 10,
                background: `linear-gradient(95deg, ${theme.accentYellow}, ${theme.accent})`,
                color: theme.navy,
                fontWeight: 700,
                fontSize: 15,
                fontFamily: font.body,
                cursor: loading ? 'wait' : 'pointer',
                opacity: loading ? 0.75 : 1,
              }}
            >
              {loading ? 'Signing in…' : mode === 'parent' ? 'Sign in as parent / student' : 'Sign in as teacher'}
            </button>
          </form>

          <div
            style={{
              marginTop: 22,
              padding: '14px 16px',
              borderRadius: 12,
              background: theme.warm,
              border: `1px solid ${theme.border}`,
              textAlign: 'center',
              fontSize: 14,
              color: theme.muted,
              lineHeight: 1.55,
            }}
          >
            <p style={{ margin: '0 0 6px' }}>Don&apos;t have an account?</p>
            <p style={{ margin: 0 }}>
              Contact your Luminolearn administrator or{' '}
              <a
                href={`mailto:${SUPPORT_EMAIL}?subject=Luminolearn%20account%20request`}
                style={{ color: theme.teal, fontWeight: 600 }}
              >
                request assistance
              </a>
              .
            </p>
            <p style={{ margin: '10px 0 0', fontSize: 12 }}>
              Consultation & enrollment:{' '}
              <a href={`mailto:${SUPPORT_EMAIL}`} style={{ color: theme.teal }}>
                {SUPPORT_EMAIL}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  );
}
