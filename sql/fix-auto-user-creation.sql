-- =====================================================
-- FIX: Auto-create users in users table when they sign up
-- This trigger runs whenever someone signs up with Google
-- =====================================================

-- Create or replace the trigger function
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  -- Insert into public.users table
  INSERT INTO public.users (id, google_id, email, display_name, profile_picture, is_admin, created_at, last_active)
  VALUES (
    NEW.id,
    NEW.raw_user_meta_data->>'sub',
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url',
    CASE WHEN NEW.email = 'nizantei@gmail.com' THEN true ELSE false END,  -- Auto-admin for your email
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    last_active = NOW(),
    email = EXCLUDED.email,
    display_name = COALESCE(EXCLUDED.display_name, public.users.display_name),
    profile_picture = COALESCE(EXCLUDED.profile_picture, public.users.profile_picture);

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Drop existing trigger if it exists
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Create the trigger
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Test: This should show the trigger exists
SELECT
  trigger_name,
  event_manipulation,
  event_object_table,
  action_statement
FROM information_schema.triggers
WHERE trigger_name = 'on_auth_user_created';
