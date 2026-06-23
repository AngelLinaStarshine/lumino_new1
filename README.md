# Luminolearn Inc. — Website & Platform

This repo contains two apps:

1. **Marketing website** (root) — Vite + React public site  
2. **Learning platform** (`platform/`) — Next.js 14 app with Supabase

## Tech Stack

### Marketing site (`/`)
- **React 18** + **React Router 6**
- **Vite** — dev server on port **3000**

### Learning platform (`/platform`)
- **Next.js 14** (App Router) + TypeScript
- **Supabase** — auth & database
- **Stripe / Twilio / Resend** — optional (payments & notifications)
- Dev server on port **3001**

---

## Getting started

### 1. Marketing website

```bash
npm install
npm run dev          # http://localhost:3000
```

### 2. Learning platform

**Detailed steps:** see **[platform/SETUP.md](platform/SETUP.md)**

Short version:

```bash
cd platform
npm install
cp .env.local.example .env.local
```

1. Create a [Supabase](https://supabase.com) project.
2. Run migrations `0001` through `0004` in Supabase SQL Editor.
3. Add Supabase keys + `ADMIN_SECRET` to `.env.local`.
4. `npm run dev` → **http://localhost:3001**
5. **http://localhost:3001/admin/login** — create accounts or invite links.

From repo root:

```bash
npm run dev:platform
```

---

## Account creation (admin only)

Public signup is **off** by default. You control who gets access:

| You do | User gets |
|--------|-----------|
| Admin → **Create account** | Email + password you choose |
| Admin → **Generate invite** | One-time signup link |

Configure in `platform/.env.local`:

```env
PUBLIC_SIGNUP_ENABLED=false
ADMIN_SECRET=your-long-random-secret
```

---

## Project structure

```
├── src/                    # Marketing site (Vite)
│   └── lib/platformUrl.js  # Links → platform /login
├── platform/               # Next.js learning app
│   ├── SETUP.md            # ← Step-by-step setup guide
│   ├── app/admin/          # Account management
│   ├── app/(auth)/         # Login, invite-only signup
│   ├── app/student/        # Student + family views
│   ├── app/teacher/        # Teacher tools
│   └── supabase/migrations/
└── package.json
```

---

## Platform routes

| Route | Purpose |
|-------|---------|
| `/login` | Sign in |
| `/signup` | Registration with invite code only |
| `/admin` | Create users & invites (you) |
| `/student` | Student dashboard |
| `/student/family/unlock` | Parent passcode gate |
| `/teacher` | Teacher dashboard |
| `/preview/student` | Demo (no login) |

Marketing **Log In** opens `/login` on the website (port 3000). Copy Supabase keys into root `.env` as `VITE_SUPABASE_*` and set `VITE_PLATFORM_URL=http://localhost:3001`.

---

## License

© 2025 Luminolearn Inc. All rights reserved.
