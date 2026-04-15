import React, { useState, useEffect } from 'react';
import Container from './Container';
import SectionLabel from './SectionLabel';
import { PRINCIPLES, PERSONALIZATION_STEPS } from '../data/siteData';

function useNarrowLayout(maxWidthPx = 900) {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${maxWidthPx}px)`);
    const on = () => setNarrow(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [maxWidthPx]);
  return narrow;
}

function OperatePrincipleDetail({ item }) {
  return (
    <div className="operate-detail-inner">
      <h3 className="operate-detail-title">{item.title}</h3>
      {item.paragraphs.map((text, i) => (
        <p key={i} className={`operate-detail-p${i === 0 ? ' operate-detail-p--lead' : ''}`}>
          {text}
        </p>
      ))}
      {item.closing ? <p className="operate-detail-closing">{item.closing}</p> : null}
    </div>
  );
}

function OperateStepDetail({ item }) {
  return (
    <div className="operate-detail-inner">
      <h3 className="operate-detail-title">{item.title}</h3>
      {item.paragraphsBefore.map((text, i) => (
        <p key={`b${i}`} className={`operate-detail-p${i === 0 ? ' operate-detail-p--lead' : ''}`}>
          {text}
        </p>
      ))}
      {item.arrowLabel ? <p className="operate-detail-arrow-label">{item.arrowLabel}</p> : null}
      {item.arrows?.length ? (
        <ul className="operate-arrow-list">
          {item.arrows.map((line, i) => (
            <li key={i} className="operate-arrow-item">
              <span className="operate-arrow-glyph" aria-hidden>
                →
              </span>
              <span>{line}</span>
            </li>
          ))}
        </ul>
      ) : null}
      {item.paragraphsAfter.map((text, i) => (
        <p key={`a${i}`} className="operate-detail-p">
          {text}
        </p>
      ))}
    </div>
  );
}

const SUBHEAD_PRINCIPLES =
  "Education isn't just about transferring knowledge. It's about developing a person — their reasoning, their confidence, their capacity to learn independently. These six principles shape every decision we make, from how we design a lesson to how we talk to a parent about their child's progress.";

const SUBHEAD_PERSONALIZE =
  '"Personalized" is the most overused word in education. Here, it means something specific: a defined process that maps each student as an individual learner and builds a path around what we find — not a generic syllabus assigned by age.';

export default function HowWeOperateSection() {
  const narrow = useNarrowLayout(900);
  const [mode, setMode] = useState('principles');
  const [principleIndex, setPrincipleIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);

  useEffect(() => {
    if (!narrow) {
      setPrincipleIndex((p) => (p < 0 ? 0 : p));
      setStepIndex((s) => (s < 0 ? 0 : s));
    }
  }, [narrow]);

  const subhead = mode === 'principles' ? SUBHEAD_PRINCIPLES : SUBHEAD_PERSONALIZE;

  return (
    <section
      id="how-we-operate"
      className="home-operate-section"
      style={{ padding: 'clamp(56px, 8vw, 88px) 0' }}
      aria-labelledby="story-operate-heading"
    >
      <Container>
        <div className="home-operate-panel">
          <div className="home-operate-panel__glow" aria-hidden />
          <div className="operate-header-top">
            <SectionLabel>Our Operating Principles</SectionLabel>
          </div>
          <h2 id="story-operate-heading" className="home-operate-panel__title operate-main-title">
            How we operate
          </h2>
          <p className="home-operate-intro operate-subhead">{subhead}</p>

          <p className="home-interact-hint home-interact-hint--live">
            <span className="home-interact-hint__pulse home-interact-hint__pulse--warm" aria-hidden />
            <span>
              <strong>Try it:</strong> choose <em>What Guides Us</em> or <em>How We Personalize</em>, then
              select a principle or step — the detail panel updates beside the list on larger screens, and
              expands in place on smaller ones.
            </span>
          </p>

          <div
            className="home-segmented home-segmented--deck home-segmented--warm"
            role="tablist"
            aria-label="Operating principles or personalization"
          >
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'principles'}
              className={`home-segment${mode === 'principles' ? ' home-segment--active' : ''}`}
              onClick={() => {
                setMode('principles');
                setPrincipleIndex(0);
              }}
            >
              What Guides Us
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={mode === 'personalize'}
              className={`home-segment${mode === 'personalize' ? ' home-segment--active' : ''}`}
              onClick={() => {
                setMode('personalize');
                setStepIndex(0);
              }}
            >
              How We Personalize
            </button>
          </div>

          {mode === 'principles' && (
            <div className="operate-mode-wrap">
              {!narrow ? (
                <div className="operate-split">
                  <nav className="operate-rail" aria-label="Operating principles">
                    {PRINCIPLES.map((p, i) => (
                      <button
                        key={p.id}
                        type="button"
                        className={`operate-rail-btn${i === principleIndex ? ' operate-rail-btn--active' : ''}`}
                        aria-current={i === principleIndex ? 'true' : undefined}
                        onClick={() => setPrincipleIndex(i)}
                      >
                        <span className="operate-rail-icon" aria-hidden>
                          {p.icon}
                        </span>
                        <span className="operate-rail-label">{p.shortLabel}</span>
                      </button>
                    ))}
                  </nav>
                  <div
                    className="operate-detail-shell home-operate-detail home-operate-detail--values"
                    key={principleIndex}
                  >
                    <div className="operate-detail-pane">
                      <OperatePrincipleDetail item={PRINCIPLES[principleIndex]} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="operate-accordion" role="list">
                  {PRINCIPLES.map((p, i) => {
                    const open = i === principleIndex;
                    return (
                      <div key={p.id} className="operate-acc-item" role="listitem">
                        <button
                          type="button"
                          className={`operate-acc-trigger${open ? ' operate-acc-trigger--open' : ''}`}
                          aria-expanded={open}
                          onClick={() => setPrincipleIndex(open ? -1 : i)}
                        >
                          <span className="operate-rail-icon" aria-hidden>
                            {p.icon}
                          </span>
                          <span className="operate-rail-label">{p.shortLabel}</span>
                          <span className="operate-acc-chevron" aria-hidden>
                            {open ? '−' : '+'}
                          </span>
                        </button>
                        {open ? (
                          <div className="operate-acc-panel home-operate-detail home-operate-detail--values">
                            <OperatePrincipleDetail item={p} />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {mode === 'personalize' && (
            <div className="operate-mode-wrap">
              {!narrow ? (
                <div className="operate-split">
                  <nav className="operate-rail" aria-label="Personalization steps">
                    {PERSONALIZATION_STEPS.map((s, i) => (
                      <button
                        key={s.id}
                        type="button"
                        className={`operate-rail-btn operate-rail-btn--step${
                          i === stepIndex ? ' operate-rail-btn--active' : ''
                        }`}
                        aria-current={i === stepIndex ? 'true' : undefined}
                        onClick={() => setStepIndex(i)}
                      >
                        <span className="operate-step-num" aria-hidden>
                          {s.step}
                        </span>
                        <span className="operate-rail-label">{s.shortLabel}</span>
                      </button>
                    ))}
                  </nav>
                  <div
                    className="operate-detail-shell home-operate-detail home-operate-detail--steps"
                    key={stepIndex}
                  >
                    <div className="operate-detail-pane">
                      <OperateStepDetail item={PERSONALIZATION_STEPS[stepIndex]} />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="operate-accordion" role="list">
                  {PERSONALIZATION_STEPS.map((s, i) => {
                    const open = i === stepIndex;
                    return (
                      <div key={s.id} className="operate-acc-item" role="listitem">
                        <button
                          type="button"
                          className={`operate-acc-trigger operate-acc-trigger--step${
                            open ? ' operate-acc-trigger--open' : ''
                          }`}
                          aria-expanded={open}
                          onClick={() => setStepIndex(open ? -1 : i)}
                        >
                          <span className="operate-step-num" aria-hidden>
                            {s.step}
                          </span>
                          <span className="operate-rail-label">{s.shortLabel}</span>
                          <span className="operate-acc-chevron" aria-hidden>
                            {open ? '−' : '+'}
                          </span>
                        </button>
                        {open ? (
                          <div className="operate-acc-panel home-operate-detail home-operate-detail--steps">
                            <OperateStepDetail item={s} />
                          </div>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
