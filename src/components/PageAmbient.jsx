import React from 'react';
import { AMBIENT_SHAPES } from '../data/ambientShapesData';

/** Waves + floating pastel shapes (same layer as home). `pointer-events: none` in CSS. */
export default function PageAmbient() {
  return (
    <div className="home-page__ambient" aria-hidden>
      <div className="home-page__waves">
        <svg
          className="home-page__waves-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 3200 168"
          preserveAspectRatio="none"
          focusable="false"
        >
          <g className="home-page__wave home-page__wave--sage">
            <path
              fill="rgba(125, 207, 182, 0.2)"
              d="M0,48 C640,18 1280,92 1920,48 S2560,28 3200,54 L3200,168 L0,168 Z"
            />
          </g>
          <g className="home-page__wave home-page__wave--lilac">
            <path
              fill="rgba(217, 184, 243, 0.18)"
              d="M0,68 C680,32 1360,102 2040,68 S2720,42 3200,76 L3200,168 L0,168 Z"
            />
          </g>
          <g className="home-page__wave home-page__wave--peach">
            <path
              fill="rgba(255, 186, 140, 0.22)"
              d="M0,86 C720,44 1440,118 2160,82 S2880,58 3200,92 L3200,168 L0,168 Z"
            />
          </g>
        </svg>
      </div>
      <div className="home-page__orbs">
        {AMBIENT_SHAPES.map((s, i) => {
          const toneClass = `home-page__orb--${s.tone}`;
          const flyClass = `home-page__shape--fly${s.fly}`;
          const sizeStyle =
            s.kind === 'pill' ? { width: s.w, height: s.h } : { width: s.size, height: s.size };
          return (
            <span
              key={i}
              className={`home-page__shape home-page__shape--${s.kind} ${toneClass} ${flyClass}`}
              style={{
                top: s.top,
                left: s.left,
                ...sizeStyle,
                animationDelay: s.delay,
                animationDuration: s.duration,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
