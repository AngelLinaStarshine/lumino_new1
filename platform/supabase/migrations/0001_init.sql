-- ════════════════════════════════════════════════════════════════
-- LuminoLearn — Database Schema
-- Run this in Supabase SQL Editor to set up all tables + RLS.
-- ════════════════════════════════════════════════════════════════

-- ─── Enums ────────────────────────────────────────────────────
create type user_role     as enum ('student', 'parent', 'teacher', 'admin');
create type stage         as enum ('foundations', 'growth', 'mastery');
create type subject       as enum ('number_ninjas', 'word_wizards', 'code_explorers');
create type cycle_step    as enum ('discovery', 'lumino_start', 'lumino_core', 'lumino_path');
create type assessment_type as enum ('lumino_start', 'three_week', 'three_month');
create type hw_status     as enum ('assigned', 'in_progress', 'submitted', 'graded');
create type payment_status as enum ('pending', 'paid', 'failed', 'refunded');
create type sms_event     as enum (
  'homework_assigned', 'homework_submitted', 'feedback_posted',
  'payment_reminder', 'payment_overdue', 'class_starting',
  'pre_assessment_ready', 'evaluation_due'
);

-- ─── Profiles (extends auth.users) ────────────────────────────
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  role          user_role not null,
  full_name     text not null,
  email         text not null,
  phone         text,
  avatar_url    text,
  stage         stage,            -- only for students
  date_of_birth date,             -- only for students
  created_at    timestamptz default now(),
  updated_at    timestamptz default now()
);

-- ─── Family links (parent ↔ student) ──────────────────────────
create table public.family_links (
  id             uuid primary key default gen_random_uuid(),
  parent_id      uuid references public.profiles(id) on delete cascade,
  student_id     uuid references public.profiles(id) on delete cascade,
  passcode_hash  text not null,
  relationship   text default 'parent',
  created_at     timestamptz default now(),
  unique(parent_id, student_id)
);

-- ─── Courses ──────────────────────────────────────────────────
create table public.courses (
  id          uuid primary key default gen_random_uuid(),
  subject     subject not null,
  stage       stage not null,
  name        text not null,
  description text,
  created_at  timestamptz default now()
);

-- ─── Lessons ──────────────────────────────────────────────────
create table public.lessons (
  id           uuid primary key default gen_random_uuid(),
  course_id    uuid references public.courses(id) on delete cascade,
  week         int not null,
  title        text not null,
  chapters     jsonb default '[]'::jsonb,
  zoom_link    text,
  scheduled_at timestamptz,
  created_at   timestamptz default now()
);

-- ─── Enrollments ──────────────────────────────────────────────
create table public.enrollments (
  id             uuid primary key default gen_random_uuid(),
  student_id     uuid references public.profiles(id) on delete cascade,
  course_id      uuid references public.courses(id) on delete cascade,
  teacher_id     uuid references public.profiles(id) on delete set null,
  cycle          cycle_step default 'lumino_start',
  week_progress  int default 0,
  status         text default 'active',
  enrolled_at    timestamptz default now(),
  unique(student_id, course_id)
);

-- ─── Homework ─────────────────────────────────────────────────
create table public.homework (
  id                uuid primary key default gen_random_uuid(),
  lesson_id         uuid references public.lessons(id) on delete cascade,
  title             text not null,
  instructions      text,
  due_date          timestamptz not null,
  attachment_types  jsonb default '["pdf","document","image"]'::jsonb,
  allow_google_docs boolean default true,
  max_score         int default 100,
  created_by        uuid references public.profiles(id),
  created_at        timestamptz default now()
);

-- ─── Submissions ──────────────────────────────────────────────
create table public.submissions (
  id                  uuid primary key default gen_random_uuid(),
  homework_id         uuid references public.homework(id) on delete cascade,
  student_id          uuid references public.profiles(id) on delete cascade,
  file_url            text,
  google_doc_url      text,
  notes               text,
  submitted_at        timestamptz default now(),
  score               int,
  feedback            text,
  audio_feedback_url  text,
  graded_at           timestamptz,
  graded_by           uuid references public.profiles(id),
  status              hw_status default 'submitted',
  unique(homework_id, student_id)
);

-- ─── Assessments ──────────────────────────────────────────────
create table public.assessments (
  id              uuid primary key default gen_random_uuid(),
  student_id      uuid references public.profiles(id) on delete cascade,
  course_id       uuid references public.courses(id) on delete cascade,
  type            assessment_type not null,
  score           int not null,
  max_score       int default 100,
  baseline_score  int,
  notes           text,
  taken_at        timestamptz default now()
);

-- ─── Payments ─────────────────────────────────────────────────
create table public.payments (
  id                  uuid primary key default gen_random_uuid(),
  parent_id           uuid references public.profiles(id) on delete cascade,
  student_id          uuid references public.profiles(id) on delete cascade,
  amount_cents        int not null,
  currency            text default 'CAD',
  stripe_payment_id   text,
  status              payment_status default 'pending',
  invoice_url         text,
  description         text,
  due_date            date,
  paid_at             timestamptz,
  created_at          timestamptz default now()
);

-- ─── Notifications (in-app + log) ─────────────────────────────
create table public.notifications (
  id        uuid primary key default gen_random_uuid(),
  user_id   uuid references public.profiles(id) on delete cascade,
  type      text not null,
  channel   text not null,         -- in_app, email, sms
  title     text,
  message   text not null,
  link      text,
  read_at   timestamptz,
  sent_at   timestamptz default now()
);

-- ─── Notification preferences ─────────────────────────────────
create table public.notification_prefs (
  user_id          uuid primary key references public.profiles(id) on delete cascade,
  sms_homework     boolean default false,
  sms_class        boolean default false,
  sms_payment      boolean default true,
  sms_feedback     boolean default false,
  email_homework   boolean default true,
  email_class      boolean default true,
  email_payment    boolean default true,
  email_feedback   boolean default true,
  phone_verified   boolean default false,
  opted_in_at      timestamptz,
  updated_at       timestamptz default now()
);

-- ─── SMS log ──────────────────────────────────────────────────
create table public.sms_log (
  id             uuid primary key default gen_random_uuid(),
  user_id        uuid references public.profiles(id) on delete cascade,
  trigger_event  sms_event not null,
  message_body   text not null,
  twilio_sid     text,
  status         text default 'sent',
  error_message  text,
  sent_at        timestamptz default now()
);

-- ─── Schedule slots ───────────────────────────────────────────
create table public.schedule_slots (
  id            uuid primary key default gen_random_uuid(),
  course_id     uuid references public.courses(id) on delete cascade,
  teacher_id    uuid references public.profiles(id) on delete set null,
  day_of_week   int check (day_of_week between 0 and 6),
  start_time    time not null,
  end_time      time not null,
  zoom_link     text,
  recurring     boolean default true,
  active        boolean default true
);

-- ═══════════════════════════════════════════════════════════════
-- ROW LEVEL SECURITY
-- ═══════════════════════════════════════════════════════════════

alter table public.profiles            enable row level security;
alter table public.family_links        enable row level security;
alter table public.courses             enable row level security;
alter table public.lessons             enable row level security;
alter table public.enrollments         enable row level security;
alter table public.homework            enable row level security;
alter table public.submissions         enable row level security;
alter table public.assessments         enable row level security;
alter table public.payments            enable row level security;
alter table public.notifications       enable row level security;
alter table public.notification_prefs  enable row level security;
alter table public.sms_log             enable row level security;
alter table public.schedule_slots      enable row level security;

-- ─── Profiles: users see their own + linked family ────────────
create policy "users read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "parents read linked students"
  on public.profiles for select
  using (
    exists(select 1 from public.family_links
           where parent_id = auth.uid() and student_id = profiles.id)
  );

create policy "teachers read enrolled students"
  on public.profiles for select
  using (
    exists(select 1 from public.enrollments
           where teacher_id = auth.uid() and student_id = profiles.id)
  );

create policy "users update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- ─── Enrollments: students see own, parents see children's ────
create policy "students read own enrollments"
  on public.enrollments for select
  using (student_id = auth.uid());

create policy "parents read child enrollments"
  on public.enrollments for select
  using (
    exists(select 1 from public.family_links
           where parent_id = auth.uid() and student_id = enrollments.student_id)
  );

create policy "teachers read taught enrollments"
  on public.enrollments for select
  using (teacher_id = auth.uid());

-- ─── Homework: visible to enrolled students + their parents + teacher ──
create policy "students read assigned homework"
  on public.homework for select
  using (
    exists(
      select 1 from public.lessons l
      join public.enrollments e on e.course_id = l.course_id
      where l.id = homework.lesson_id and e.student_id = auth.uid()
    )
  );

create policy "parents read child homework"
  on public.homework for select
  using (
    exists(
      select 1 from public.lessons l
      join public.enrollments e on e.course_id = l.course_id
      join public.family_links f on f.student_id = e.student_id
      where l.id = homework.lesson_id and f.parent_id = auth.uid()
    )
  );

create policy "teachers manage own homework"
  on public.homework for all
  using (created_by = auth.uid());

-- ─── Submissions: students manage own, teachers grade ─────────
create policy "students manage own submissions"
  on public.submissions for all
  using (student_id = auth.uid());

create policy "parents read child submissions"
  on public.submissions for select
  using (
    exists(select 1 from public.family_links
           where parent_id = auth.uid() and student_id = submissions.student_id)
  );

create policy "teachers grade assigned submissions"
  on public.submissions for all
  using (
    exists(
      select 1 from public.homework h
      where h.id = submissions.homework_id and h.created_by = auth.uid()
    )
  );

-- ─── Payments: parents only ───────────────────────────────────
create policy "parents read own payments"
  on public.payments for select
  using (parent_id = auth.uid());

-- ─── Notifications: own only ──────────────────────────────────
create policy "users read own notifications"
  on public.notifications for all
  using (user_id = auth.uid());

create policy "users manage own prefs"
  on public.notification_prefs for all
  using (user_id = auth.uid());

create policy "users read own sms log"
  on public.sms_log for select
  using (user_id = auth.uid());

-- ─── Courses, lessons, schedule: public read ──────────────────
create policy "anyone reads courses"  on public.courses        for select using (true);
create policy "anyone reads lessons"  on public.lessons        for select using (true);
create policy "anyone reads schedule" on public.schedule_slots for select using (true);
create policy "anyone reads assessments_own"
  on public.assessments for select
  using (
    student_id = auth.uid()
    or exists(select 1 from public.family_links
              where parent_id = auth.uid() and student_id = assessments.student_id)
    or exists(select 1 from public.enrollments
              where teacher_id = auth.uid() and student_id = assessments.student_id)
  );

-- ═══════════════════════════════════════════════════════════════
-- Storage bucket for homework submissions
-- ═══════════════════════════════════════════════════════════════
insert into storage.buckets (id, name, public)
values ('homework-submissions', 'homework-submissions', false)
on conflict do nothing;

create policy "students upload to own folder"
  on storage.objects for insert
  with check (
    bucket_id = 'homework-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

create policy "students read own submissions"
  on storage.objects for select
  using (
    bucket_id = 'homework-submissions'
    and (storage.foldername(name))[1] = auth.uid()::text
  );
