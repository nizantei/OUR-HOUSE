# Our House - Architecture Plan

## Overview

A mobile-first web application creating an intimate, shared digital home for couples. The system prioritizes emotional warmth, real-time synchronization, and a calm user experience over technical complexity.

---

## Technology Stack Recommendations

### Frontend
- **Framework**: React with TypeScript
  - Component-based architecture aligns with "rooms as spaces"
  - Rich ecosystem for animations and interactions
  - Mobile-first responsive design capabilities

- **Styling**: Tailwind CSS + Framer Motion
  - Tailwind for rapid, consistent styling
  - Framer Motion for smooth, organic animations
  - CSS-in-JS alternative: Emotion or styled-components

- **State Management**: Zustand or Redux Toolkit
  - Manage shared house state across rooms
  - Handle real-time updates from partner

- **Canvas/Drawing**: React Konva or Fabric.js
  - Doodle notes in Kitchen
  - Element placement in Private Rooms

- **Drag & Drop**: @dnd-kit or react-beautiful-dnd
  - Sticky notes on fridge
  - Element positioning in rooms

### Backend
- **Runtime**: Node.js with Express or Fastify
  - Fast, efficient for real-time features
  - JavaScript/TypeScript consistency across stack

- **Alternative**: Bun (modern, faster runtime)

- **API Style**: RESTful API + WebSocket layer
  - REST for CRUD operations
  - WebSockets for real-time sync between partners

### Database
- **Primary Database**: PostgreSQL
  - Relational model fits well (Users ↔ Houses ↔ Rooms)
  - JSONB fields for flexible room content
  - Strong consistency for shared state

- **Alternative**: MongoDB
  - Document model could work for room-based data
  - Flexible schema for different room types

### File Storage
- **Cloud Storage**: AWS S3 or Cloudflare R2
  - Photo uploads (Gallery, Living Room)
  - Doodle images (Kitchen)
  - Optimized delivery via CDN

- **Alternative**: Supabase Storage (if using Supabase stack)

### Authentication
- **OAuth Provider**: Google OAuth 2.0
  - Passport.js or next-auth for implementation
  - JWT tokens for session management
  - Secure token storage (httpOnly cookies)

### Real-Time Communication
- **WebSocket Library**: Socket.io
  - Room-based channels (one per house)
  - Emit changes when partner updates content
  - Automatic reconnection handling

- **Alternative**: Server-Sent Events (SSE) for simpler needs

### Hosting & Deployment
- **Frontend Hosting**: Vercel, Netlify, or Cloudflare Pages
  - Automatic deployments
  - Global CDN for fast mobile access

- **Backend Hosting**: Railway, Render, or Fly.io
  - Easy Node.js deployment
  - WebSocket support
  - Environment variable management

- **Database Hosting**:
  - Supabase (PostgreSQL + auth + storage all-in-one)
  - Railway PostgreSQL
  - AWS RDS (production scale)

---

## System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  Mobile Browser (User A)          Mobile Browser (User B)    │
│  ┌───────────────────┐            ┌───────────────────┐     │
│  │   React App       │            │   React App       │     │
│  │   - Room Views    │            │   - Room Views    │     │
│  │   - Drawing Canvas│            │   - Drawing Canvas│     │
│  │   - Drag/Drop UI  │            │   - Drag/Drop UI  │     │
│  └─────────┬─────────┘            └─────────┬─────────┘     │
│            │                                  │               │
│            └──────────────┬───────────────────┘               │
│                           │                                   │
└───────────────────────────┼───────────────────────────────────┘
                            │
                 ┌──────────┴──────────┐
                 │   HTTPS + WSS       │
                 └──────────┬──────────┘
                            │
┌───────────────────────────┼───────────────────────────────────┐
│                      API GATEWAY                              │
├───────────────────────────┼───────────────────────────────────┤
│                           │                                   │
│      ┌────────────────────┴────────────────────┐             │
│      │       Application Server                 │             │
│      │  ┌─────────────────────────────────────┐ │             │
│      │  │  REST API Layer                     │ │             │
│      │  │  - Auth endpoints                   │ │             │
│      │  │  - Room CRUD operations             │ │             │
│      │  │  - Image upload handling            │ │             │
│      │  └─────────────────────────────────────┘ │             │
│      │                                           │             │
│      │  ┌─────────────────────────────────────┐ │             │
│      │  │  WebSocket Layer                    │ │             │
│      │  │  - House-specific rooms             │ │             │
│      │  │  - Real-time sync events            │ │             │
│      │  │  - Presence detection               │ │             │
│      │  └─────────────────────────────────────┘ │             │
│      │                                           │             │
│      │  ┌─────────────────────────────────────┐ │             │
│      │  │  Business Logic Layer               │ │             │
│      │  │  - House creation & invitation      │ │             │
│      │  │  - Room state management            │ │             │
│      │  │  - Permission checks (2-user limit) │ │             │
│      │  └─────────────────────────────────────┘ │             │
│      └───────────────┬───────────────────────────┘             │
│                      │                                         │
└──────────────────────┼─────────────────────────────────────────┘
                       │
        ┌──────────────┼──────────────┐
        │              │              │
        ▼              ▼              ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│ PostgreSQL  │ │   Redis     │ │  S3/R2      │
│             │ │  (Cache/    │ │  Storage    │
│ - Users     │ │   Session)  │ │             │
│ - Houses    │ │             │ │ - Photos    │
│ - Rooms     │ │             │ │ - Doodles   │
│ - Content   │ │             │ │ - Assets    │
└─────────────┘ └─────────────┘ └─────────────┘

┌─────────────────────────────────────────────────────────────┐
│                    EXTERNAL SERVICES                         │
├─────────────────────────────────────────────────────────────┤
│  - Google OAuth 2.0 (Authentication)                        │
│  - CDN (Image delivery)                                     │
│  - Email Service (Invitation emails - SendGrid/Resend)      │
└─────────────────────────────────────────────────────────────┘
```

---

## Data Model

### Core Entities

#### Users
```typescript
interface User {
  id: string;                    // UUID
  googleId: string;              // Google OAuth ID
  email: string;
  displayName: string;
  profilePicture?: string;
  createdAt: Date;
  lastActive: Date;
}
```

#### Houses
```typescript
interface House {
  id: string;                    // UUID
  createdAt: Date;
  createdBy: string;             // User ID
  users: [string, string];       // Exactly 2 user IDs
  invitationCode?: string;       // Used during onboarding
  invitationUsed: boolean;
}
```

### Room Data Structures

#### Living Room
```typescript
interface LivingRoom {
  houseId: string;
  countdowns: Countdown[];
  featuredImage?: {
    url: string;
    uploadedBy: string;
    uploadedAt: Date;
  };
}

interface Countdown {
  id: string;
  name: string;
  date: Date;
  createdBy: string;
}
```

#### Kitchen
```typescript
interface Kitchen {
  houseId: string;
  stickyNotes: StickyNote[];
  magnets: Magnet[];
}

interface StickyNote {
  id: string;
  type: 'text' | 'checklist' | 'doodle';
  content: string | ChecklistItem[] | string; // text | items | image URL
  position: { x: number; y: number };
  zIndex: number;
  color: string;
  createdBy: string;
  createdAt: Date;
}

interface ChecklistItem {
  id: string;
  text: string;
  checked: boolean;
}

interface Magnet {
  id: string;
  type: string;              // Magnet design identifier
  position: { x: number; y: number };
  zIndex: number;
}
```

#### Garden
```typescript
interface Garden {
  houseId: string;
  plant: Plant;
  flowers: Flower[];
}

interface Plant {
  lastWatered: Date;
  growthStage: number;       // Increments with consistent watering
}

interface Flower {
  id: string;
  goalName: string;
  completedAt: Date;
  flowerType: string;        // Visual variant
  position: { x: number; y: number };
}
```

#### Gallery
```typescript
interface Gallery {
  houseId: string;
  wallImages: WallImage[];
  albums: Album[];
}

interface WallImage {
  id: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  position: { x: number; y: number };
}

interface Album {
  id: string;
  name: string;
  coverImage?: string;
  photos: Photo[];
  createdAt: Date;
}

interface Photo {
  id: string;
  url: string;
  uploadedBy: string;
  uploadedAt: Date;
  caption?: string;
}
```

#### Bedroom
```typescript
interface Bedroom {
  houseId: string;
  presents: Present[];
}

interface Present {
  id: string;
  type: 'letter' | 'flower' | 'gift' | 'thought';
  content: string;
  givenBy: string;
  givenAt: Date;
  opened: boolean;
  openedAt?: Date;
}
```

#### Private Rooms
```typescript
interface PrivateRoom {
  id: string;
  houseId: string;
  ownerId: string;           // User who owns this room
  elements: RoomElement[];
  visibleToPartner: boolean;
}

interface RoomElement {
  id: string;
  type: 'furniture' | 'decoration' | 'text';
  assetId: string;           // References design library
  position: { x: number; y: number };
  scale: number;
  rotation: number;
  zIndex: number;
  customText?: string;       // For text elements
}
```

---

## Key Technical Workflows

### 1. Onboarding Flow

```
User A logs in with Google
  ↓
Check if user is part of a house
  ↓
NO → Show options:
      - Create new house (generates invitation code)
      - Join existing house (enter partner's code)
  ↓
User creates house → Generate unique invitation code → Show code to share
  ↓
User B logs in with Google
  ↓
User B enters invitation code
  ↓
Validate code → Link User B to house → Mark invitation as used
  ↓
Both users now access the same house
  ↓
(Optional) Ceremonial "welcome home" animation
```

### 2. Real-Time Synchronization

```
User A drags a sticky note in Kitchen
  ↓
Frontend sends update via WebSocket
  ↓
Server validates (user is part of this house)
  ↓
Update database with new position
  ↓
Emit event to house's WebSocket room
  ↓
User B's client receives update
  ↓
User B sees sticky note move in real-time
```

### 3. Image Upload Flow

```
User selects image (Gallery, Living Room, Doodle)
  ↓
Frontend requests signed upload URL from API
  ↓
Server generates presigned S3 URL
  ↓
Frontend uploads directly to S3
  ↓
Frontend sends confirmation to API with S3 key
  ↓
Server saves image metadata to database
  ↓
Emit update via WebSocket to partner
  ↓
Partner sees new image appear
```

### 4. Garden Watering Mechanic

```
User taps watering can
  ↓
Check last watered timestamp
  ↓
If >24 hours → Increment growth stage
  ↓
Update lastWatered to now
  ↓
Trigger gentle growth animation
  ↓
Sync to partner's view
```

---

## Security & Privacy Considerations

### Authentication
- Use Google OAuth with proper scope limitations (email, profile)
- Store JWT in httpOnly, secure cookies (not localStorage)
- Implement CSRF protection
- Token refresh mechanism for long sessions

### Authorization
- Every API request validates user is member of the house
- Private rooms: enforce owner-only write access
- Invitation codes: single-use, time-limited (optional expiry)
- Rate limiting on invitation attempts

### Data Privacy
- House data is strictly isolated (no cross-house queries)
- Implement soft deletion for sensitive content (letters, presents)
- GDPR compliance: allow account deletion with cascade
- Encrypt sensitive fields at rest (optional: love letters)

### File Upload Security
- Validate file types (images only)
- Size limits (e.g., 10MB per image)
- Scan uploads for malware (ClamAV or cloud service)
- Prevent directory traversal in filenames
- Use signed URLs with short expiration

---

## Performance Optimizations

### Frontend
- Lazy load rooms (code-split by route)
- Image optimization:
  - Compress uploads before sending
  - Serve WebP format with fallbacks
  - Responsive image sizes
- Debounce drag events before emitting to server
- Local optimistic updates (instant UI, sync in background)
- Service worker for offline access to cached images

### Backend
- Redis caching layer:
  - Cache house data (users, room states)
  - Session storage
  - Invalidate on updates
- Database indexing:
  - Index on `users.googleId`
  - Index on `houses.users` (array index)
  - Index on `houseId` for all room tables
- Connection pooling for database
- CDN for static assets and images

### Real-Time
- WebSocket connection per client
- Join house-specific room on connection
- Emit only to relevant house room (not broadcast)
- Heartbeat/ping to detect disconnections
- Graceful reconnection with state sync

---

## Deployment Strategy

### Environments
1. **Development**: Local machine
2. **Staging**: Mirror of production (test before deploy)
3. **Production**: Live app

### CI/CD Pipeline
```
Git push to main
  ↓
GitHub Actions / GitLab CI triggered
  ↓
Run tests (unit, integration)
  ↓
Build frontend (Vite/Webpack)
  ↓
Deploy frontend to Vercel/Netlify
  ↓
Build backend (TypeScript compilation)
  ↓
Deploy backend to Railway/Render
  ↓
Run database migrations
  ↓
Health check endpoints
  ↓
Rollback mechanism if failures
```

### Database Migrations
- Use migration tool: Prisma Migrate, Knex, or TypeORM
- Version-controlled migration files
- Automatic migrations on deploy (staging/production)
- Backup before migration

### Monitoring
- Error tracking: Sentry or LogRocket
- Performance monitoring: New Relic or Datadog
- Uptime monitoring: UptimeRobot or Pingdom
- Log aggregation: CloudWatch, Logtail, or Papertrail

---

## Scalability Considerations

### Current Scope (MVP)
- Expected users: Hundreds to low thousands of couples
- Simple vertical scaling (larger server instance)
- Single database instance with read replicas if needed

### Future Growth
- Horizontal scaling: Load balancer + multiple API servers
- Database sharding by house ID (each house is independent)
- WebSocket scaling: Redis adapter for Socket.io across servers
- CDN for global image delivery
- Separate microservice for image processing (thumbnails, optimization)

---

## Alternative Architecture: Serverless

For simpler deployment and lower initial costs:

### Stack
- **Frontend**: React on Vercel/Netlify
- **Backend**: Serverless functions (Vercel Functions, Netlify Functions, AWS Lambda)
- **Database**: Supabase (PostgreSQL + Auth + Storage + Real-time)
- **Real-Time**: Supabase Realtime (WebSocket built-in)

### Benefits
- No server management
- Auto-scaling
- Pay-per-use pricing
- Supabase handles auth, database, storage, and real-time in one platform

### Trade-offs
- Cold start latency on serverless functions
- Vendor lock-in (Supabase)
- Less control over infrastructure

---

## Development Phases

### Phase 1: Foundation (Week 1-2)
- Set up project structure (monorepo or separate repos)
- Configure development environment
- Implement Google OAuth
- Create database schema
- Basic user and house models
- Onboarding flow (create/join house)

### Phase 2: Living Room + Kitchen (Week 3-4)
- Living Room UI with countdown and featured image
- Navigation between rooms
- Kitchen with draggable sticky notes (text only)
- Basic real-time sync via WebSocket
- Image upload for featured image

### Phase 3: Garden + Gallery (Week 5-6)
- Garden with watering mechanic
- Goal seed planting and flower growth
- Gallery with albums and photo uploads
- Wall image display

### Phase 4: Bedroom + Private Rooms (Week 7-8)
- Bedroom with presents system
- Private room creation
- Element placement and design library
- Visibility toggle for private rooms

### Phase 5: Polish & Advanced Features (Week 9-10)
- Doodle notes with drawing canvas
- Checklist notes
- Magnet decorations
- Animation polish
- Performance optimization
- Mobile responsiveness refinement

### Phase 6: Testing & Launch (Week 11-12)
- End-to-end testing
- User acceptance testing with real couples
- Security audit
- Performance testing
- Bug fixes
- Production deployment

---

## Technical Risks & Mitigations

### Risk 1: Real-time sync complexity
- **Mitigation**: Start with polling, upgrade to WebSockets later
- **Mitigation**: Use battle-tested library (Socket.io)
- **Mitigation**: Implement optimistic updates to hide latency

### Risk 2: Image storage costs
- **Mitigation**: Implement image compression
- **Mitigation**: Set reasonable upload limits
- **Mitigation**: Use cost-effective storage (Cloudflare R2 has no egress fees)

### Risk 3: Mobile performance (animations + drawing)
- **Mitigation**: Test on real devices early
- **Mitigation**: Use hardware-accelerated CSS transforms
- **Mitigation**: Throttle/debounce intensive operations
- **Mitigation**: Lazy load heavy components

### Risk 4: Two-user constraint enforcement
- **Mitigation**: Database constraint on houses.users array length
- **Mitigation**: Application-level validation
- **Mitigation**: Mark invitation as single-use immediately on redemption

### Risk 5: User expectations vs MVP
- **Mitigation**: Clear communication about iterative development
- **Mitigation**: Prioritize core emotional experience over features
- **Mitigation**: Gather feedback early with prototype

---

## Recommended Tech Stack Summary

### Option A: Full-Stack JavaScript (Recommended for control)
```
Frontend:  React + TypeScript + Tailwind + Framer Motion
Backend:   Node.js + Express + TypeScript
Database:  PostgreSQL (Supabase or Railway)
Storage:   AWS S3 or Cloudflare R2
Real-time: Socket.io
Auth:      Passport.js (Google OAuth)
Deploy:    Vercel (frontend) + Railway (backend)
```

### Option B: Serverless (Recommended for simplicity)
```
Frontend:  React + TypeScript + Tailwind + Framer Motion
Backend:   Supabase (database + auth + storage + real-time)
Functions: Vercel Serverless Functions (if custom logic needed)
Deploy:    Vercel (all-in-one)
```

---

## Next Steps

1. **Choose tech stack** (Option A or B above)
2. **Set up repository** (GitHub/GitLab)
3. **Initialize project structure**
   - Frontend: `npx create-react-app` or `npm create vite@latest`
   - Backend: Express/Fastify boilerplate or Supabase project
4. **Configure Google OAuth credentials**
5. **Design database schema** (Prisma schema or SQL migrations)
6. **Create design system** (color palette, component library)
7. **Build authentication flow**
8. **Implement onboarding experience**
9. **Begin with Living Room as proof-of-concept**

---

## Open Questions for Clarification

1. **Invitation delivery**: Should invitation codes be sent via email automatically, or copied/shared manually by users?

2. **Content deletion**: Can users delete notes, photos, or presents? If so, does partner see deletion, or do items just disappear?

3. **Plant death**: You mentioned plant "does not die" but pauses growth. Should there be any visual indication of neglect (wilting)?

4. **Private room visibility**: When a user toggles their private room to "visible," does the partner get a notification?

5. **Concurrent editing**: What happens if both users move the same sticky note simultaneously?

6. **Account recovery**: If one user loses access to their Google account, how do they regain house access?

7. **Leaving/dissolving a house**: Is there a way to end a relationship and archive/delete a house?

---

This architecture is designed to be intimate, performant, and emotionally resonant. The technical foundation supports the calm, slow experience while remaining scalable and maintainable.
