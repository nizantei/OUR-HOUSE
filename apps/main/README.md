# Our House - Application

A calm, intimate shared digital home for couples.

## Quick Start

### 1. Complete Supabase Setup

Follow the instructions in `../SETUP_GUIDE.md` to:
- Run the database schema SQL
- Create storage buckets
- Set up Google OAuth

### 2. Install Dependencies

```bash
npm install
```

### 3. Start Development Server

```bash
npm run dev
```

The app will open at `http://localhost:5173`

## Environment Variables

Already configured in `.env.local`:
- `VITE_SUPABASE_URL`: Your Supabase project URL
- `VITE_SUPABASE_ANON_KEY`: Your Supabase anon key

## Project Structure

```
src/
├── components/
│   ├── ui/              # Reusable UI components (Button, Card, etc.)
│   └── rooms/           # Room-specific components (will be built)
├── pages/
│   ├── Login.tsx        # Google OAuth login page
│   ├── AuthCallback.tsx # OAuth callback handler
│   ├── Onboarding.tsx   # Create/join house flow
│   └── Home.tsx         # Main app (redirects to rooms)
├── hooks/
│   ├── useAuth.ts       # Authentication logic
│   └── useHouse.ts      # House management logic
├── store/
│   ├── authStore.ts     # Zustand store for auth state
│   └── houseStore.ts    # Zustand store for house state
├── lib/
│   ├── supabase.ts      # Supabase client configuration
│   └── types.ts         # TypeScript interfaces
└── index.css            # Design system CSS variables
```

## Features Implemented

✅ Google OAuth authentication
✅ User profile creation
✅ House creation with invitation code
✅ Join house via invitation code
✅ Protected routes
✅ Warm minimalist design system
✅ Responsive mobile-first UI

## Next Steps

### Immediate (Ready to Build)
1. Living Room component
2. Kitchen with sticky notes
3. Garden with plant watering
4. Gallery with photos
5. Bedroom with presents
6. Private rooms with furniture

### Admin Panel (CMS)
- Theme management
- Asset library management
- Furniture upload tool
- Background customization

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Design System

All design tokens are in `src/index.css`:
- Colors: Warm palette (creams, terracottas, pastels)
- Typography: Inter, Crimson Pro, Kalam
- Animations: Slow, gentle, organic
- Spacing: Consistent scale

Use Tailwind utility classes with custom theme extensions.

## Authentication Flow

1. User clicks "Continue with Google"
2. Redirects to Google OAuth
3. Returns to `/auth/callback`
4. Creates/updates user in database
5. Redirects to `/` (Home)
6. If no house exists, redirects to `/onboarding`
7. User creates or joins a house
8. Access to all rooms

## Database Functions

Two custom PostgreSQL functions handle complex operations:
- `create_house_with_rooms(creator_id)` - Creates house and all room tables
- `join_house(user_id, inv_code)` - Joins user to house via invitation

## Troubleshooting

### "Missing Supabase environment variables"
Make sure `.env.local` exists with your Supabase credentials

### OAuth redirect error
Check that Google OAuth redirect URI matches:
`https://qqvalflevmsnocarexkx.supabase.co/auth/v1/callback`

### Database errors
Ensure SQL schema was run successfully in Supabase SQL Editor

### TypeScript errors
Run `npm install` to ensure all types are installed

## Contributing

This is a personal couple's app. Architecture is modular and data-driven for easy customization through the admin panel (coming soon).

---

Built with love 💛
