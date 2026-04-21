import React from 'react';
import { useNavigate } from 'react-router-dom';
import Container from './Container';
import { theme } from '../styles/theme';
import { CONTACT, DISCOVERY_CALL_URL, SOCIAL_LINKS } from '../data/siteData';
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
        <div className="footer-unified">
          <div
            className="grid-4 footer-unified__grid"
            style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 48 }}
          >
            <div className="footer-brand-col">
              <div className="footer-brand-title" style={{ marginBottom: 10 }}>
                LuminoLearn Academy
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: 'rgba(15, 23, 42, 0.82)',
                  fontFamily: 'var(--font-display)',
                  fontStyle: 'italic',
                  marginBottom: 8,
                }}
              >
                Light the path they&apos;ll lead.
              </p>
              <p
                style={{
                  fontSize: 12,
                  lineHeight: 1.6,
                  color: 'rgba(15, 23, 42, 0.62)',
                  fontWeight: 500,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  marginBottom: 20,
                }}
              >
                Personalized education, anywhere anytime.
              </p>
              <div style={{ marginTop: 8, fontSize: 14, color: 'rgba(15, 23, 42, 0.85)' }}>
                <div style={{ marginBottom: 6 }}>{CONTACT.email}</div>
                <div>{CONTACT.phone}</div>
              </div>
            </div>

            <div>
              <div style={headingStyle}>Learn</div>
              <FooterLink to="/learning-paths">Learning Paths</FooterLink>
              <FooterLink to="/tuition">Plans & Tuition</FooterLink>
            </div>

            <div>
              <div style={headingStyle}>About</div>
              <FooterLink to="/our-story">Our Story</FooterLink>
              <FooterLink to="/privacy">Privacy Policy</FooterLink>
              <FooterLink to="/terms">Terms of Service</FooterLink>
            </div>

            <div>
              <div style={headingStyle}>Start</div>
              <a
                href={DISCOVERY_CALL_URL}
                target="_blank"
                rel="noopener noreferrer"
                style={{ ...linkStyle, display: 'block', textDecoration: 'none' }}
              >
                Talk to Us
              </a>
              <FooterLink to="/my-space">Log In</FooterLink>
            </div>
          </div>

          <div className="footer-brand-tail">
            <ul className="footer-social-links footer-social-links--brand" aria-label="Social media profiles">
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
            <div className="footer-copyright">© 2026 LuminoLearn Academy. All rights reserved.</div>
          </div>
        </div>
      </Container>
    </footer>
  );
}
