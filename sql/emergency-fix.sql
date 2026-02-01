-- =====================================================
-- EMERGENCY FIX: Disable RLS temporarily to test
-- This will let us see if RLS is the problem
-- =====================================================

-- Option 1: Completely disable RLS on users table (TEMPORARY)
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Option 2: Or keep RLS but make very simple policies
-- Uncomment these if you want to try this instead:

/*
-- Drop ALL policies
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;
DROP POLICY IF EXISTS "Admins can delete users" ON users;
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;

-- Create SIMPLE policy that allows all authenticated users
CREATE POLICY "Allow authenticated users full access" ON users
  FOR ALL
  USING (auth.role() = 'authenticated');
*/

-- Check current policies
SELECT tablename, policyname, cmd, qual
FROM pg_policies
WHERE tablename = 'users';
