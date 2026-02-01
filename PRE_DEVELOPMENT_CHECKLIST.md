# Pre-Development Checklist

## Decisions Made ✓

- [x] **Tech Stack**: Serverless with Supabase
- [x] **Frontend**: React + TypeScript + Tailwind + Framer Motion
- [x] **Invitation System**: Manual sharing (code/link)
- [x] **Content Deletion**: Soft delete with notification
- [x] **Plant Neglect**: Show slight wilting visual
- [x] **Design Style**: Warm Minimalism

---

## Setup Tasks

### 1. Development Environment Setup
- [ ] Install Node.js (v18 or later)
- [ ] Install Git
- [ ] Install VS Code (or preferred editor)
- [ ] Install VS Code extensions:
  - ESLint
  - Prettier
  - Tailwind CSS IntelliSense
  - TypeScript

### 2. Create Supabase Project
- [ ] Sign up at [supabase.com](https://supabase.com)
- [ ] Create new project: "our-house"
- [ ] Note project URL and anon key
- [ ] Note service role key (for admin operations)

### 3. Configure Google OAuth
- [ ] Go to [Google Cloud Console](https://console.cloud.google.com)
- [ ] Create new project or select existing
- [ ] Enable Google+ API
- [ ] Create OAuth 2.0 credentials
  - Application type: Web application
  - Authorized redirect URIs: `https://[your-supabase-project].supabase.co/auth/v1/callback`
- [ ] Note Client ID and Client Secret
- [ ] Add to Supabase Authentication settings

### 4. Initialize Project Structure
- [ ] Create React app with Vite + TypeScript
- [ ] Install core dependencies:
  ```bash
  npm create vite@latest our-house-app -- --template react-ts
  cd our-house-app
  npm install
  npm install @supabase/supabase-js
  npm install tailwindcss postcss autoprefixer
  npm install framer-motion
  npm install react-router-dom
  npm install zustand
  ```
- [ ] Install dev dependencies:
  ```bash
  npm install -D @types/node
  npm install -D eslint prettier
  ```
- [ ] Initialize Tailwind CSS
- [ ] Set up folder structure (see below)

### 5. Configure Supabase Database Schema
- [ ] Create tables:
  - `users` (id, google_id, email, display_name, profile_picture, created_at, last_active)
  - `houses` (id, created_at, created_by, user_1, user_2, invitation_code, invitation_used)
  - `living_rooms` (id, house_id, featured_image_url, created_at)
  - `countdowns` (id, living_room_id, name, date, created_by)
  - `kitchens` (id, house_id, created_at)
  - `sticky_notes` (id, kitchen_id, type, content, position_x, position_y, z_index, color, created_by, created_at, deleted_at)
  - `magnets` (id, kitchen_id, type, position_x, position_y, z_index)
  - `gardens` (id, house_id, plant_last_watered, plant_growth_stage, created_at)
  - `flowers` (id, garden_id, goal_name, completed_at, flower_type, position_x, position_y)
  - `galleries` (id, house_id, created_at)
  - `wall_images` (id, gallery_id, url, uploaded_by, uploaded_at, position_x, position_y, deleted_at)
  - `albums` (id, gallery_id, name, cover_image_url, created_at)
  - `photos` (id, album_id, url, uploaded_by, uploaded_at, caption, deleted_at)
  - `bedrooms` (id, house_id, created_at)
  - `presents` (id, bedroom_id, type, content, given_by, given_at, opened, opened_at, deleted_at)
  - `private_rooms` (id, house_id, owner_id, visible_to_partner, created_at)
  - `room_elements` (id, private_room_id, type, asset_id, position_x, position_y, scale, rotation, z_index, custom_text)

- [ ] Set up Row Level Security (RLS) policies
- [ ] Create database functions for invitation logic
- [ ] Set up real-time subscriptions on required tables

### 6. Configure Supabase Storage Buckets
- [ ] Create storage bucket: `featured-images`
- [ ] Create storage bucket: `doodles`
- [ ] Create storage bucket: `gallery-photos`
- [ ] Set up storage policies (authenticated users only, limit file sizes)

### 7. Project Folder Structure
```
our-house-app/
├── public/
│   └── assets/
│       ├── icons/           # Room navigation icons
│       ├── illustrations/   # Fridge, plant, bed, etc.
│       └── furniture/       # Private room elements
├── src/
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── LoadingState.tsx
│   │   └── rooms/          # Room-specific components
│   │       ├── LivingRoom/
│   │       │   ├── LivingRoom.tsx
│   │       │   ├── Countdown.tsx
│   │       │   └── FeaturedImage.tsx
│   │       ├── Kitchen/
│   │       │   ├── Kitchen.tsx
│   │       │   ├── Fridge.tsx
│   │       │   ├── StickyNote.tsx
│   │       │   ├── DrawingCanvas.tsx
│   │       │   └── Magnet.tsx
│   │       ├── Garden/
│   │       │   ├── Garden.tsx
│   │       │   ├── Plant.tsx
│   │       │   └── Flower.tsx
│   │       ├── Gallery/
│   │       │   ├── Gallery.tsx
│   │       │   ├── WallImage.tsx
│   │       │   ├── Album.tsx
│   │       │   └── PhotoGrid.tsx
│   │       ├── Bedroom/
│   │       │   ├── Bedroom.tsx
│   │       │   ├── Bed.tsx
│   │       │   └── Present.tsx
│   │       └── PrivateRoom/
│   │           ├── PrivateRoom.tsx
│   │           ├── ElementLibrary.tsx
│   │           └── DraggableElement.tsx
│   ├── layouts/
│   │   ├── MainLayout.tsx      # Navigation wrapper
│   │   └── RoomLayout.tsx      # Common room structure
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Onboarding.tsx
│   │   └── Home.tsx
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useHouse.ts
│   │   ├── useRealtime.ts
│   │   └── useSupabase.ts
│   ├── store/
│   │   ├── authStore.ts
│   │   ├── houseStore.ts
│   │   └── roomStore.ts
│   ├── lib/
│   │   ├── supabase.ts         # Supabase client
│   │   └── types.ts            # TypeScript interfaces
│   ├── styles/
│   │   ├── tokens.css          # Design system variables
│   │   ├── globals.css
│   │   └── animations.css
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── constants.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── vite-env.d.ts
├── .env.local
├── .gitignore
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

### 8. Environment Variables Setup
Create `.env.local`:
```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 9. Design Assets Preparation
- [ ] Source or create room navigation icons (6 icons)
- [ ] Create/find fridge illustration
- [ ] Create plant growth sprite sheet (6 stages)
- [ ] Create flower illustrations (8-10 types)
- [ ] Source furniture elements for private rooms (20-30 items)
- [ ] Create magnet designs (15-20)
- [ ] Set up color palette in Tailwind config

### 10. Development Plan Review
- [ ] Review architecture document
- [ ] Review design system
- [ ] Understand onboarding flow
- [ ] Understand real-time sync requirements

---

## Ready to Start Checklist

Before writing first line of code:

- [ ] All setup tasks completed above
- [ ] Supabase project is live and accessible
- [ ] Google OAuth credentials configured
- [ ] Project initialized with all dependencies
- [ ] Design system variables added to CSS
- [ ] Folder structure created
- [ ] Environment variables set
- [ ] Basic assets ready (at least placeholder icons)

---

## Development Order (After Setup)

### Phase 1: Foundation (Week 1)
1. Authentication system
   - Google OAuth login
   - Session management
   - Protected routes

2. Onboarding flow
   - Create house
   - Generate invitation code
   - Join house via code
   - Welcome ceremony

3. Basic navigation
   - Bottom navigation bar
   - Room routing
   - Layout structure

### Phase 2: Living Room (Week 2)
- Main hub UI
- Featured image upload
- Countdown creation and display
- Navigation to other rooms

### Phase 3: Kitchen (Week 3)
- Fridge visualization
- Text sticky notes (drag & drop)
- Checklist notes
- Doodle canvas
- Magnets
- Real-time sync

### Phase 4: Garden (Week 4)
- Plant visualization
- Watering mechanic (with wilting)
- Goal seed planting
- Flower growth animation
- Multiple flowers display

### Phase 5: Gallery (Week 5)
- Wall image display
- Album creation
- Photo upload to albums
- Album browsing

### Phase 6: Bedroom (Week 6)
- Bedroom layout
- Present creation (4 types)
- Unopened/opened states
- Soft delete with notification

### Phase 7: Private Rooms (Week 7)
- Room creation (one per user)
- Element library
- Drag, resize, rotate elements
- Visibility toggle

### Phase 8: Polish & Testing (Week 8)
- Animation refinements
- Mobile responsiveness
- Performance optimization
- Bug fixes
- User testing

---

## Next Immediate Steps

1. **You tell me you're ready**
2. I'll set up the Supabase project structure (SQL schema)
3. I'll initialize the React project
4. I'll configure Tailwind with design tokens
5. We'll start with authentication and onboarding

---

## Questions Before We Start

1. Do you already have a Supabase account, or should I provide instructions for creating one?

2. Do you have Google Cloud Console access, or should I guide you through OAuth setup?

3. Do you want me to use placeholder illustrations initially (simple rectangles/circles), or should we wait until you have actual design assets?

4. Preferred deployment platform for the final app?
   - Vercel (recommended for Vite + Supabase)
   - Netlify
   - Cloudflare Pages
   - Other

---

Once you answer these and give the go-ahead, I'll start building immediately.
