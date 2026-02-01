# Our House - Monorepo

A shared digital space for couples, built with React, Vite, and Supabase.

## Structure

This is a **pnpm workspace monorepo** containing:

- **Main App** (`apps/main`) - The "Our House" app for regular users
- **Admin Panel** (`apps/admin`) - Admin interface for managing users and houses
- **Shared Package** (`packages/shared`) - Common types and utilities

## Quick Start

### Prerequisites
- Node.js 18+
- pnpm (`npm install -g pnpm`)
- Supabase account
- Vercel account (for deployment)

### Installation
```bash
pnpm install
```

### Development

**Quick Start (Windows):**
- Double-click `start-admin.bat` - Start admin panel only
- Double-click `start-main.bat` - Start main app only
- Double-click `start-both.bat` - Start both apps
- Double-click `START.bat` - Menu to choose

**Command Line:**
```bash
# Start main app (http://localhost:5173)
pnpm dev:main

# Start admin panel (http://localhost:5174)
pnpm dev:admin
```

### Building
```bash
# Build main app
pnpm build:main

# Build admin panel
pnpm build:admin

# Build all
pnpm build:all
```

## Documentation

- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Step-by-step deployment guide
- **[ADMIN_SETUP.md](./ADMIN_SETUP.md)** - Detailed admin panel setup
- **[IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)** - What was implemented
- **[admin_rls_policies.sql](./admin_rls_policies.sql)** - Database policies to apply

## Setup Guide

### 1. Environment Variables
Create `.env.local` in both `apps/main` and `apps/admin`:
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Setup
Run the SQL commands in `admin_rls_policies.sql` in your Supabase SQL Editor.

### 3. Set Admin Status
```sql
UPDATE users SET is_admin = true WHERE email = 'your-email@gmail.com';
```

### 4. Deploy
Follow the steps in [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)

## Apps

### Main App (`apps/main`)
The primary user-facing application where couples can:
- Create or join a shared house
- Access shared rooms (Living Room, Kitchen, Garden, Gallery, Bedroom, Private Rooms)
- Interact with shared content

**Tech Stack:**
- React 19
- Vite 7
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Supabase (auth + database)

### Admin Panel (`apps/admin`)
Administrative interface for managing the platform:
- View all users and houses
- Toggle admin privileges
- Delete users/houses
- View platform statistics

**Tech Stack:**
- React 19
- Vite 7
- TypeScript
- Tailwind CSS
- Zustand (state management)
- Supabase (auth + database)

**Security:**
- Access controlled via `is_admin` flag in database
- RLS policies enforce permissions
- Metadata-only access (no room content)

## Shared Package (`packages/shared`)

Common code shared between apps:
- Database types (`User`, `House`, etc.)
- Supabase client configuration
- Utility functions

## Available Scripts

```bash
# Development
pnpm dev:main          # Start main app
pnpm dev:admin         # Start admin panel

# Building
pnpm build:main        # Build main app
pnpm build:admin       # Build admin panel
pnpm build:all         # Build all apps

# Filtering commands to specific packages
pnpm --filter @our-house/main <command>
pnpm --filter @our-house/admin <command>
pnpm --filter @our-house/shared <command>
```

## Project Architecture

```
OUR HOUSE/
├── apps/
│   ├── main/                    # Main user app
│   │   ├── src/
│   │   ├── package.json
│   │   └── vercel.json
│   │
│   └── admin/                   # Admin panel
│       ├── src/
│       ├── package.json
│       └── vercel.json
│
├── packages/
│   └── shared/                  # Shared code
│       ├── src/
│       │   ├── lib/
│       │   └── types/
│       └── package.json
│
├── pnpm-workspace.yaml          # Workspace config
├── package.json                 # Root package
└── admin_rls_policies.sql       # Database policies
```

## Deployment

Both apps are configured for Vercel deployment:

### Main App
- Root directory: `apps/main`
- Build command: `cd ../.. && pnpm install && pnpm build:main`
- Output directory: `dist`

### Admin Panel
- Root directory: `apps/admin`
- Build command: `cd ../.. && pnpm install && pnpm build:admin`
- Output directory: `dist`

See [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) for detailed deployment steps.

## Environment Variables

Both apps require:
- `VITE_SUPABASE_URL` - Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY` - Your Supabase anonymous key

## Database Schema

The app uses Supabase with PostgreSQL. Schema defined in `supabase_schema.sql`.

Key tables:
- `users` - User accounts
- `houses` - Shared houses
- `living_rooms`, `kitchens`, `gardens`, `galleries`, `bedrooms`, `private_rooms` - Room types
- Content tables for each room type

## Admin Features

The admin panel provides:
- **Dashboard**: Platform statistics (total users, houses, recent signups)
- **User Management**: View, edit admin status, delete users
- **House Management**: View houses with user relationships, delete houses

## Security

- Authentication via Supabase Auth (Google OAuth)
- Row Level Security (RLS) policies enforce permissions
- Admin access verified at database level
- Separate deployments for main and admin apps
- Admin panel has no access to user content (only metadata)

## Contributing

This is a personal project for couples. Not accepting external contributions.

## License

Private - All rights reserved

## Support

For setup help, refer to:
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)
- [ADMIN_SETUP.md](./ADMIN_SETUP.md)
- [IMPLEMENTATION_SUMMARY.md](./IMPLEMENTATION_SUMMARY.md)
