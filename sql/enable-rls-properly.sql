-- =====================================================
-- Re-enable RLS with PROPER policies (no recursion!)
-- Run this before deploying to production
-- =====================================================

-- Enable RLS on both tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE houses ENABLE ROW LEVEL SECURITY;

-- Drop any existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON users;
DROP POLICY IF EXISTS "Users can update own profile" ON users;
DROP POLICY IF EXISTS "Admins can read all users" ON users;
DROP POLICY IF EXISTS "Admins can update users" ON users;
DROP POLICY IF EXISTS "Admins can delete users" ON users;
DROP POLICY IF EXISTS "Users can read own houses" ON houses;
DROP POLICY IF EXISTS "Admins can read all houses" ON houses;
DROP POLICY IF EXISTS "Admins can delete houses" ON houses;
DROP POLICY IF EXISTS "Admins can update houses" ON houses;

-- Create helper function to check admin status (NO RECURSION)
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN (
    SELECT is_admin
    FROM users
    WHERE id = auth.uid()::uuid
    LIMIT 1
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER STABLE;

-- USERS TABLE POLICIES
CREATE POLICY "Users can read own profile" ON users
  FOR SELECT
  USING (auth.uid()::uuid = id);

CREATE POLICY "Admins can read all users" ON users
  FOR SELECT
  USING (is_admin());

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE
  USING (auth.uid()::uuid = id);

CREATE POLICY "Admins can update users" ON users
  FOR UPDATE
  USING (is_admin());

CREATE POLICY "Admins can delete users" ON users
  FOR DELETE
  USING (is_admin());

-- HOUSES TABLE POLICIES
CREATE POLICY "Users can read own houses" ON houses
  FOR SELECT
  USING (
    user_1 = auth.uid()::uuid
    OR user_2 = auth.uid()::uuid
  );

CREATE POLICY "Admins can read all houses" ON houses
  FOR SELECT
  USING (
    user_1 = auth.uid()::uuid
    OR user_2 = auth.uid()::uuid
    OR is_admin()
  );

CREATE POLICY "Users can manage own houses" ON houses
  FOR ALL
  USING (
    user_1 = auth.uid()::uuid
    OR user_2 = auth.uid()::uuid
  );

CREATE POLICY "Admins can manage all houses" ON houses
  FOR ALL
  USING (is_admin());

-- Verify
SELECT 'RLS enabled with proper policies!' as status;
SELECT tablename, policyname FROM pg_policies WHERE tablename IN ('users', 'houses');
