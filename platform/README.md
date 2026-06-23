# Luminolearn Platform

Next.js 14 learning app for students, families, and teachers.  
**Accounts are admin-controlled** — you create users or send invite links; public signup is disabled by default.

📖 **Full setup instructions:** [SETUP.md](./SETUP.md)

---

## Features

- **Student dashboard** — courses, homework, schedule, progress
- **Family / parent view** — same student login + family passcode for payments & progress
- **Teacher dashboard** — roster, lessons, homework, grading
- **Admin panel** — create accounts or one-time invite codes (replaces manual pgAdmin workflow)
- **SMS & email** — Twilio + Resend (optional)
- **Stripe** — payments (optional)

---

## Quick start

```bash
cd platform
npm install
cp .env.local.example .env.local   # fill in Supabase + ADMIN_SECRET
npm run dev                        # http://localhost:3001
```

1. Run SQL migrations `0001` → `0004` in Supabase SQL Editor (see [SETUP.md](./SETUP.md)).
2. Open **http://localhost:3001/admin/login** and enter your `ADMIN_SECRET`.
3. Create a student or teacher account, or generate an invite link.

---

## Account management

| Method | When to use |
|--------|-------------|
| **Admin → Create account** | You set the password and send login details (like pgAdmin) |
| **Admin → Generate invite** | User picks their password via one-time link |
| **pgAdmin / Supabase** | Still possible, but admin panel sets up profiles correctly |

Set in `.env.local`:

```env
PUBLIC_SIGNUP_ENABLED=false    # keep false in production
ADMIN_SECRET=your-long-secret  # min 16 chars, for /admin/login
```

---

## Routes

| Route | Access |
|-------|--------|
| `/login` | All users |
| `/signup` | Invite code only (unless `PUBLIC_SIGNUP_ENABLED=true`) |
| `/admin` | You (`ADMIN_SECRET` or `admin` role) |
| `/student` | Students |
| `/student/family/*` | Parents (after family passcode) |
| `/teacher` | Teachers |
| `/preview/*` | Public demos (sample data) |

---

## Migrations (run in order)

1. `supabase/migrations/0001_init.sql`
2. `supabase/migrations/0002_policies.sql`
3. `supabase/migrations/0003_family_under_student.sql`
4. `supabase/migrations/0004_account_invites.sql`

---

## Project structure

```
app/
├── admin/           Account management (protected)
├── (auth)/          Login, invite-only signup
├── student/         Student + family routes
├── teacher/         Teacher tools
└── api/             Auth, admin, Stripe, cron

components/          UI by role
lib/                 Supabase, invites, account creation
supabase/migrations/ Database schema
```

---

## License

Proprietary — Luminolearn Inc.
