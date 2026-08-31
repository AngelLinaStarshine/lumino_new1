import React, { useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

/** Generate stable anchor ids from heading text (matches TOC links in markdown). */
function slugifyHeading(text) {
  return String(text)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function headingText(children) {
  return React.Children.toArray(children)
    .map((child) => {
      if (typeof child === 'string' || typeof child === 'number') return String(child);
      if (child?.props?.children) return headingText(child.props.children);
      return '';
    })
    .join('')
    .trim();
}

export function LegalDocPage({ source, backLabel = 'Back to home' }) {
  const markdownComponents = useMemo(
    () => ({
      h1: ({ children, ...props }) => (
        <h1 {...props}>{children}</h1>
      ),
      h2: ({ children, ...props }) => {
        const id = slugifyHeading(headingText(children));
        return (
          <h2 id={id} {...props}>
            {children}
          </h2>
        );
      },
      h3: ({ children, ...props }) => {
        const id = slugifyHeading(headingText(children));
        return (
          <h3 id={id} {...props}>
            {children}
          </h3>
        );
      },
      a: ({ href, children, ...props }) => {
        if (href?.startsWith('/')) {
          return (
            <Link to={href} {...props}>
              {children}
            </Link>
          );
        }
        return (
          <a href={href} {...props} target={href?.startsWith('http') ? '_blank' : undefined} rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}>
            {children}
          </a>
        );
      },
      table: ({ children, ...props }) => (
        <div className="table-wrapper">
          <table {...props}>{children}</table>
        </div>
      ),
    }),
    []
  );

  return (
    <section className="legal-doc-page" style={{ paddingTop: 120, paddingBottom: 96, minHeight: '70vh' }}>
      <Container style={{ maxWidth: '920px' }}>
        <Link
          to="/"
          className="legal-doc-back no-print"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            color: 'var(--color-navy-light)',
            textDecoration: 'none',
            marginBottom: 32,
            fontWeight: 600,
          }}
        >
          <FaHome aria-hidden /> {backLabel}
        </Link>
        <article className="legal-doc">
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {source}
          </ReactMarkdown>
        </article>
      </Container>
    </section>
  );
}
