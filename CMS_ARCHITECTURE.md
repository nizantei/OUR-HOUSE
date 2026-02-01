# Content Management System (CMS) Architecture

## Overview

The app will be **fully data-driven** with an internal admin panel for managing all visual elements, allowing complete redesigns without touching code.

---

## Core Principle: Separation of Content & Code

```
┌─────────────────────────────────────────────────────────┐
│                    USER-FACING APP                      │
│  Components render based on data from asset library     │
└─────────────────────┬───────────────────────────────────┘
                      │
                      ├─ Fetch current theme
                      ├─ Fetch furniture library
                      ├─ Fetch room backgrounds
                      ├─ Fetch color schemes
                      │
┌─────────────────────▼───────────────────────────────────┐
│                  SUPABASE DATABASE                      │
│  - asset_library                                        │
│  - room_themes                                          │
│  - furniture_items                                      │
│  - design_config (active theme)                         │
└─────────────────────▲───────────────────────────────────┘
                      │
                      │ Managed by ↓
                      │
┌─────────────────────┴───────────────────────────────────┐
│                    ADMIN PANEL                          │
│  Internal tool for uploading & organizing assets        │
│  - Upload furniture SVGs/PNGs                           │
│  - Set room backgrounds                                 │
│  - Create/edit themes                                   │
│  - Preview changes before publishing                    │
└─────────────────────────────────────────────────────────┘
```

---

## Database Schema Updates

### New Tables for Asset Management

#### 1. `themes`
Stores complete visual themes (color schemes, font choices, overall style)

```sql
CREATE TABLE themes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,                    -- "Warm Minimalism", "Autumn Cozy", etc.
  description TEXT,
  is_active BOOLEAN DEFAULT false,       -- Only one active at a time

  -- Color palette (JSON)
  colors JSONB NOT NULL,                 -- { "warmth-500": "#E8A87C", ... }

  -- Typography
  font_primary TEXT,                     -- "Inter"
  font_decorative TEXT,                  -- "Crimson Pro"
  font_handwriting TEXT,                 -- "Kalam"

  -- Global settings
  border_radius_base TEXT,               -- "0.5rem"
  shadow_style JSONB,                    -- Shadow definitions
  animation_duration_default INTEGER,    -- 400ms

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 2. `room_backgrounds`
Stores background images/styles for each room

```sql
CREATE TABLE room_backgrounds (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  theme_id UUID REFERENCES themes(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL,               -- "living_room", "kitchen", etc.

  -- Background asset
  background_url TEXT,                   -- URL to image in storage
  background_color TEXT,                 -- Fallback solid color
  texture_overlay_url TEXT,              -- Optional texture layer

  -- Styling
  blur_amount INTEGER DEFAULT 0,
  opacity DECIMAL(3,2) DEFAULT 1.0,

  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 3. `furniture_library`
All available furniture/decorative elements for Private Rooms

```sql
CREATE TABLE furniture_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

  -- Metadata
  name TEXT NOT NULL,                    -- "Cozy Armchair"
  category TEXT NOT NULL,                -- "seating", "tables", "decoration", "plants", "lighting"
  tags TEXT[],                           -- ["cozy", "modern", "wooden"]

  -- Asset
  asset_url TEXT NOT NULL,               -- URL to SVG/PNG in storage
  thumbnail_url TEXT,                    -- Preview thumbnail

  -- Default properties
  default_width INTEGER,                 -- Default size in pixels
  default_height INTEGER,
  allows_color_customization BOOLEAN DEFAULT false,

  -- Availability
  is_active BOOLEAN DEFAULT true,        -- Can be hidden without deleting
  sort_order INTEGER DEFAULT 0,          -- Display order in library

  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 4. `magnet_library`
Kitchen magnet designs

```sql
CREATE TABLE magnet_library (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  asset_url TEXT NOT NULL,
  thumbnail_url TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 5. `plant_assets`
Plant growth stages and flower types

```sql
CREATE TABLE plant_assets (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  type TEXT NOT NULL,                    -- "plant_stage" or "flower"

  -- For plant stages
  growth_stage INTEGER,                  -- 0, 1, 2, 3, 4, 5 (null for flowers)

  -- For flowers
  flower_name TEXT,                      -- "Rose", "Daisy", etc. (null for plants)
  flower_color TEXT,                     -- "pink", "yellow", etc.

  -- Asset
  asset_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 6. `sticky_note_styles`
Sticky note visual styles

```sql
CREATE TABLE sticky_note_styles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,                    -- "Classic Yellow", "Soft Pink", etc.
  background_color TEXT NOT NULL,
  text_color TEXT NOT NULL,
  texture_url TEXT,                      -- Optional paper texture
  border_style TEXT,                     -- CSS border property
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 7. `ui_elements`
Reusable UI elements (buttons, frames, etc.)

```sql
CREATE TABLE ui_elements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  element_type TEXT NOT NULL,            -- "picture_frame", "button", "icon", etc.
  variant_name TEXT NOT NULL,            -- "polaroid", "wooden_frame", etc.
  asset_url TEXT NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### 8. `design_config`
Global configuration for currently active design

```sql
CREATE TABLE design_config (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  active_theme_id UUID REFERENCES themes(id),

  -- Quick overrides without creating new theme
  custom_css JSONB,                      -- { "primary-color": "#...", ... }

  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Only allow one row
CREATE UNIQUE INDEX single_config ON design_config ((id IS NOT NULL));
```

---

## Admin Panel Features

### Access Control
```sql
-- Add admin flag to users table
ALTER TABLE users ADD COLUMN is_admin BOOLEAN DEFAULT false;
```

Only users with `is_admin = true` can access admin panel.

### Admin Panel Routes
```
/admin
  ├── /dashboard              # Overview, active theme
  ├── /themes                 # Manage themes
  │   ├── /create
  │   ├── /edit/:id
  │   └── /preview/:id        # Preview theme before activating
  ├── /furniture              # Manage furniture library
  │   ├── /upload
  │   ├── /edit/:id
  │   └── /categories
  ├── /room-backgrounds       # Upload/assign room backgrounds
  ├── /magnets                # Manage magnet designs
  ├── /plants                 # Plant stages & flower types
  ├── /sticky-notes           # Sticky note styles
  ├── /ui-elements            # Picture frames, icons, etc.
  └── /asset-library          # All uploaded files
```

### Key Admin Features

#### 1. Theme Management
- Create new theme from scratch or duplicate existing
- Edit color palette with live preview
- Set typography (font families, sizes)
- Define spacing, border radius, shadows
- Activate/deactivate themes (only one active at a time)
- **Preview mode**: See how app looks with theme before publishing

#### 2. Furniture Library Management
- Upload furniture assets (SVG, PNG with transparency)
- Auto-generate thumbnails
- Categorize (seating, tables, decoration, plants, lighting, storage)
- Add tags for searchability
- Set default dimensions
- Enable/disable color customization per item
- Reorder items (drag-and-drop sorting)
- Mark as inactive (hide without deleting)

#### 3. Room Background Manager
- Upload background images per room per theme
- Set texture overlays
- Adjust opacity, blur
- Fallback solid colors
- Preview each room with background

#### 4. Asset Upload System
- Drag-and-drop file uploads to Supabase Storage
- Automatic optimization (compress PNGs, optimize SVGs)
- File size validation (max 2MB for furniture, 5MB for backgrounds)
- Format validation (only SVG, PNG, WebP)
- Bulk upload support

#### 5. Preview System
- **Live preview**: See changes in real-time before publishing
- **Comparison view**: Side-by-side current vs new design
- **Test mode**: Use admin account to test new theme in actual app

---

## Component Architecture for Modularity

### Asset Loading Pattern

Every component fetches its visual assets from the database instead of hardcoded imports.

#### Example: Kitchen Component

**❌ Bad (Hardcoded)**
```tsx
import fridgeImage from './assets/fridge.png';

function Kitchen() {
  return <img src={fridgeImage} alt="Fridge" />;
}
```

**✅ Good (Data-Driven)**
```tsx
function Kitchen() {
  const { roomBackground } = useRoomAssets('kitchen');
  const { fridgeAsset } = useUIElement('fridge', 'classic');

  return (
    <div style={{ backgroundImage: `url(${roomBackground.url})` }}>
      <img src={fridgeAsset.url} alt="Fridge" />
    </div>
  );
}
```

### Custom Hooks for Asset Management

#### `useTheme()`
```tsx
function useTheme() {
  const [theme, setTheme] = useState(null);

  useEffect(() => {
    // Fetch active theme from design_config
    const fetchTheme = async () => {
      const { data } = await supabase
        .from('design_config')
        .select('active_theme_id, themes(*)')
        .single();

      setTheme(data.themes);

      // Apply CSS variables dynamically
      applyThemeVariables(data.themes.colors);
    };

    fetchTheme();
  }, []);

  return theme;
}
```

#### `useRoomAssets(roomType)`
```tsx
function useRoomAssets(roomType: string) {
  const [background, setBackground] = useState(null);

  useEffect(() => {
    const fetchBackground = async () => {
      const { data: config } = await supabase
        .from('design_config')
        .select('active_theme_id')
        .single();

      const { data } = await supabase
        .from('room_backgrounds')
        .select('*')
        .eq('theme_id', config.active_theme_id)
        .eq('room_type', roomType)
        .single();

      setBackground(data);
    };

    fetchBackground();
  }, [roomType]);

  return { roomBackground: background };
}
```

#### `useFurnitureLibrary(category?)`
```tsx
function useFurnitureLibrary(category?: string) {
  const [furniture, setFurniture] = useState([]);

  useEffect(() => {
    const fetchFurniture = async () => {
      let query = supabase
        .from('furniture_library')
        .select('*')
        .eq('is_active', true)
        .order('sort_order');

      if (category) {
        query = query.eq('category', category);
      }

      const { data } = await query;
      setFurniture(data);
    };

    fetchFurniture();
  }, [category]);

  return furniture;
}
```

---

## Dynamic Theming System

### CSS Variable Injection

When theme is loaded, inject CSS variables dynamically:

```tsx
function applyThemeVariables(colors: Record<string, string>) {
  const root = document.documentElement;

  Object.entries(colors).forEach(([key, value]) => {
    root.style.setProperty(`--${key}`, value);
  });
}
```

### Tailwind Configuration

Use CSS variables in Tailwind config so it respects dynamic themes:

```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        'warmth-50': 'var(--warmth-50)',
        'warmth-100': 'var(--warmth-100)',
        'warmth-500': 'var(--warmth-500)',
        // ... all theme colors
      }
    }
  }
}
```

---

## Admin Panel UI Design

### Simple, Functional Interface

The admin panel doesn't need to match the app's warm aesthetic—it's a tool.

**Design**: Clean, efficient, professional
- **Framework**: Same React app, separate route
- **UI Library**: shadcn/ui or Ant Design for rapid development
- **Features**: File uploads, drag-and-drop, color pickers, live previews

### Key Screens

#### 1. Dashboard
```
┌─────────────────────────────────────────────┐
│  Admin Panel                                │
├─────────────────────────────────────────────┤
│  Active Theme: Warm Minimalism              │
│  ┌─────────────────────────────────┐       │
│  │ [Preview]  [Edit]  [Change]     │       │
│  └─────────────────────────────────┘       │
│                                             │
│  Quick Stats:                               │
│  - 24 Furniture items                       │
│  - 18 Magnets                               │
│  - 6 Room backgrounds                       │
│  - 10 Flower types                          │
└─────────────────────────────────────────────┘
```

#### 2. Furniture Library
```
┌─────────────────────────────────────────────┐
│  Furniture Library                          │
├─────────────────────────────────────────────┤
│  [+ Upload New]  [Filter by Category ▼]    │
│                                             │
│  ┌─────┐  ┌─────┐  ┌─────┐  ┌─────┐       │
│  │ 🪑  │  │ 🛋️  │  │ 🌿  │  │ 💡  │       │
│  │Chair│  │Sofa │  │Plant│  │Lamp │       │
│  └─────┘  └─────┘  └─────┘  └─────┘       │
│  [Edit]    [Edit]    [Edit]    [Edit]      │
│                                             │
│  Drag to reorder ↕                          │
└─────────────────────────────────────────────┘
```

#### 3. Theme Editor
```
┌─────────────────────────────────────────────┐
│  Edit Theme: Warm Minimalism                │
├─────────────────────────────────────────────┤
│  Name: [Warm Minimalism__________]          │
│                                             │
│  Colors:                                    │
│  warmth-50:  [#FFF9F5] 🎨                  │
│  warmth-100: [#FFF3E8] 🎨                  │
│  warmth-500: [#E8A87C] 🎨                  │
│  ...                                        │
│                                             │
│  Fonts:                                     │
│  Primary: [Inter ▼]                        │
│  Decorative: [Crimson Pro ▼]               │
│                                             │
│  [Preview Changes]  [Save]  [Cancel]       │
└─────────────────────────────────────────────┘
```

---

## Asset Storage Structure

### Supabase Storage Buckets

```
storage/
├── furniture/
│   ├── seating/
│   │   ├── armchair-01.svg
│   │   ├── sofa-01.svg
│   │   └── ...
│   ├── tables/
│   ├── decoration/
│   └── ...
├── room-backgrounds/
│   ├── living-room-warm-minimalism.jpg
│   ├── kitchen-warm-minimalism.jpg
│   └── ...
├── magnets/
│   ├── heart-01.png
│   ├── star-01.png
│   └── ...
├── plants/
│   ├── stage-0.svg
│   ├── stage-1.svg
│   ├── ...
│   └── flowers/
│       ├── rose.svg
│       ├── daisy.svg
│       └── ...
├── ui-elements/
│   ├── frames/
│   │   ├── polaroid.svg
│   │   └── wooden.svg
│   └── icons/
└── user-uploads/          # User-generated content (separate)
    ├── featured-images/
    ├── doodles/
    └── gallery-photos/
```

---

## Implementation Priority

### Phase 1: Core Modular Architecture (Week 1-2)
1. Create new database tables for asset management
2. Build `useTheme()` and `useRoomAssets()` hooks
3. Refactor all components to use data-driven assets
4. Set up Supabase Storage buckets
5. Create initial theme in database

### Phase 2: Admin Panel Foundation (Week 3)
1. Admin authentication (check `is_admin` flag)
2. Admin routes and navigation
3. Dashboard overview
4. Basic theme viewer/selector

### Phase 3: Asset Uploaders (Week 4)
1. Furniture library uploader
2. Room background uploader
3. Magnet library uploader
4. Plant/flower asset uploader
5. File validation and optimization

### Phase 4: Theme Editor (Week 5)
1. Color palette editor with color pickers
2. Typography selector
3. Live preview system
4. Theme activation/deactivation

### Phase 5: Advanced Features (Week 6)
1. Drag-and-drop sorting for furniture
2. Bulk upload tools
3. Asset search and filtering
4. Preview comparisons (current vs new)

---

## Benefits of This Architecture

### For Development
- ✅ Easy to test different designs without code changes
- ✅ Rapid iteration on visual style
- ✅ No redeployment needed for visual updates
- ✅ Clean separation of concerns (code vs content)

### For Future
- ✅ Seasonal themes (winter, summer, anniversary edition)
- ✅ A/B testing different designs
- ✅ User preference for theme (future feature)
- ✅ White-label versions for different markets
- ✅ Community-contributed furniture (future marketplace)

### For Maintenance
- ✅ Non-developers can manage visual assets
- ✅ Rollback to previous theme if issues arise
- ✅ Preview before publishing prevents mistakes
- ✅ Organized asset library (no scattered files in codebase)

---

## Security Considerations

### Admin Access
- Only specific email addresses can be admins (whitelist in database)
- Admin routes require `is_admin = true` check
- Audit log for admin actions (who changed what, when)

### Asset Upload Security
- File type validation (only SVG, PNG, WebP, JPG)
- File size limits (2MB furniture, 5MB backgrounds)
- Malware scanning on upload (ClamAV or cloud service)
- Sanitize SVG files (remove scripts, external references)
- Signed URLs for uploads (prevent unauthorized access)

### Storage Permissions
- Admin buckets: Only admins can upload
- User buckets: Authenticated users can upload to their own folders
- Public read access for all assets (served via CDN)

---

## Migration Strategy

When redesigning:

1. **Create new theme** in admin panel
2. **Upload new assets** (furniture, backgrounds, etc.)
3. **Preview extensively** using test account
4. **Activate theme** (instant switch for all users)
5. **Keep old theme** as backup (can revert instantly)

Users see new design immediately without app update.

---

## Next Steps with CMS

This changes our development approach:

1. **Database first**: Set up asset tables before building UI
2. **Admin panel early**: Build admin tools alongside user features
3. **Seed initial data**: Populate furniture library, themes during setup
4. **Component architecture**: Always fetch assets, never hardcode

Should I update the main architecture document and development checklist with these CMS requirements?
