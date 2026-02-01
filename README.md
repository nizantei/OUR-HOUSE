# Our House - Monorepo

A shared digital space for couples, built with React, Vite, and Supabase.

## 🚀 Quick Start

### Start the Apps

**Double-click these files:**
- `start-admin.bat` - Admin panel (http://localhost:5174)
- `start-main.bat` - Main app (http://localhost:5173)

**Or use commands:**
```bash
pnpm dev:admin    # Admin panel
pnpm dev:main     # Main app
```

### First Time Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Add Supabase credentials** to both:
   - `apps/main/.env.local`
   - `apps/admin/.env.local`

3. **Run SQL setup** in Supabase:
   - Open `sql/fix-rls-policies.sql`
   - Run in Supabase SQL Editor

4. **Start the admin panel:**
   ```bash
   pnpm dev:admin
   ```

📖 **Detailed setup:** See `docs/QUICK_START.md`

---

## 📁 Project Structure

```
OUR-HOUSE/
├── apps/
│   ├── main/           # Main user app
│   └── admin/          # Admin panel
├── packages/
│   └── shared/         # Shared code (types, Supabase client)
├── docs/               # All documentation
├── scripts/            # Additional start scripts
├── sql/                # Database setup files
├── README.md           # This file
├── start-admin.bat     # Quick start admin
└── start-main.bat      # Quick start main app
```

---

## 📚 Documentation

All guides are in the `docs/` folder:

- **`docs/QUICK_START.md`** - Fast setup guide
- **`docs/ADMIN_QUICK_START.md`** - Admin panel setup
- **`docs/ENV_SETUP_GUIDE.md`** - Environment variables
- **`docs/DEPLOYMENT_CHECKLIST.md`** - Deploy to Vercel
- **`docs/IMPLEMENTATION_SUMMARY.md`** - What was built

---

## 🗄️ SQL Files

Database setup files in `sql/` folder:

- **`sql/fix-rls-policies.sql`** - ⭐ Run this to fix infinite recursion
- `sql/supabase_schema.sql` - Full database schema
- `sql/supabase_admin_setup.sql` - Initial admin setup

---

## 🛠️ Development

### Install Dependencies
```bash
pnpm install
```

### Start Apps
```bash
pnpm dev:admin     # Admin panel (port 5174)
pnpm dev:main      # Main app (port 5173)
```

### Build
```bash
pnpm build:admin   # Build admin panel
pnpm build:main    # Build main app
pnpm build:all     # Build both
```

---

## 🎯 Apps Overview

### Main App (`apps/main`)
User-facing app for couples:
- Create/join shared house
- Access shared rooms
- Google OAuth authentication

### Admin Panel (`apps/admin`)
Management interface:
- View all users and houses
- Toggle admin privileges
- Delete users/houses
- Platform statistics

---

## 🔧 Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS
- **State:** Zustand
- **Database:** Supabase (PostgreSQL)
- **Auth:** Supabase Auth (Google OAuth)
- **Deployment:** Vercel

---

## 🚨 Troubleshooting

### White page / No data loading
- Make sure `.env.local` files have Supabase credentials
- See `docs/ENV_SETUP_GUIDE.md`

### Infinite recursion error
- Run `sql/fix-rls-policies.sql` in Supabase SQL Editor
- See `docs/FIX_INFINITE_RECURSION.md`

### Can't sign in
- Check Supabase OAuth is configured
- Make sure you ran the SQL setup

---

## 📝 Quick Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all dependencies |
| `pnpm dev:admin` | Start admin panel |
| `pnpm dev:main` | Start main app |
| `pnpm build:all` | Build both apps |

---

## 🔗 Links

- **GitHub:** https://github.com/nizantei/OUR-HOUSE
- **Supabase:** https://app.supabase.com
- **Documentation:** `docs/` folder

---

## 📦 Package Management

This is a pnpm workspace monorepo. To run commands in specific packages:

```bash
pnpm --filter @our-house/admin <command>
pnpm --filter @our-house/main <command>
pnpm --filter @our-house/shared <command>
```

---

## 🎉 Getting Help

1. Check `docs/QUICK_START.md` for setup
2. Check `docs/` folder for detailed guides
3. Check console errors for specific issues
4. Review `sql/fix-rls-policies.sql` for database issues

---

**Built with ❤️ for couples**
