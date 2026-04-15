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
    badgeFg: '#ffffff',
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
    badge: 'Core program',
    badgeColor: '#115e59',
    badgeFg: '#ffffff',
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
    badgeFg: '#0f172a',
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

/** Navbar: LuminoQ placeholder; full page not launched yet */
export const LUMINO_Q_META = {
  path: '/lumino-q',
  navLabel: 'LuminoQ',
  title: 'LuminoQ',
  comingSoonMessage:
    'LuminoQ is coming soon. We will share more when it is ready. Thank you for your patience.',
};

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

/** Learning Paths page: timeline cards + modal copy (`cta.urlKey`: `discovery_call` | `tuition`, resolved in PathsPage) */
export const LEARNING_JOURNEY_STEPS = [
  {
    id: 'discovery',
    name: 'Discovery call',
    sub: 'Free · 30 min on Calendly',
    variant: 'mint',
    body: [
      "We learn about your child, their interests, strengths, and what you're hoping for. We answer every question honestly. If LuminoLearn isn't the right fit, we'll tell you.",
      'Book a time that works for you on Calendly. There is no charge for this call and no obligation to enroll.',
    ],
    cta: { label: 'Book your free call', urlKey: 'discovery_call' },
  },
  {
    id: 'luminostart',
    name: 'LuminoStart™',
    sub: '4 weeks · placement',
    variant: 'indigo',
    body: [
      'Your child attends four guided sessions so we can assess level, learning style, and pace—not just grade.',
      'You receive a written placement report and a personalized learning plan. Pricing for this step is on Plans & Tuition.',
    ],
    cta: { label: 'View LuminoStart™ on Plans & Tuition', urlKey: 'tuition' },
  },
  {
    id: 'luminocore',
    name: 'LuminoCore™',
    sub: '12 weeks · certified cycle',
    variant: 'emerald',
    body: [
      'Your child joins a small group matched by ability. Expect two sessions per week, guided projects, teacher feedback, and a certificate when the cycle ends.',
    ],
    cta: { label: 'View LuminoCore™ pricing', urlKey: 'tuition' },
  },
  {
    id: 'luminopath',
    name: 'LuminoPath™',
    sub: '3 to 12 months · bundles',
    variant: 'sunrise',
    body: [
      'LuminoPath™ bundles multiple LuminoCore™ cycles with priority scheduling, ongoing personalization, and regular progress reports—built for families who want continuity and value.',
    ],
    cta: { label: 'Compare LuminoPath™ bundles', urlKey: 'tuition' },
  },
];

/**
 * Our Story → How we operate → "What guides us" tab.
 * Each item: short left-rail label, full panel copy (principal-style tone).
 */
export const PRINCIPLES = [
  {
    id: 'know-student',
    icon: '🔍',
    shortLabel: 'Know the student first',
    title: 'Know the Student Before Teaching the Subject',
    paragraphs: [
      "Before we teach a single concept, we learn who we're teaching.",
      'Every student who enters LuminoLearn begins with a 4-week discovery phase (LuminoStart™) — not to test what they know, but to understand how they think. We observe how they approach a new problem: do they dive in or hesitate? Do they check their work or rush to finish? Do they ask questions freely or wait to be called on? Do they light up with logic puzzles or come alive during creative tasks?',
      "This isn't a placement test. It's a portrait. By the end of four weeks, we know their skill level, yes — but we also know their confidence patterns, their pace preferences, their response to challenge, and what kind of encouragement actually reaches them.",
    ],
    closing:
      'We teach subjects. But we teach them to a specific person. That distinction shapes everything.',
  },
  {
    id: 'structure-supports',
    icon: '📐',
    shortLabel: 'Calm, clear structure',
    title: 'Structure That Supports, Not Restricts',
    paragraphs: [
      "Children don't thrive in chaos. They also don't thrive in rigidity. The structure we build sits between those extremes — predictable enough to feel safe, flexible enough to respond to each learner.",
      "Every LuminoCore™ cycle follows a defined 12-week arc: clear weekly objectives, consistent session rhythms, progressive skill building, and a culminating project. Students always know what they're working on, what's coming next, and what \"done well\" looks like. There are no surprises, no ambiguity, no \"we'll see how it goes.\"",
      'But within that structure, there is room. A student who masters a concept early moves to a deeper application, not a worksheet of the same thing. A student who needs more time gets it — without falling behind, because the path was designed with that flexibility built in.',
    ],
    closing:
      'Calm structure means a child can focus on learning instead of wondering what\'s expected of them.',
  },
  {
    id: 'develop-thinker',
    icon: '🧠',
    shortLabel: 'Develop the thinker',
    title: 'Develop the Thinker, Not Just the Skill',
    paragraphs: [
      "Any tutoring service can help a child pass a test. We're building something deeper.",
      "When a student solves a math problem at LuminoLearn, we don't just check whether the answer is correct. We ask: did they understand why the method works? Could they explain it to someone else? Would they recognize when to use it in a different context? Could they spot the error if the answer were wrong?",
      "In Language, we don't just teach essay structure — we teach students to organize their thinking before they write, to revise with purpose, and to distinguish between what sounds good and what actually says something. In Computer Science, we don't teach syntax — we teach problem decomposition, logical reasoning, and the discipline of testing your own assumptions.",
    ],
    closing:
      "We are developing independent thinkers who trust their own reasoning — students who don't need to ask \"is this right?\" because they've learned how to evaluate their own work. That capacity transfers far beyond any subject.",
  },
  {
    id: 'tech-serves',
    icon: '⚖️',
    shortLabel: 'Ethical, intentional tech',
    title: 'Technology Serves Learning — Never the Reverse',
    paragraphs: [
      'We teach Computer Science. We teach AI concepts. And we are deeply skeptical of how most EdTech uses technology on children.',
      "At LuminoLearn, technology has a bounded role. Our platform shows students what they're working on, what's due, and what they've completed. It gives parents clear progress summaries. It gives teachers data to inform their instruction. That's it. There are no social feeds, no engagement streaks, no badges designed to trigger dopamine responses, no features built to maximize screen time.",
      "We teach artificial intelligence as a subject — how models are trained, what they can and cannot do, where bias enters, and why critical evaluation of AI output is a skill every young person needs. But we teach it the way you'd teach any powerful tool: with respect for what it can do and honesty about what it shouldn't replace.",
    ],
    closing:
      'Our position is simple. AI is something students should understand, not something they should depend on. The ability to think clearly when the machine is wrong — that is the skill that will matter most.',
  },
  {
    id: 'parents-partners',
    icon: '👁️',
    shortLabel: 'Parents see everything',
    title: 'Parents Are Partners, Not Spectators',
    paragraphs: [
      "Most parents we meet share the same frustration: they don't really know what's happening in their child's education. Report cards arrive twice a year. Parent-teacher conferences last ten minutes. And the rest of the time, \"How was school?\" gets answered with \"Fine.\"",
      'We operate differently. After every session, your child\'s teacher writes a brief observation — what was covered, how your child engaged, what clicked, and what needs more time. You see these notes. Every four weeks, you receive a written progress summary: skills mastered, areas developing, recommendations for home support, and the plan for the next cycle.',
      "If something isn't working — if your child is struggling with a concept, losing motivation, or needs a different approach — we tell you directly. We don't wait for a scheduled review. We don't soften it with vague reassurances. We tell you what we're seeing, what we think is happening, and what we recommend trying next.",
    ],
    closing:
      "You chose to invest in your child's education. You deserve to see exactly what that investment is producing.",
  },
  {
    id: 'character-confidence',
    icon: '💎',
    shortLabel: 'Character & confidence',
    title: 'Character and Confidence Alongside Knowledge',
    paragraphs: [
      "A child who knows algebra but is afraid to try hard problems hasn't really learned algebra. A student who writes well but won't share their work hasn't found their voice. Knowledge without confidence is incomplete.",
      "At LuminoLearn, we pay attention to the person developing alongside the skills. Our teachers notice when a student starts volunteering answers who used to stay quiet. They notice when a student starts checking their own work without being asked. They notice when a child moves from \"I can't do this\" to \"I haven't figured this out yet\" — and they name that shift, because recognizing your own growth is part of learning.",
      "We don't grade character. But we cultivate it — through consistent expectations, honest feedback, genuine praise for genuine effort, and an environment where struggle is treated as a normal and valuable part of getting better at something.",
    ],
    closing:
      'Our goal is not to produce students who perform well. It\'s to develop young people who know how to learn, trust their own capacity, and carry that confidence into every classroom, conversation, and challenge they encounter after us.',
  },
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
    desc: 'We teach students to use AI to explore ideas, test hypotheses, and accelerate research, never to bypass the hard work of learning. Every assignment that uses AI requires the student to explain their reasoning.',
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

/** Our Story → How we operate → "How we personalize" tab (teacher-led process). */
export const PERSONALIZATION_STEPS = [
  {
    id: 'observe',
    step: 1,
    shortLabel: 'Observe (Week 1–2)',
    title: 'Observe — Weeks 1–2 of LuminoStart™',
    paragraphsBefore: [
      "We don't start with a test. We start by watching and listening.",
      'During the first two weeks of LuminoStart™, your child participates in guided sessions where our teacher works with them across the subject — not to score them, but to understand them.',
    ],
    arrowLabel: 'We observe:',
    arrows: [
      'How they approach an unfamiliar problem (dive in? hesitate? ask for help? try to find a pattern?)',
      'How they respond to being wrong (shut down? get curious? try again immediately?)',
      'Where their confidence sits relative to their actual ability (some students know more than they think; others think they know more than they do)',
      'What pace feels natural — not too easy, not overwhelming',
      'What kind of instruction lands (visual? verbal? hands-on? example-driven?)',
    ],
    paragraphsAfter: [
      'This observation period gives us something no placement test can: a real picture of how your child learns, not just what they currently know.',
    ],
  },
  {
    id: 'map',
    step: 2,
    shortLabel: 'Map (Week 2–3)',
    title: 'Map — Weeks 2–3 of LuminoStart™',
    paragraphsBefore: [
      'By the middle of LuminoStart™, we begin building your child\'s learning profile — a structured assessment of where they are and what they need.',
    ],
    arrowLabel: 'The learning profile includes:',
    arrows: [
      'Skill-level mapping: Which concepts are solid, which are developing, which have gaps. Not by grade — by actual demonstrated understanding.',
      'Confidence profile: Where your child feels strong and where they hesitate. Confidence gaps often matter more than skill gaps — a student who can do the work but doesn\'t believe they can will underperform until the belief changes.',
      'Pace calibration: How quickly they absorb new material, how much repetition they need for retention, how they handle increasing complexity.',
      'Learning style indicators: Do they learn better from explanation first, or from trying and failing first? Do they prefer structured steps or open-ended exploration?',
    ],
    paragraphsAfter: [
      'We share this profile with you — in clear language, not jargon. You will understand not just what level your child is at, but how they learn best and what kind of support will help them grow fastest.',
    ],
  },
  {
    id: 'place',
    step: 3,
    shortLabel: 'Place (Week 3–4)',
    title: 'Place — Weeks 3–4 of LuminoStart™',
    paragraphsBefore: [
      'With the learning profile complete, we match your child to the right small group.',
      'Groups at LuminoLearn have a maximum of 6 students. But it\'s not just about size — it\'s about composition. We place students together based on:',
    ],
    arrowLabel: null,
    arrows: [
      'Skill level (not grade): A strong 11-year-old may be grouped with a 12-year-old working at the same level. A 14-year-old with gaps may work with a smaller, foundational group to rebuild confidence before advancing.',
      'Pace compatibility: Students in the same group should be able to move through material at a similar rhythm, so no one waits and no one drowns.',
      'Learning style alignment: Where possible, we group students who respond to similar instructional approaches, so the teacher can optimize their delivery.',
    ],
    paragraphsAfter: [
      'At the end of LuminoStart™, you receive a written placement report that explains where your child was placed, why, and what their learning path looks like for the first LuminoCore™ cycle. If anything doesn\'t feel right — if you have questions, concerns, or context we should know — we adjust. This is a conversation, not a verdict.',
    ],
  },
  {
    id: 'teach-adapt',
    step: 4,
    shortLabel: 'Teach & adapt (ongoing)',
    title: 'Teach and Adapt — Every LuminoCore™ Cycle',
    paragraphsBefore: [
      "Once your child begins LuminoCore™, personalization doesn't stop. It accelerates.",
      'Each 12-week cycle has defined learning objectives, but how each student moves through them is responsive. The teacher tracks mastery at the individual level — not just "did the class cover this topic?" but "does this specific student own this concept?"',
    ],
    arrowLabel: 'Every 4 weeks, the teacher conducts a structured review:',
    arrows: [
      'Which objectives has this student mastered? Which are developing?',
      'Is the current pace right — too fast, too slow, or just right?',
      'Has their confidence shifted? Are they taking more risks, asking more questions, showing more independence?',
      'Does the group placement still fit, or should we consider adjustment?',
    ],
    paragraphsAfter: [
      'Based on this review, the teacher may accelerate a student who\'s ready for deeper challenge, slow down and reinforce a concept that hasn\'t solidified, adjust instructional approach, or recommend a group change if the fit has shifted.',
      'This is what personalization actually looks like: not software automatically choosing the next worksheet, but a teacher who knows your child making professional judgments about what they need this week — and adapting accordingly.',
    ],
  },
  {
    id: 'report-reflect',
    step: 5,
    shortLabel: 'Report & reflect (every cycle)',
    title: 'Report and Reflect — End of Every Cycle',
    paragraphsBefore: [
      'At the end of each 12-week LuminoCore™ cycle, you receive a comprehensive progress report. Not a grade. A portrait of growth.',
    ],
    arrowLabel: 'The report includes:',
    arrows: [
      'Skills mastered: Specific competencies your child now demonstrates with confidence.',
      'Skills developing: Areas where progress is real but mastery isn\'t complete yet — with a clear plan for how we\'ll continue building.',
      'Character and confidence observations: How your child has grown as a learner — their independence, their willingness to engage with difficulty, their ability to self-assess.',
      'Teacher narrative: Your child\'s teacher writes a personal summary — what they\'ve noticed, what impressed them, and what they recommend for the next cycle.',
      'Next-cycle roadmap: What your child will work on next, why, and what the learning objectives are.',
    ],
    paragraphsAfter: [
      'We also invite a brief parent conversation — 15 minutes to review the report, answer questions, and hear from you. You know your child in ways we don\'t. Your observations about what\'s happening at home, how they talk about learning, whether they\'re engaging differently — that context makes our instruction better.',
      'The cycle ends. The learning continues. And the path forward is always clear.',
    ],
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
    desc: 'Every LuminoCore™ cycle ends with a student presenting their work to their group, to parents, or both. We build public speaking confidence step by step, not only in rare standalone presentations.',
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
    desc: "We build readers who question what they read, writers who organize their thinking before they start typing, and speakers who can hold a room. In an age of AI written text, original thought expressed clearly is the rarest skill there is.",
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
  "We do teach artificial intelligence, starting with computational thinking at age 9 and progressing to AI and machine learning foundations by age 15. But we teach it the way we think it should be taught: as a subject to understand, not a crutch to depend on. Students learn how language models work, what training data is, why AI outputs can be biased or wrong, and how to evaluate AI written content critically.",
  "Every assignment that uses AI at LuminoLearn has one rule: the student must be able to explain their reasoning without the AI. If they can't, they haven't learned, they've outsourced. And we tell them that directly.",
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

/** Free discovery call scheduling (Calendly). Override with VITE_DISCOVERY_CALL_URL if it differs from general Calendly. */
export const DISCOVERY_CALL_URL =
  (typeof import.meta.env.VITE_DISCOVERY_CALL_URL === 'string' && import.meta.env.VITE_DISCOVERY_CALL_URL.trim()) ||
  CALENDLY_BOOKING_URL;

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
