# Admin Quick Start Guide

## Understanding Authentication

**Important**: This app uses **Google OAuth** for authentication. There are no usernames/passwords to create manually.

- Users sign in with their Google account
- Supabase automatically creates their account
- We then mark specific users as "admin" in the database

## Step-by-Step Setup

### Step 1: Run SQL in Supabase (5 minutes)

1. Go to https://app.supabase.com
2. Select your project
3. Click **"SQL Editor"** in the left sidebar
4. Click **"New Query"**
5. Open the file `supabase_admin_setup.sql` from this project
6. Copy ALL the contents
7. Paste into the SQL Editor
8. Click **"Run"** (or press Ctrl+Enter)

**What this does:**
- ✅ Creates security policies that allow admins to manage users/houses
- ✅ Sets up automatic admin grant for nizantei@gmail.com
- ✅ Creates a trigger that makes you admin when you first sign in

### Step 2: Sign In With Google (First Time)

1. Start the main app locally:
   ```bash
   pnpm dev:main
   ```
2. Go to http://localhost:5173
3. Click "Sign in with Google"
4. **Use your Google account: nizantei@gmail.com**
5. Allow the app access

**What happens:**
- Supabase creates your user account
- The trigger automatically sets `is_admin = true` for your email
- You're now an admin!

### Step 3: Access Admin Panel

1. Start the admin app:
   ```bash
   pnpm dev:admin
   ```
2. Go to http://localhost:5174
3. Click "Sign in with Google"
4. Sign in with the same Google account (nizantei@gmail.com)
5. You should see the admin dashboard!

## Troubleshooting

### "Access Denied" in Admin Panel

**Cause**: The SQL wasn't run, or you signed in before running the SQL.

**Fix**:
1. Make sure you ran `supabase_admin_setup.sql` in Supabase
2. Run this query in Supabase SQL Editor to manually set admin:
   ```sql
   UPDATE users SET is_admin = true WHERE email = 'nizantei@gmail.com';
   ```
3. Sign out and sign back in

### Verify You're an Admin

Run this in Supabase SQL Editor:
```sql
SELECT email, display_name, is_admin
FROM users
WHERE email = 'nizantei@gmail.com';
```

You should see `is_admin: true`

## Adding More Admins Later

To make another user an admin:

1. They must sign in with Google first (so their account exists)
2. Go to Supabase SQL Editor
3. Run:
   ```sql
   UPDATE users SET is_admin = true WHERE email = 'their-email@gmail.com';
   ```

Or use the admin panel to toggle their admin status!

## Summary

1. ✅ Run `supabase_admin_setup.sql` in Supabase SQL Editor
2. ✅ Sign in to main app with Google (nizantei@gmail.com)
3. ✅ Sign in to admin panel with Google
4. ✅ You're an admin!

No passwords needed - Google handles authentication! 🎉
