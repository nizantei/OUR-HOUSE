# Vercel Deployment Guide

## Issue Fixed
The ERR_INVALID_THIS error was caused by Vercel auto-detecting pnpm and trying to use it, but pnpm has compatibility issues with Vercel's build environment. We've configured the project to force npm usage instead.

## Changes Made
1. ✅ Updated `apps/main/vercel.json` to explicitly use npm
2. ✅ Created `apps/main/.npmrc` to disable pnpm detection
3. ✅ Changed workspace dependency from `workspace:*` to `file:../../packages/shared`
4. ✅ Created `.vercelignore` file

## Deploy Main App to Vercel

### Step 1: Vercel Project Settings
1. Go to your Vercel project dashboard
2. **Framework Preset**: Vite
3. **Root Directory**: Set to `apps/main` (IMPORTANT!)
4. **Build Command**: Leave as default (uses vercel.json)
5. **Output Directory**: Leave as default (uses vercel.json)
6. **Install Command**: Leave as default (uses vercel.json)

### Step 2: Environment Variables
Add these environment variables in Vercel dashboard (Settings → Environment Variables):

```bash
# Force npm usage (disable pnpm)
ENABLE_EXPERIMENTAL_COREPACK=0

# Supabase Configuration (get these from your Supabase project)
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### Step 3: Deploy
1. Push your changes to GitHub:
   ```bash
   git add .
   git commit -m "fix: Configure Vercel deployment to use npm instead of pnpm"
   git push
   ```

2. Vercel will automatically trigger a deployment
3. The build should now succeed using npm instead of pnpm

## Deploy Admin App to Vercel

Follow the same steps above but:
- Create a **separate** Vercel project for the admin app
- Set **Root Directory** to `apps/admin`
- Make similar changes to `apps/admin/package.json` and configuration files

## Troubleshooting

### If you still see pnpm errors:
1. Double-check that **Root Directory** in Vercel is set to `apps/main` (not the repo root)
2. Verify `ENABLE_EXPERIMENTAL_COREPACK=0` environment variable is set
3. Check that the build logs show `npm install` not `pnpm install`

### If you see module resolution errors:
1. Make sure the `@our-house/shared` package path is correct
2. The shared package should be at `../../packages/shared` relative to `apps/main`

### Local Development
Your local development setup with pnpm is unaffected. Continue using:
```bash
pnpm dev:main
pnpm dev:admin
```

## Verification
After deployment, check that:
- ✅ Build logs show "Running 'npm install'" instead of "pnpm install"
- ✅ No ERR_INVALID_THIS errors
- ✅ Build completes successfully
- ✅ App loads correctly with Supabase connection working
