import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import Container from '../components/Container';
import Button from '../components/Button';
import { theme, font } from '../styles/theme';

const SESSION_EMAIL_KEY = 'luminolearn_myspace_email';

function readConfiguredAccounts() {
  const map = Object.create(null);
  const rawJson = import.meta.env.VITE_MY_SPACE_ACCOUNTS;
  if (typeof rawJson === 'string' && rawJson.trim()) {
    try {
      const parsed = JSON.parse(rawJson);
      if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        for (const [email, password] of Object.entries(parsed)) {
          if (typeof email === 'string' && typeof password === 'string' && email.trim()) {
            map[email.trim().toLowerCase()] = password;
          }
        }
      }
    } catch {
      /* invalid JSON */
    }
  }
  const singleEmail =
    typeof import.meta.env.VITE_MY_SPACE_EMAIL === 'string'
      ? import.meta.env.VITE_MY_SPACE_EMAIL.trim().toLowerCase()
      : '';
  const singlePassword =
    typeof import.meta.env.VITE_MY_SPACE_PASSWORD === 'string'
      ? import.meta.env.VITE_MY_SPACE_PASSWORD
      : '';
  if (singleEmail && singlePassword) map[singleEmail] = singlePassword;
  return map;
}

export default function MySpacePage() {
  const accounts = useMemo(() => readConfiguredAccounts(), []);
  const configured = Object.keys(accounts).length > 0;

  const [sessionEmail, setSessionEmail] = useState(() =>
    typeof sessionStorage !== 'undefined' ? sessionStorage.getItem(SESSION_EMAIL_KEY) : null
  );
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const e = sessionStorage.getItem(SESSION_EMAIL_KEY);
    setSessionEmail(e);
  }, []);

  const signOut = () => {
    sessionStorage.removeItem(SESSION_EMAIL_KEY);
    setSessionEmail(null);
    setPassword('');
  };

  const onSubmit = (ev) => {
    ev.preventDefault();
    setError('');
    if (!configured) {
      setError('Sign-in is not set up yet. Please contact LuminoLearn.');
      return;
    }
    const key = email.trim().toLowerCase();
    const expected = accounts[key];
    if (!expected || password !== expected) {
      setError('That email or password is not recognized.');
      return;
    }
    sessionStorage.setItem(SESSION_EMAIL_KEY, email.trim());
    setSessionEmail(email.trim());
    setPassword('');
  };

  if (!configured) {
    return (
      <section style={{ paddingTop: 120, paddingBottom: 80, minHeight: '55vh', background: theme.bg }}>
        <Container narrow style={{ maxWidth: 520 }}>
          <h1
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 16,
            }}
          >
            My space
          </h1>
          <p style={{ fontSize: 17, color: theme.muted, lineHeight: 1.7, marginBottom: 24 }}>
            Family accounts are created by LuminoLearn—we do not offer public sign-up on this site.
            If you need access, please reach out to us after enrollment.
          </p>
          <Link
            to="/"
            style={{
              fontSize: 16,
              fontWeight: 600,
              color: theme.teal,
              textDecoration: 'underline',
              textUnderlineOffset: 3,
            }}
          >
            Back to home
          </Link>
        </Container>
      </section>
    );
  }

  if (sessionEmail) {
    return (
      <section style={{ paddingTop: 120, paddingBottom: 80, minHeight: '55vh', background: theme.bg }}>
        <Container narrow style={{ maxWidth: 520 }}>
          <h1
            style={{
              fontFamily: font.display,
              fontSize: 34,
              color: theme.navy,
              marginBottom: 16,
            }}
          >
            My space
          </h1>
          <p style={{ fontSize: 17, color: theme.muted, lineHeight: 1.7, marginBottom: 8 }}>
            Signed in as <strong style={{ color: theme.navy }}>{sessionEmail}</strong>
          </p>
          <p style={{ fontSize: 16, color: theme.muted, lineHeight: 1.65, marginBottom: 28 }}>
            Course updates and materials will appear here when your teacher shares them.
          </p>
          <button
            type="button"
            onClick={signOut}
            style={{
              padding: '14px 28px',
              borderRadius: 12,
              fontSize: 16,
              fontWeight: 700,
              fontFamily: font.body,
              cursor: 'pointer',
              background: 'rgba(255, 255, 255, 0.85)',
              color: theme.navy,
              border: `1px solid ${theme.border}`,
            }}
          >
            Sign out
          </button>
        </Container>
      </section>
    );
  }

  return (
    <section style={{ paddingTop: 120, paddingBottom: 80, minHeight: '55vh', background: theme.bg }}>
      <Container narrow style={{ maxWidth: 440 }}>
        <h1
          style={{
            fontFamily: font.display,
            fontSize: 34,
            color: theme.navy,
            marginBottom: 10,
          }}
        >
          My space
        </h1>
        <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.65, marginBottom: 28 }}>
          Sign in with the email and password LuminoLearn sent you. New accounts cannot be created on
          this website.
        </p>
        <form onSubmit={onSubmit}>
          <label
            htmlFor="myspace-email"
            style={{ display: 'block', fontSize: 14, fontWeight: 600, color: theme.navy, marginBottom: 8 }}
          >
            Email
          </label>
          <input
            id="myspace-email"
            name="email"
            type="email"
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 16,
              fontFamily: font.body,
              borderRadius: 10,
              border: `1px solid ${theme.border}`,
              marginBottom: 18,
              boxSizing: 'border-box',
            }}
          />
          <label
            htmlFor="myspace-password"
            style={{ display: 'block', fontSize: 14, fontWeight: 600, color: theme.navy, marginBottom: 8 }}
          >
            Password
          </label>
          <input
            id="myspace-password"
            name="password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{
              width: '100%',
              padding: '12px 14px',
              fontSize: 16,
              fontFamily: font.body,
              borderRadius: 10,
              border: `1px solid ${theme.border}`,
              marginBottom: 10,
              boxSizing: 'border-box',
            }}
          />
          {error ? (
            <p style={{ color: '#b91c1c', fontSize: 14, marginBottom: 14, marginTop: 0 }}>{error}</p>
          ) : null}
          <Button type="submit" variant="primary" fullWidth style={{ marginTop: 8 }}>
            Sign in
          </Button>
        </form>
        <p style={{ fontSize: 13, color: theme.muted, marginTop: 24, lineHeight: 1.55 }}>
          Trouble signing in? Contact us the same way you usually reach your coordinator.
        </p>
      </Container>
    </section>
  );
}
