-- ════════════════════════════════════════════════════════════════
-- LuminoLearn Platform v2 — curriculum, practice, messaging, audit
-- ════════════════════════════════════════════════════════════════

-- Profile extensions
alter table public.profiles
  add column if not exists account_status text default 'active'
    check (account_status in ('active', 'pending_parent_verification', 'suspended')),
  add column if not exists high_contrast boolean default false,
  add column if not exists first_name text;

-- ─── Audit logs ───────────────────────────────────────────────
create table if not exists public.audit_logs (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid references public.profiles(id) on delete set null,
  action        text not null,
  resource_type text,
  resource_id   text,
  ip_address    inet,
  user_agent    text,
  metadata      jsonb default '{}'::jsonb,
  created_at    timestamptz default now()
);
create index if not exists audit_logs_user_id_idx on public.audit_logs(user_id);
create index if not exists audit_logs_created_at_idx on public.audit_logs(created_at desc);

-- ─── Parental consent (under-13) ───────────────────────────────
create table if not exists public.parental_consents (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid references public.profiles(id) on delete cascade not null,
  parent_email    text not null,
  token           text not null unique,
  verified_at     timestamptz,
  created_at      timestamptz default now()
);

-- ─── Curriculum ───────────────────────────────────────────────
create table if not exists public.subjects (
  id          uuid primary key default gen_random_uuid(),
  slug        text not null unique,
  name        text not null,
  description text
);

create table if not exists public.levels (
  id          uuid primary key default gen_random_uuid(),
  subject_id  uuid references public.subjects(id) on delete cascade not null,
  tier        text not null check (tier in ('foundations', 'building', 'depth')),
  name        text not null,
  description text,
  unique(subject_id, tier)
);

create table if not exists public.subject_enrolments (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid references public.profiles(id) on delete cascade not null,
  subject_id  uuid references public.subjects(id) on delete cascade not null,
  level_id    uuid references public.levels(id) on delete set null,
  mastery_pct int default 0 check (mastery_pct >= 0 and mastery_pct <= 100),
  started_at  timestamptz default now(),
  unique(student_id, subject_id)
);

create table if not exists public.educator_students (
  educator_id uuid references public.profiles(id) on delete cascade not null,
  student_id  uuid references public.profiles(id) on delete cascade not null,
  assigned_at timestamptz default now(),
  primary key (educator_id, student_id)
);

-- ─── Practice ─────────────────────────────────────────────────
create table if not exists public.practice_tasks (
  id                 uuid primary key default gen_random_uuid(),
  level_id           uuid references public.levels(id) on delete cascade not null,
  title              text not null,
  content_json       jsonb not null default '{}'::jsonb,
  correct_answer_json jsonb not null default '{}'::jsonb,
  explanation        text,
  estimated_minutes  int default 10,
  created_at         timestamptz default now()
);

create table if not exists public.practice_assignments (
  id               uuid primary key default gen_random_uuid(),
  student_id       uuid references public.profiles(id) on delete cascade not null,
  task_id          uuid references public.practice_tasks(id) on delete cascade not null,
  assigned_by      uuid references public.profiles(id) on delete set null,
  instruction_note text,
  assigned_at      timestamptz default now(),
  due_at           timestamptz,
  completed_at     timestamptz,
  unique(student_id, task_id, assigned_at)
);

create table if not exists public.practice_submissions (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid references public.profiles(id) on delete cascade not null,
  task_id      uuid references public.practice_tasks(id) on delete cascade not null,
  answer_json  jsonb not null default '{}'::jsonb,
  is_correct   boolean not null default false,
  submitted_at timestamptz default now()
);
create index if not exists practice_submissions_student_idx on public.practice_submissions(student_id);

-- ─── Live classes ─────────────────────────────────────────────
create type class_format as enum ('online', 'in_person', 'group');
create type class_status as enum ('scheduled', 'completed', 'cancelled', 'reschedule_pending');

create table if not exists public.live_classes (
  id           uuid primary key default gen_random_uuid(),
  student_id   uuid references public.profiles(id) on delete cascade not null,
  educator_id  uuid references public.profiles(id) on delete set null,
  subject_id   uuid references public.subjects(id) on delete set null,
  format       class_format default 'online',
  group_name   text,
  scheduled_at timestamptz not null,
  join_url     text,
  status       class_status default 'scheduled',
  created_at   timestamptz default now()
);
create index if not exists live_classes_student_idx on public.live_classes(student_id, scheduled_at);
create index if not exists live_classes_educator_idx on public.live_classes(educator_id, scheduled_at);

create table if not exists public.class_notes (
  id          uuid primary key default gen_random_uuid(),
  class_id    uuid references public.live_classes(id) on delete cascade not null,
  educator_id uuid references public.profiles(id) on delete set null,
  body        text not null,
  created_at  timestamptz default now()
);

create table if not exists public.reschedule_requests (
  id           uuid primary key default gen_random_uuid(),
  class_id     uuid references public.live_classes(id) on delete cascade not null,
  student_id   uuid references public.profiles(id) on delete cascade not null,
  requested_at timestamptz default now(),
  reason       text,
  status       text default 'pending' check (status in ('pending', 'approved', 'denied'))
);

-- ─── Educator notes (private) ─────────────────────────────────
create table if not exists public.educator_notes (
  id          uuid primary key default gen_random_uuid(),
  educator_id uuid references public.profiles(id) on delete cascade not null,
  student_id  uuid references public.profiles(id) on delete cascade not null,
  body        text not null,
  created_at  timestamptz default now()
);

-- Student-visible educator notes
create table if not exists public.student_educator_notes (
  id          uuid primary key default gen_random_uuid(),
  educator_id uuid references public.profiles(id) on delete cascade not null,
  student_id  uuid references public.profiles(id) on delete cascade not null,
  body        text not null,
  created_at  timestamptz default now()
);

-- ─── Messaging ────────────────────────────────────────────────
create table if not exists public.message_threads (
  id          uuid primary key default gen_random_uuid(),
  student_id  uuid references public.profiles(id) on delete cascade not null,
  educator_id uuid references public.profiles(id) on delete cascade not null,
  created_at  timestamptz default now(),
  unique(student_id, educator_id)
);

create table if not exists public.messages (
  id           uuid primary key default gen_random_uuid(),
  thread_id    uuid references public.message_threads(id) on delete cascade not null,
  sender_id    uuid references public.profiles(id) on delete set null,
  recipient_id uuid references public.profiles(id) on delete set null,
  body         text not null,
  moderated    boolean default false,
  held_for_review boolean default false,
  delivered_at timestamptz,
  created_at   timestamptz default now()
);

create table if not exists public.parent_message_copies (
  id         uuid primary key default gen_random_uuid(),
  message_id uuid references public.messages(id) on delete cascade not null,
  parent_id  uuid references public.profiles(id) on delete cascade,
  parent_email text,
  created_at timestamptz default now()
);

create table if not exists public.moderation_wordlist (
  id   uuid primary key default gen_random_uuid(),
  word text not null unique
);

-- ─── Seed subjects & levels ───────────────────────────────────
insert into public.subjects (slug, name, description) values
  ('ai', 'AI', 'Artificial intelligence foundations, ethics, and hands-on projects.'),
  ('cybersecurity', 'Cybersecurity', 'Digital safety, threat awareness, and defensive skills.'),
  ('math_physics', 'Math + Physics', 'Quantitative reasoning from foundations through depth.')
on conflict (slug) do nothing;

insert into public.levels (subject_id, tier, name, description)
select s.id, t.tier, t.name, t.description
from public.subjects s
cross join (values
  ('foundations', 'Foundations', 'Core concepts and guided practice.'),
  ('building', 'Building', 'Applied skills and structured challenges.'),
  ('depth', 'Depth', 'Advanced topics and independent projects.')
) as t(tier, name, description)
on conflict (subject_id, tier) do nothing;

-- Seed moderation words
insert into public.moderation_wordlist (word) values
  ('password'), ('address'), ('phone number'), ('meet me'), ('snapchat'), ('instagram dm')
on conflict (word) do nothing;

-- Seed sample practice tasks (one per subject, foundations)
insert into public.practice_tasks (level_id, title, content_json, correct_answer_json, explanation, estimated_minutes)
select l.id,
  case s.slug
    when 'ai' then 'What is machine learning?'
    when 'cybersecurity' then 'Spot the phishing email'
    else 'Forces and motion basics'
  end,
  case s.slug
    when 'ai' then '{"type":"multiple_choice","prompt":"Machine learning is best described as:","options":["Rules written by hand for every case","Systems that improve from data","Only robots with arms","Magic"]}'::jsonb
    when 'cybersecurity' then '{"type":"multiple_choice","prompt":"Which sign suggests phishing?","options":["Email from your teacher on the school domain","Urgent link asking for your password","Homework posted in the LMS","Class reminder from LuminoLearn"]}'::jsonb
    else '{"type":"short_answer","prompt":"What unit measures force?"}'::jsonb
  end,
  case s.slug
    when 'ai' then '{"value":"Systems that improve from data"}'::jsonb
    when 'cybersecurity' then '{"value":"Urgent link asking for your password"}'::jsonb
    else '{"value":"newton"}'::jsonb
  end,
  'Great work reviewing this concept.',
  8
from public.levels l
join public.subjects s on s.id = l.subject_id
where l.tier = 'foundations'
and not exists (select 1 from public.practice_tasks pt where pt.level_id = l.id limit 1);

-- RLS (service role bypasses; app uses server-side checks + policies)
alter table public.audit_logs enable row level security;
alter table public.subjects enable row level security;
alter table public.levels enable row level security;
alter table public.subject_enrolments enable row level security;
alter table public.educator_students enable row level security;
alter table public.practice_tasks enable row level security;
alter table public.practice_assignments enable row level security;
alter table public.practice_submissions enable row level security;
alter table public.live_classes enable row level security;
alter table public.message_threads enable row level security;
alter table public.messages enable row level security;
alter table public.educator_notes enable row level security;
alter table public.student_educator_notes enable row level security;

create policy "subjects_read_all" on public.subjects for select using (true);
create policy "levels_read_all" on public.levels for select using (true);
create policy "practice_tasks_read" on public.practice_tasks for select using (true);

create policy "subject_enrolments_own" on public.subject_enrolments
  for select using (auth.uid() = student_id);
create policy "practice_assignments_own" on public.practice_assignments
  for select using (auth.uid() = student_id);
create policy "practice_submissions_own" on public.practice_submissions
  for all using (auth.uid() = student_id);
create policy "live_classes_student" on public.live_classes
  for select using (auth.uid() = student_id);
create policy "student_notes_read" on public.student_educator_notes
  for select using (auth.uid() = student_id);
