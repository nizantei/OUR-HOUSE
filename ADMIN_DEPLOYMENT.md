# Admin App Deployment Guide for Vercel

## Overview
The admin app is ready for deployment with the same configuration as the main app. You'll deploy it as a **separate Vercel project**.

## Step-by-Step Deployment

### 1. Create New Vercel Project

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"Add New Project"**
3. Select your **OUR-HOUSE** repository (same repo as main app)
4. Give it a name like `our-house-admin`

### 2. Configure Build Settings

In the project configuration screen:

**Framework Preset**: `Vite`

**Root Directory**: Click "Edit" and set to: `apps/admin`
- ⚠️ **CRITICAL**: Must be `apps/admin`, not the repo root!

**Build Command**: Leave as default (uses vercel.json)

**Output Directory**: Leave as default (uses vercel.json)

**Install Command**: Leave as default (uses vercel.json)

### 3. Environment Variables

Add these in the Vercel project settings:

```bash
# Force npm usage (disable pnpm)
ENABLE_EXPERIMENTAL_COREPACK=0

# Supabase Configuration
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**Note**: Use the **same** Supabase credentials as the main app (same database)

### 4. Deploy

Click **"Deploy"** and Vercel will:
1. ✅ Install shared package dependencies
2. ✅ Install admin app dependencies with npm
3. ✅ Build the admin app
4. ✅ Deploy to production

## Expected Build Output

The build logs should show:

```
Running "install" command: `cd ../../packages/shared && npm install && cd ../../apps/admin && npm install --legacy-peer-deps`
```

Then:

```
> @our-house/admin@0.0.0 build
> tsc -b && vite build

✓ built in ~3s
```

## Domain Setup (Optional)

After deployment, you can:
1. Use the Vercel-provided URL (e.g., `our-house-admin.vercel.app`)
2. Or set up a custom domain in Vercel project settings

### Recommended Domain Structure:
- Main app: `yourhouse.com` or `app.yourhouse.com`
- Admin app: `admin.yourhouse.com`

## Verification Checklist

After deployment, verify:

- ✅ Build completes without errors
- ✅ Admin app loads at the Vercel URL
- ✅ Can access the login page
- ✅ Supabase connection works (check browser console for errors)
- ✅ Can authenticate with admin credentials

## Differences Between Main and Admin Apps

Both apps:
- Share the same Supabase database
- Share the same `@our-house/shared` package
- Use the same environment variables (Supabase URL/key)

Key differences:
- Different UIs and features
- Different routing
- Separate deployments (different domains)

## Troubleshooting

### If deployment fails:
1. Check that **Root Directory** is set to `apps/admin` (not `apps/main` or repo root)
2. Verify `ENABLE_EXPERIMENTAL_COREPACK=0` environment variable is set
3. Ensure Supabase environment variables are configured

### If build succeeds but app doesn't work:
1. Check browser console for errors
2. Verify Supabase credentials are correct
3. Check that database RLS policies allow admin access

## Next Steps

After successful deployment:
1. Test admin login
2. Verify all admin features work
3. Set up custom domain (if needed)
4. Configure production settings in Supabase (allowed redirect URLs, etc.)
