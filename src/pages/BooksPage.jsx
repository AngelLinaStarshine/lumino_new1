import React from 'react';
import { Container, Card, Button, PageAmbient, PageHero, RelatedLinks } from '../components';
import { CONTACT } from '../data/siteData';
import { BOOKS } from '../data/pillars';
import { theme, font } from '../styles/theme';
import { usePageMeta } from '../hooks/usePageMeta';

const bodyCopy = {
  fontSize: 'clamp(1rem, 1.3vw, 1.12rem)',
  color: theme.muted,
  lineHeight: 1.72,
  margin: 0,
};

const cardTitle = {
  fontFamily: font.display,
  fontSize: 'clamp(1.2rem, 1.9vw, 1.4rem)',
  color: theme.navy,
  marginBottom: 8,
  lineHeight: 1.25,
};

export default function BooksPage() {
  usePageMeta({
    title: 'Books — LuminoLearn',
    description: 'LuminoFrame storybooks from LuminoLearn: titles, prices, ISBNs, and where to buy.',
    path: '/books',
  });

  return (
    <div className="home-page inner-ambient-page">
      <PageAmbient />

      <PageHero id="books-hero-heading" label="Books" title="LuminoFrame storybooks" lead="Storybooks for young readers." />

      <section className="home-section" aria-labelledby="books-list-heading" style={{ background: theme.bg }}>
        <Container>
          <h2 id="books-list-heading" className="visually-hidden">
            Titles
          </h2>
          {BOOKS.length === 0 ? (
            <Container narrow style={{ maxWidth: 640, padding: 0 }}>
              <Card hoverable={false} style={{ textAlign: 'center' }}>
                <p style={{ ...bodyCopy, marginBottom: 20 }}>
                  Titles, prices, ISBNs, and buy links will be listed here soon.
                </p>
                <Button href={`mailto:${CONTACT.email}?subject=LuminoFrame%20storybooks`} variant="secondary">
                  Ask about the books
                </Button>
              </Card>
            </Container>
          ) : (
            <div className="home-pillars-grid">
              {BOOKS.map((book) => (
                <Card key={book.isbn ?? book.title} hoverable={false}>
                  <h3 style={cardTitle}>{book.title}</h3>
                  {book.description ? <p style={{ ...bodyCopy, marginBottom: 16 }}>{book.description}</p> : null}
                  <dl className="book-meta">
                    {book.price ? (
                      <>
                        <dt>Price</dt>
                        <dd>{book.price}</dd>
                      </>
                    ) : null}
                    {book.isbn ? (
                      <>
                        <dt>ISBN</dt>
                        <dd>{book.isbn}</dd>
                      </>
                    ) : null}
                  </dl>
                  {book.buyLinks?.length ? (
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 16 }}>
                      {book.buyLinks.map((link) => (
                        <Button key={link.href} href={link.href} variant="secondary">
                          {link.label}
                        </Button>
                      ))}
                    </div>
                  ) : null}
                </Card>
              ))}
            </div>
          )}
          <RelatedLinks
            links={[
              { to: '/programs', label: 'Programs' },
              { to: '/about', label: 'About us' },
            ]}
          />
        </Container>
      </section>
    </div>
  );
}
