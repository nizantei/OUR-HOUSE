# 🔧 Environment Setup Guide

## Why You See White Pages

The apps need your **Supabase credentials** to connect to your database. Without them, the apps can't load.

---

## Quick Fix (5 minutes)

### Step 1: Get Your Supabase Credentials

1. Go to: **https://app.supabase.com**
2. Click on your **"Our House"** project (or whatever you named it)
3. Click the **⚙️ Settings** icon in the left sidebar
4. Click **"API"** in the settings menu
5. You'll see two values:
   - **Project URL** (looks like: `https://abcdefg.supabase.co`)
   - **anon public key** (long string starting with `eyJhbG...`)

**Copy both of these!**

### Step 2: Add Credentials to Both Apps

#### Option A: Use the Setup Script (Easiest)
1. Double-click `setup-env.bat`
2. It will open both `.env.local` files in Notepad
3. Replace the placeholder values with your real credentials
4. Save both files (Ctrl+S)

#### Option B: Manual Edit
Open these two files:
- `apps/main/.env.local`
- `apps/admin/.env.local`

Replace these lines in **BOTH files**:
```env
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

With your real values:
```env
VITE_SUPABASE_URL=https://abcdefg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...
```

### Step 3: Restart the Apps

1. Close any running terminal windows (Ctrl+C)
2. Double-click `start-admin.bat` again
3. Browser will auto-open at http://localhost:5174
4. The app should load now! 🎉

---

## Visual Guide

```
Supabase Dashboard
└── Your Project
    └── ⚙️ Settings (left sidebar)
        └── API
            ├── 📋 Project URL ← Copy this
            └── 📋 anon public key ← Copy this
```

---

## Example .env.local File

```env
# ✅ CORRECT (with real values)
VITE_SUPABASE_URL=https://xyzabcdefgh.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFz...

# ❌ WRONG (with placeholder values)
VITE_SUPABASE_URL=your_supabase_project_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

---

## Troubleshooting

### Still seeing white page?
- Make sure you saved both `.env.local` files
- Make sure you updated **both** apps/main and apps/admin
- Completely close and restart the app (don't just refresh)

### "Cannot find .env.local"?
- The files are at:
  - `C:\Users\nitsa\OneDrive\Desktop\OUR HOUSE\apps\main\.env.local`
  - `C:\Users\nitsa\OneDrive\Desktop\OUR HOUSE\apps\admin\.env.local`
- Run `setup-env.bat` to create them

### Wrong credentials?
- Double-check you copied the full strings (they're long!)
- No spaces before or after the values
- No quotes around the values

---

## Quick Links

- **Get Credentials**: https://app.supabase.com → Your Project → Settings → API
- **Edit Main App**: `apps/main/.env.local`
- **Edit Admin App**: `apps/admin/.env.local`
- **Setup Helper**: Double-click `setup-env.bat`

---

## After Setup

Once you add the credentials and restart:
1. Browser opens automatically
2. You see the login page
3. Click "Sign in with Google"
4. Use nizantei@gmail.com
5. You're in! 🎉
