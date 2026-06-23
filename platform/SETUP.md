# Luminolearn Platform — Setup Guide

Step-by-step instructions to run the platform locally and manage accounts **only through you** (no public signup).

---

## What you need

- [Node.js](https://nodejs.org/) 18 or newer
- A [Supabase](https://supabase.com) project (free tier is fine to start)
- About 20 minutes for first-time setup

Optional later: Stripe, Twilio, Resend (payments & SMS — not required to test login and dashboards).

---

## Step 1 — Install dependencies

Open a terminal in the **platform** folder:

```bash
cd platform
npm install
```

From the repo root you can also run:

```bash
npm run dev:platform
```

(after `npm install` in both root and `platform/`).

---

## Step 2 — Create a Supabase project

1. Go to [supabase.com/dashboard](https://supabase.com/dashboard) → **New project**.
2. Pick a name, password, and region → **Create**.
3. Wait until the project is ready.

---

## Step 3 — Run database migrations

In Supabase: **SQL Editor** → **New query**.

Run each file **in order** (copy the full file contents, paste, click **Run**):

| Order | File |
|-------|------|
| 1 | `supabase/migrations/0001_init.sql` |
| 2 | `supabase/migrations/0002_policies.sql` |
| 3 | `supabase/migrations/0003_family_under_student.sql` |
| 4 | `supabase/migrations/0004_account_invites.sql` |

You should see “Success” after each one. Migration `0004` adds the **invite codes** table used for controlled signup.

---

## Step 4 — Get Supabase API keys

1. Supabase → **Project Settings** (gear) → **API**.
2. Copy:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY`  
     ⚠️ Never put the service role key in frontend code or commit it to git.

---

## Step 5 — Configure environment variables

```bash
cd platform
cp .env.local.example .env.local
```

Edit `platform/.env.local`:

```env
# Required — from Supabase API settings
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...

# Required — platform URL (use 3001 locally)
NEXT_PUBLIC_APP_URL=http://localhost:3001

# Required — your private admin password (min 16 characters)
ADMIN_SECRET=pick-a-long-random-string-here

# Keep false so strangers cannot self-register
PUBLIC_SIGNUP_ENABLED=false

# Optional for now
CRON_SECRET=any-random-string
```

**Generate a strong `ADMIN_SECRET`** — this is the password you enter at `/admin/login`. Example (PowerShell):

```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object {[char]$_})
```

---

## Step 6 — Start the platform

```bash
cd platform
npm run dev
```

Open: **http://localhost:3001**

Marketing site (optional, separate terminal from repo root):

```bash
npm run dev
```

→ **http://localhost:3000** (Log In button goes to the platform).

---

## Step 7 — Open the admin panel

1. Go to **http://localhost:3001/admin/login**
2. Enter the **`ADMIN_SECRET`** you set in `.env.local`
3. You land on **Account management**

You stay signed in to admin for 8 hours (cookie). Click **Lock admin** when finished on a shared computer.

### Two ways to act as admin

| Method | Best for |
|--------|----------|
| **`ADMIN_SECRET`** at `/admin/login` | First-time setup, creating users, no login account needed |
| **Admin user account** (`role = admin`) | Day-to-day sign-in via **Teacher** on the login page → opens `/admin` |

---

## Step 7b — Create your admin user account (optional)

Use this if you want a personal email/password for the admin panel (not only the secret).

### Quick way — Admin panel

1. Open **http://localhost:3001/admin/login** with your `ADMIN_SECRET`
2. Go to **Create account**
3. Choose **admin**, enter your name, email, password
4. Sign out of admin secret (**Lock admin**)
5. Sign in at **http://localhost:3000/login** → choose **Teacher** → use your admin email/password  
   → You land on **http://localhost:3001/admin** with the **Overview** tab (students, teachers, activity counts)

### Manual way — Supabase (pgAdmin style)

1. Supabase → **Authentication** → **Users** → **Add user** (email + password)
2. SQL Editor → run (replace email):

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'you@luminolearn.org';
```

If no profile row exists yet, create the user via the admin panel **Create account** tab instead.

---

## Step 7c — Monitor students & teachers

In the admin panel **Overview** tab you can see:

- Total **students** and **teachers**
- **Homework assigned** and **submissions** counts
- A list of **all user accounts**

For deeper data (grades, payments, raw tables), use **Supabase → Table Editor** (`profiles`, `enrollments`, `homework`, `submissions`).

Admins can also sign in as **Teacher** to open the teacher dashboard (`/teacher`) for roster and assignments.

---

## Step 8 — Create users (your workflow)

You have **two options**. Public signup is **off** unless you set `PUBLIC_SIGNUP_ENABLED=true`.

### Option A — Create account directly (like pgAdmin)

Best when **you** choose the password and email it to the family.

1. Admin → **Create account** tab
2. Choose **student** or **teacher**
3. Fill in name, email, password (8+ characters)
4. For students: set a **family passcode** (4–6 digits) for parents
5. Click **Create account**
6. Copy the green box (email + password) and send it to the user securely

User signs in at **http://localhost:3001/login**.

Parents use the **same student login**, then **Parent view** → enter the family passcode.

### Option B — Generate an invite link

Best when the **user chooses their own password**.

1. Admin → **Generate invite** tab
2. Choose role, optional email lock, optional note
3. Click **Generate invite**
4. Copy the **code** or **link** and send to the user (email, text, etc.)

User opens the link → completes signup once → invite cannot be reused.

Invites expire after **14 days** (unused). Revoke pending invites under **Invite history**.

---

## Step 9 — What users see

| Page | Who | Purpose |
|------|-----|---------|
| `/login` | Everyone | Sign in with credentials you provided |
| `/signup` | Invite only | Only works with a valid invite code |
| `/student` | Students | Dashboard, homework, schedule |
| `/student/family/unlock` | Parents | Family passcode after student login |
| `/teacher` | Teachers | Roster, lessons, homework |
| `/preview/student` | Demo | Sample student UI (no login) |
| `/preview/teacher` | Demo | Sample teacher UI (no login) |

Login page text: *“Accounts are created by invitation”* — no open registration.

---

## Step 10 — Production deployment (when ready)

1. Deploy `platform/` to [Vercel](https://vercel.com) (or similar).
2. Set the same env vars in the host dashboard, especially:
   - `NEXT_PUBLIC_APP_URL` → your live URL (e.g. `https://app.luminolearn.org`)
   - `ADMIN_SECRET` → strong unique value
   - `PUBLIC_SIGNUP_ENABLED=false`
3. On the marketing site, set `VITE_PLATFORM_URL` to the live platform URL.

---

## Troubleshooting

### “Admin access is not configured”
- Add `ADMIN_SECRET` to `.env.local` (at least 16 characters) and restart `npm run dev`.

### “An invite code is required”
- Expected when `PUBLIC_SIGNUP_ENABLED=false`. Create an invite in admin or create the account directly.

### “Invalid or expired invite code”
- Code was used, revoked, expired, or typed wrong. Generate a new invite.

### User can log in but sees wrong dashboard
- Check `profiles.role` in Supabase **Table Editor** (`student` or `teacher`).

### Still using pgAdmin / Supabase Table Editor?
- You can still create rows manually, but the **admin panel** is easier: it creates the auth user, profile, notification prefs, and family passcode in one step.

### Migration errors
- Run migrations **in order** 0001 → 0004.
- If a migration partially ran, check Supabase logs or start a fresh project for development.

---

## Quick reference — env vars

| Variable | Required | Purpose |
|----------|----------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Client-side Supabase |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Server admin actions (create users) |
| `NEXT_PUBLIC_APP_URL` | Yes | Invite links & redirects |
| `ADMIN_SECRET` | Yes | `/admin/login` password |
| `PUBLIC_SIGNUP_ENABLED` | No | `false` (default) = invite/admin only |
| `CRON_SECRET` | For cron | Protects scheduled API routes |
| Stripe / Twilio / Resend | Later | Payments & notifications |

---

## File map (account control)

```
platform/
├── app/admin/login/          Admin secret login
├── app/admin/(protected)/      Create users & invites UI
├── app/api/admin/users/        API: create account directly
├── app/api/admin/invites/      API: generate & list invites
├── app/api/auth/signup/        Public signup (invite-gated)
├── lib/account/create-account.ts   Shared user creation logic
├── lib/invites.ts            Invite code validation
└── supabase/migrations/0004_account_invites.sql
```

---

© Luminolearn Inc.
