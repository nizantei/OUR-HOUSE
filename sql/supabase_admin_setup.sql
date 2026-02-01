-- =====================================================
-- STEP 1: Create RLS Policies for Admin Access
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
-- STEP 2: Auto-grant Admin to Your Email
-- (This will only work AFTER you sign in for the first time)
-- =====================================================

-- Set admin flag for nizantei@gmail.com
-- Note: This will only work after the user exists (after first Google sign-in)
UPDATE users SET is_admin = true WHERE email = 'nizantei@gmail.com';

-- Create a function to automatically make your email an admin on sign-up
CREATE OR REPLACE FUNCTION auto_grant_admin()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.email = 'nizantei@gmail.com' THEN
    NEW.is_admin := true;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create a trigger to run this function on INSERT
DROP TRIGGER IF EXISTS auto_grant_admin_trigger ON users;
CREATE TRIGGER auto_grant_admin_trigger
  BEFORE INSERT ON users
  FOR EACH ROW
  EXECUTE FUNCTION auto_grant_admin();

-- =====================================================
-- VERIFICATION QUERIES
-- =====================================================

-- Check if you're an admin (run this after signing in)
SELECT id, email, display_name, is_admin, created_at
FROM users
WHERE email = 'nizantei@gmail.com';

-- List all admin users
SELECT email, display_name, is_admin
FROM users
WHERE is_admin = true;

-- Check if policies were created
SELECT schemaname, tablename, policyname
FROM pg_policies
WHERE tablename IN ('users', 'houses')
  AND policyname LIKE '%Admin%';
