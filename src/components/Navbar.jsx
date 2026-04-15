import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Container from './Container';
import { theme, font } from '../styles/theme';
import { LUMINO_Q_META } from '../data/siteData';
import ComingSoonModal from './ComingSoonModal';
import luminolearnLogo from '../assets/luminolearn-logo.png';

const NAV_LINKS = [
  { path: '/', label: 'Home' },
  { path: '/our-story', label: 'Our Story' },
  { path: '/learning-paths', label: 'Learning Paths' },
  { path: '/tuition', label: 'Plans & Tuition' },
  { path: '/luminopro', label: 'LuminoPro' },
  { path: '/my-space', label: 'My space' },
  { path: LUMINO_Q_META.path, label: LUMINO_Q_META.navLabel, comingSoon: true },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [luminoQOpen, setLuminoQOpen] = useState(false);
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
    if (link.comingSoon) {
      setLuminoQOpen(true);
      return;
    }
    navigate(link.path);
  };

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
          height: 76,
        }}
      >
        {/* Official circular emblem + wordmark PNG */}
        <div
          className="nav-brand-hit"
          onClick={() => navigate('/')}
          onKeyDown={(e) => e.key === 'Enter' && navigate('/')}
          role="link"
          tabIndex={0}
          aria-label="LuminoLearn home"
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
        >
          <img
            src={luminolearnLogo}
            alt="LuminoLearn Online Learning Academy"
            decoding="async"
            className="nav-brand-logo"
          />
        </div>

        {/* Desktop Links */}
        <div
          className="hide-mobile nav-desktop-links"
          style={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap', justifyContent: 'flex-end' }}
        >
          {NAV_LINKS.map((link) => {
            const active = !link.comingSoon && location.pathname === link.path;
            return (
              <button
                key={link.path}
                type="button"
                onClick={() => goNav(link)}
                className="nav-link-btn"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '9px 12px',
                  fontSize: 16,
                  fontWeight: active ? 600 : 400,
                  color: active ? theme.navy : theme.muted,
                  cursor: 'pointer',
                  fontFamily: font.body,
                  borderRadius: 8,
                  transition: 'all 0.2s',
                  position: 'relative',
                }}
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

        {/* Mobile Hamburger */}
        <button
          type="button"
          className="show-mobile nav-menu-toggle"
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
      </Container>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div
          id="nav-mobile-panel"
          style={{
            background: theme.bg,
            borderTop: `1px solid ${theme.border}`,
            padding: '16px 24px 24px',
          }}
        >
          {NAV_LINKS.map((link) => (
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
                fontSize: 17,
                fontWeight: !link.comingSoon && location.pathname === link.path ? 600 : 400,
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

      <ComingSoonModal
        open={luminoQOpen}
        onClose={() => setLuminoQOpen(false)}
        title={LUMINO_Q_META.title}
        message={LUMINO_Q_META.comingSoonMessage}
      />
    </nav>
  );
}
