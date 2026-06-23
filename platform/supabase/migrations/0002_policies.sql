-- Additional RLS policies for teacher writes and profile creation

create policy "teachers insert lessons"
  on public.lessons for insert
  with check (
    exists(select 1 from public.profiles where id = auth.uid() and role in ('teacher', 'admin'))
  );

create policy "teachers read own created homework"
  on public.homework for select
  using (created_by = auth.uid() or exists(
    select 1 from public.enrollments e
    join public.lessons l on l.course_id = e.course_id
    where l.id = homework.lesson_id and e.student_id = auth.uid()
  ));

create policy "service role bypass" on public.profiles
  for all using (auth.role() = 'service_role');
