import { useEffect } from 'react';

/**
 * Sets document title and meta description/OG tags for SPA routes.
 */
export function usePageMeta({ title, description, path = '' }) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const setMeta = (selector, attr, value) => {
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('meta');
        const [key, keyAttr] = attr.split('=');
        el.setAttribute(key, keyAttr.replace(/"/g, ''));
        document.head.appendChild(el);
      }
      el.setAttribute('content', value);
    };

    setMeta('meta[name="description"]', 'name=description', description);
    setMeta('meta[property="og:title"]', 'property=og:title', title);
    setMeta('meta[property="og:description"]', 'property=og:description', description);
    setMeta('meta[name="twitter:title"]', 'name=twitter:title', title);
    setMeta('meta[name="twitter:description"]', 'name=twitter:description', description);

    if (path) {
      setMeta('meta[property="og:url"]', 'property=og:url', `https://luminolearn.ca${path}`);
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) canonical.setAttribute('href', `https://luminolearn.ca${path}`);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, path]);
}
