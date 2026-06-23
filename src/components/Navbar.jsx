import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from './Container';
import { theme, font } from '../styles/theme';
import { LOGIN_PATH } from '../lib/platformUrl';
import luminolearnLogo from '../assets/luminolearn-logo.png';

const MAIN_NAV = [
  { path: '/learning-paths', label: 'Learning Paths' },
  { path: '/tuition', label: 'Plans & Tuition' },
  { path: '/our-story', label: 'Our Story' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const goNav = (link) => {
    navigate(link.path);
  };

  const linkBtnStyle = (active) => ({
    background: 'none',
    border: 'none',
    padding: '9px 10px',
    fontSize: 16,
    fontWeight: active ? 600 : 400,
    color: active ? theme.navy : theme.muted,
    cursor: 'pointer',
    fontFamily: font.body,
    borderRadius: 8,
    transition: 'all 0.2s',
    position: 'relative',
  });

  const logInActive = false;

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(253,250,240,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? `1px solid ${theme.border}` : '1px solid transparent',
        transition: 'all 0.3s ease',
      }}
    >
      <Container
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 10,
          minHeight: 76,
        }}
      >
        <div
          className="nav-brand-hit"
          onClick={() => navigate('/')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          role="link"
          tabIndex={0}
          aria-label="Luminolearn Inc. home"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}
        >
          <img
            src={luminolearnLogo}
            alt="Luminolearn Inc."
            decoding="async"
            className="nav-brand-logo"
          />
          <span className="footer-brand-title nav-brand-wordmark hide-mobile" style={{ whiteSpace: 'nowrap' }}>
            Luminolearn Inc.
          </span>
        </div>

        <div
          className="hide-mobile nav-desktop-links"
          style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: 2,
            minWidth: 0,
          }}
        >
          {MAIN_NAV.map((link) => {
            const active = location.pathname === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => goNav(link)}
                className="nav-link-btn"
                style={linkBtnStyle(active)}
              >
                {link.label}
                {active && (
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: 20,
                      height: 2,
                      background: theme.teal,
                      borderRadius: 1,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>

        <div
          className="hide-mobile"
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8 }}
        >
          <a
            href={LOGIN_PATH}
            className="nav-link-btn"
            style={{
              ...linkBtnStyle(logInActive),
              fontSize: 16,
              color: theme.muted,
              textDecoration: 'none',
            }}
          >
            Log In
          </a>
        </div>

        <div className="show-mobile" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10 }}>
          <a
            href={LOGIN_PATH}
            style={{
              background: 'none',
              border: 'none',
              padding: '8px 6px',
              fontSize: 16,
              fontWeight: 600,
              color: theme.navy,
              cursor: 'pointer',
              fontFamily: font.body,
              textDecoration: 'none',
            }}
          >
            Log In
          </a>
          <button
            type="button"
            className="nav-menu-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-expanded={mobileOpen}
            aria-controls="nav-mobile-panel"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
              fontSize: 24,
              color: theme.navy,
              lineHeight: 1,
            }}
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </Container>

      {mobileOpen && (
        <div
          id="nav-mobile-panel"
          style={{
            background: theme.bg,
            borderTop: `1px solid ${theme.border}`,
            padding: '16px 24px 24px',
          }}
        >
          {MAIN_NAV.map((link) => (
            <button
              key={link.path}
              type="button"
              onClick={() => goNav(link)}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                padding: '14px 0',
                fontSize: 18,
                fontWeight: location.pathname === link.path ? 600 : 400,
                color: theme.navy,
                cursor: 'pointer',
                fontFamily: font.body,
                borderBottom: `1px solid ${theme.border}`,
              }}
            >
              {link.label}
            </button>
          ))}
        </div>
      )}

    </nav>
  );
}
