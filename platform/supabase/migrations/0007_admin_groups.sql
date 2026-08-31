-- Student groups for small-group instruction (admin-managed)

create table if not exists public.student_groups (
  id          uuid primary key default gen_random_uuid(),
  name        text not null,
  educator_id uuid references public.profiles(id) on delete set null,
  subject_id  uuid references public.subjects(id) on delete set null,
  level_id    uuid references public.levels(id) on delete set null,
  format      class_format default 'group',
  max_size    int default 6 check (max_size >= 2 and max_size <= 12),
  notes       text,
  active      boolean default true,
  created_at  timestamptz default now()
);

create table if not exists public.student_group_members (
  group_id    uuid references public.student_groups(id) on delete cascade not null,
  student_id  uuid references public.profiles(id) on delete cascade not null,
  joined_at   timestamptz default now(),
  primary key (group_id, student_id)
);

create index if not exists student_group_members_student_idx on public.student_group_members(student_id);

alter table public.payments
  add column if not exists payment_method text default 'interac',
  add column if not exists notes text,
  add column if not exists recorded_by uuid references public.profiles(id) on delete set null;
