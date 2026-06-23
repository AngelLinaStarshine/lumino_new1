/* ─────────────────────────────────────────────────────────────
   LuminoLearn — Brand Constants
   Single source of truth for course names, stages, and cycles.
   ───────────────────────────────────────────────────────────── */

export const SUBJECTS = {
  number_ninjas: {
    id: 'number_ninjas',
    name: 'Number Ninjas',
    subject: 'Mathematics',
    icon: 'math-symbols',
    description: 'From counting to calculus: strong foundations through logic, structure, and engaging challenges.',
    brandClass: 'lumino-purple',
    accentBg: 'bg-lumino-purple-50',
    accentText: 'text-lumino-purple-900',
    accentBorder: 'border-lumino-purple-600',
    accentFill: 'bg-lumino-purple-600',
  },
  word_wizards: {
    id: 'word_wizards',
    name: 'Word Wizards',
    subject: 'Language & Literacy',
    icon: 'book',
    description: 'Confident readers, expressive writers, and thoughtful communicators, built through story and structure.',
    brandClass: 'lumino-amber',
    accentBg: 'bg-lumino-amber-50',
    accentText: 'text-lumino-amber-900',
    accentBorder: 'border-lumino-amber-600',
    accentFill: 'bg-lumino-amber-600',
  },
  code_explorers: {
    id: 'code_explorers',
    name: 'Code Explorers',
    subject: 'Computer Science',
    icon: 'code',
    description: 'From first lines of code to real world projects: digital fluency and future ready thinking.',
    brandClass: 'lumino-blue',
    accentBg: 'bg-lumino-blue-50',
    accentText: 'text-lumino-blue-900',
    accentBorder: 'border-lumino-blue-600',
    accentFill: 'bg-lumino-blue-600',
  },
} as const;

export type SubjectKey = keyof typeof SUBJECTS;

/* ─── Age stages ─────────────────────────────────────────────── */
export const STAGES = {
  foundations: {
    id: 'foundations',
    name: 'Foundations',
    ageRange: '9-11',
    tagline: 'Building strong basics with curiosity and care',
  },
  growth: {
    id: 'growth',
    name: 'Growth',
    ageRange: '12-14',
    tagline: 'Deepening skills with structure and challenge',
  },
  mastery: {
    id: 'mastery',
    name: 'Mastery',
    ageRange: '15-17',
    tagline: 'Advanced pathways with real world application',
  },
} as const;

export type StageKey = keyof typeof STAGES;

/* ─── LuminoLearn Cycle ──────────────────────────────────────── */
export const CYCLE_STEPS = [
  { id: 'discovery',     name: 'Discovery call', duration: '30 min',     description: 'Free intro on Calendly'        },
  { id: 'lumino_start',  name: 'LuminoStart™',   duration: '4 weeks',    description: 'Placement assessment'          },
  { id: 'lumino_core',   name: 'LuminoCore™',    duration: '12 weeks',   description: 'Certified learning cycle'      },
  { id: 'lumino_path',   name: 'LuminoPath™',    duration: '3-12 months', description: 'Long-term bundle'             },
] as const;

/* ─── Homework attachment types ──────────────────────────────── */
export const ALLOWED_FILE_TYPES = {
  document: ['.docx', '.doc'],
  pdf:      ['.pdf'],
  image:    ['.png', '.jpg', '.jpeg', '.gif'],
  text:     ['.txt'],
} as const;

export const MAX_FILE_SIZE_MB = 25;

/* ─── User roles ─────────────────────────────────────────────── */
export const ROLES = ['student', 'parent', 'teacher', 'admin'] as const;
export type UserRole = (typeof ROLES)[number];

/* ─── Notification preferences defaults ──────────────────────── */
export const DEFAULT_NOTIFICATION_PREFS = {
  sms_homework:  false,   // CASL: opt-in must be explicit
  sms_class:     false,
  sms_payment:   true,    // financial notifications usually expected
  sms_feedback:  false,
  email_homework:  true,
  email_class:     true,
  email_payment:   true,
  email_feedback:  true,
};
