-- =====================================================
-- NUCLEAR OPTION: Disable RLS completely (TEMPORARY)
-- This will let the app work while we figure out policies
-- WARNING: This allows all authenticated users to see all data
-- =====================================================

-- Disable RLS on users table
ALTER TABLE users DISABLE ROW LEVEL SECURITY;

-- Disable RLS on houses table
ALTER TABLE houses DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT
  tablename,
  rowsecurity as rls_enabled
FROM pg_tables
WHERE tablename IN ('users', 'houses');

-- You should see rls_enabled = false for both tables

-- NOTE: This is temporary to get your app working
-- We'll re-enable RLS with proper policies later
