import React from 'react';
import { Container, SectionLabel, Card, Button } from '../components';
import { AGE_GROUPS, COURSES, getEnrollmentLink } from '../data/siteData';
import { theme, font } from '../styles/theme';

const AGE_INDEX = { junior: 0, middle: 1, senior: 2 };

function courseTrackLabel(course, ageGroupId) {
  const i = AGE_INDEX[ageGroupId];
  if (i == null || !course.ageLabels?.[i]) return '';
  return course.ageLabels[i];
}

export default function EnrollPage() {
  return (
    <section style={{ paddingTop: 140, paddingBottom: 80 }}>
      <Container>
        <div style={{ textAlign: 'center', marginBottom: 48, width: '100%' }}>
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
          <p style={{ fontSize: 17, color: theme.muted, lineHeight: 1.7 }}>
            Choose your child&apos;s age group, then open the registration form for the subject you
            want. For age bands where a dedicated form is not listed yet, you&apos;ll start with a
            complimentary consultation on Calendly and we&apos;ll guide you from there.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {AGE_GROUPS.map((age) => (
            <Card key={age.id} style={{ padding: 28 }}>
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'baseline',
                  justifyContent: 'space-between',
                  gap: 12,
                  marginBottom: 20,
                }}
              >
                <div>
                  <h2
                    style={{
                      fontFamily: font.display,
                      fontSize: 26,
                      color: theme.navy,
                      marginBottom: 6,
                    }}
                  >
                    {age.label}
                  </h2>
                  <p style={{ fontSize: 14, fontWeight: 600, color: theme.teal, marginBottom: 4 }}>
                    {age.tag}
                  </p>
                  <p style={{ fontSize: 15, color: theme.muted, lineHeight: 1.6 }}>
                    {age.desc}
                  </p>
                </div>
              </div>

              <p
                style={{
                  fontSize: 13,
                  fontWeight: 600,
                  color: theme.navy,
                  marginBottom: 14,
                  textTransform: 'uppercase',
                  letterSpacing: '0.06em',
                }}
              >
                Registration links by subject
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {COURSES.map((course) => {
                  const link = getEnrollmentLink(age.id, course.id);
                  const track = courseTrackLabel(course, age.id);
                  return (
                    <div
                      key={course.id}
                      style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 16,
                        padding: '16px 18px',
                        borderRadius: 14,
                        border: `1px solid ${theme.border}`,
                        background: theme.light,
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, minWidth: 0 }}>
                        <span style={{ fontSize: 28, lineHeight: 1 }}>{course.icon}</span>
                        <div>
                          <div style={{ fontWeight: 700, color: theme.navy, fontSize: 16 }}>
                            {course.label}
                          </div>
                          {track ? (
                            <div style={{ fontSize: 14, color: theme.muted, marginTop: 4 }}>
                              {track}
                              {!link.isForm && (
                                <span style={{ display: 'block', fontSize: 12, marginTop: 6 }}>
                                  Form coming soon: book a call and we&apos;ll place you in the right
                                  level.
                                </span>
                              )}
                            </div>
                          ) : null}
                        </div>
                      </div>
                      <Button href={link.href} variant={link.isForm ? 'primary' : 'warm'}>
                        {link.label}
                      </Button>
                    </div>
                  );
                })}
              </div>
            </Card>
          ))}
        </div>

        <p
          style={{
            fontSize: 14,
            color: theme.muted,
            textAlign: 'center',
            marginTop: 40,
            lineHeight: 1.65,
          }}
        >
          Accounts are created by our team after enrollment is confirmed. Questions? Email{' '}
          <a href="mailto:lumino@luminolearn.org" style={{ color: theme.teal, fontWeight: 600 }}>
            lumino@luminolearn.org
          </a>
          .
        </p>
      </Container>
    </section>
  );
}
