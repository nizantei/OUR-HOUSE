# 🚀 Quick Start Guide

## Fastest Way to Start (Windows)

### Start Admin Panel
**Double-click:** `start-admin.bat`
- Opens at: http://localhost:5174
- Sign in with Google (nizantei@gmail.com)

### Start Main App
**Double-click:** `start-main.bat`
- Opens at: http://localhost:5173
- Sign in with Google

### Start Both Apps
**Double-click:** `start-both.bat`
- Opens two terminal windows
- Main: http://localhost:5173
- Admin: http://localhost:5174

### Menu (Choose What to Start)
**Double-click:** `START.bat`
- Shows menu to select which app to start

---

## Command Line (Alternative)

```bash
# Admin panel
pnpm dev:admin

# Main app
pnpm dev:main
```

---

## First Time Setup Checklist

Before starting, make sure you've done:

- [x] Run `supabase_admin_setup.sql` in Supabase SQL Editor
- [ ] Create `.env.local` files (if deploying)

---

## URLs

- **Main App**: http://localhost:5173
- **Admin Panel**: http://localhost:5174

---

## Admin Access

1. Start admin panel: Double-click `start-admin.bat`
2. Go to: http://localhost:5174
3. Click "Sign in with Google"
4. Use: nizantei@gmail.com
5. You're in! 🎉

---

## Stopping the Apps

Press `Ctrl+C` in the terminal window

---

## Need Help?

- Setup: `ADMIN_QUICK_START.md`
- Deployment: `DEPLOYMENT_CHECKLIST.md`
- Full Docs: `README.md`
