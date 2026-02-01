# Our House - Design System

## Design Philosophy
**Warm Minimalism**: Clean but cozy. Modern but emotional. Soft, slow, and intimate.

---

## Color Palette

### Primary Colors
```css
--warmth-50: #FFF9F5    /* Lightest cream - backgrounds */
--warmth-100: #FFF3E8   /* Soft cream - cards */
--warmth-200: #FFE8D6   /* Light peach - hover states */
--warmth-300: #FFD4B8   /* Warm beige - borders */
--warmth-500: #E8A87C   /* Warm terracotta - primary actions */
--warmth-700: #C77D55   /* Deep terracotta - emphasis */
--warmth-900: #8B5A3C   /* Rich brown - text */
```

### Accent Colors (per room)
```css
/* Living Room - Soft Gold */
--living-room: #D4A574

/* Kitchen - Gentle Green */
--kitchen: #A8C5A0

/* Garden - Fresh Sage */
--garden: #8FB88F

/* Gallery - Muted Purple */
--gallery: #B8A7C9

/* Bedroom - Dusty Rose */
--bedroom: #D4A5A5

/* Private Room - Soft Blue */
--private-room: #A3B8CC
```

### Neutrals
```css
--white: #FFFFFF
--gray-50: #FAFAF9
--gray-100: #F5F5F4
--gray-200: #E7E5E4
--gray-300: #D6D3D1
--gray-500: #78716C
--gray-700: #44403C
--gray-900: #1C1917    /* Deep text */
```

### Semantic Colors
```css
--success: #86A789     /* Gentle green */
--warning: #E8B86D     /* Soft amber */
--error: #D4918C       /* Muted red - gentle, not harsh */
--info: #8BA3B8        /* Soft blue */
```

---

## Typography

### Font Families
```css
/* Primary - Soft, humanist sans-serif */
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Decorative - For special moments, headers */
--font-decorative: 'Crimson Pro', Georgia, serif;

/* Handwriting - For notes, personal touches */
--font-handwriting: 'Kalam', 'Comic Sans MS', cursive;
```

### Font Sizes (Mobile-first)
```css
--text-xs: 0.75rem;     /* 12px - timestamps */
--text-sm: 0.875rem;    /* 14px - captions */
--text-base: 1rem;      /* 16px - body */
--text-lg: 1.125rem;    /* 18px - emphasis */
--text-xl: 1.25rem;     /* 20px - small headings */
--text-2xl: 1.5rem;     /* 24px - room titles */
--text-3xl: 1.875rem;   /* 30px - page titles */
--text-4xl: 2.25rem;    /* 36px - hero elements */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## Spacing Scale

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
--space-20: 5rem;     /* 80px */
```

---

## Border Radius

```css
--radius-sm: 0.375rem;   /* 6px - small elements */
--radius-md: 0.5rem;     /* 8px - cards, buttons */
--radius-lg: 0.75rem;    /* 12px - larger cards */
--radius-xl: 1rem;       /* 16px - modals */
--radius-2xl: 1.5rem;    /* 24px - special containers */
--radius-full: 9999px;   /* Pills, circles */
```

---

## Shadows (Soft & Warm)

```css
/* Subtle elevation */
--shadow-sm: 0 1px 2px 0 rgba(139, 90, 60, 0.05);

/* Card elevation */
--shadow-md: 0 4px 6px -1px rgba(139, 90, 60, 0.08),
             0 2px 4px -1px rgba(139, 90, 60, 0.04);

/* Floating elements */
--shadow-lg: 0 10px 15px -3px rgba(139, 90, 60, 0.1),
             0 4px 6px -2px rgba(139, 90, 60, 0.05);

/* Modals, overlays */
--shadow-xl: 0 20px 25px -5px rgba(139, 90, 60, 0.12),
             0 10px 10px -5px rgba(139, 90, 60, 0.04);

/* Inner shadow for depth */
--shadow-inner: inset 0 2px 4px 0 rgba(139, 90, 60, 0.06);
```

---

## Animation Principles

### Timing Functions
```css
/* Slow, organic easing - nothing snappy or mechanical */
--ease-slow: cubic-bezier(0.33, 1, 0.68, 1);        /* Slow out */
--ease-gentle: cubic-bezier(0.4, 0, 0.2, 1);        /* Material ease */
--ease-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55); /* Subtle bounce */
```

### Duration
```css
--duration-fast: 200ms;      /* Micro-interactions */
--duration-normal: 400ms;    /* Most transitions */
--duration-slow: 600ms;      /* Page transitions, reveals */
--duration-slower: 1000ms;   /* Special moments (plant growth) */
```

### Animation Guidelines
- **Default duration**: 400ms for most interactions
- **Delays**: Use sparingly for staggered reveals (100-200ms between items)
- **Movement**: Always ease out (objects slow down as they arrive)
- **Fades**: Gentle opacity transitions (0.8 → 1.0, not 0 → 1)
- **Scale**: Subtle (0.95 → 1.0 for pop-in, not 0 → 1)
- **Avoid**: Harsh snaps, bounces, spinner loops, loading skeletons

### Key Animations
```css
/* Fade in gently */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Soft scale appearance */
@keyframes appear {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

/* Gentle float (for decorative elements) */
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
}

/* Breathing effect (for living elements like plant) */
@keyframes breathe {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.02); }
}
```

---

## Interactive Elements

### Buttons
```css
/* Primary button */
.button-primary {
  background: var(--warmth-500);
  color: white;
  padding: var(--space-3) var(--space-6);
  border-radius: var(--radius-lg);
  font-weight: var(--font-medium);
  box-shadow: var(--shadow-md);
  transition: all var(--duration-normal) var(--ease-gentle);
}

.button-primary:hover {
  background: var(--warmth-700);
  transform: translateY(-1px);
  box-shadow: var(--shadow-lg);
}

.button-primary:active {
  transform: translateY(0);
  box-shadow: var(--shadow-sm);
}
```

### Cards
```css
.card {
  background: var(--warmth-100);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  box-shadow: var(--shadow-md);
  border: 1px solid var(--warmth-300);
  transition: transform var(--duration-normal) var(--ease-gentle);
}

.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}
```

### Input Fields
```css
.input {
  background: white;
  border: 2px solid var(--warmth-300);
  border-radius: var(--radius-md);
  padding: var(--space-3) var(--space-4);
  font-size: var(--text-base);
  transition: border-color var(--duration-normal) var(--ease-gentle);
}

.input:focus {
  outline: none;
  border-color: var(--warmth-500);
  box-shadow: 0 0 0 3px rgba(232, 168, 124, 0.1);
}
```

---

## Room-Specific Design Elements

### Living Room
- **Atmosphere**: Warm, welcoming, calm
- **Primary color**: Soft gold (#D4A574)
- **Key elements**: Soft lighting effect, subtle vignette, centered composition
- **Featured image**: Polaroid-style frame with slight rotation

### Kitchen
- **Atmosphere**: Playful, cozy, lived-in
- **Primary color**: Gentle green (#A8C5A0)
- **Key elements**: Fridge texture, sticky notes with paper texture, magnet shadows
- **Sticky notes**: 5-6 pastel colors, slight rotation variety (-3° to 3°)

### Garden
- **Atmosphere**: Peaceful, growing, nurturing
- **Primary color**: Fresh sage (#8FB88F)
- **Key elements**: Gentle breeze animation on leaves, soft soil texture
- **Plant growth**: Subtle height increase, new leaves appear slowly
- **Flowers**: Each goal = unique flower type with soft bloom animation

### Gallery
- **Atmosphere**: Curated, treasured, timeless
- **Primary color**: Muted purple (#B8A7C9)
- **Key elements**: Gallery wall texture, picture frame shadows
- **Albums**: Book-style appearance on shelf

### Bedroom
- **Atmosphere**: Intimate, protected, gentle
- **Primary color**: Dusty rose (#D4A5A5)
- **Key elements**: Soft lighting (warm glow), gentle fabric textures
- **Presents**: Gift-wrap styles, ribbon details, unopened vs opened states

### Private Rooms
- **Atmosphere**: Personal, creative, expressive
- **Primary color**: Soft blue (#A3B8CC)
- **Key elements**: Blank canvas feeling, gridded background (subtle)
- **Elements**: Drop shadow when dragging, snap-to-grid option

---

## Navigation Design

### Room Navigation
- **Style**: Bottom navigation bar (mobile-first)
- **Icons**: Simple, room-themed icons with labels
- **Transition**: Crossfade between rooms (600ms, no slide)
- **Active state**: Icon fills with room color, subtle glow

### Layout
```
┌─────────────────────────────┐
│                             │
│        Room Content         │
│                             │
│                             │
│                             │
│                             │
├─────────────────────────────┤
│  🛋  🧊  🌱  🖼  🛏  🎨   │  ← Navigation
└─────────────────────────────┘
```

---

## Iconography

### Style Guidelines
- Rounded, soft corners
- 2px stroke weight
- Outlined style (not filled, except active state)
- Warm, friendly feeling
- Hand-drawn quality accepted (slight imperfections)

### Icon Library Recommendation
- **Phosphor Icons** (duotone style) - warm, soft, customizable
- **Lucide Icons** - clean, modern, minimal
- Custom SVGs for room-specific objects (furniture, plants, etc.)

---

## Loading & Empty States

### Loading
- **No spinners**: Use gentle pulsing opacity on content placeholders
- **Skeleton screens**: Soft shapes that match content layout
- **Color**: var(--warmth-200) for placeholders

### Empty States
- **Not harsh**: Gentle illustrations, encouraging text
- **Example (Kitchen)**: "Your fridge is empty. Add your first note?"
- **Example (Gallery)**: "Start your collection with a memory."
- **Tone**: Inviting, never scolding or demanding

---

## Responsive Breakpoints

```css
/* Mobile-first approach */
--breakpoint-sm: 640px;   /* Large phones */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small laptops */
--breakpoint-xl: 1280px;  /* Desktops (rare for this app) */
```

### Design Priorities
1. **Mobile (320px - 640px)**: Primary design target
2. **Tablet (641px - 1024px)**: Optimize layout
3. **Desktop (1025px+)**: Bonus, center content, max-width container

---

## Accessibility

### Contrast Ratios
- Body text (--gray-900 on --warmth-50): 12.5:1 ✓
- Interactive elements: Minimum 4.5:1
- Decorative elements: Can be lower for ambiance

### Focus States
- Clear focus rings (3px, room color at 30% opacity)
- Skip to content link
- Keyboard navigation for all interactive elements

### Touch Targets
- Minimum 44px × 44px for all interactive elements
- Adequate spacing between tappable items (8px minimum)

### ARIA Labels
- All icons have descriptive labels
- Room navigation clearly labeled
- Image alt text for meaningful photos (user-provided or generic)

---

## Motion Preferences

Respect `prefers-reduced-motion`:
```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## File Organization

```
src/
├── styles/
│   ├── tokens.css          /* CSS variables from this doc */
│   ├── globals.css         /* Base styles, resets */
│   └── animations.css      /* Keyframe animations */
├── components/
│   ├── ui/                 /* Reusable components */
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   └── Modal.tsx
│   └── rooms/              /* Room-specific components */
│       ├── LivingRoom/
│       ├── Kitchen/
│       ├── Garden/
│       ├── Gallery/
│       ├── Bedroom/
│       └── PrivateRoom/
```

---

## Asset Requirements

### To Create/Source:
1. **Room background textures** (subtle, warm, non-distracting)
2. **Fridge illustration** (Kitchen)
3. **Plant sprite sheets** (Garden - 5-6 growth stages)
4. **Flower illustrations** (Garden - 8-10 unique types)
5. **Picture frame designs** (Gallery)
6. **Bed illustration** (Bedroom)
7. **Gift/present icons** (Bedroom - 4-5 styles)
8. **Furniture library** (Private Rooms - 20-30 items)
9. **Magnet designs** (Kitchen - 15-20 fun magnets)
10. **Room icons** (Navigation - 6 unique icons)

### Image Formats:
- **SVG**: Icons, simple illustrations, scalable elements
- **PNG**: Photos, complex illustrations with transparency
- **WebP**: Optimized photos (with PNG fallback)

---

## Implementation Notes

### CSS Architecture
- Use CSS custom properties (variables) for theming
- Tailwind CSS for utility classes (with custom config)
- CSS Modules or styled-components for component-scoped styles

### Animation Library
- **Framer Motion**: React animation library
  - Smooth drag interactions (sticky notes, room elements)
  - Page transitions between rooms
  - Gesture-based interactions (swipe, tap, long-press)

### Drawing Canvas (Doodle Notes)
- **React Konva** or **Fabric.js**
- Limited brush palette (5-6 warm colors)
- Brush sizes: Small, Medium, Large
- Eraser tool
- Export as PNG for storage

---

This design system creates a calm, warm, emotionally resonant experience that feels like home, not software.
