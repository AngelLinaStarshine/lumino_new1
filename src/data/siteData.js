export const COURSES = [
  {
    id: 'math',
    label: 'Mathematics',
    icon: '🧮',
    tagline: 'Number Ninjas',
    desc: 'From counting to calculus: strong foundations through logic, structure, and engaging challenges.',
    color: '#2A7B6F',
    ageLabels: ['Problem Solvers', 'Analytical Thinkers', 'Innovators'],
  },
  {
    id: 'language',
    label: 'Language & Literacy',
    icon: '📖',
    tagline: 'Word Wizards',
    desc: 'Confident readers, expressive writers, and thoughtful communicators, built through story and structure.',
    color: '#8B6914',
    ageLabels: ["Writer's Workshop", 'Critical Creators', 'Academic Mastery'],
  },
  {
    id: 'cs',
    label: 'Computer Science',
    icon: '💻',
    tagline: 'Code Explorers',
    desc: 'From first lines of code to real world projects: digital fluency and future ready thinking.',
    color: '#4A5899',
    ageLabels: ['Project Coders', 'Future Makers', 'Innovation Track'],
  },
];

export const AGE_GROUPS = [
  {
    id: 'junior',
    label: 'Ages 9 to 11',
    tag: 'Foundations',
    desc: 'Building strong basics with curiosity and care',
  },
  {
    id: 'middle',
    label: 'Ages 12 to 14',
    tag: 'Growth',
    desc: 'Deepening skills with structure and challenge',
  },
  {
    id: 'senior',
    label: 'Ages 15 to 17',
    tag: 'Mastery',
    desc: 'Advanced pathways with real world application',
  },
];

export const PLANS = [
  {
    name: 'LuminoStart™',
    duration: '4 weeks',
    price: '$349',
    unit: 'one time',
    desc: 'Learning assessment, placement, and personalized plan. Required for all new students.',
    badge: 'Required First Step',
    badgeColor: '#0f172a',
    features: [
      'Subject level assessment',
      'Learning pace snapshot',
      '4 guided sessions',
      'Personalized learning plan',
      'Placement recommendation',
    ],
  },
  {
    name: 'LuminoCore™',
    duration: '12 weeks',
    price: 'From $1,100',
    unit: 'per cycle',
    desc: 'Certified 12 week program with guided instruction, projects, and progress reports.',
    badge: 'Most Popular',
    badgeColor: '#2d9b84',
    featured: true,
    features: [
      '2 sessions per week',
      'Personalized practice',
      'Project based learning',
      'Teacher feedback reports',
      'Certificate of completion',
    ],
    subjects: [
      { name: 'Mathematics', price: '$1,150' },
      { name: 'Language & Literacy', price: '$1,100' },
      { name: 'Computer Science', price: '$1,200' },
    ],
  },
  {
    name: 'LuminoPath™',
    duration: '3 to 12 months',
    price: 'From $2,050',
    unit: 'bundled',
    desc: 'Long term personalized learning. Best value for continued growth.',
    badge: 'Best Value',
    badgeColor: '#ff9a3d',
    features: [
      'Multiple LuminoCore™ cycles',
      'Priority scheduling',
      'Ongoing personalization',
      'Regular progress reports',
      'Next step roadmap',
    ],
    bundles: [
      { months: 6, cycles: 2, price: '$2,050' },
      { months: 9, cycles: 3, price: '$2,950' },
      { months: 12, cycles: 4, price: '$3,750' },
    ],
  },
];

export const FEATURES = [
  { icon: '🏠', title: 'Weekly class overview', desc: "See what your child is working on this week and what's coming next." },
  { icon: '📚', title: 'Lesson slides & replays', desc: 'Key moments and notes your child can revisit in their own time.' },
  { icon: '📋', title: 'Assignments at a glance', desc: 'Due dates laid out clearly: nothing feels like a surprise.' },
  { icon: '✨', title: 'Gentle test preparation', desc: 'Light touch review so your child feels ready, not rushed.' },
  { icon: '🏆', title: 'Project gallery', desc: 'A collection of work that celebrates real progress and small wins.' },
  { icon: '💬', title: 'Parent updates', desc: 'Clear summaries and next step guidance you can actually use.' },
];

/** Home page: prominent links aligned with navbar (ages 9 to 17 programs vs PD) */
export const HOME_QUICK_LINKS = [
  {
    to: '/learning-paths',
    title: 'Learning Paths',
    desc: 'Mathematics, Language & Computer Science for ages 9 to 17, grouped by level and learning style.',
    icon: '🧭',
  },
  {
    to: '/tuition',
    title: 'Plans & Tuition',
    desc: 'LuminoStart™, LuminoCore™, and LuminoPath™: transparent pricing and payment options.',
    icon: '💳',
  },
  {
    to: '/luminopro',
    title: 'LuminoPro',
    desc: 'Professional learning for schools, teachers, and teams, not the same as our student academy.',
    icon: '🎓',
  },
];

/** Homepage: enrollment journey (Section 7) */
export const HOW_IT_WORKS = [
  {
    step: '1',
    tabLabel: 'Discovery call',
    title: 'Book a Free Discovery Call (30 minutes)',
    desc: "We learn about your child, their interests, strengths, and what you're hoping for. We answer every question honestly. If LuminoLearn isn't the right fit, we'll tell you.",
  },
  {
    step: '2',
    tabLabel: 'LuminoStart™',
    title: 'LuminoStart™: Assessment & Placement (4 weeks, $349)',
    desc: 'Your child attends 4 guided sessions where we assess their level, learning style, and pace. At the end, you receive a written placement report and personalized learning plan.',
  },
  {
    step: '3',
    tabLabel: 'LuminoCore™',
    title: 'LuminoCore™: Structured Learning (12 weeks, from $1,100)',
    desc: 'Your child joins a small group matched by level and begins their program. Two sessions per week, guided projects, regular feedback, and a certificate at completion.',
  },
  {
    step: '4',
    tabLabel: 'Keep growing',
    title: 'Continue Growing',
    desc: "After each cycle, review your child's progress report with their teacher. Continue with another LuminoCore™ cycle, bundle into LuminoPath™ for long term savings, or pause. It's your choice.",
  },
];

export const VALUES = [
  'Calm structure',
  'Caring instruction',
  'Visible growth',
  'Tech safe learning',
  'Honest communication',
];

/** Homepage Section 2 */
export const PROBLEM_PARENT_VOICES = [
  {
    quote: 'My child is bored in class',
    body: "Many bright students aren't challenged. They finish early, lose focus, and start associating school with waiting, not learning. Standard curricula move at one pace for everyone.",
  },
  {
    quote: "Tutoring helps, but it doesn't stick",
    body: "Tutoring patches gaps but rarely builds anything lasting. There's no curriculum, no progression, no connection between sessions. It's reactive, not proactive.",
  },
  {
    quote: "I don't know what my child actually knows",
    body: "Most parents get report cards twice a year and vague parent teacher interviews. They can't see what their child has mastered, what they're struggling with, or what comes next.",
  },
];

export const PROBLEM_LUMINO_ANSWERS = [
  {
    title: 'Every student gets a personalized learning path',
    body: "We assess your child's actual level, not their grade, and build a structured pathway that challenges them at the right pace. No one waits. No one falls behind.",
  },
  {
    title: 'A real curriculum, not random worksheets',
    body: 'Our programs run in 12 week cycles (LuminoCore™) with defined learning objectives, progressive skill building, projects, and assessments. Every session connects to the next.',
  },
  {
    title: 'Parents see everything',
    body: 'Weekly progress summaries, skill level dashboards, teacher feedback after every session, and a clear next step roadmap. You never have to wonder what your child is learning.',
  },
];

/** Homepage Section 3: curriculum by subject */
export const HOME_SUBJECT_DETAILS = {
  math: {
    curriculumTagline: 'From number sense to formal proof',
    levels: [
      {
        label: 'Ages 9 to 11 (Foundations)',
        points: [
          'Number fluency, fractions, intro geometry, logical reasoning, word problems',
        ],
      },
      {
        label: 'Ages 12 to 14 (Growth)',
        points: ['Algebra, data analysis, proportional thinking, mathematical argumentation'],
      },
      {
        label: 'Ages 15 to 17 (Mastery)',
        points: ['Functions, trigonometry, intro calculus, competition prep, proof writing'],
      },
    ],
    approach:
      "Mastery based progression. Students don't move forward until they own the concept, not just pass the test. We blend structured practice with problem solving challenges that build mathematical thinking, not just calculation speed.",
  },
  language: {
    curriculumTagline: 'From confident reading to powerful writing',
    levels: [
      {
        label: 'Ages 9 to 11 (Foundations)',
        points: [
          'Reading fluency, vocabulary building, structured paragraphs, oral expression',
        ],
      },
      {
        label: 'Ages 12 to 14 (Growth)',
        points: [
          'Essay structure, critical reading, literary analysis, persuasive writing, public speaking',
        ],
      },
      {
        label: 'Ages 15 to 17 (Mastery)',
        points: [
          'Academic writing, research skills, rhetorical analysis, university prep composition',
        ],
      },
    ],
    approach:
      'Reading and writing are inseparable. Students read carefully, discuss honestly, and write with increasing precision. We build voice and structure simultaneously, not one at the expense of the other.',
  },
  cs: {
    curriculumTagline: 'From first program to real world projects',
    levels: [
      {
        label: 'Ages 9 to 11 (Foundations)',
        points: [
          'Computational thinking, block based coding, simple algorithms, digital citizenship',
        ],
      },
      {
        label: 'Ages 12 to 14 (Growth)',
        points: [
          'Python fundamentals, web development basics, data structures, intro to AI concepts',
        ],
      },
      {
        label: 'Ages 15 to 17 (Mastery)',
        points: [
          'Software projects, AI/ML foundations, cybersecurity awareness, ethics of technology, portfolio building',
        ],
      },
    ],
    approach:
      "We don't teach tools; we teach thinking. Students learn to decompose problems, design solutions, and build things that work. Every project connects to real world applications. And we teach AI ethics alongside AI skills, because knowing how to use a tool responsibly matters as much as knowing how to use it at all.",
  },
};

/** Homepage Section 4 */
export const AI_ETHICS_INTRO = [
  "Artificial intelligence is reshaping how the world works, and your child will need to understand it. But understanding AI doesn't mean depending on it. At LuminoLearn, we teach students how AI systems work, what they can and cannot do, and how to use them as tools for thinking, not replacements for it.",
  "We believe the students who will thrive aren't the ones who can prompt ChatGPT fastest. They're the ones who can think clearly, write precisely, and solve problems that no AI has been trained on yet. That's what we build.",
];

export const AI_PRINCIPLES = [
  {
    icon: '🧠',
    title: 'AI as a thinking tool, not a shortcut',
    desc: 'We teach students to use AI to explore ideas, test hypotheses, and accelerate research, never to bypass the hard work of learning. Every AI assisted assignment requires the student to explain their reasoning.',
  },
  {
    icon: '⚖️',
    title: 'Ethics built into the curriculum',
    desc: "Starting at age 12, students study bias in algorithms, privacy implications of data collection, deepfakes, misinformation, and the social consequences of automation. These aren't add ons. They're part of the Computer Science curriculum.",
  },
  {
    icon: '🔒',
    title: 'Tech safe learning environment',
    desc: 'We use technology intentionally: no social feeds, no gamification traps, no addictive engagement loops. Screen time in our sessions is purposeful, time bounded, and supervised. Parents control visibility into every tool we use.',
  },
];

/** Homepage Section 5 */
export const PERSONALIZATION_STEPS = [
  {
    step: '1',
    title: 'Discover',
    desc: "We assess your child's current level across the subject, not with a single test, but through 4 weeks of guided sessions, observation, and diagnostic tasks.",
  },
  {
    step: '2',
    title: 'Map',
    desc: 'We identify their strengths, gaps, pace preferences, and confidence patterns. We share this map with you clearly, not in jargon.',
  },
  {
    step: '3',
    title: 'Build',
    desc: "We design a learning path with specific weekly objectives, matched to a small group of students at a similar level. Your child is never in a class that's too easy or too hard.",
  },
  {
    step: '4',
    title: 'Adapt',
    desc: 'Every 4 weeks, their teacher reviews progress and adjusts the path. If something clicks fast, we accelerate. If something needs more time, we give it. No rigid timelines.',
  },
  {
    step: '5',
    title: 'Report',
    desc: "You receive a written progress summary every cycle: what was covered, what was mastered, what's next, and how your child is growing as a learner.",
  },
];

/** Homepage Section 6 */
export const SKILLS_THAT_MATTER = [
  {
    icon: '🔢',
    title: 'Mathematical reasoning (not just calculation)',
    desc: "Most math instruction teaches procedures. We teach students to think mathematically: to estimate, reason, prove, and recognize when an answer doesn't make sense. This is the skill that transfers to every STEM field.",
  },
  {
    icon: '✍️',
    title: 'Structured writing and argumentation',
    desc: 'In an era of AI generated text, the ability to construct a clear, original argument is more valuable than ever. We teach students to organize their thinking on paper, a skill universities and employers consistently say is lacking.',
  },
  {
    icon: '💡',
    title: 'Computational thinking',
    desc: 'Before students write code, they learn to decompose problems, identify patterns, design algorithms, and debug their logic. This is not “learning to code.” It is learning to think in systems.',
  },
  {
    icon: '🤖',
    title: 'AI literacy and critical evaluation',
    desc: "Students learn what AI models are, how they're trained, what they're good at, and where they fail. They practice evaluating AI outputs for accuracy, bias, and appropriateness, a skill most adults haven't developed yet.",
  },
  {
    icon: '🗣️',
    title: 'Communication and presentation',
    desc: 'Every LuminoCore™ cycle ends with a student presenting their work to their group, to parents, or both. We build public speaking confidence incrementally, not through one off presentations.',
  },
  {
    icon: '📊',
    title: 'Data reasoning',
    desc: 'Students learn to read charts, question statistics, understand sampling bias, and distinguish correlation from causation. In a world of misinformation, this is a survival skill.',
  },
];

/** Our Story page (StoryPage.jsx) */
export const STORY_HERO_PARAGRAPHS = [
  'Why do so many bright, capable children lose confidence in school?',
  'We kept seeing the same pattern. A child who loved building things at home but dreaded math class. A teenager who could argue passionately about anything, except on paper, where school had taught her that writing meant filling templates. A ten year old who taught himself Scratch over the weekend but sat through "computer class" learning to format a Word document.',
  "These weren't struggling students. They were underserved ones. The system wasn't failing them with bad teaching, it was failing them with mismatched pacing, generic instruction, and a curriculum that hadn't caught up to the world they were actually growing up in.",
  "LuminoLearn started from a simple conviction: if you give a child the right structure, the right pace, and a teacher who actually knows them, they don't just learn. They start to believe they're someone who can learn. And that belief changes everything.",
];

export const BELIEFS = [
  {
    num: '01',
    title: 'Children learn best when they feel safe, not pressured.',
    body: "Anxiety shuts down learning. We build environments where making mistakes is normal, asking questions is encouraged, and no child is embarrassed for not knowing something yet.",
  },
  {
    num: '02',
    title: 'Structure creates freedom, not restriction.',
    body: "A clear path, with defined objectives, weekly rhythms, and visible progress, actually reduces stress. Children relax when they know what's expected and can see themselves advancing.",
  },
  {
    num: '03',
    title: 'Parents deserve to know what\'s happening.',
    body: "Not through jargon filled report cards twice a year. Through honest, plain language updates every week: what was covered, what was mastered, what needs more time, and what comes next.",
  },
  {
    num: '04',
    title: 'Technology is a tool, not a teacher.',
    body: 'We use technology to support instruction, track progress, and give students access to resources. We never use it to replace human connection, gamify attention, or fill time.',
  },
  {
    num: '05',
    title: 'Every child has a pace. Instruction should match it.',
    body: 'Some students need to move faster. Some need more time with a concept before it clicks. Both are normal. Rigid timelines serve institutions, not learners.',
  },
  {
    num: '06',
    title: 'Skills matter more than grades.',
    body: "We care whether your child can reason through a problem, write a clear argument, and build something that works, not whether they scored 87 or 91 on a test designed for a class of thirty.",
  },
];

export const STORY_TEACH_NARRATIVE = [
  'Every LuminoLearn class has a maximum of 6 students.',
  "That's not a marketing number, it's a pedagogical decision. With six students, a teacher can notice when a child hesitates before answering, when they rush through a problem without checking, when they've understood the procedure but missed the concept. Those micro moments are where real teaching happens, and they're invisible in a class of twenty five.",
  "Our teachers don't just deliver content. They observe, adapt, and respond. They know each student's name, their strengths, their sticking points, and what kind of encouragement works for them. Every session, they write a brief note on each student: what went well, what needs reinforcement, what to adjust next week.",
  "This is expensive. It's slow to scale. And it's the only way we're willing to teach.",
];

export const TEACHING_DETAILS = [
  {
    icon: '👥',
    title: 'Maximum 6 students per group',
    detail:
      'Students are grouped by ability level and learning style, not by school grade. Groups are adjusted every cycle based on progress.',
  },
  {
    icon: '📝',
    title: 'Teacher notes after every session',
    detail:
      "Your child's teacher writes a brief observation note after each class: what was covered, how your child engaged, and what to reinforce at home. You see these notes.",
  },
  {
    icon: '🔄',
    title: '4 week review and adjustment',
    detail:
      "Every four weeks, we review each student's progress data and adjust their learning path. If something clicked fast, we accelerate. If something needs more time, we give it.",
  },
];

export const SUBJECT_PHILOSOPHY_INTRO = [
  'We chose these three subjects because they are the foundation of everything else.',
  'Mathematical reasoning teaches children how to think logically. Language teaches them how to communicate precisely. Computer Science teaches them how to build things that solve problems. Together, these three disciplines develop a child who can reason, express, and create: the skills that matter most in a world where information is abundant but understanding is scarce.',
  "We don't try to teach everything. We teach three things well.",
];

export const SUBJECT_PHILOSOPHY = [
  {
    icon: '🧮',
    title: 'Mathematics',
    desc: 'We teach students to think mathematically, to estimate before they calculate, to ask \'does this answer make sense?\', and to see patterns that others miss. Procedures matter, but reasoning matters more.',
  },
  {
    icon: '📖',
    title: 'Language & Literacy',
    desc: "We build readers who question what they read, writers who organize their thinking before they start typing, and speakers who can hold a room. In an age of AI generated text, original thought expressed clearly is the rarest skill there is.",
  },
  {
    icon: '💻',
    title: 'Computer Science',
    desc: "We teach computational thinking first, syntax second. Students learn to decompose problems, design solutions, and build working projects, while also learning when technology helps and when it doesn't. AI ethics is part of the curriculum from age 12.",
  },
];

/** Our Story: long form AI / EdTech position (paragraphs) */
export const AI_POSITION_TEXT = [
  'Most EdTech products are designed to maximize engagement, which sounds positive until you realize that "engagement" in Silicon Valley means the same thing whether you\'re learning algebra or scrolling TikTok. Streaks, badges, leaderboards, and dopamine triggering animations are attention capture tools borrowed from social media. They make products stickier. They don\'t make learning deeper.',
  "We take a different approach. Our platform is deliberately simple. It shows your child what they're working on this week, what's due, and what they've completed. There are no feeds, no notifications competing for attention, and no features designed to make a child open the app more often. When your child is done with their work, the platform has nothing else to offer them, and that's intentional.",
  "We do teach artificial intelligence, starting with computational thinking at age 9 and progressing to AI/ML foundations by age 15. But we teach it the way we think it should be taught: as a subject to understand, not a crutch to depend on. Students learn how language models work, what training data is, why AI outputs can be biased or wrong, and how to evaluate AI generated content critically.",
  "Every AI assisted assignment at LuminoLearn has one rule: the student must be able to explain their reasoning without the AI. If they can't, they haven't learned, they've outsourced. And we tell them that directly.",
  "We think this is the right approach for children growing up in a world where AI tools are becoming ubiquitous. The students who will thrive aren't the ones who can use AI fastest. They're the ones who can think clearly when the AI is wrong.",
];

export const STORY_VISION_MISSION_VALUES = {
  vision:
    'Every child learns with confidence and clarity, supported by strong skills, real progress, and teachers who know them by name. Not as a slogan. As a daily practice.',
  mission:
    'To provide structured, measurable, human centered learning in Mathematics, Language, and Computer Science for children ages 9 to 17, making growth visible to students and families at every step.',
  values: [
    'Calm structure over chaotic content',
    'Caring instruction over automated delivery',
    'Visible growth over vague reassurance',
    'Honest communication over polished marketing',
    'Responsible technology over engagement maximizing features',
  ],
};

export const STORY_TEAM_BODY = [
  'LuminoLearn was founded by educators and technologists who believe that the best learning happens when human judgment guides technological capability, not the other way around.',
  "Our teaching team includes certified Ontario educators, subject matter specialists, and mentors with industry experience in STEM fields. Every teacher is selected not just for expertise, but for the ability to connect with young learners, to notice when a child is confused but won't say so, to know when to push and when to let a concept settle.",
  "We're based in Ontario, Canada, and currently serve families across the Greater Toronto Area.",
];

export const TEAM_PLACEHOLDER_ROLES = [
  'Lead Mathematics Instructor',
  'Language & Literacy Director',
  'Computer Science Lead',
  'Founder & Program Director',
];

export const STORY_HIRING = {
  label: "We're hiring educators. Tell us about your experience.",
  href: 'mailto:lumino@luminolearn.org?subject=Teaching%20at%20LuminoLearn',
};

export const DIFFERENTIATORS = [
  { icon: '🧭', title: 'Clear structure', desc: "A simple roadmap from LuminoStart™ (4 weeks) to LuminoCore™ (12 weeks). No guesswork: just a path that makes sense from day one." },
  { icon: '🏁', title: 'Real outcomes', desc: "Students produce visible work: projects, portfolios, and progress you can measure. Learning becomes tangible, not vague." },
  { icon: '🤍', title: 'Parent friendly', desc: "Clear summaries, quick updates, and next step guidance you can actually use. You'll always know where your child is." },
  { icon: '🛡️', title: 'Tech safe learning', desc: 'Privacy aware tools, intentional screen use, and child safe workflows. Modern learning, responsibly built.' },
];

export const PAYMENT_OPTIONS = [
  { icon: '💳', title: 'Interac transfer', desc: 'Interac e Transfer: the easiest option for Canadian families' },
  { icon: '🔄', title: 'Installment plans', desc: 'Split payments available for LuminoPath™ bundles' },
];

export const PRO_AUDIENCES = [
  {
    icon: '🏫',
    title: 'School & district leaders',
    items: [
      'Aligned PD series in math, literacy, and CS plus STEM',
      'Implementation coaching for new initiatives',
      'Practical tools teachers can use immediately',
    ],
  },
  {
    icon: '👩‍🏫',
    title: 'Teachers & instructional teams',
    items: [
      'High impact routines for math and literacy',
      'Blending digital tools safely and thoughtfully in class',
      'Planning labs with ready to adapt lesson ideas',
    ],
  },
  {
    icon: '👨‍👩‍👧',
    title: 'Parents & adult learners',
    items: [
      'Short courses in digital skills and responsible technology use',
      "Coaching on supporting children's learning at home",
      'Flexible formats for busy schedules',
    ],
  },
];

export const PRO_STEPS = [
  { step: '1', title: 'Discovery & needs', desc: 'We listen to your context, priorities, and existing initiatives before suggesting any pathway.' },
  { step: '2', title: 'Co designed program', desc: 'We build a focused series of sessions with clear outcomes and practical takeaways.' },
  { step: '3', title: 'Ongoing support', desc: 'Coaching, office hours, and reflection spaces help teams turn ideas into daily practice.' },
];

export const CONTACT = {
  email: 'lumino@luminolearn.org',
  phone: '+1 (437) 424 1380',
};

/** Footer / social (opens in new tab) */
export const SOCIAL_LINKS = [
  {
    id: 'linkedin',
    href: 'https://www.linkedin.com/company/lumino-learn-academy/posts/?feedView=all',
    label: 'LinkedIn',
  },
  {
    id: 'facebook',
    href: 'https://www.facebook.com/luminolearn.academy',
    label: 'Facebook',
  },
  {
    id: 'whatsapp',
    href: 'https://wa.me/14374241380',
    label: 'WhatsApp',
  },
  {
    id: 'instagram',
    href: 'https://www.instagram.com/luminolearn.academy?igsh=b2w5MGdiaHZuemNn&utm_source=qr',
    label: 'Instagram',
  },
];

export const CALENDLY_BOOKING_URL =
  (typeof import.meta.env.VITE_CALENDLY_URL === 'string' && import.meta.env.VITE_CALENDLY_URL.trim()) ||
  'https://calendly.com/lumino-luminolearn/new-meeting-1';

/** Primary parent intake / discovery call (Google Form). Override with VITE_DISCOVERY_FORM_URL. */
export const DISCOVERY_CALL_FORM_URL =
  (typeof import.meta.env.VITE_DISCOVERY_FORM_URL === 'string' && import.meta.env.VITE_DISCOVERY_FORM_URL.trim()) ||
  'https://forms.gle/TVbemtprDtK9Zixw9';

/**
 * Google Form URLs by age band + subject (from learning path intake).
 * Use null when the form is not set yet: enroll page falls back to Calendly.
 */
export const ENROLLMENT_FORMS = {
  junior: {
    math: 'https://forms.gle/txh4xWL3PuJpJpTr6',
    language: 'https://forms.gle/TVbemtprDtK9Zixw9',
    cs: 'https://forms.gle/AdkicVongWKAfSdt5',
  },
  middle: {
    math: null,
    language: null,
    cs: null,
  },
  senior: {
    math: null,
    language: null,
    cs: null,
  },
};

export function getEnrollmentLink(ageGroupId, courseId) {
  const formUrl = ENROLLMENT_FORMS[ageGroupId]?.[courseId];
  if (formUrl)
    return { href: formUrl, isForm: true, label: 'Complete registration form' };
  return {
    href: CALENDLY_BOOKING_URL,
    isForm: false,
    label: 'Complimentary consultation',
  };
}
