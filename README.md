# LuminoLearn Academy — Website

A production-ready React website for LuminoLearn Academy, a K–12 STEM education platform serving Canadian families.

## Tech Stack

- **React 18** — UI framework
- **React Router 6** — Client-side routing
- **Vite** — Build tool & dev server
- **DM Serif Display + DM Sans** — Typography (Google Fonts)

## Project Structure

```
luminolearn-website/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/          # Shared UI components
│   │   ├── index.js         # Barrel export
│   │   ├── Button.jsx       # Button with variants (primary, secondary, warm, ghost)
│   │   ├── Card.jsx         # Card with optional hover effect
│   │   ├── Container.jsx    # Max-width layout wrapper
│   │   ├── CtaBanner.jsx    # Call-to-action banner section
│   │   ├── Footer.jsx       # Site footer with nav links
│   │   ├── Navbar.jsx       # Fixed navbar with scroll effect
│   │   ├── SectionLabel.jsx # Uppercase label badge
│   │   └── StepIndicator.jsx # Numbered step display
│   ├── data/
│   │   └── siteData.js      # All site content (courses, plans, features, etc.)
│   ├── hooks/
│   │   └── useScrollToTop.js # Scroll to top on route change
│   ├── pages/               # Page components (one per route)
│   │   ├── index.js         # Barrel export
│   │   ├── HomePage.jsx     # Landing page
│   │   ├── StoryPage.jsx    # Our Story
│   │   ├── PathsPage.jsx    # Learning Paths (subjects + age groups)
│   │   ├── TuitionPage.jsx  # Plans & Pricing
│   │   ├── ProPage.jsx      # LuminoPro (professional development)
│   │   ├── BookPage.jsx     # Book Free Session form
│   │   └── EnrollPage.jsx   # Enrollment request form
│   ├── styles/
│   │   ├── global.css       # CSS reset, variables, animations, responsive
│   │   └── theme.js         # JS theme constants (colors, fonts)
│   ├── App.jsx              # Router + layout
│   └── main.jsx             # Entry point
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Pages & Routes

| Route             | Page            | Purpose                                    |
|-------------------|-----------------|--------------------------------------------|
| `/`               | HomePage        | Landing — hero, subjects, how it works     |
| `/our-story`      | StoryPage       | About, vision/mission/values               |
| `/learning-paths` | PathsPage       | 3 subjects × 3 age groups, journey map     |
| `/tuition`        | TuitionPage     | LuminoStart, LuminoCore, LuminoPath       |
| `/luminopro`      | ProPage         | Professional development for educators     |
| `/book`           | BookPage        | Free 30-min session request form           |
| `/enroll`         | EnrollPage      | Full enrollment form (admin creates acct)  |

## Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Key Design Decisions

- **No user account creation** — Accounts are admin-created after enrollment confirmation
- **Free session as primary CTA** — Every page funnels to the free session booking form
- **Enrollment form collects structured data** — Age group, subject, and program are required dropdowns
- **Payment is handled offline** — E-Transfer, installments, and bursary discussed after form submission
- **All content in `siteData.js`** — Easy to update without touching component code

## Customization

All site content (courses, plans, pricing, features, contact info) lives in `src/data/siteData.js`. Update this file to change any text, pricing, or options without modifying component code.

Colors and fonts are defined in `src/styles/theme.js` and `src/styles/global.css` CSS variables.

## License

© 2025 LuminoLearn Academy. All rights reserved.
