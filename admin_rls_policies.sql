-- =====================================================
-- Admin Panel RLS Policies
-- Run these commands in Supabase SQL Editor
-- =====================================================

-- Allow admins to read all users
CREATE POLICY "Admins can read all users" ON users FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

-- Allow admins to update users
CREATE POLICY "Admins can update users" ON users FOR UPDATE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

-- Allow admins to delete users
CREATE POLICY "Admins can delete users" ON users FOR DELETE USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

-- Allow admins to read all houses
CREATE POLICY "Admins can read all houses" ON houses FOR SELECT USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

-- Allow admins to manage houses (update, delete)
CREATE POLICY "Admins can manage houses" ON houses FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);

-- =====================================================
-- Set Admin Status for Your Account
-- REPLACE 'your-email@gmail.com' WITH YOUR EMAIL
-- =====================================================

UPDATE users SET is_admin = true WHERE email = 'your-email@gmail.com';

-- =====================================================
-- Verification Queries
-- Run these to verify the policies are working
-- =====================================================

-- Check if you're an admin
SELECT id, email, display_name, is_admin FROM users WHERE email = 'your-email@gmail.com';

-- List all existing policies on users table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'users' AND policyname LIKE '%Admin%';

-- List all existing policies on houses table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename = 'houses' AND policyname LIKE '%Admin%';
