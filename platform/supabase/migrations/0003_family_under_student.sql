-- Family passcode lives on the student account (no separate parent login)
-- Students can read tuition payments linked to their profile

create policy "students read own tuition payments"
  on public.payments for select
  using (student_id = auth.uid());

-- Students can read their family passcode row (hash only used server-side via API)
create policy "students read own family link"
  on public.family_links for select
  using (student_id = auth.uid());
