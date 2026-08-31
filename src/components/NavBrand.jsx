import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import luminolearnLogo from '../assets/luminolearn-logo.png';

/** logo → word → logo → logo + word */
const PHASES = ['logo', 'word', 'logo', 'both'];
const CYCLE_MS = 3200;
const IDLE_CYCLE_MS = 5200;

export default function NavBrand() {
  const navigate = useNavigate();
  const [phaseIndex, setPhaseIndex] = useState(0);
  const [active, setActive] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const intervalRef = useRef(null);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  const phase = reduceMotion ? 'both' : PHASES[phaseIndex];

  const advance = useCallback(() => {
    setPhaseIndex((i) => (i + 1) % PHASES.length);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return undefined;
    }

    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(advance, active ? CYCLE_MS : IDLE_CYCLE_MS);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [active, advance, reduceMotion]);

  useEffect(() => {
    if (!active) setPhaseIndex(0);
  }, [active]);

  const goHome = () => navigate('/');

  return (
    <button
      type="button"
      className="nav-brand-hit nav-brand-cycle"
      onClick={goHome}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
      aria-label="Luminolearn Inc. home"
      data-phase={phase}
    >
      <span className="nav-brand-cycle__frame">
        <span className="nav-brand-cycle__logo-wrap">
          <img
            src={luminolearnLogo}
            alt=""
            decoding="async"
            className="nav-brand-logo nav-brand-cycle__logo"
          />
        </span>
        <span className="nav-brand-cycle__word-wrap">
          <span className="footer-brand-title nav-brand-wordmark nav-brand-cycle__word">
            Luminolearn Inc.
          </span>
        </span>
      </span>
      <span className="visually-hidden">Luminolearn Inc.</span>
    </button>
  );
}
