import React, { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { DISCOVERY_CALL_URL, CONSULTATION, SOCIAL_LINKS } from '../data/siteData';
import SocialIcon from './SocialIcon';
import flameMascot from '../assets/flame-mascot.png';

const PAGE_GUIDE = {
  '/': {
    headline: 'Welcome',
    body:
      'You are on the home page. Scroll for how we teach, subjects, and next steps, or ask me below.',
  },
  '/our-story': {
    headline: 'Our story',
    body:
      'Why LuminoLearn exists, what we believe, and how to get involved as a family, school, educator, or research partner.',
  },
  '/learning-paths': {
    headline: 'Learning paths',
    body:
      'Browse AI, Cybersecurity, and Math + Physics across Foundations, Building, and Depth. Book a consultation for placement.',
  },
  '/how-we-teach': {
    headline: 'How we teach',
    body:
      'Explore one on one online, one on one in person, and small group formats. Book a free consultation to find the right fit. No prices on this page.',
  },
  '/tuition': {
    headline: 'How we teach',
    body:
      'Explore learning formats and book a free consultation to find the right fit for your child.',
  },
  '/book': {
    headline: 'Book time',
    body: 'Schedule with us here, or ask me for a free consultation.',
  },
  '/enroll': {
    headline: 'Enroll',
    body: 'Choose an age band and subject to open the right form or a Calendly consultation when a form is not live yet.',
  },
  '/technology': {
    headline: 'Technology',
    body:
      'The five layer privacy preserving architecture behind LuminoLearn. Federated learning, differential privacy, and post quantum readiness.',
  },
  '/schools': {
    headline: 'Schools',
    body: 'License AI, Cybersecurity, and Math + Physics for Canadian classrooms. Request a pilot or contact our team.',
  },
  '/contact': {
    headline: 'Contact',
    body: 'Research partnerships, school licensing, educator inquiries, and general questions.',
  },
  '/login': {
    headline: 'Log in',
    body: 'Sign in to the LuminoLearn platform. Accounts are issued by our team after enrollment.',
  },
  '/privacy': {
    headline: 'Privacy',
    body: 'How LuminoLearn handles student and family data. PIPEDA aligned, Canadian data residency.',
  },
  '/terms': {
    headline: 'Terms',
    body: 'Terms of service for LuminoLearn programs and platform use.',
  },

  '/my-space': {
    headline: 'My space',
    body: 'Family sign in for enrolled students. Accounts are issued by LuminoLearn. There is no sign up on this site.',
  },
};

function guideForPath(pathname) {
  if (pathname === '/tuition' || pathname === '/pricing') {
    return PAGE_GUIDE['/how-we-teach'];
  }
  return (
    PAGE_GUIDE[pathname] ?? {
      headline: 'Guide',
      body: 'Ask about paths, formats, technology, schools, story, or book a consultation using the shortcuts below.',
    }
  );
}

const WA_HREF = SOCIAL_LINKS.find((s) => s.id === 'whatsapp')?.href ?? 'https://wa.me/14374241380';

function nextId() {
  return `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

export default function FlameGuide() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const panelRef = useRef(null);
  const fabRef = useRef(null);
  const listEndRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  const guide = useMemo(() => guideForPath(location.pathname), [location.pathname]);

  const actions = useMemo(
    () => [
      { key: 'home', label: 'Home', to: '/' },
      { key: 'paths', label: 'Learning paths', to: '/learning-paths' },
      { key: 'formats', label: 'How we teach', to: '/how-we-teach' },
      { key: 'tech', label: 'Technology', to: '/technology' },
      { key: 'schools', label: 'Schools', to: '/schools' },
      { key: 'contact', label: 'Contact', to: '/contact' },
      { key: 'enroll', label: 'Enroll', to: '/enroll' },
      { key: 'story', label: 'Our story', to: '/our-story' },
      { key: 'book', label: 'Book', to: '/book' },
      { key: 'call', label: 'Free consultation', href: DISCOVERY_CALL_URL },
    ],
    []
  );

  useEffect(() => {
    if (!open) return;
    setMessages([
      { id: nextId(), role: 'bot', text: `${guide.headline}: ${guide.body}` },
      {
        id: nextId(),
        role: 'bot',
        text: 'Try typing help, paths, formats, technology, schools, book, or WhatsApp, or tap a shortcut.',
      },
    ]);
  }, [open, guide.headline, guide.body]);

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onPointer = (e) => {
      const node = e.target;
      if (panelRef.current?.contains(node) || fabRef.current?.contains(node)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onPointer);
    return () => document.removeEventListener('mousedown', onPointer);
  }, [open]);

  const pushBot = (text) => {
    setMessages((m) => [...m, { id: nextId(), role: 'bot', text }]);
  };

  const replyToUser = (raw) => {
    const q = raw.toLowerCase().trim();
    if (!q) return;

    if (/^hi$|^hello\b|^hey\b/.test(q)) {
      pushBot("Hi! I'm Flame. Ask about paths, how we teach, enrolling, or say “call” for a free consultation.");
      return;
    }
    if (/help|^how\b/.test(q)) {
      pushBot('You can type: paths, formats, enroll, book, story, call, or whatsapp. Shortcuts below work too.');
      return;
    }
    if (/tech|architecture|privacy|platform/.test(q)) {
      navigate('/technology');
      pushBot('Opening Technology.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/school|district|license|pilot|classroom/.test(q)) {
      navigate('/schools');
      pushBot('Opening For schools.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/contact|research|partner|funder|mitacs|nserc/.test(q)) {
      navigate('/contact');
      pushBot('Opening Contact.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/path|course|subject|curriculum|ai|cyber|math|physics/.test(q)) {
      navigate('/learning-paths');
      pushBot('Taking you to Learning paths.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/tuition|price|cost|plan|pay|format|how we teach/.test(q)) {
      navigate('/how-we-teach');
      pushBot('Opening How we teach.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/enroll|register|sign\s*up/.test(q)) {
      navigate('/enroll');
      pushBot('Opening Enroll.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/story|about us|who are you/.test(q)) {
      navigate('/our-story');
      pushBot('Opening Our story.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/book|schedule|calendly/.test(q)) {
      navigate('/book');
      pushBot('Opening Book a session.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    if (/discovery|intake|^call\b/.test(q)) {
      window.open(DISCOVERY_CALL_URL, '_blank', 'noopener,noreferrer');
      pushBot('Opened Calendly to book your free consultation.');
      return;
    }
    if (/whatsapp|\bwa\b|text us/.test(q)) {
      window.open(WA_HREF, '_blank', 'noopener,noreferrer');
      pushBot('Opened WhatsApp, say hi anytime.');
      return;
    }
    if (/\bhome\b/.test(q)) {
      navigate('/');
      pushBot('Heading home.');
      window.setTimeout(() => setOpen(false), 400);
      return;
    }
    pushBot(
      "I'm Flame, your guide. Try “paths”, “formats”, “enroll”, or use the orange shortcuts under the chat. I'm happy to nudge you in the right direction."
    );
  };

  const handleSend = (e) => {
    e.preventDefault();
    const t = input.trim();
    if (!t) return;
    setInput('');
    setMessages((m) => [...m, { id: nextId(), role: 'user', text: t }]);
    window.setTimeout(() => replyToUser(t), 350);
  };

  const runAction = (a) => {
    if (a.href) {
      window.open(a.href, '_blank', 'noopener,noreferrer');
      pushBot(`Opened ${a.label} in a new tab.`);
      return;
    }
    if (a.to) {
      navigate(a.to);
      pushBot(`Taking you to ${a.label}.`);
      setOpen(false);
    }
  };

  return (
    <div className="lumino-chatbot-container">
      {open ? (
        <div
          ref={panelRef}
          className="chat-window"
          id="lumino-chat-panel"
          role="dialog"
          aria-label="Flame guide chat"
        >
          <div className="chat-window-header">
            <div className="chat-window-title">
              <img src={flameMascot} alt="" className="chat-window-mascot" width={36} height={36} />
              <span>Flame</span>
            </div>
            <button type="button" className="chat-window-close" onClick={() => setOpen(false)} aria-label="Close chat">
              ✕
            </button>
          </div>
          <div className="chat-messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.role === 'bot' ? 'bot' : 'user'}`}>
                {msg.text}
              </div>
            ))}
            <div ref={listEndRef} />
          </div>
          <div className="chat-quick-actions">
            {actions.map((a) => (
              <button key={a.key} type="button" className="chat-quick-chip" onClick={() => runAction(a)}>
                {a.label}
              </button>
            ))}
          </div>
          <form className="chat-input" onSubmit={handleSend}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Flame…"
              autoComplete="off"
              aria-label="Message to Flame"
            />
            <button type="submit">Send</button>
          </form>
          <a className="whatsapp-link" href={WA_HREF} target="_blank" rel="noopener noreferrer">
            <span className="social-icon whatsapp-icon-wrap" aria-hidden>
              <SocialIcon id="whatsapp" size={20} />
            </span>
            Message us on WhatsApp
          </a>
        </div>
      ) : null}

      <button
        ref={fabRef}
        type="button"
        className={`lumino-flame-icon${open ? ' lumino-flame-icon--open' : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="lumino-chat-panel"
      >
        <img src={flameMascot} alt="" className="animated-flame lumino-flame-mascot" decoding="async" />
        <span className="sr-only">{open ? 'Close Flame guide' : 'Open Flame guide'}</span>
      </button>
    </div>
  );
}
