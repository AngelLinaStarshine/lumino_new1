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

export const PLATFORM_FEATURES = [
  'Coding exercises in the browser, with instant feedback when students submit',
  'Practice set by their educator and matched to their level',
  'Progress reports for parents between classes',
  "Messaging with the educator, with every message copied to the parent",
  'Class schedule and joining links in one place',
];

export const PLATFORM_SCREENSHOTS = [
  {
    src: '/images/platform/hub-home.webp',
    alt: 'Students see their courses and progress at a glance.',
    caption: 'Students see their courses and progress at a glance.',
  },
  {
    src: '/images/platform/hub-lesson.webp',
    alt: 'Code is checked by real tests, with instant feedback and hints.',
    caption: 'Code is checked by real tests, with instant feedback and hints.',
  },
  {
    src: '/images/platform/hub-teacher.webp',
    alt: 'Teachers see where every student is and stay in charge of grades.',
    caption: 'Teachers see where every student is and stay in charge of grades.',
  },
  {
    src: '/images/platform/hub-stamps.webp',
    alt: 'Students earn a stamp for every lesson they master.',
    caption: 'Students earn a stamp for every lesson they master.',
  },
  {
    src: '/images/platform/hub-family.webp',
    alt: 'Families see clear progress and a note from the teacher.',
    caption: 'Families see clear progress and a note from the teacher.',
  },
];

const ONTARIO_CURRICULUM = {
  computerStudies: {
    label: 'Computer Studies, Grades 10 to 12',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/computer-studies',
  },
  secondaryMath: {
    label: 'Mathematics, Grades 9 to 12 (including MDM4U)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
  },
  grade8Math: {
    label: 'Mathematics, Grade 8',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/elementary-mathematics',
  },
  mth1w: {
    label: 'Mathematics, Grade 9 (MTH1W)',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics/courses/mth1w/context',
  },
  math10to12: {
    label: 'Mathematics, Grades 10 to 12',
    href: 'https://www.dcp.edu.gov.on.ca/en/curriculum/secondary-mathematics',
  },
  secondaryScience: {
    label: 'Science, Grades 9 to 12',
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
  'All student data is stored in Canada',
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
  'Class recordings are stored in Canada and shared only with authorized staff and the parent',
  'Children under 13 need a parent’s consent before their account is active',
];
