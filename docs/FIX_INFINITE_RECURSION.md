# 🔧 Fix: Infinite Recursion Error

## The Problem

The error `"infinite recursion detected in policy for relation 'users'"` means the database security policies are checking themselves in a loop.

**Bad Policy (Causes Recursion):**
```sql
-- This checks the users table...
CREATE POLICY "Admins can read all users" ON users FOR SELECT USING (
  -- ...which triggers this policy again! Infinite loop!
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);
```

## The Fix

I've created corrected policies in `fix-rls-policies.sql` that:
1. Allow users to read their own profile first (breaks the recursion)
2. Then allow admins to read all users

---

## How to Fix (2 minutes)

### Step 1: Run the Fix SQL

1. Go to: **https://app.supabase.com**
2. Select your project
3. Click **"SQL Editor"** (left sidebar)
4. Click **"New Query"**
5. Open `fix-rls-policies.sql` from this project
6. Copy **ALL** the contents
7. Paste into SQL Editor
8. Click **"Run"** (or Ctrl+Enter)

### Step 2: Restart the App

1. Close the terminal (Ctrl+C)
2. Double-click `start-admin.bat` again
3. The error should be gone! ✅

---

## What The Fix Does

✅ Drops the broken policies
✅ Creates new policies that don't recurse
✅ Keeps your admin trigger
✅ Sets nizantei@gmail.com as admin

---

## Quick Test

After running the SQL and restarting:
1. The app should load without errors
2. You should see the login button
3. Click "Sign in with Google"
4. Sign in with nizantei@gmail.com
5. You're in! 🎉

---

## Technical Explanation

**Before (Broken):**
- Policy checks users table for admin status
- Checking users table triggers the policy
- Policy checks users table again...
- **Infinite recursion!**

**After (Fixed):**
- Users can always read their own record (no policy check)
- Admin check uses the "read own record" policy first
- Then checks admin status
- **No recursion!**
