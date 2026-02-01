# Our House - Complete Project Summary

## What We're Building

An intimate, shared digital home for couples—a calm, emotional space that feels like a place, not software. Each room has symbolic meaning and specific functionality, creating a warm environment for connection and memory.

---

## Core Decisions Locked In

### Technology
- ✅ **Stack**: React + TypeScript + Tailwind + Framer Motion
- ✅ **Backend**: Supabase (serverless, all-in-one)
- ✅ **Architecture**: Fully modular, data-driven with internal CMS
- ✅ **Style**: Warm Minimalism

### User Experience
- ✅ **Invitation**: Manual sharing (copy/paste code)
- ✅ **Deletion**: Soft delete with partner notification
- ✅ **Plant Neglect**: Shows slight wilting
- ✅ **Design Philosophy**: Slow, calm, no pressure, emotionally warm

### Modularity (NEW)
- ✅ **Fully data-driven**: All visual elements stored in database
- ✅ **Admin Panel**: Internal CMS for managing assets
- ✅ **Theme System**: Switch entire design without code changes
- ✅ **Asset Library**: Upload/manage furniture, backgrounds, magnets, etc.

---

## The Six Rooms

### 🛋 Living Room
Main hub showing countdown(s) to shared events and a featured photo.

### 🧊 Kitchen
Interactive fridge with draggable sticky notes (text, checklist, doodle) and decorative magnets.

### 🌱 Garden
Living plant requiring daily watering. Completed goals become unique flowers.

### 🖼 Gallery
Curated wall images and named albums for shared memories.

### 🛏 Bedroom
Intimate space for leaving presents (letters, flowers, gifts, thoughts) on the bed.

### 🎨 Private Rooms
Each user has their own customizable room with draggable furniture and decorations.

---

## Technical Architecture Highlights

### Database (Supabase PostgreSQL)
**User Tables:**
- `users` - Google OAuth accounts
- `houses` - Shared spaces (exactly 2 users)

**Room Tables:**
- `living_rooms`, `countdowns`
- `kitchens`, `sticky_notes`, `magnets`
- `gardens`, `flowers`
- `galleries`, `albums`, `photos`, `wall_images`
- `bedrooms`, `presents`
- `private_rooms`, `room_elements`

**CMS Tables (NEW):**
- `themes` - Complete visual themes
- `room_backgrounds` - Per-room backgrounds
- `furniture_library` - All available furniture/decorations
- `magnet_library` - Kitchen magnet designs
- `plant_assets` - Plant stages & flower types
- `sticky_note_styles` - Note visual styles
- `ui_elements` - Frames, icons, etc.
- `design_config` - Active theme selection

### Real-Time Sync
- WebSocket connections via Supabase Realtime
- Partner sees updates instantly (sticky notes moving, new photos, etc.)
- Optimistic updates for smooth UX

### Storage
- Supabase Storage buckets for:
  - Admin assets (furniture, backgrounds, themes)
  - User uploads (photos, doodles)
- CDN delivery for performance

### Authentication
- Google OAuth 2.0 via Supabase Auth
- JWT session management
- Protected routes

---

## The Admin Panel (CMS)

### Purpose
Allow complete redesign without touching code. Upload new furniture, change room backgrounds, create themes, manage all visual assets.

### Key Features
1. **Theme Management**
   - Create/edit color palettes
   - Define typography (fonts, sizes)
   - Set spacing, borders, shadows
   - Preview before activating
   - Switch themes instantly

2. **Furniture Library**
   - Upload SVG/PNG furniture items
   - Categorize (seating, tables, decoration, plants, lighting)
   - Tag for searchability
   - Drag-and-drop sorting
   - Enable/disable items

3. **Room Backgrounds**
   - Upload per-room background images
   - Set texture overlays
   - Adjust opacity/blur
   - Link to themes

4. **Asset Uploaders**
   - Magnets (Kitchen)
   - Plant growth stages (Garden)
   - Flower types (Garden)
   - Sticky note styles (Kitchen)
   - UI elements (frames, icons)

5. **Preview System**
   - Live preview of changes
   - Side-by-side comparison
   - Test mode in actual app

### Access Control
- Admin flag on user accounts (`is_admin = true`)
- Whitelist specific email addresses
- Audit logs for admin actions

---

## Modular Component Architecture

### Data-Driven Rendering

Every component fetches visual assets from the database:

```tsx
// ❌ Old way (hardcoded)
import chairImage from './chair.png';

// ✅ New way (data-driven)
const furniture = useFurnitureLibrary('seating');
<img src={furniture[0].asset_url} />
```

### Custom Hooks
- `useTheme()` - Fetch active theme, apply CSS variables
- `useRoomAssets(roomType)` - Get backgrounds for specific room
- `useFurnitureLibrary(category)` - Get available furniture
- `useMagnetLibrary()` - Get magnet designs
- `usePlantAssets()` - Get plant/flower sprites

### Benefits
- ✅ Instant theme changes (no deployment)
- ✅ Seasonal designs (winter, summer, anniversary)
- ✅ A/B testing different styles
- ✅ Non-developers can manage visuals
- ✅ Easy rollback if issues arise

---

## Design System

### Colors
Warm, cozy palette with creams, terracottas, soft pastels.
- Base: Warm creams (#FFF9F5 to #8B5A3C)
- Room accents: Soft gold, gentle green, sage, muted purple, dusty rose, soft blue

### Typography
- **Primary**: Inter (clean, readable)
- **Decorative**: Crimson Pro (special moments)
- **Handwriting**: Kalam (notes, personal touches)

### Animations
- Slow, organic, gentle (400ms default duration)
- Ease out (objects slow as they arrive)
- No harsh snaps or mechanical movements
- Breathing effects for living elements

### Spacing & Layout
- Mobile-first (primary target: 320px-640px)
- Soft rounded corners (8-16px)
- Warm shadows (using brown tones, not gray)
- Bottom navigation for rooms

---

## Development Timeline (Updated with CMS)

### Setup (Week 1)
- Supabase project creation
- Database schema (user + room + CMS tables)
- React project initialization
- Design tokens in CSS
- Google OAuth setup

### Phase 1: Foundation (Week 2-3)
- Authentication system
- Onboarding flow (create/join house)
- Basic navigation
- **Admin panel foundation**
- **Asset management tables**

### Phase 2: Living Room + CMS (Week 4)
- Living Room UI (data-driven)
- Featured image upload
- Countdown display
- **Theme system implementation**
- **Admin dashboard**

### Phase 3: Kitchen + Asset Uploaders (Week 5)
- Kitchen with fridge
- Sticky notes (drag & drop)
- Doodle canvas
- **Furniture library uploader**
- **Magnet library uploader**

### Phase 4: Garden + Plant Assets (Week 6)
- Garden visualization
- Watering mechanic
- Goal/flower system
- **Plant asset manager**
- **Flower type manager**

### Phase 5: Gallery (Week 7)
- Wall images
- Album system
- Photo uploads
- **Room background manager**

### Phase 6: Bedroom + Private Rooms (Week 8)
- Bedroom with presents
- Private room creation
- Element drag/resize/rotate
- **Complete furniture library**

### Phase 7: Admin Panel Completion (Week 9)
- **Theme editor with live preview**
- **Bulk upload tools**
- **Asset organization features**
- **Preview comparison system**

### Phase 8: Polish & Testing (Week 10)
- Animation refinements
- Mobile responsiveness
- Performance optimization
- Admin panel testing
- Bug fixes

---

## Files Created

1. **ARCHITECTURE.md** - System architecture, database schema, workflows
2. **DESIGN_SYSTEM.md** - Colors, typography, animations, component styles
3. **CMS_ARCHITECTURE.md** - Content management system design
4. **PRE_DEVELOPMENT_CHECKLIST.md** - Setup tasks and questions
5. **PROJECT_SUMMARY.md** - This file (overview)

---

## What Makes This Special

### Emotionally Resonant
- Feels like a place, not software
- Slow, gentle, calming interactions
- No gamification or pressure
- Focus on meaning over efficiency

### Technically Innovative
- Fully modular, data-driven architecture
- Complete visual redesign without code changes
- Real-time sync for intimate connection
- Admin CMS for asset management

### Future-Proof
- Theme system for seasonal designs
- Asset library for easy updates
- Scalable database structure
- Clean separation of content and code

---

## Questions to Answer Before Starting

### 1. Supabase Account
Do you have a Supabase account, or should I guide setup?

### 2. Google OAuth
Do you have Google Cloud Console access, or need instructions?

### 3. Design Assets
Should I use simple placeholders initially (shapes/rectangles) or wait for actual illustrations?

### 4. Admin Access
What email address(es) should have admin panel access?

### 5. Deployment Platform
Preferred hosting?
- **Vercel** (recommended - easiest with Vite + Supabase)
- Netlify
- Cloudflare Pages
- Other

---

## Ready to Build

Once you answer the 5 questions above, I'll immediately:

1. **Set up Supabase database** (all tables including CMS)
2. **Initialize React project** (with all dependencies)
3. **Configure Tailwind** (with design tokens)
4. **Build authentication** (Google OAuth)
5. **Create admin panel foundation** (routes, auth check)
6. **Start with onboarding flow** (create/join house)

The modular architecture means we can:
- Build features with placeholder assets
- Refine visuals later through admin panel
- Test different themes easily
- Iterate quickly on design

---

**This is a beautiful, ambitious project. Let's build something meaningful.** 🏡
