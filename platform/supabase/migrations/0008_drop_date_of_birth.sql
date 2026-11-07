-- LuminoLearn no longer collects students' dates of birth.
-- Under-13 parental consent is decided by a yes/no question at signup instead.
-- Run this in the Supabase SQL editor once the updated platform code is deployed.

alter table public.profiles drop column if exists date_of_birth;
