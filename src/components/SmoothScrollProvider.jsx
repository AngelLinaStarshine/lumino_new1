import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const LenisContext = createContext(null);

export function SmoothScrollProvider({ children }) {
  const location = useLocation();
  const lenisRef = useRef(null);
  const [lenis, setLenis] = useState(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return undefined;

    const instance = new Lenis({
      autoRaf: true,
      lerp: 0.085,
      wheelMultiplier: 0.9,
      touchMultiplier: 1.85,
      smoothWheel: true,
    });
    lenisRef.current = instance;
    setLenis(instance);
    return () => {
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  useEffect(() => {
    const inst = lenisRef.current;
    if (inst) inst.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, [location.pathname]);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

/** Returns Lenis instance or null (e.g. reduced motion). */
export function useLenis() {
  return useContext(LenisContext);
}
