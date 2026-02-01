-- =====================================================
-- PROPER FIX: Use SECURITY DEFINER function to check admin
-- This bypasses RLS when checking admin status
-- =====================================================

-- Step 1: Create a function that checks if current user is admin
-- SECURITY DEFINER means it runs with owner privileges, bypassing RLS
CREATE OR REPLACE FUNCTION is_current_user_admin()
RETURNS BOOLEAN AS $$
DECLARE
  user_is_admin BOOLEAN;
BEGIN
  SELECT is_admin INTO user_is_admin
  FROM users
  WHERE id = auth.uid()::uuid;

  RETURN COALESCE(user_is_admin, false);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Step 2: Drop ALL existing policies on users table
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;
DROP POLICY IF EXISTS "Admins can delete users" ON users;
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Allow authenticated users full access" ON users;

-- Step 3: Create new policies using the function (NO RECURSION!)

-- Users can always read their own profile
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT
  USING (auth.uid()::uuid = id);

-- Admins can read all users (uses function, no recursion!)
CREATE POLICY "Admins can read all users" ON users
  FOR SELECT
  USING (is_current_user_admin() = true);

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE
  USING (auth.uid()::uuid = id);

-- Admins can update any user
CREATE POLICY "Admins can update users" ON users
  FOR UPDATE
  USING (is_current_user_admin() = true);

-- Admins can delete users
CREATE POLICY "Admins can delete users" ON users
  FOR DELETE
  USING (is_current_user_admin() = true);

-- Step 4: Make sure nizantei@gmail.com is admin
UPDATE users SET is_admin = true WHERE email = 'nizantei@gmail.com';

-- Step 5: Verify
SELECT 'Policies created successfully!' as status;
SELECT policyname FROM pg_policies WHERE tablename = 'users';
