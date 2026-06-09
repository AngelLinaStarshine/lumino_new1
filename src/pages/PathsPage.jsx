import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, SectionLabel, Card, Button, PageAmbient } from '../components';
import ComingSoonModal from '../components/ComingSoonModal';
import {
  COURSES,
  AGE_GROUPS,
  DISCOVERY_CALL_URL,
  AI_ETHICS_INTRO,
  AI_PRINCIPLES,
  LEARNING_JOURNEY_STEPS,
} from '../data/siteData';
import { theme, font } from '../styles/theme';

function journeyCtaUrl(urlKey) {
  if (urlKey === 'discovery_call') return DISCOVERY_CALL_URL;
  if (urlKey === 'tuition') return '/tuition';
  return null;
}

function enrollQuery(params) {
  const sp = new URLSearchParams();
  if (params.age) sp.set('age', params.age);
  if (params.subject) sp.set('subject', params.subject);
  const q = sp.toString();
  return q ? `/enroll?${q}` : '/enroll';
}

/** Hash targets from home page curriculum links (`#mathematics`, `#language`, `#cs`). */
function courseSectionId(courseId) {
  if (courseId === 'math') return 'mathematics';
  return courseId;
}

export default function PathsPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [journeyModalIndex, setJourneyModalIndex] = useState(null);
  const journeyModalStep =
    journeyModalIndex !== null ? LEARNING_JOURNEY_STEPS[journeyModalIndex] : null;
  const journeyModalCtaHref =
    journeyModalStep?.cta ? journeyCtaUrl(journeyModalStep.cta.urlKey) : null;

  useEffect(() => {
    const id = location.hash?.replace(/^#/, '');
    if (!id) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);
    return () => window.clearTimeout(timer);
  }, [location.pathname, location.hash]);

  return (
    <div className="home-page inner-ambient-page paths-page">
      <PageAmbient />
      <>
      {/* Hero */}
      <section
        style={{
          paddingTop: 'clamp(112px, 12vh, 148px)',
          paddingBottom: 60,
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.42) 0%, rgba(253, 250, 240, 0.78) 28%, ${theme.light} 55%, ${theme.light} 100%)`,
        }}
      >
        <Container narrow style={{ textAlign: 'center', width: '100%' }}>
          <SectionLabel>Learning Paths</SectionLabel>
          <h1
            className="fade-up inner-ambient-page__hero-title"
            style={{
              fontFamily: font.display,
              color: theme.navy,
              marginBottom: 16,
            }}
          >
            Find the right path for your child
          </h1>
          <p
            className="fade-up delay-1 inner-ambient-page__hero-lead"
            style={{ color: theme.muted, lineHeight: 1.72 }}
          >
            Same focus as our home page: Mathematics, Language, and Computer Science for ages 9 to
            17, with small groups and placement by ability. Every family starts with a free discovery
            call, then LuminoStart™ assessment, then LuminoCore™ or LuminoPath™ cycles.
          </p>
        </Container>
      </section>

      {/* Course Selector */}
      <section style={{ padding: '64px 0' }}>
        <Container>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 30,
              color: theme.navy,
              marginBottom: 32,
              textAlign: 'center',
            }}
          >
            Choose a subject
          </h2>
          <div
            className="grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginBottom: 56,
            }}
          >
            {COURSES.map((c) => (
              <div key={c.id} id={courseSectionId(c.id)} style={{ scrollMarginTop: 96 }}>
                <Card
                  hoverable
                  role="button"
                  tabIndex={0}
                  aria-label={`Open enrollment for ${c.label}`}
                  onClick={() => navigate(enrollQuery({ subject: c.id }))}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      navigate(enrollQuery({ subject: c.id }));
                    }
                  }}
                  style={{
                    borderColor: theme.border,
                    borderWidth: 2,
                    textAlign: 'center',
                  }}
                >
                  <div style={{ fontSize: 48, marginBottom: 12 }}>{c.icon}</div>
                  <div
                    style={{
                      fontSize: 13,
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
                      fontSize: 24,
                      color: theme.navy,
                      marginBottom: 8,
                    }}
                  >
                    {c.label}
                  </h3>
                  <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.62 }}>{c.desc}</p>
                </Card>
              </div>
            ))}
          </div>

          {/* Age Groups */}
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 30,
              color: theme.navy,
              marginBottom: 8,
              textAlign: 'center',
            }}
          >
            Age groups
          </h2>
          <p
            style={{
              fontSize: 16,
              color: theme.muted,
              textAlign: 'center',
              marginBottom: 32,
            }}
          >
            Students are placed by ability and learning style within their age group, not just by
            grade.
          </p>
          <div
            className="grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginBottom: 56,
            }}
          >
            {AGE_GROUPS.map((a, i) => (
              <Card
                key={a.id}
                className={`fade-up delay-${i + 1}`}
                hoverable
                role="button"
                tabIndex={0}
                aria-label={`Open enrollment for ${a.label}`}
                onClick={() => navigate(enrollQuery({ age: a.id }))}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    navigate(enrollQuery({ age: a.id }));
                  }
                }}
                style={{ scrollMarginTop: 96 }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: 12,
                  }}
                >
                  <span
                    style={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: theme.teal,
                      textTransform: 'uppercase',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {a.tag}
                  </span>
                  <span
                    style={{
                      padding: '4px 12px',
                      borderRadius: 20,
                      background: theme.light,
                      fontSize: 15,
                      fontWeight: 600,
                      color: theme.navy,
                    }}
                  >
                    {a.label}
                  </span>
                </div>
                <p
                  style={{
                    fontSize: 16,
                    color: theme.muted,
                    lineHeight: 1.62,
                    marginBottom: 16,
                  }}
                >
                  {a.desc}
                </p>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }} onClick={(e) => e.stopPropagation()}>
                  {COURSES.map((c) => (
                    <button
                      type="button"
                      key={c.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(enrollQuery({ age: a.id, subject: c.id }));
                      }}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 12,
                        border: 'none',
                        cursor: 'pointer',
                        background: `${c.color}18`,
                        fontSize: 14,
                        color: c.color,
                        fontWeight: 600,
                        fontFamily: 'inherit',
                        textAlign: 'left',
                      }}
                    >
                      {c.label}
                    </button>
                  ))}
                </div>
              </Card>
            ))}
          </div>

          {/* Journey timeline */}
          <div className="paths-journey-wrap">
            <h2
              style={{
                fontFamily: font.display,
                fontSize: 30,
                color: theme.navy,
                marginBottom: 10,
                textAlign: 'center',
              }}
            >
              The learning journey
            </h2>
            <p
              style={{
                fontSize: 16,
                color: theme.muted,
                textAlign: 'center',
                maxWidth: 560,
                margin: '0 auto 28px',
                lineHeight: 1.58,
              }}
            >
              Tap any step for a fuller explanation. Steps follow the same order families experience
              after the discovery call.
            </p>
            <div className="paths-journey-track" role="list">
              {LEARNING_JOURNEY_STEPS.map((s, i) => (
                <div key={s.id} className="paths-journey-node" role="listitem">
                  <button
                    type="button"
                    className={`paths-journey-card paths-journey-card--${s.variant}`}
                    onClick={() => setJourneyModalIndex(i)}
                    aria-haspopup="dialog"
                    aria-expanded={journeyModalIndex === i}
                    aria-label={`${s.name}: more detail`}
                  >
                    <p className="paths-journey-card__title">{s.name}</p>
                    <p className="paths-journey-card__sub">{s.sub}</p>
                    <span className="paths-journey-card__hint">Learn more</span>
                  </button>
                  {i < LEARNING_JOURNEY_STEPS.length - 1 && (
                    <span className="paths-journey-connector" aria-hidden>
                      ›
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <ComingSoonModal
        open={journeyModalIndex !== null}
        onClose={() => setJourneyModalIndex(null)}
        title={journeyModalStep?.name ?? ''}
        wide
        closeLabel="Close"
      >
        {journeyModalStep ? (
          <>
            <p
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: theme.teal,
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                margin: '0 0 14px',
              }}
            >
              {journeyModalStep.sub}
            </p>
            {journeyModalStep.body.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 17,
                  color: theme.muted,
                  lineHeight: 1.68,
                  margin: i === journeyModalStep.body.length - 1 ? 0 : 14,
                }}
              >
                {para}
              </p>
            ))}
            {journeyModalStep.cta && journeyModalCtaHref ? (
              <div
                style={{
                  marginTop: 22,
                  paddingTop: 18,
                  borderTop: `1px solid ${theme.border}`,
                }}
              >
                {journeyModalStep.cta.urlKey === 'discovery_call' ? (
                  <a
                    href={journeyModalCtaHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-block',
                      fontSize: 17,
                      fontWeight: 700,
                      color: theme.teal,
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                    }}
                  >
                    {journeyModalStep.cta.label} ↗
                  </a>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      setJourneyModalIndex(null);
                      navigate(journeyModalCtaHref);
                    }}
                    style={{
                      background: 'none',
                      border: 'none',
                      padding: 0,
                      cursor: 'pointer',
                      fontFamily: font.body,
                      fontSize: 17,
                      fontWeight: 700,
                      color: theme.teal,
                      textDecoration: 'underline',
                      textUnderlineOffset: 3,
                    }}
                  >
                    {journeyModalStep.cta.label}
                  </button>
                )}
              </div>
            ) : null}
          </>
        ) : null}
      </ComingSoonModal>

      {/* Our position on AI: after programs / journey */}
      <section style={{ padding: '80px 0', background: theme.warm }}>
        <Container>
          <SectionLabel>Our Position on AI</SectionLabel>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 36,
              color: theme.navy,
              marginBottom: 24,
              lineHeight: 1.25,
            }}
          >
            We teach AI. We also teach when not to use it.
          </h2>
          <div
            style={{
              background: theme.card,
              borderRadius: 16,
              padding: '32px 36px',
              border: `1px solid ${theme.border}`,
              marginBottom: 40,
            }}
          >
            {AI_ETHICS_INTRO.map((para, i) => (
              <p
                key={i}
                style={{
                  fontSize: 18,
                  color: theme.text,
                  lineHeight: 1.76,
                  marginBottom: i === AI_ETHICS_INTRO.length - 1 ? 0 : 16,
                }}
              >
                {para}
              </p>
            ))}
          </div>
          <div
            className="paths-ai-principles grid-3"
            style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}
          >
            {AI_PRINCIPLES.map((block, i) => (
              <Card key={i} style={{ padding: 24 }}>
                <div style={{ fontSize: 30, marginBottom: 12 }}>{block.icon}</div>
                <h3 style={{ fontFamily: font.display, fontSize: 19, color: theme.navy, marginBottom: 10 }}>
                  {block.title}
                </h3>
                <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.62 }}>{block.desc}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <section style={{ padding: '48px 0', textAlign: 'center' }}>
        <Container>
          <h2
            style={{
              fontFamily: font.display,
              fontSize: 30,
              color: theme.navy,
              marginBottom: 12,
            }}
          >
            Ready to find the right fit?
          </h2>
          <p style={{ fontSize: 17, color: theme.muted, marginBottom: 32, lineHeight: 1.65 }}>
            Start with a free discovery call (same link as the home page). Then review plans and
            tuition, or go straight to enrollment when you are ready.
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Button href={DISCOVERY_CALL_URL}>Book Free Discovery Call</Button>
            <Button variant="secondary" to="/tuition">
              Plans & Tuition
            </Button>
            <Button variant="secondary" to="/enroll">
              Enroll Your Child
            </Button>
          </div>
        </Container>
      </section>
    </>
    </div>
  );
}
