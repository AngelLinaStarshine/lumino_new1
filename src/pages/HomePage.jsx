import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, SectionLabel, Card, Button, CtaBanner } from '../components';
import {
  COURSES,
  AGE_GROUPS,
  DISCOVERY_CALL_URL,
  getEnrollmentLink,
  HOME_SUBJECT_DETAILS,
  SKILLS_THAT_MATTER,
  BELIEFS,
} from '../data/siteData';
import { theme, font } from '../styles/theme';

export default function HomePage() {
  const [essenceTab, setEssenceTab] = useState('skills');
  const [openSkill, setOpenSkill] = useState(0);
  const [openBelief, setOpenBelief] = useState(0);

  const toggleBelief = (i) => {
    setOpenBelief((prev) => (prev === i ? -1 : i));
  };

  return (
    <>
      <section
        style={{
          paddingTop: 140,
          paddingBottom: 80,
          background: theme.bg,
        }}
      >
        <Container>
          <div className="fade-up" style={{ width: '100%' }}>
            <div className="hero-brand-stack">
              <div className="hero-wordmark-shell">
                <p className="hero-wordmark">LuminoLearn Academy</p>
              </div>
              <span className="hero-eyebrow-badge">Small groups · Real teachers · Ages 9 to 17</span>
            </div>
            <h1
              className="hero-title"
              style={{
                fontFamily: font.display,
                fontSize: 48,
                lineHeight: 1.18,
                color: theme.navy,
                marginBottom: 20,
              }}
            >
              Your child doesn&apos;t need more screen time.
              <br />
              They need the right learning, with the right people.
            </h1>
            <p
              style={{
                fontSize: 19,
                lineHeight: 1.7,
                color: theme.muted,
                marginBottom: 36,
              }}
            >
              LuminoLearn Academy is a structured, human first learning space where children ages 9 to
              17 build real skills in Mathematics, Language, and Computer Science through
              small group instruction, personalized pathways, and teachers who know them by name.
            </p>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Button href={DISCOVERY_CALL_URL}>Book a Free Discovery Call ›</Button>
              <Button variant="secondary" to="/our-story#how-we-operate">
                How we operate →
              </Button>
            </div>
          </div>
        </Container>
      </section>

      <section style={{ padding: '80px 0' }}>
        <Container>
          <SectionLabel>What We Teach</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 36,
              color: theme.navy,
              marginBottom: 12,
            }}
          >
            Three subjects. Three age groups. One clear structure.
          </h2>
          <p style={{ fontSize: 17, color: theme.muted, marginBottom: 48, lineHeight: 1.7 }}>
            We teach Math, Language, and Computer Science, and we teach them well. Each subject has a
            defined curriculum designed for three developmental stages. Students are placed by ability
            and learning style, not by school grade.
          </p>
          <div
            className="grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {COURSES.map((c, i) => {
              const detail = HOME_SUBJECT_DETAILS[c.id];
              return (
                <Card key={c.id} hoverable className={`fade-up delay-${i + 1}`}>
                  <div style={{ fontSize: 36, marginBottom: 12 }}>{c.icon}</div>
                  <div
                    style={{
                      fontSize: 12,
                      fontWeight: 600,
                      color: c.color,
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      marginBottom: 4,
                    }}
                  >
                    {c.tagline}
                  </div>
                  <h3
                    style={{
                      fontFamily: font.display,
                      fontSize: 22,
                      color: theme.navy,
                      marginBottom: 6,
                    }}
                  >
                    {c.label}
                  </h3>
                  <p
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme.navy,
                      marginBottom: 16,
                      fontStyle: 'italic',
                    }}
                  >
                    {detail?.curriculumTagline}
                  </p>
                  <p style={{ fontSize: 13, fontWeight: 700, color: theme.navy, marginBottom: 8 }}>
                    What students learn
                  </p>
                  <div style={{ marginBottom: 16 }}>
                    {detail?.levels.map((lvl) => (
                      <div key={lvl.label} style={{ marginBottom: 12 }}>
                        <div style={{ fontSize: 13, fontWeight: 600, color: theme.teal, marginBottom: 4 }}>
                          ▸ {lvl.label}
                        </div>
                        {lvl.points.map((pt) => (
                          <p key={pt} style={{ fontSize: 14, color: theme.muted, lineHeight: 1.55, marginLeft: 8 }}>
                            {pt}
                          </p>
                        ))}
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: theme.navy, marginBottom: 6 }}>
                    Our approach
                  </p>
                  <p style={{ fontSize: 14, color: theme.muted, lineHeight: 1.65, marginBottom: 18 }}>
                    {detail?.approach}
                  </p>
                  <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                    {AGE_GROUPS.map((a) => {
                      const { href, isForm } = getEnrollmentLink(a.id, c.id);
                      return (
                        <a
                          key={a.id}
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="home-age-pill"
                          title={
                            isForm
                              ? `Registration form: ${c.label} (${a.label})`
                              : `Book a call: ${c.label} (${a.label})`
                          }
                        >
                          {a.label}
                        </a>
                      );
                    })}
                  </div>
                </Card>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Skills + beliefs: interactive deck */}
      <section
        className="home-essence-section"
        style={{ padding: 'clamp(56px, 8vw, 88px) 0' }}
        aria-labelledby="home-essence-heading"
      >
        <Container>
          <div className="home-essence-panel">
            <div className="home-essence-panel__glow" aria-hidden />
            <div className="home-panel-heading">
              <SectionLabel>Skills &amp; beliefs</SectionLabel>
            </div>
            <h2 id="home-essence-heading" className="home-essence-panel__title">
              What we build, and what we won&apos;t compromise on
            </h2>
            <p className="home-interact-hint home-interact-hint--live">
              <span className="home-interact-hint__pulse" aria-hidden />
              <span>
                <strong>Interactive:</strong> switch between <em>Key skills</em> and{' '}
                <em>Our beliefs</em>, then tap any card or row to expand details.
              </span>
            </p>

            <div className="home-segmented home-segmented--deck" role="tablist" aria-label="Skills or beliefs">
            <button
              type="button"
              role="tab"
              aria-selected={essenceTab === 'skills'}
              className={`home-segment${essenceTab === 'skills' ? ' home-segment--active' : ''}`}
              onClick={() => setEssenceTab('skills')}
            >
              Key skills
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={essenceTab === 'beliefs'}
              className={`home-segment${essenceTab === 'beliefs' ? ' home-segment--active' : ''}`}
              onClick={() => setEssenceTab('beliefs')}
            >
              Our beliefs
            </button>
          </div>

          {essenceTab === 'skills' && (
            <>
              <p className="home-essence-lead">
                Priorities schools rarely teach in depth, yet your child needs them now.
              </p>
              <div className="home-skill-grid home-skill-grid--bento">
                {SKILLS_THAT_MATTER.map((s, i) => (
                  <button
                    key={s.title}
                    type="button"
                    className={`home-skill-tile${openSkill === i ? ' home-skill-tile--active' : ''}`}
                    onClick={() => setOpenSkill(i)}
                    aria-pressed={openSkill === i}
                  >
                    <span className="home-skill-tile__emoji-wrap" aria-hidden>
                      <span className="home-skill-tile__emoji">{s.icon}</span>
                    </span>
                    <span className="home-skill-tile__title">{s.title}</span>
                  </button>
                ))}
              </div>
              <div className="home-essence-detail">
                <span className="home-essence-detail__label">Selected skill</span>
                <p className="home-essence-detail__text">{SKILLS_THAT_MATTER[openSkill].desc}</p>
              </div>
            </>
          )}

          {essenceTab === 'beliefs' && (
            <>
              <p className="home-essence-lead">
                Six ideas that shape every class and every conversation with families.
              </p>
              <div className="home-belief-list">
                {BELIEFS.map((b, i) => {
                  const isOpen = openBelief === i;
                  return (
                    <div key={b.num} className={`home-belief-row${isOpen ? ' home-belief-row--open' : ''}`}>
                      <button
                        type="button"
                        className={`home-belief-trigger${isOpen ? ' home-belief-trigger--open' : ''}`}
                        aria-expanded={isOpen}
                        onClick={() => toggleBelief(i)}
                      >
                        <span className="home-belief-num">{b.num}</span>
                        <span className="home-belief-title">{b.title}</span>
                        <span className="home-belief-chevron" aria-hidden>
                          ▼
                        </span>
                      </button>
                      {isOpen && <div className="home-belief-body">{b.body}</div>}
                    </div>
                  );
                })}
              </div>
            </>
          )}

          <p className="home-essence-panel__footer">
            <Link to="/our-story" className="home-essence-link">
              Read the full story <span aria-hidden>→</span>
            </Link>
          </p>
          </div>
        </Container>
      </section>

      <CtaBanner
        variant="navy"
        headline="Every child deserves to feel capable, challenged, and known."
        subtext="Book a free 30 minute discovery call. We'll listen to what your child needs, and tell you honestly whether LuminoLearn is the right fit."
        primaryLabel="Book Free Discovery Call"
        primaryHref={DISCOVERY_CALL_URL}
        secondaryLabel="Explore Learning Paths"
        secondaryTo="/learning-paths"
        tertiaryLabel="Plans & Tuition"
        tertiaryTo="/tuition"
      />
    </>
  );
}
