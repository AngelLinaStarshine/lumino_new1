-- Invite-only account creation (admin-controlled)

create table public.account_invites (
  id                  uuid primary key default gen_random_uuid(),
  code_hash           text not null unique,
  code_hint           text not null,
  email               text,
  role                user_role not null check (role in ('student', 'teacher')),
  family_passcode_hash text,
  note                text,
  expires_at          timestamptz,
  used_at             timestamptz,
  used_by             uuid references public.profiles(id) on delete set null,
  created_at          timestamptz default now()
);

create index account_invites_unused_idx on public.account_invites (used_at) where used_at is null;

alter table public.account_invites enable row level security;

-- Only service role (admin API) touches invites
create policy "service role invites" on public.account_invites
  for all using (auth.role() = 'service_role');
