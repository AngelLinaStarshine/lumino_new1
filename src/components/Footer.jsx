import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import { theme } from '../styles/theme';
import { CONTACT, DISCOVERY_CALL_FORM_URL, SOCIAL_LINKS } from '../data/siteData';
import SocialIcon from './SocialIcon';

export default function Footer() {
  const navigate = useNavigate();

  const linkStyle = {
    fontSize: 14,
    marginBottom: 10,
    cursor: 'pointer',
    transition: 'opacity 0.2s, color 0.2s',
    color: 'rgba(15, 23, 42, 0.75)',
  };

  const FooterLink = ({ to, children, style: extra }) => (
    <div onClick={() => navigate(to)} style={{ ...linkStyle, ...extra }} role="presentation">
      {children}
    </div>
  );

  const headingStyle = {
    color: theme.navy,
    fontWeight: 700,
    fontSize: 14,
    marginBottom: 16,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  return (
    <footer className="site-footer" style={{ color: 'rgba(15, 23, 42, 0.8)', padding: '64px 0 40px' }}>
      <Container>
        <div
          className="grid-4"
          style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48, marginBottom: 48 }}
        >
          <div>
            <div className="footer-brand-title" style={{ marginBottom: 12 }}>
              LuminoLearn Academy
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'rgba(15, 23, 42, 0.78)' }}>
              Structured, measurable, tech safe learning for modern Canadian families.
            </p>
            <div style={{ marginTop: 20, fontSize: 14, color: 'rgba(15, 23, 42, 0.85)' }}>
              <div style={{ marginBottom: 6 }}>📧 {CONTACT.email}</div>
              <div>📞 {CONTACT.phone}</div>
            </div>
          </div>

          <div>
            <div style={headingStyle}>Learn</div>
            <FooterLink to="/learning-paths">Learning Paths</FooterLink>
            <FooterLink to="/tuition">Plans & Tuition</FooterLink>
            <FooterLink to="/luminopro">LuminoPro</FooterLink>
          </div>

          <div>
            <div style={headingStyle}>About</div>
            <FooterLink to="/our-story">Our Story</FooterLink>
            <FooterLink to="/privacy">Privacy Policy</FooterLink>
            <FooterLink to="/terms">Terms of Service</FooterLink>
          </div>

          <div>
            <div style={headingStyle}>Get Started</div>
            <a
              href={DISCOVERY_CALL_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{ ...linkStyle, display: 'block', textDecoration: 'none' }}
            >
              Book Free Session
            </a>
            <FooterLink to="/enroll">Enroll Your Child</FooterLink>
          </div>
        </div>

        <div
          className="footer-bottom-bar"
          style={{
            borderTop: '1px solid rgba(15, 23, 42, 0.12)',
            paddingTop: 24,
            fontSize: 13,
            color: 'rgba(15, 23, 42, 0.65)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 18,
            textAlign: 'center',
          }}
        >
          <ul className="footer-social-links" aria-label="Social media profiles">
            {SOCIAL_LINKS.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                  className="footer-social-link"
                  style={{
                    color: theme.navy,
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    lineHeight: 0,
                  }}
                >
                  <SocialIcon id={item.id} size={26} />
                </a>
              </li>
            ))}
          </ul>
          <span style={{ lineHeight: 1.5 }}>© 2025 LuminoLearn Academy. All rights reserved.</span>
        </div>
      </Container>
    </footer>
  );
}
