# Deployment Checklist

## Prerequisites
- [ ] Supabase project is set up and running
- [ ] Google OAuth is configured in Supabase
- [ ] You have Vercel account access
- [ ] You have pnpm installed (`npm install -g pnpm`)

## Local Setup

### 1. Environment Variables
- [ ] Create `apps/main/.env.local` with:
  ```
  VITE_SUPABASE_URL=your_supabase_url
  VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
  ```
- [ ] Create `apps/admin/.env.local` with the same values

### 2. Database Setup
- [ ] Open Supabase SQL Editor
- [ ] Run all commands from `admin_rls_policies.sql`
- [ ] Replace `your-email@gmail.com` with your actual email
- [ ] Verify you're an admin: `SELECT * FROM users WHERE email = 'your@email.com';`

### 3. Local Testing
- [ ] Install dependencies: `pnpm install`
- [ ] Build main app: `pnpm build:main`
- [ ] Build admin app: `pnpm build:admin`
- [ ] Run main app: `pnpm dev:main` (http://localhost:5173)
- [ ] Run admin app: `pnpm dev:admin` (http://localhost:5174)
- [ ] Test main app login with Google
- [ ] Test admin app login with Google
- [ ] Verify admin dashboard shows correct stats
- [ ] Test toggling admin status on a test user
- [ ] Test viewing houses in admin panel

## Vercel Deployment

### Main App
- [ ] Go to https://vercel.com
- [ ] Click "New Project"
- [ ] Import your GitHub repository
- [ ] Configure project:
  - Project name: `our-house-main`
  - Root Directory: `apps/main`
  - Framework Preset: Vite
  - Build Command: `cd ../.. && pnpm install && pnpm build:main`
  - Output Directory: `dist`
- [ ] Add Environment Variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Test the deployed URL

### Admin Panel
- [ ] Create new Vercel project (same repo)
- [ ] Configure project:
  - Project name: `our-house-admin`
  - Root Directory: `apps/admin`
  - Framework Preset: Vite
  - Build Command: `cd ../.. && pnpm install && pnpm build:admin`
  - Output Directory: `dist`
- [ ] Add Environment Variables:
  - `VITE_SUPABASE_URL`
  - `VITE_SUPABASE_ANON_KEY`
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete
- [ ] Test the deployed URL

### Post-Deployment
- [ ] Update Google OAuth redirect URLs in Supabase:
  - Add main app URL: `https://your-main-app.vercel.app/auth/callback`
  - Add admin URL: `https://your-admin-app.vercel.app/auth/callback`
- [ ] Test Google login on deployed main app
- [ ] Test Google login on deployed admin panel
- [ ] Verify admin functions work in production

## Production Testing

### Main App
- [ ] Sign in with Google
- [ ] Create a new house
- [ ] Copy invitation code
- [ ] Sign in with another account
- [ ] Join house with invitation code
- [ ] Verify both users can access the house

### Admin Panel
- [ ] Sign in with admin account
- [ ] Check dashboard shows correct stats
- [ ] View users list
- [ ] Toggle admin status for a test user
- [ ] View houses list
- [ ] Verify user information displays correctly
- [ ] Test that non-admin users cannot access admin panel

## Troubleshooting

### Build Fails
- Check all environment variables are set correctly
- Verify pnpm is installed: `pnpm --version`
- Clear caches: `pnpm store prune`
- Reinstall: `rm -rf node_modules && pnpm install`

### Authentication Fails
- Verify redirect URLs in Supabase Google OAuth settings
- Check environment variables match Supabase project
- Ensure user has `is_admin = true` in database for admin panel

### Admin Panel Access Denied
- Verify your user account has `is_admin = true`
- Check RLS policies are created correctly
- Review Supabase logs for policy violations

### Deployment Issues
- Ensure root directory is set correctly (`apps/main` or `apps/admin`)
- Verify build command includes `cd ../..` to access workspace
- Check Vercel build logs for specific errors

## Quick Reference

### Development Commands
```bash
pnpm dev:main          # Start main app (port 5173)
pnpm dev:admin         # Start admin panel (port 5174)
pnpm build:main        # Build main app
pnpm build:admin       # Build admin panel
pnpm build:all         # Build both apps
```

### Important URLs
- Main App (local): http://localhost:5173
- Admin Panel (local): http://localhost:5174
- Supabase Dashboard: https://app.supabase.com
- Vercel Dashboard: https://vercel.com/dashboard

## Files Reference
- `ADMIN_SETUP.md` - Detailed setup guide
- `IMPLEMENTATION_SUMMARY.md` - What was implemented
- `admin_rls_policies.sql` - Database policies to run
- `DEPLOYMENT_CHECKLIST.md` - This file
