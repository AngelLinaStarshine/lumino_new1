import { CONTACT } from './siteData';

/** Homepage row: one card per company pillar. */
export const COMPANY_PILLARS = [
  {
    id: 'programs',
    label: 'Tutoring and courses',
    title: 'Programs',
    body: 'Live classes with Canadian educators: one on one, small groups, after school, and homeschool.',
    to: '/programs',
    cta: 'See programs',
  },
  {
    id: 'platform',
    label: 'Learning platform',
    title: 'Platform',
    body: 'A coding lab with instant feedback between classes, and progress reports for parents.',
    to: '/platform',
    cta: 'See the platform',
  },
  {
    id: 'books',
    label: 'Books',
    title: 'Books',
    body: 'LuminoFrame storybooks for young readers.',
    to: '/books',
    cta: 'See the books',
  },
  {
    id: 'schools',
    label: 'Schools',
    title: 'For Schools',
    body: 'The Founding Schools pilot, teacher training, and classroom resources.',
    to: '/schools',
    cta: 'For schools',
  },
];

export const PROGRAMS = [
  {
    id: 'start',
    name: 'LuminoStart™',
    tag: 'First step for new students',
    body: "Four guided sessions to learn your child's level and pace. You receive a written placement report and a learning plan.",
  },
  {
    id: 'core',
    name: 'LuminoCore™',
    tag: '12 week program',
    body: 'Two sessions per week, guided projects, regular feedback, and a certificate at completion.',
  },
  {
    id: 'after-school',
    name: 'After-school groups',
    tag: 'Up to 6 students',
    body: 'Small online groups matched by level, meeting weekly after school.',
  },
  {
    id: 'homeschool',
    name: 'Homeschool groups',
    tag: 'Daytime groups',
    body: 'Small groups for homeschooling families, with the same curriculum and educators.',
  },
  {
    id: 'taster',
    name: 'Free taster class',
    tag: 'Free',
    body: 'One class so your child can try a subject with a Canadian educator before you decide.',
  },
];

export const CAMPS = {
  title: 'Camps',
  body: 'Seasonal camps during school breaks. Dates and topics will be posted here.',
  ctaLabel: 'Ask to be notified',
  ctaHref: `mailto:${CONTACT.email}?subject=LuminoLearn%20camps`,
};

// Future Hub features, not built yet (keep off the site until they exist):
// - Messaging with the educator, with every message copied to the parent
// - Class schedule and joining links in one place

export const PLATFORM_AUDIENCES = [
  {
    id: 'students',
    title: 'For students',
    image: '/images/platform/hub-home.webp',
    alt: 'A student’s Hub home page showing their courses and progress.',
    points: [
      'See your courses and progress at a glance.',
      'Write real Python in the browser, with nothing to install.',
      "Instant feedback and step-by-step hints when you're stuck.",
    ],
  },
  {
    id: 'teachers',
    title: 'For teachers',
    image: '/images/platform/hub-teacher.webp',
    alt: 'The teacher view showing where each student is in a lesson.',
    points: [
      'Choose the lessons your class sees.',
      "See who's stuck, working or finished.",
      'Export grades in one click; you approve every mark.',
    ],
  },
  {
    id: 'families',
    title: 'For families',
    image: '/images/platform/hub-family.webp',
    alt: 'The family view showing a child’s progress and a note from the teacher.',
    points: [
      'Clear progress you can understand without coding.',
      'A note from the teacher.',
      "See and delete your child's data at any time.",
    ],
  },
];

export const PLATFORM_DIFFERENCES = [
  {
    id: 'exact',
    title: 'Exact marking',
    body: 'Code is checked by real tests, not AI guesses, so a pass means it truly works.',
  },
  {
    id: 'proof',
    title: 'Proof of learning',
    body: "Every attempt is saved step by step, so progress is reliable evidence and the work is the student's own.",
    stamp: 'Verified',
  },
  {
    id: 'privacy',
    title: 'Privacy by design',
    body: 'Built in line with PIPEDA. We collect only what learning needs: no ads, no trackers, and no birthdates, addresses or student numbers.',
  },
];

export const PLATFORM_SCREENSHOTS = [
  {
    src: '/images/platform/hub-home.webp',
    heading: 'Your courses',
    alt: 'Students see their courses and progress at a glance.',
    caption: 'Students see their courses and progress at a glance.',
  },
  {
    src: '/images/platform/hub-lesson.webp',
    heading: 'Exact feedback',
    alt: 'Code is checked by real tests, with instant feedback and hints.',
    caption: 'Code is checked by real tests, with instant feedback and hints.',
  },
  {
    src: '/images/platform/hub-teacher.webp',
    heading: 'Teacher view',
    alt: 'Teachers see where every student is and stay in charge of grades.',
    caption: 'Teachers see where every student is and stay in charge of grades.',
  },
  {
    src: '/images/platform/hub-stamps.webp',
    heading: 'Stamps',
    alt: 'Students earn a stamp for every lesson they master.',
    caption: 'Students earn a stamp for every lesson they master.',
  },
  {
    src: '/images/platform/hub-family.webp',
    heading: 'Family view',
    alt: 'Families see clear progress and a note from the teacher.',
    caption: 'Families see clear progress and a note from the teacher.',
  },
];

export const HUB_AVAILABLE = {
  now: ['Python fundamentals', 'Python for data', 'Probability and statistics with Python'],
  coming2027: ['Secure coding in Python', 'Machine learning with Python'],
};

export const PLATFORM_JOIN = [
  {
    id: 'families',
    title: 'Families',
    body: 'Family plans: coming 2027. Platform access on its own, without live classes.',
    ctaLabel: 'Book a free consultation',
    to: '/book',
  },
  {
    id: 'schools',
    title: 'Schools',
    body: 'Founding Schools pilot: spring 2027. A small group of schools, at a founding rate.',
    ctaLabel: 'Learn more',
    to: '/schools',
  },
  {
    id: 'homeschool',
    title: 'Homeschool',
    body: 'Homeschool pilot: free term in spring 2027.',
    ctaLabel: 'Join the homeschool pilot',
    to: '/book',
  },
];

export const PLATFORM_FAQ = [
  {
    q: 'Does it work on school Chromebooks?',
    a: 'Yes. It runs in the browser, with nothing to install.',
  },
  {
    q: 'Do parents need to know how to code?',
    a: 'No. Work is checked automatically, and progress is shown in plain language.',
  },
  {
    q: 'What information do you collect?',
    a: "Only what learning needs. We don't collect birthdates, addresses or student numbers, there are no ads or trackers, and families can see and delete their child's data.",
  },
  {
    q: "How do grades reach a school's gradebook?",
    a: 'Teachers export grades in one click, in a format for their gradebook. Teachers approve every mark.',
  },
  {
    q: 'Is it aligned with the Ontario curriculum?',
    a: 'Yes. Each course connects to specific Ontario courses for Grades 8 to 12, linked above.',
  },
];

const ONTARIO_CURRICULUM = {
  computerStudies: {
    label: 'Computer Studies, Grades 10–12 (ICD2O, ICS3U, ICS4U)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/computer-studies',
  },
  secondaryMath: {
    label: 'Mathematics, Grades 9–12 (including MDM4U, Data Management)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
  },
  grade8Math: {
    label: 'Mathematics, Grade 8 (including coding)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
  },
  mth1w: {
    label: 'Mathematics, Grade 9 (MTH1W)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics/courses/mth1w/context',
  },
  math10to12: {
    label: 'Mathematics, Grades 10–12 (MCR3U, MHF4U, MCV4U, MDM4U)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
  },
  secondaryScience: {
    label: 'Science, Grades 9–12 (SNC1W, SNC2D, SPH3U, SPH4U)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-science',
  },
};

export const PLATFORM_COURSES = [
  {
    id: 'ai',
    title: 'Artificial Intelligence',
    body: 'How machine learning works, responsible use, and building small projects in Python.',
    ontario: [ONTARIO_CURRICULUM.computerStudies, ONTARIO_CURRICULUM.secondaryMath],
  },
  {
    id: 'cyber',
    title: 'Cybersecurity',
    body: 'Encryption, threat modelling, everyday online safety, and the basics of post-quantum cryptography.',
    ontario: [ONTARIO_CURRICULUM.computerStudies],
  },
  {
    id: 'math-physics',
    title: 'Math + Physics',
    body: 'Algebra, geometry, and calculus taught through motion, force, and energy.',
    ontario: [
      ONTARIO_CURRICULUM.grade8Math,
      ONTARIO_CURRICULUM.mth1w,
      ONTARIO_CURRICULUM.math10to12,
      ONTARIO_CURRICULUM.secondaryScience,
    ],
  },
];

export const FAMILY_PLANS = {
  status: 'Coming 2027',
  body: 'Platform access for families on its own, without live classes.',
};

export const PRIVACY_PROMISE =
  "We collect only what learning needs. No ads, no tracking, and families can see and delete their child's data.";

export const PRIVACY_SUMMARY = [
  'We collect only what learning needs, with no ads or trackers',
  'Aligned with PIPEDA and Ontario privacy law',
  'Student data is never sold or used for advertising',
  "Families can see and delete their child's data",
];

export const SCHOOL_OFFERINGS = [
  {
    id: 'founding',
    title: 'Founding Schools pilot',
    status: null,
    body: 'A small group of Canadian schools will pilot the curriculum and platform with us and help shape what comes next.',
    ctaLabel: 'Apply for the pilot',
    ctaHref: `mailto:${CONTACT.email}?subject=Founding%20Schools%20pilot`,
  },
  {
    id: 'kits',
    title: 'Classroom kits',
    status: 'Coming soon',
    body: 'Ready-to-teach lesson kits for AI, Cybersecurity, and Math + Physics.',
  },
  {
    id: 'training',
    title: 'Teacher training',
    status: null,
    body: 'Sessions that help your teachers deliver the lessons and use the platform with their classes.',
    ctaLabel: 'Ask about training',
    ctaHref: `mailto:${CONTACT.email}?subject=LuminoLearn%20teacher%20training`,
  },
];

/**
 * LuminoFrame storybooks. Each entry: { title, description, price, isbn, buyLinks: [{ label, href }] }.
 * The Books page shows a "coming soon" note while this list is empty.
 */
export const BOOKS = [];

export const SAFETY_POINTS = [
  'Every educator is a Canadian resident, vetted for working with minors, including background checks where required',
  'Educators follow a code of conduct and never contact students outside the platform',
  'Every message between an educator and a student is copied to the parent',
  'Class recordings are shared only with authorized staff and the parent',
  'Children under 13 need a parent’s consent before their account is active',
];
