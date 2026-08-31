import React from 'react';
import { Link } from 'react-router-dom';
import { Container, SectionLabel, Card, Button, PageAmbient } from '../components';
import { CONSULTATION, STORY_TEAM } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const WHY_WE_EXIST = [
  'The children starting school today will graduate into a world where artificial intelligence writes alongside them, cryptography protects or exposes their entire digital life, and the mathematics behind both defines what\'s possible. The old shape of literacy, reading, writing, arithmetic, remains necessary. It is no longer sufficient.',
  'We built LuminoLearn to teach the new literacy alongside the old. Not as an add-on, and not as a hobby elective, but as a serious, structured curriculum spanning AI, cybersecurity (including age appropriate post quantum cryptography), and integrated math + physics. Taught by real Canadian educators. Delivered on a Canadian built, privacy first platform. Available to families across Canada and to Canadian schools and districts as a licensable program.',
  'We started in Canada because we believe the country\'s next generation deserves a first class version of this education, built here, aligned to Canadian standards, hosted on Canadian data infrastructure, and answerable to Canadian families. What we build well here, we will share more broadly. But the priority is clear, and it comes first.',
];

const PRINCIPLES = [
  {
    title: 'Depth over surface',
    body: 'It\'s easier to teach children to use tools than to understand them. We do the harder thing. Our students learn how AI actually learns, why cryptography works, and what the mathematics is really saying, because the shortcuts break the moment a child hits a real problem.',
  },
  {
    title: 'Human educators at the centre',
    body: 'Adaptive technology is powerful. It doesn\'t replace a teacher who notices a child is quietly confused, or one who challenges a student who\'s coasting. Every LuminoLearn student is taught by a real Canadian educator. The platform serves that relationship. It doesn\'t substitute for it.',
  },
  {
    title: 'Privacy is a first-order design decision',
    body: 'Learning platforms don\'t have to centralize children\'s data to work. Ours doesn\'t. Federated learning, differential privacy, and Canadian data residency aren\'t features we added. They\'re constraints we built the platform inside from the beginning.',
  },
  {
    title: 'Canadian first, seriously',
    body: 'Canadian curriculum standards. Canadian educators. Canadian data infrastructure. Canadian families. We\'re not a global product that happens to be available in Canada. We\'re a Canadian program, built here for here, first.',
  },
  {
    title: 'Preparation for the internet that\'s actually coming',
    body: 'The internet is being rebuilt for the post quantum era right now. The generation we teach will be the one that inherits and operates what emerges. We introduce the mathematics, the intuitions, and the habits of thought that transition requires, starting earlier than almost anyone else.',
  },
];

const GET_INVOLVED = [
  {
    title: 'For families',
    body: 'Enrol your child in one, two, or all three of our subjects, in the format that fits them.',
    cta: CONSULTATION.cta,
    to: '/book',
    variant: 'primary',
  },
  {
    title: 'For Canadian schools & districts',
    body: 'License LuminoLearn\'s curriculum and platform for your classrooms. Pilot programs available.',
    cta: 'Explore school licensing',
    to: '/schools',
    variant: 'secondary',
  },
  {
    title: 'For educators',
    body: 'We\'re building a team of Canadian educators who take AI, cybersecurity, and mathematics seriously. If that\'s you, we\'d like to hear from you.',
    cta: 'Teach with us',
    to: '/contact',
    variant: 'secondary',
  },
  {
    title: 'For researchers, partners, and funders',
    body: 'We collaborate with Canadian universities and welcome partnerships around privacy preserving learning, post quantum pedagogy, and related research.',
    cta: 'Contact our team',
    to: '/contact',
    variant: 'secondary',
  },
];

const sectionHeading = {
  fontFamily: font.display,
  fontSize: 'clamp(2rem, 3.4vw, 2.5rem)',
  color: theme.navy,
  marginBottom: 28,
  lineHeight: 1.2,
};

const proseStyle = {
  fontSize: 'clamp(1.05rem, 1.45vw, 1.2rem)',
  color: theme.muted,
  lineHeight: 1.85,
  marginBottom: 22,
};

const inlineLinkStyle = {
  color: theme.teal,
  fontWeight: 600,
  textDecoration: 'underline',
  textUnderlineOffset: 3,
};

function TeamMemberCard({ member }) {
  const isPlaceholder = member.name.startsWith('[');

  return (
    <Card hoverable={false} className="story-team-card">
      {member.photo ? (
        <img
          src={member.photo}
          alt={`${member.name}, ${member.role}`}
          className="story-team-photo"
          decoding="async"
        />
      ) : (
        <div
          className="story-team-photo story-team-photo--placeholder"
          role="img"
          aria-label={`Photo placeholder for ${member.name}`}
        />
      )}
      <h3
        className={isPlaceholder ? 'story-team-placeholder-text' : undefined}
        style={{
          fontFamily: font.display,
          fontSize: 'clamp(1.1rem, 1.7vw, 1.25rem)',
          color: theme.navy,
          marginBottom: 4,
          lineHeight: 1.3,
        }}
      >
        {member.name}
      </h3>
      <p
        className={isPlaceholder ? 'story-team-placeholder-text' : undefined}
        style={{
          fontSize: 14,
          fontWeight: 600,
          color: theme.teal,
          marginBottom: 10,
          letterSpacing: '0.02em',
        }}
      >
        {member.role}
      </p>
      <p
        className={isPlaceholder ? 'story-team-placeholder-text' : undefined}
        style={{
          fontSize: 15,
          color: theme.muted,
          lineHeight: 1.65,
          margin: 0,
        }}
      >
        {member.bio}
      </p>
    </Card>
  );
}

export default function StoryPage() {
  usePageMeta({
    title: 'Our Story — LuminoLearn',
    description:
      'LuminoLearn is a Canadian learning platform teaching artificial intelligence, cybersecurity (including post quantum cryptography), and integrated math + physics to students ages 9 to 17. Real Canadian educators. Privacy first. Built in Canada.',
    path: '/our-story',
  });

  return (
    <div className="home-page inner-ambient-page story-page">
      <PageAmbient />

      <section
        className="story-hero"
        aria-labelledby="story-hero-heading"
        style={{
          paddingTop: 'clamp(112px, 12vh, 148px)',
          paddingBottom: 'clamp(64px, 9vw, 88px)',
          background: `linear-gradient(180deg, rgba(253, 250, 240, 0.38) 0%, rgba(255, 241, 230, 0.55) 32%, ${theme.bg} 100%)`,
        }}
      >
        <Container narrow className="story-prose-wrap" style={{ textAlign: 'center', width: '100%' }}>
          <SectionLabel>Our story</SectionLabel>
          <h1 id="story-hero-heading" className="fade-up inner-ambient-page__hero-title">
            Built in Canada, for the generation that will inherit the next internet.
          </h1>
          <p
            className="fade-up delay-1 inner-ambient-page__hero-lead story-prose"
            style={{ color: theme.muted, lineHeight: 1.82, margin: '0 auto' }}
          >
            LuminoLearn exists because the three subjects that will most shape the next decade, artificial
            intelligence, cybersecurity, and the mathematics and physics that underlie both, are not being taught
            to Canadian children with the depth or seriousness the moment demands. We&apos;re changing that.
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="moment-heading" style={{ background: theme.light }}>
        <Container narrow className="story-prose-wrap">
          <h2 id="moment-heading" style={sectionHeading}>
            The moment we&apos;re teaching for
          </h2>
          {WHY_WE_EXIST.map((para, i) => (
            <p key={i} className="story-prose" style={{ ...proseStyle, marginBottom: i === WHY_WE_EXIST.length - 1 ? 0 : 22 }}>
              {para}
            </p>
          ))}
        </Container>
      </section>

      <section className="home-section" aria-labelledby="principles-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="principles-heading" style={{ ...sectionHeading, marginBottom: 32 }}>
            The principles behind everything we teach
          </h2>
          <div className="story-beliefs-grid">
            {PRINCIPLES.map((principle) => (
              <article key={principle.title}>
                <Card hoverable={false} style={{ padding: '26px 28px', height: '100%' }}>
                  <h3
                    style={{
                      fontFamily: font.display,
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.3rem)',
                      color: theme.navy,
                      marginBottom: 12,
                      lineHeight: 1.3,
                    }}
                  >
                    {principle.title}
                  </h3>
                  <p style={{ ...proseStyle, fontSize: 'clamp(1rem, 1.3vw, 1.08rem)', marginBottom: 0 }}>
                    {principle.body}
                  </p>
                </Card>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="built-heading" style={{ background: theme.light }}>
        <Container narrow className="story-prose-wrap">
          <h2 id="built-heading" style={sectionHeading}>
            What we&apos;ve built
          </h2>
          <p className="story-prose" style={proseStyle}>
            LuminoLearn is a Canadian corporation delivering a structured curriculum in artificial intelligence,
            cybersecurity (including post quantum cryptography), and integrated math + physics to students ages 9
            to 17. Our adaptive learning platform is built on a five layer, privacy preserving architecture with
            Canadian data residency and PIPEDA aligned handling of student information throughout. Classes are
            delivered one on one online, one on one in person in the Greater Toronto Area, and in small groups
            of up to six students matched by level and goals.
          </p>
          <p className="story-prose" style={{ ...proseStyle, marginBottom: 20 }}>
            The curriculum is organized across three levels: Foundations (roughly ages 9 to 11), Building (roughly
            ages 12 to 14), and Depth (roughly ages 15 to 17). Students may enrol in a single subject, combine two,
            or follow all three as an integrated combined course.
          </p>
          <p className="story-inline-links" style={{ ...proseStyle, marginBottom: 0, fontSize: 'clamp(0.98rem, 1.25vw, 1.08rem)' }}>
            Learn more:{' '}
            <Link to="/technology" style={inlineLinkStyle}>
              our technology
            </Link>
            {' · '}
            <Link to="/learning-paths" style={inlineLinkStyle}>
              our curriculum
            </Link>
            {' · '}
            <Link to="/how-we-teach" style={inlineLinkStyle}>
              how we teach
            </Link>
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="team-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="team-heading" style={{ ...sectionHeading, textAlign: 'center' }}>
            The people behind LuminoLearn
          </h2>
          <p
            className="story-prose story-prose-wrap"
            style={{
              ...proseStyle,
              textAlign: 'center',
              maxWidth: 640,
              margin: '0 auto 36px',
            }}
          >
            LuminoLearn is built and taught by Canadian educators, engineers, and researchers. Every one of us
            has a stake in the generation this platform is for.
          </p>
          <div className="story-team-grid" role="list">
            {STORY_TEAM.map((member) => (
              <div key={member.id} role="listitem">
                <TeamMemberCard member={member} />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="future-heading" style={{ background: theme.light }}>
        <Container narrow className="story-prose-wrap">
          <h2 id="future-heading" style={sectionHeading}>
            Where we&apos;re going next
          </h2>
          <p className="story-prose" style={{ ...proseStyle, marginBottom: 16 }}>
            Over the coming years LuminoLearn will deepen its curriculum, extend the platform&apos;s adaptive engine,
            and expand access, first through partnerships with Canadian schools, districts, and community
            organizations, and eventually beyond Canada. We are actively pursuing research collaborations with
            Canadian universities on privacy preserving personalization and post quantum cryptography pedagogy,
            and we welcome conversations with Mitacs, NSERC, and IRAP supported partners.
          </p>
          <p className="story-inline-links" style={{ ...proseStyle, marginBottom: 0, fontSize: 'clamp(0.98rem, 1.25vw, 1.08rem)' }}>
            For research and partnership inquiries:{' '}
            <Link to="/contact" style={inlineLinkStyle}>
              get in touch
            </Link>
            .
          </p>
        </Container>
      </section>

      <section className="home-section" aria-labelledby="involve-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="involve-heading" style={{ ...sectionHeading, marginBottom: 32 }}>
            How to be part of this
          </h2>
          <div className="story-involve-grid">
            {GET_INVOLVED.map((item) => (
              <Card key={item.title} hoverable={false}>
                <h3
                  style={{
                    fontFamily: font.display,
                    fontSize: 'clamp(1.15rem, 1.8vw, 1.35rem)',
                    color: theme.navy,
                    marginBottom: 10,
                  }}
                >
                  {item.title}
                </h3>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 1.3vw, 1.08rem)',
                    color: theme.muted,
                    lineHeight: 1.72,
                    marginBottom: 20,
                  }}
                >
                  {item.body}
                </p>
                <Button to={item.to} variant={item.variant}>
                  {item.cta}
                </Button>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section
        className="cta-banner-section cta-banner-navy story-final-cta"
        aria-labelledby="story-final-cta-heading"
        style={{
          background: `linear-gradient(135deg, ${theme.navy} 0%, #1e3a5f 50%, #243a5c 100%)`,
          padding: 'clamp(48px, 7vw, 64px) 0',
          textAlign: 'center',
        }}
      >
        <Container style={{ position: 'relative', zIndex: 1 }}>
          <h2
            id="story-final-cta-heading"
            style={{
              fontFamily: font.display,
              fontSize: 'clamp(1.5rem, 2.8vw, 1.75rem)',
              color: '#fff',
              marginBottom: 12,
              lineHeight: 1.2,
              fontWeight: 600,
            }}
          >
            Learn more
          </h2>
          <p
            style={{
              color: 'rgba(255,255,255,0.88)',
              fontSize: 'clamp(1rem, 1.35vw, 1.1rem)',
              marginBottom: 24,
              lineHeight: 1.72,
              maxWidth: 520,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Talk with us about your child. Book a free {CONSULTATION.duration} consultation with a Canadian
            educator.
          </p>
          <Button variant="warm" to="/book">
            {CONSULTATION.cta}
          </Button>
          <p
            style={{
              marginTop: 18,
              fontSize: 'clamp(0.78rem, 1.05vw, 0.86rem)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.55,
            }}
          >
            {CONSULTATION.noObligation}
          </p>
        </Container>
      </section>
    </div>
  );
}
