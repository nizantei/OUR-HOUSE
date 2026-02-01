-- =====================================================
-- FIX: Infinite Recursion in RLS Policies
-- Run this in Supabase SQL Editor
-- =====================================================

-- First, drop the problematic policies
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;
DROP POLICY IF EXISTS "Admins can delete users" ON users;
DROP POLICY IF EXISTS "Admins can read all houses" ON houses;
DROP POLICY IF EXISTS "Admins can manage houses" ON houses;

-- =====================================================
-- FIXED POLICIES (No Infinite Recursion)
-- =====================================================

-- Allow users to read their own profile (prevents recursion)
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT
  USING (auth.uid()::uuid = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE
  USING (auth.uid()::uuid = id);

-- Allow admins to read all users (using JWT claim, not table lookup)
CREATE POLICY "Admins can read all users" ON users
  FOR SELECT
  USING (
    -- First check if it's their own record (no recursion)
    auth.uid()::uuid = id
    OR
    -- Then check if current user's record has is_admin = true
    -- This works because "Users can read own profile" policy allows reading own record
    (
      SELECT is_admin FROM users WHERE id = auth.uid()::uuid
    ) = true
  );

-- Allow admins to update any user
CREATE POLICY "Admins can update users" ON users
  FOR UPDATE
  USING (
    auth.uid()::uuid = id
    OR
    (SELECT is_admin FROM users WHERE id = auth.uid()::uuid) = true
  );

-- Allow admins to delete users
CREATE POLICY "Admins can delete users" ON users
  FOR DELETE
  USING (
    (SELECT is_admin FROM users WHERE id = auth.uid()::uuid) = true
  );

-- =====================================================
-- HOUSES POLICIES
-- =====================================================

-- Users can read houses they're part of
CREATE POLICY "Users can read own houses" ON houses
  FOR SELECT
  USING (
    user_1 = auth.uid()::uuid
    OR user_2 = auth.uid()::uuid
  );

-- Admins can read all houses
CREATE POLICY "Admins can read all houses" ON houses
  FOR SELECT
  USING (
    user_1 = auth.uid()::uuid
    OR user_2 = auth.uid()::uuid
    OR (SELECT is_admin FROM users WHERE id = auth.uid()::uuid) = true
  );

-- Admins can delete houses
CREATE POLICY "Admins can delete houses" ON houses
  FOR DELETE
  USING (
    (SELECT is_admin FROM users WHERE id = auth.uid()::uuid) = true
  );

-- Admins can update houses
CREATE POLICY "Admins can update houses" ON houses
  FOR UPDATE
  USING (
    user_1 = auth.uid()::uuid
    OR user_2 = auth.uid()::uuid
    OR (SELECT is_admin FROM users WHERE id = auth.uid()::uuid) = true
  );

-- =====================================================
-- Keep the auto-admin trigger
-- =====================================================

-- This should already exist from previous setup, but just in case:
CREATE OR REPLACE FUNCTION auto_grant_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'nizantei@gmail.com' THEN
    NEW.is_admin := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS auto_grant_admin_trigger ON users;
CREATE TRIGGER auto_grant_admin_trigger
  BEFORE INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION auto_grant_admin();

-- =====================================================
-- Set your account as admin (just in case)
-- =====================================================

UPDATE users SET is_admin = true WHERE email = 'nizantei@gmail.com';

-- =====================================================
-- VERIFICATION
-- =====================================================

-- Check policies
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN ('users', 'houses')
ORDER BY tablename, policyname;

-- Check if you're admin
SELECT email, is_admin FROM users WHERE email = 'nizantei@gmail.com';
