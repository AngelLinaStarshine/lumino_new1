import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Container, SectionLabel, Card, Button, RelatedLinks } from '../components';
import { AGE_GROUPS, COURSES, getEnrollmentLink, CONSULTATION } from '../data/siteData';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const AGE_INDEX = { junior: 0, middle: 1, senior: 2 };
const VALID_AGES = new Set(AGE_GROUPS.map((a) => a.id));
const VALID_SUBJECTS = new Set(COURSES.map((c) => c.id));

function courseTrackLabel(course, ageGroupId) {
  const i = AGE_INDEX[ageGroupId];
  if (i == null || !course.ageLabels?.[i]) return '';
  return course.ageLabels[i];
}

export default function EnrollPage() {
  const [searchParams] = useSearchParams();
  const ageParam = VALID_AGES.has(searchParams.get('age') || '') ? searchParams.get('age') : null;
  const subjectParam = VALID_SUBJECTS.has(searchParams.get('subject') || '')
    ? searchParams.get('subject')
    : null;

  usePageMeta({
    title: 'Enroll — LuminoLearn',
    description:
      'Begin enrollment for AI, Cybersecurity, or Math + Physics. New families start with a free consultation and diagnostic placement.',
    path: '/enroll',
  });

  useEffect(() => {
    if (!ageParam && !subjectParam) return;

    const run = () => {
      let el = null;
      if (ageParam && subjectParam) {
        el = document.getElementById(`enroll-row-${ageParam}-${subjectParam}`);
      }
      if (!el && ageParam) {
        el = document.getElementById(`enroll-age-${ageParam}`);
      }
      if (!el && subjectParam) {
        el = document.getElementById(`enroll-row-${AGE_GROUPS[0].id}-${subjectParam}`);
      }
      if (!el) {
        el = document.getElementById('enroll-section');
      }
      el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    const t = window.setTimeout(run, 80);
    return () => window.clearTimeout(t);
  }, [ageParam, subjectParam]);

  const rowIsHighlighted = (ageId, courseId) => {
    if (ageParam && subjectParam) return ageId === ageParam && courseId === subjectParam;
    if (ageParam && !subjectParam) return ageId === ageParam;
    if (!ageParam && subjectParam) return courseId === subjectParam;
    return false;
  };

  return (
    <section id="enroll-section" style={{ paddingTop: 140, paddingBottom: 80, scrollMarginTop: 96 }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 40, width: '100%' }}>
          <SectionLabel>Enroll</SectionLabel>
          <h1
            style={{
              fontFamily: font.display,
              fontSize: 40,
              color: theme.navy,
              marginBottom: 16,
            }}
          >
            Enroll your child
          </h1>
          <p style={{ fontSize: 17, color: theme.muted, lineHeight: 1.7, maxWidth: 640, margin: '0 auto 24px' }}>
            New families begin with a free consultation and diagnostic. Choose your child&apos;s age band and
            subject below to open a registration form where available, or book a consultation to get started.
          </p>
          <Button to="/book">{CONSULTATION.cta}</Button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {AGE_GROUPS.map((age) => (
            <Card
              key={age.id}
              id={`enroll-age-${age.id}`}
              hoverable={false}
              style={{
                scrollMarginTop: 96,
                borderColor: ageParam === age.id && !subjectParam ? theme.teal : theme.border,
                borderWidth: ageParam === age.id && !subjectParam ? 2 : 1,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div>
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: theme.teal,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {age.tag}
                  </span>
                  <h2
                    style={{
                      fontFamily: font.display,
                      fontSize: 'clamp(1.35rem, 2.5vw, 1.65rem)',
                      color: theme.navy,
                      marginTop: 4,
                    }}
                  >
                    {age.label}
                  </h2>
                </div>
                <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.6, margin: 0, maxWidth: 420 }}>
                  {age.desc}
                </p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {COURSES.map((course) => {
                  const link = getEnrollmentLink(age.id, course.id);
                  const highlighted = rowIsHighlighted(age.id, course.id);
                  const track = courseTrackLabel(course, age.id);

                  return (
                    <div
                      key={course.id}
                      id={`enroll-row-${age.id}-${course.id}`}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 12,
                        padding: '14px 16px',
                        borderRadius: 12,
                        background: highlighted ? 'rgba(125, 207, 182, 0.12)' : theme.light,
                        border: `1px solid ${highlighted ? theme.teal : theme.border}`,
                        scrollMarginTop: 96,
                      }}
                    >
                      <div style={{ minWidth: 0 }}>
                        <div style={{ fontSize: 22, marginBottom: 4 }} aria-hidden>
                          {course.icon}
                        </div>
                        <div style={{ fontWeight: 600, color: theme.navy, fontSize: 16 }}>{course.label}</div>
                        {track ? (
                          <div style={{ fontSize: 13, color: course.color, fontWeight: 600 }}>{track} level</div>
                        ) : null}
                      </div>
                      <Button
                        href={link.href}
                        variant={link.isForm ? 'primary' : 'secondary'}
                        style={{ flexShrink: 0 }}
                      >
                        {link.label}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <RelatedLinks
          links={[
            { to: '/learning-paths', label: 'Learning paths' },
            { to: '/how-we-teach', label: 'How we teach' },
            { to: '/book', label: 'Book a consultation' },
          ]}
        />
      </Container>
    </section>
  );
}
