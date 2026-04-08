import React from 'react';
import { Container, SectionLabel, Card, CtaBanner } from '../components';
import { PLANS, PAYMENT_OPTIONS, DISCOVERY_CALL_FORM_URL } from '../data/siteData';
import { theme, font } from '../styles/theme';

export default function TuitionPage() {
  return (
    <>
      {/* Hero */}
      <section style={{ paddingTop: 140, paddingBottom: 60, background: theme.light }}>
        <Container narrow style={{ textAlign: 'center' }}>
          <SectionLabel>Plans & Tuition</SectionLabel>
          <h1
            className="fade-up"
            style={{
              fontFamily: font.display,
              fontSize: 44,
              color: theme.navy,
              marginBottom: 16,
            }}
          >
            Simple, transparent pricing
          </h1>
          <p
            className="fade-up delay-1"
            style={{ fontSize: 17, color: theme.muted, lineHeight: 1.7 }}
          >
            These are the same programs described on the home page and Learning Paths: student
            programs for ages 9 to 17. Everyone begins with LuminoStart™, then continues into
            LuminoCore™ or LuminoPath™. No hidden fees. No long term contracts.
          </p>
        </Container>
      </section>

      {/* Plans */}
      <section style={{ padding: '64px 0' }}>
        <Container>
          <div
            className="grid-3"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 24,
              marginBottom: 56,
            }}
          >
            {PLANS.map((plan, i) => (
              <Card
                key={i}
                style={{
                  position: 'relative',
                  borderColor: plan.featured ? theme.teal : theme.border,
                  borderWidth: plan.featured ? 2 : 1,
                }}
              >
                {/* Badge */}
                <div style={{ position: 'absolute', top: -12, left: 24 }}>
                  <span
                    style={{
                      padding: '4px 14px',
                      borderRadius: 20,
                      background: plan.badgeColor,
                      color: '#fff',
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                  >
                    {plan.badge}
                  </span>
                </div>

                <div style={{ marginTop: 8 }}>
                  <h3
                    style={{
                      fontFamily: font.display,
                      fontSize: 24,
                      color: theme.navy,
                      marginBottom: 4,
                    }}
                  >
                    {plan.name}
                  </h3>
                  <div style={{ fontSize: 14, color: theme.muted, marginBottom: 16 }}>
                    {plan.duration}
                  </div>

                  {/* Price */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: 4,
                      marginBottom: 8,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: font.display,
                        fontSize: 32,
                        color: theme.navy,
                      }}
                    >
                      {plan.price}
                    </span>
                    <span style={{ fontSize: 14, color: theme.muted }}>
                      {' '}
                      CAD {plan.unit}
                    </span>
                  </div>

                  <p
                    style={{
                      fontSize: 14,
                      color: theme.muted,
                      lineHeight: 1.6,
                      marginBottom: 20,
                      minHeight: 48,
                    }}
                  >
                    {plan.desc}
                  </p>

                  {/* Features */}
                  <div style={{ borderTop: `1px solid ${theme.border}`, paddingTop: 16 }}>
                    {plan.features.map((f, j) => (
                      <div
                        key={j}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          marginBottom: 8,
                        }}
                      >
                        <span style={{ color: theme.teal, fontSize: 14 }}>✓</span>
                        <span style={{ fontSize: 14, color: theme.text }}>{f}</span>
                      </div>
                    ))}
                  </div>

                  {/* Subject pricing */}
                  {plan.subjects && (
                    <div
                      style={{
                        marginTop: 16,
                        background: theme.light,
                        borderRadius: 10,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: theme.navy,
                          marginBottom: 8,
                        }}
                      >
                        Per subject:
                      </div>
                      {plan.subjects.map((s, j) => (
                        <div
                          key={j}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 14,
                            color: theme.text,
                            marginBottom: 4,
                          }}
                        >
                          <span>{s.name}</span>
                          <span style={{ fontWeight: 600 }}>{s.price}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Bundle pricing */}
                  {plan.bundles && (
                    <div
                      style={{
                        marginTop: 16,
                        background: theme.light,
                        borderRadius: 10,
                        padding: 16,
                      }}
                    >
                      <div
                        style={{
                          fontSize: 13,
                          fontWeight: 600,
                          color: theme.navy,
                          marginBottom: 8,
                        }}
                      >
                        Bundle options:
                      </div>
                      {plan.bundles.map((b, j) => (
                        <div
                          key={j}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            fontSize: 14,
                            color: theme.text,
                            marginBottom: 4,
                          }}
                        >
                          <span>
                            {b.months} months ({b.cycles} cycles)
                          </span>
                          <span style={{ fontWeight: 600 }}>{b.price}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {/* Payment Options */}
          <div
            style={{
              background: theme.light,
              borderRadius: 16,
              padding: 40,
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                fontFamily: font.display,
                fontSize: 24,
                color: theme.navy,
                marginBottom: 16,
              }}
            >
              Flexible payment options
            </h3>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: 24,
                width: '100%',
              }}
            >
              {PAYMENT_OPTIONS.map((p, i) => (
                <div key={i}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
                  <h4
                    style={{
                      fontSize: 15,
                      fontWeight: 600,
                      color: theme.navy,
                      marginBottom: 4,
                    }}
                  >
                    {p.title}
                  </h4>
                  <p style={{ fontSize: 13, color: theme.muted, lineHeight: 1.5 }}>
                    {p.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <CtaBanner
        primaryHref={DISCOVERY_CALL_FORM_URL}
        primaryLabel="Book Free Discovery Call"
        secondaryLabel="Explore Learning Paths"
        secondaryTo="/learning-paths"
        tertiaryLabel="LuminoPro"
        tertiaryTo="/luminopro"
      />
    </>
  );
}
