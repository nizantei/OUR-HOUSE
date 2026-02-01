# Admin Panel Setup Guide

## Overview

The monorepo has been successfully set up with:
- **Main App** (`apps/main`): The existing "Our House" app for regular users
- **Admin Panel** (`apps/admin`): New admin interface for managing users and houses
- **Shared Package** (`packages/shared`): Common code (types, Supabase client)

## Directory Structure

```
OUR HOUSE/
├── apps/
│   ├── main/                    # Main user app
│   │   ├── src/
│   │   ├── package.json         # @our-house/main
│   │   ├── vite.config.ts
│   │   ├── vercel.json
│   │   └── .env.local           # Supabase credentials
│   │
│   └── admin/                   # Admin panel
│       ├── src/
│       │   ├── pages/
│       │   │   ├── AdminLogin.tsx
│       │   │   ├── Dashboard.tsx
│       │   │   ├── UsersManagement.tsx
│       │   │   └── HousesManagement.tsx
│       │   ├── components/
│       │   │   └── AdminLayout.tsx
│       │   ├── hooks/
│       │   │   ├── useAdminAuth.ts
│       │   │   └── useUsers.ts
│       │   └── App.tsx
│       ├── package.json         # @our-house/admin
│       ├── vite.config.ts
│       ├── vercel.json
│       └── .env.local           # Supabase credentials
│
├── packages/
│   └── shared/                  # Shared code
│       ├── src/
│       │   ├── lib/
│       │   │   └── supabase.ts
│       │   ├── types/
│       │   │   └── database.ts
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── pnpm-workspace.yaml
├── package.json                 # Root package.json
└── supabase_schema.sql
```

## Step 1: Environment Variables

Create `.env.local` files in both `apps/main` and `apps/admin` with your Supabase credentials:

```bash
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 2: Database Setup - Admin RLS Policies

Run these SQL commands in your Supabase SQL Editor to enable admin access:

```sql
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

-- Allow admins to manage houses
CREATE POLICY "Admins can manage houses" ON houses FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid()::uuid AND is_admin = true)
);
```

## Step 3: Set Your Account as Admin

Replace `your-email@gmail.com` with your email address:

```sql
UPDATE users SET is_admin = true WHERE email = 'your-email@gmail.com';
```

## Step 4: Local Development

### Start Main App
```bash
pnpm dev:main
```
Runs on http://localhost:5173

### Start Admin Panel
```bash
pnpm dev:admin
```
Runs on http://localhost:5174

### Build Both Apps
```bash
pnpm build:all
```

## Step 5: Vercel Deployment

### Deploy Main App

1. Go to [Vercel](https://vercel.com)
2. Create new project from your GitHub repository
3. Configure:
   - **Project name**: `our-house-main`
   - **Root directory**: `apps/main`
   - **Framework**: Vite
   - **Build command**: `cd ../.. && pnpm install && pnpm build:main`
   - **Output directory**: `dist`
4. Add environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase URL
   - `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key
5. Deploy

### Deploy Admin Panel

1. Create another Vercel project from the same repository
2. Configure:
   - **Project name**: `our-house-admin`
   - **Root directory**: `apps/admin`
   - **Framework**: Vite
   - **Build command**: `cd ../.. && pnpm install && pnpm build:admin`
   - **Output directory**: `dist`
3. Add the same environment variables
4. Deploy

## Admin Panel Features

### Dashboard
- Total users count
- Total houses count
- New users in last 7 days

### User Management
- View all users (email, name, admin status, created date)
- Toggle admin status for users
- Delete users (cascades to houses and all data)

### House Management
- View all houses with user relationships
- See invitation status
- Delete houses (cascades to all rooms and data)

## Security Notes

- Admin access is enforced at the database level via RLS policies
- The admin panel only has access to user/house metadata
- No access to room content (sticky notes, photos, presents, etc.)
- Non-admin users are redirected to login page

## Scripts Reference

```bash
# Development
pnpm dev:main          # Start main app
pnpm dev:admin         # Start admin panel

# Building
pnpm build:main        # Build main app
pnpm build:admin       # Build admin panel
pnpm build:all         # Build all apps

# Working with packages
pnpm install           # Install all dependencies
pnpm --filter @our-house/main <command>    # Run command in main app
pnpm --filter @our-house/admin <command>   # Run command in admin app
```

## Troubleshooting

### Build Errors
- Make sure you've run `pnpm install` in the root directory
- Check that all environment variables are set correctly
- Verify TypeScript has no errors: `pnpm --filter @our-house/main lint`

### Authentication Issues
- Ensure your account has `is_admin = true` in the database
- Check that the redirect URL in Google OAuth settings includes `/auth/callback`
- Verify Supabase credentials are correct in `.env.local`

### RLS Policy Issues
- Make sure all admin policies are created in Supabase
- Verify your user ID matches the one in the database
- Check the Supabase logs for policy violations

## Next Steps

1. ✅ Monorepo structure set up
2. ✅ Shared package created
3. ✅ Admin panel implemented
4. ⏳ Set up environment variables
5. ⏳ Apply database RLS policies
6. ⏳ Set admin status for your account
7. ⏳ Deploy to Vercel

## Support

For issues or questions about the admin panel implementation, refer to:
- `/apps/admin/src/` - Admin panel source code
- `/packages/shared/src/` - Shared types and utilities
- This guide for setup instructions
