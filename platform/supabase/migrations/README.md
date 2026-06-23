# Supabase migrations — run in this order

Open **Supabase Dashboard → SQL Editor → New query**, paste each file, click **Run**.

| # | File | What it does |
|---|------|----------------|
| 1 | `0001_init.sql` | Tables, enums, core schema |
| 2 | `0002_policies.sql` | Row-level security policies |
| 3 | `0003_family_under_student.sql` | Family passcode under student account |
| 4 | `0004_account_invites.sql` | Invite codes for controlled signup |

After all four, configure `platform/.env.local` and follow **SETUP.md**.
