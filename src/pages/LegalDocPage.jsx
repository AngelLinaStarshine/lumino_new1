import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Container from '../components/Container';

export function LegalDocPage({ source }) {
  return (
    <section className="legal-doc-page" style={{ paddingTop: 120, paddingBottom: 96, minHeight: '70vh' }}>
      <Container style={{ maxWidth: '920px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            fontSize: 14,
            color: 'var(--violet-500)',
            textDecoration: 'none',
            marginBottom: 32,
            fontWeight: 600,
          }}
        >
          <FaHome /> Back to home
        </Link>
        <article className="legal-doc">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              table: ({ children, ...props }) => (
                <div className="table-wrapper">
                  <table {...props}>{children}</table>
                </div>
              ),
            }}
          >
            {source}
          </ReactMarkdown>
        </article>
      </Container>
    </section>
  );
}
