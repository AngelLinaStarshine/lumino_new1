-- ════════════════════════════════════════════════════════════════
-- Create your first Luminolearn ADMIN user (run once in Supabase SQL Editor)
-- Replace the email, name, and password before running.
-- ════════════════════════════════════════════════════════════════

-- Step 1: Create auth user (Supabase Dashboard → Authentication → Users → Add user
--         is easier). If using SQL, use the Admin API or Dashboard instead.
--
-- Step 2: After the user exists in auth.users, set their profile role to admin:

-- UPDATE public.profiles
-- SET role = 'admin'
-- WHERE email = 'you@luminolearn.org';

-- Or insert profile if you created auth user manually:
-- INSERT INTO public.profiles (id, role, full_name, email)
-- SELECT id, 'admin', 'Your Name', email
-- FROM auth.users
-- WHERE email = 'you@luminolearn.org'
-- ON CONFLICT (id) DO UPDATE SET role = 'admin';
