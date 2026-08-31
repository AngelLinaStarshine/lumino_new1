import React from 'react';
import { Container, SectionLabel, Card, Button, PageAmbient, RelatedLinks } from '../components';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const LAYERS = [
  {
    num: '1',
    title: 'Learner Interface',
    body: 'The classroom, the practice environment, and every point where a student interacts with the platform. Designed for clarity, minimal cognitive overhead, and age appropriate autonomy.',
  },
  {
    num: '2',
    title: 'Privacy Preserving Data Layer',
    body: 'Federated learning combined with entropy adaptive differential privacy. The platform learns from student behaviour without student behaviour leaving the student\'s control. No raw data centralization. Canadian data residency. PIPEDA aligned from the ground up.',
  },
  {
    num: '3',
    title: 'Adaptive Personalization Engine',
    body: 'A machine learning core that models each learner\'s mastery in real time across AI, Cybersecurity, and Math + Physics, and rebuilds the practice sequence, difficulty, and pacing after every interaction.',
  },
  {
    num: '4',
    title: 'Curriculum & Assessment Substrate',
    body: 'The subject matter backbone: a K to 12 curriculum spanning AI literacy, cryptography and cybersecurity (including age appropriate post quantum cryptography modules), and integrated Math + Physics. Three proficiency tiers per subject, aligned to Canadian provincial standards.',
  },
  {
    num: '5',
    title: 'Inference Policy Engine',
    body: 'The safety layer. Every AI generated response (explanations, hints, feedback) passes through a policy engine that enforces pedagogical soundness, age appropriateness, and factual grounding before it reaches a student.',
  },
];

const DIFFERENTIATORS = [
  {
    title: 'Privacy without compromise',
    body: 'Most personalized learning platforms centralize student data to work. Ours doesn\'t. Federated learning means the model improves from patterns across many students without any student\'s raw data leaving their device or being pooled. Differential privacy adds mathematical guarantees on top. All data stays in Canada.',
  },
  {
    title: 'Adaptation that actually adapts',
    body: 'The personalization engine doesn\'t just pick from a fixed set of difficulty levels. It models mastery continuously across concepts, detects the specific misconception behind a wrong answer, and rebuilds the practice sequence in response. Learning gets shorter, not longer, for concepts already known.',
  },
  {
    title: 'Built for the post quantum era',
    body: 'The cryptographic foundations of the internet are being rebuilt right now for the post quantum era. Our curriculum introduces students to that transition through age appropriate PQC modules, and our own platform architecture is designed so it can migrate to post quantum primitives without rebuilding the stack. Few platforms anywhere teach this. Fewer still are built on an architecture that lives it.',
  },
];

const PQC_PARAGRAPHS = [
  'Within the next decade, most of the encryption protecting today\'s internet will need to be replaced. Governments and standards bodies, including NIST and Canada\'s own Communications Security Establishment, are already publishing the algorithms that will replace it.',
  'The people who will build, maintain, and secure that next generation internet are children today. LuminoLearn introduces the mathematics and intuition behind post quantum cryptography starting at age 12, through lattices, hash based signatures, and hands on labs designed for young learners. Not to make every student a cryptographer, but to ensure the next Canadian generation isn\'t caught unprepared for the biggest cryptographic transition in decades.',
];

const AUDIENCES = [
  {
    title: 'For parents',
    body: 'Your child\'s data stays under your control, stored in Canada. The platform learns from how they learn, not from a data profile on a server somewhere. And every AI response your child sees has been vetted for accuracy and age appropriateness before it reaches them.',
    cta: null,
  },
  {
    title: 'For Canadian schools & districts',
    body: 'PIPEDA aligned, Canadian data residency, no third party ad tracking, full audit trail. Integrates alongside existing LMS deployments. License the curriculum, the platform, or both.',
    cta: { label: 'Request a technical briefing', to: '/schools' },
  },
  {
    title: 'For researchers, partners, and funders',
    body: 'We\'re actively pursuing collaborations with Canadian universities on federated learning and PQC pedagogy research. We\'re open to Mitacs, NSERC, and IRAP supported partnerships.',
    cta: { label: 'Contact our research team', to: '/contact' },
  },
];

const TECH_TRUST_ITEMS = [
  'Built in Canada',
  'PIPEDA aligned',
  'Canadian data residency',
  'Federated learning',
  'Differential privacy',
  'Post quantum ready architecture',
];

const sectionHeading = {
  fontFamily: font.display,
  fontSize: 'clamp(2rem, 3.6vw, 2.65rem)',
  color: theme.navy,
  marginBottom: 12,
  lineHeight: 1.2,
};

const sectionLead = {
  fontSize: 'clamp(1.05rem, 1.45vw, 1.25rem)',
  color: theme.muted,
  marginBottom: 40,
  lineHeight: 1.72,
  maxWidth: 760,
};

const bodyCopy = {
  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
  color: theme.muted,
  lineHeight: 1.75,
  margin: 0,
};

export default function TechnologyPage() {
  usePageMeta({
    title: 'Technology — LuminoLearn',
    description:
      'The five layer, privacy preserving architecture powering LuminoLearn\'s adaptive learning platform. Federated learning, differential privacy, and a post quantum ready foundation. Built in Canada.',
    path: '/technology',
  });

  return (
    <div className="home-page inner-ambient-page technology-page">
      <PageAmbient />

      <section
        className="technology-hero"
        aria-labelledby="technology-hero-heading"
        style={{
          paddingTop: 'clamp(112px, 12vh, 148px)',
          paddingBottom: 'clamp(56px, 8vw, 80px)',
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.38) 0%, ${theme.bg} 100%)`,
        }}
      >
        <Container narrow style={{ textAlign: 'center', width: '100%' }}>
          <SectionLabel>Platform architecture</SectionLabel>
          <h1 id="technology-hero-heading" className="inner-ambient-page__hero-title fade-up">
            The technology behind LuminoLearn.
          </h1>
          <p className="fade-up delay-1 inner-ambient-page__hero-lead" style={{ color: theme.muted, lineHeight: 1.72 }}>
            An adaptive, privacy preserving learning platform built in Canada, designed on a five layer
            architecture for the security realities of the next decade, including the post quantum era
            already underway.
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="architecture-heading" style={{ background: theme.light }}>
        <Container>
          <h2 id="architecture-heading" style={sectionHeading}>
            The five layer architecture
          </h2>
          <p style={sectionLead}>
            From the student experience to the safety layer that governs every AI response, each layer
            has a distinct job and a clear boundary.
          </p>
          <ol className="technology-layers" aria-label="Five layer architecture">
            {LAYERS.map((layer) => (
              <li key={layer.num} className="technology-layer-item">
                <Card hoverable={false} className="technology-layer-card">
                  <div className="technology-layer-inner">
                    <span className="technology-layer-num operate-step-num" aria-hidden>
                      {layer.num}
                    </span>
                    <div>
                      <h3
                        style={{
                          fontFamily: font.display,
                          fontSize: 'clamp(1.2rem, 2vw, 1.45rem)',
                          color: theme.navy,
                          marginBottom: 10,
                          lineHeight: 1.25,
                        }}
                      >
                        Layer {layer.num}: {layer.title}
                      </h3>
                      <p style={bodyCopy}>{layer.body}</p>
                    </div>
                  </div>
                </Card>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="different-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="different-heading" style={sectionHeading}>
            What makes this technically different
          </h2>
          <div className="technology-diff-grid">
            {DIFFERENTIATORS.map((col) => (
              <article key={col.title}>
                <Card hoverable={false}>
                  <h3
                    style={{
                      fontFamily: font.display,
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                      color: theme.teal,
                      marginBottom: 12,
                      lineHeight: 1.3,
                    }}
                  >
                    {col.title}
                  </h3>
                  <p style={bodyCopy}>{col.body}</p>
                </Card>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="pqc-heading" style={{ background: theme.light }}>
        <Container narrow style={{ maxWidth: 820 }}>
          <h2 id="pqc-heading" style={sectionHeading}>
            Why we teach post quantum cryptography to young learners
          </h2>
          {PQC_PARAGRAPHS.map((para, i) => (
            <p key={i} style={{ ...bodyCopy, marginBottom: i === PQC_PARAGRAPHS.length - 1 ? 0 : 20 }}>
              {para}
            </p>
          ))}
        </Container>
      </section>

      <section className="home-section" aria-labelledby="audience-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="audience-heading" style={sectionHeading}>
            What this means for you
          </h2>
          <div className="technology-audience-grid">
            {AUDIENCES.map((block) => (
              <article key={block.title}>
                <Card hoverable={false}>
                  <h3
                    style={{
                      fontFamily: font.display,
                      fontSize: 'clamp(1.2rem, 2vw, 1.4rem)',
                      color: theme.navy,
                      marginBottom: 12,
                    }}
                  >
                    {block.title}
                  </h3>
                  <p style={{ ...bodyCopy, marginBottom: block.cta ? 24 : 0 }}>{block.body}</p>
                  {block.cta && (
                    <Button to={block.cta.to} variant={block.cta.to === '/contact' ? 'secondary' : 'primary'}>
                      {block.cta.label}
                    </Button>
                  )}
                </Card>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" style={{ background: theme.bg, paddingTop: 0 }}>
        <Container narrow style={{ maxWidth: 720 }}>
          <RelatedLinks
            links={[
              { to: '/learning-paths', label: 'Curriculum paths' },
              { to: '/our-story', label: 'Our story' },
              { to: '/schools', label: 'School licensing' },
            ]}
          />
        </Container>
      </section>

      <section
        className="footer-trust-block technology-trust-block"
        aria-label="Compliance and trust"
        style={{
          borderTop: `1px solid ${theme.border}`,
          background: theme.navy,
          padding: 'clamp(24px, 4vw, 32px) 0',
        }}
      >
        <div className="footer-trust-block__inner technology-trust-block__inner">
          {TECH_TRUST_ITEMS.map((item, i) => (
            <React.Fragment key={item}>
              {i > 0 && (
                <span className="footer-trust-block__sep technology-trust-block__sep" aria-hidden>
                  ·
                </span>
              )}
              <span className="footer-trust-block__badge technology-trust-block__badge">{item}</span>
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
}
