import React from 'react';

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

export interface FurnitureDefinition {
  id: string;
  name: string;
  category: string;
}

export const FURNITURE_CATEGORIES = [
  'Seating',
  'Tables',
  'Beds',
  'Storage',
  'Lighting',
  'Plants',
  'Art',
  'Rugs',
  'Tech',
  'Decor',
] as const;

// ---------------------------------------------------------------------------
// Definitions (45 items)
// ---------------------------------------------------------------------------

export const furnitureDefinitions: FurnitureDefinition[] = [
  // Seating (5)
  { id: 'armchair',        name: 'Armchair',         category: 'Seating' },
  { id: 'beanbag',         name: 'Beanbag',          category: 'Seating' },
  { id: 'rocking-chair',   name: 'Rocking Chair',    category: 'Seating' },
  { id: 'stool',           name: 'Stool',            category: 'Seating' },
  { id: 'floor-cushion',   name: 'Floor Cushion',    category: 'Seating' },

  // Tables (4)
  { id: 'coffee-table',      name: 'Coffee Table',      category: 'Tables' },
  { id: 'desk',              name: 'Desk',              category: 'Tables' },
  { id: 'side-table-round',  name: 'Round Side Table',  category: 'Tables' },
  { id: 'dining-table',      name: 'Dining Table',      category: 'Tables' },

  // Beds (3)
  { id: 'single-bed', name: 'Single Bed', category: 'Beds' },
  { id: 'hammock',    name: 'Hammock',    category: 'Beds' },
  { id: 'day-bed',    name: 'Day Bed',    category: 'Beds' },

  // Storage (4)
  { id: 'bookshelf',      name: 'Bookshelf',      category: 'Storage' },
  { id: 'dresser',        name: 'Dresser',        category: 'Storage' },
  { id: 'floating-shelf', name: 'Floating Shelf', category: 'Storage' },
  { id: 'trunk',          name: 'Trunk',          category: 'Storage' },

  // Lighting (4)
  { id: 'floor-lamp',    name: 'Floor Lamp',    category: 'Lighting' },
  { id: 'table-lamp',    name: 'Table Lamp',    category: 'Lighting' },
  { id: 'string-lights', name: 'String Lights', category: 'Lighting' },
  { id: 'candle-set',    name: 'Candle Set',    category: 'Lighting' },

  // Plants (5)
  { id: 'potted-fern',   name: 'Potted Fern',   category: 'Plants' },
  { id: 'cactus',        name: 'Cactus',        category: 'Plants' },
  { id: 'monstera',      name: 'Monstera',      category: 'Plants' },
  { id: 'hanging-plant', name: 'Hanging Plant', category: 'Plants' },
  { id: 'flower-vase',   name: 'Flower Vase',   category: 'Plants' },

  // Art (5)
  { id: 'painting-abstract',   name: 'Abstract Painting',   category: 'Art' },
  { id: 'painting-landscape',  name: 'Landscape Painting',  category: 'Art' },
  { id: 'wall-mirror',         name: 'Wall Mirror',         category: 'Art' },
  { id: 'photo-wall',          name: 'Photo Wall',          category: 'Art' },
  { id: 'wall-clock',          name: 'Wall Clock',          category: 'Art' },

  // Rugs (3)
  { id: 'round-rug',     name: 'Round Rug',     category: 'Rugs' },
  { id: 'rectangle-rug', name: 'Rectangle Rug', category: 'Rugs' },
  { id: 'runner-rug',    name: 'Runner Rug',    category: 'Rugs' },

  // Tech (3)
  { id: 'record-player', name: 'Record Player', category: 'Tech' },
  { id: 'laptop',        name: 'Laptop',        category: 'Tech' },
  { id: 'speaker',       name: 'Speaker',       category: 'Tech' },

  // Decor (9)
  { id: 'globe',          name: 'Globe',          category: 'Decor' },
  { id: 'terrarium',      name: 'Terrarium',      category: 'Decor' },
  { id: 'stack-of-books', name: 'Stack of Books', category: 'Decor' },
  { id: 'mug',            name: 'Mug',            category: 'Decor' },
  { id: 'cat-bed',        name: 'Cat Bed',        category: 'Decor' },
  { id: 'guitar',         name: 'Guitar',         category: 'Decor' },
  { id: 'yoga-mat',       name: 'Yoga Mat',       category: 'Decor' },
  { id: 'dream-catcher',  name: 'Dream Catcher',  category: 'Decor' },
  { id: 'polaroid-string', name: 'Polaroid String', category: 'Decor' },
];

// ---------------------------------------------------------------------------
// SVG Renderers  (each ~80x80 viewBox, 3-10 elements, cozy warm palette)
// ---------------------------------------------------------------------------

const renderers: Record<string, () => React.ReactNode> = {

  /* ===== SEATING ===== */

  armchair: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Back */}
      <rect x="15" y="10" width="50" height="40" rx="8" fill="#B87333" />
      {/* Seat cushion */}
      <rect x="18" y="38" width="44" height="18" rx="5" fill="#D4956A" />
      {/* Left arm */}
      <rect x="8" y="22" width="12" height="36" rx="5" fill="#A0612B" />
      {/* Right arm */}
      <rect x="60" y="22" width="12" height="36" rx="5" fill="#A0612B" />
      {/* Left leg */}
      <rect x="16" y="58" width="6" height="14" rx="2" fill="#6B3A1F" />
      {/* Right leg */}
      <rect x="58" y="58" width="6" height="14" rx="2" fill="#6B3A1F" />
    </svg>
  ),

  beanbag: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <ellipse cx="40" cy="48" rx="30" ry="26" fill="#E8927C" />
      {/* Top bulge */}
      <ellipse cx="36" cy="26" rx="20" ry="16" fill="#F0A58E" />
      {/* Shadow fold */}
      <path d="M20 44 Q40 38 60 44" stroke="#D07060" strokeWidth="2" fill="none" />
      {/* Highlight */}
      <ellipse cx="32" cy="30" rx="6" ry="4" fill="#F5BDA8" opacity="0.6" />
    </svg>
  ),

  'rocking-chair': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Rockers */}
      <path d="M8 72 Q40 60 72 72" stroke="#5C3317" strokeWidth="3" fill="none" />
      {/* Back legs */}
      <line x1="22" y1="30" x2="20" y2="68" stroke="#8B5E3C" strokeWidth="3" />
      <line x1="58" y1="30" x2="60" y2="68" stroke="#8B5E3C" strokeWidth="3" />
      {/* Seat */}
      <rect x="20" y="44" width="40" height="6" rx="2" fill="#A97B50" />
      {/* Back rest */}
      <rect x="22" y="14" width="36" height="30" rx="4" fill="#C4935A" />
      {/* Back slats */}
      <line x1="32" y1="16" x2="32" y2="42" stroke="#A97B50" strokeWidth="2" />
      <line x1="40" y1="16" x2="40" y2="42" stroke="#A97B50" strokeWidth="2" />
      <line x1="48" y1="16" x2="48" y2="42" stroke="#A97B50" strokeWidth="2" />
    </svg>
  ),

  stool: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Seat */}
      <ellipse cx="40" cy="28" rx="22" ry="8" fill="#C4935A" />
      {/* Seat top highlight */}
      <ellipse cx="40" cy="26" rx="18" ry="5" fill="#D4A86A" />
      {/* Leg left */}
      <line x1="26" y1="34" x2="22" y2="72" stroke="#8B5E3C" strokeWidth="4" />
      {/* Leg right */}
      <line x1="54" y1="34" x2="58" y2="72" stroke="#8B5E3C" strokeWidth="4" />
      {/* Leg center */}
      <line x1="40" y1="36" x2="40" y2="72" stroke="#8B5E3C" strokeWidth="4" />
      {/* Cross bar */}
      <line x1="26" y1="56" x2="58" y2="56" stroke="#6B3A1F" strokeWidth="2" />
    </svg>
  ),

  'floor-cushion': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Shadow */}
      <ellipse cx="40" cy="62" rx="30" ry="8" fill="#D9C4A8" opacity="0.4" />
      {/* Cushion body */}
      <ellipse cx="40" cy="50" rx="28" ry="14" fill="#D4726A" />
      {/* Top surface */}
      <ellipse cx="40" cy="44" rx="26" ry="10" fill="#E8887E" />
      {/* Center tuft */}
      <circle cx="40" cy="44" r="4" fill="#C45A52" />
      {/* Decorative ring */}
      <ellipse cx="40" cy="44" rx="14" ry="6" fill="none" stroke="#C45A52" strokeWidth="1" />
    </svg>
  ),

  /* ===== TABLES ===== */

  'coffee-table': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Table top */}
      <rect x="8" y="30" width="64" height="8" rx="3" fill="#A0612B" />
      {/* Table top surface */}
      <rect x="10" y="28" width="60" height="6" rx="2" fill="#C4935A" />
      {/* Left leg */}
      <rect x="14" y="38" width="6" height="32" rx="1" fill="#8B5E3C" />
      {/* Right leg */}
      <rect x="60" y="38" width="6" height="32" rx="1" fill="#8B5E3C" />
      {/* Shelf */}
      <rect x="16" y="56" width="48" height="4" rx="1" fill="#A0612B" />
    </svg>
  ),

  desk: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Desktop */}
      <rect x="6" y="22" width="68" height="7" rx="2" fill="#B07840" />
      {/* Desktop surface */}
      <rect x="8" y="20" width="64" height="6" rx="2" fill="#C8A060" />
      {/* Left legs */}
      <rect x="10" y="29" width="5" height="44" fill="#8B6530" />
      <rect x="10" y="29" width="18" height="5" fill="#8B6530" />
      {/* Drawer */}
      <rect x="12" y="36" width="14" height="10" rx="1" fill="#A07838" />
      <circle cx="19" cy="41" r="1.5" fill="#6B4E20" />
      {/* Right legs */}
      <rect x="65" y="29" width="5" height="44" fill="#8B6530" />
      <rect x="58" y="29" width="12" height="5" fill="#8B6530" />
    </svg>
  ),

  'side-table-round': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Table top */}
      <ellipse cx="40" cy="26" rx="24" ry="8" fill="#A0612B" />
      {/* Top surface */}
      <ellipse cx="40" cy="24" rx="22" ry="7" fill="#C4935A" />
      {/* Center leg */}
      <rect x="37" y="32" width="6" height="30" fill="#8B5E3C" />
      {/* Base */}
      <ellipse cx="40" cy="66" rx="18" ry="6" fill="#8B5E3C" />
      <ellipse cx="40" cy="64" rx="16" ry="5" fill="#A0612B" />
    </svg>
  ),

  'dining-table': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Table top */}
      <rect x="4" y="24" width="72" height="8" rx="3" fill="#A0612B" />
      {/* Surface */}
      <rect x="6" y="22" width="68" height="6" rx="2" fill="#C8A060" />
      {/* Four legs */}
      <rect x="10" y="32" width="5" height="40" rx="1" fill="#8B5E3C" />
      <rect x="65" y="32" width="5" height="40" rx="1" fill="#8B5E3C" />
      <rect x="30" y="32" width="5" height="40" rx="1" fill="#8B5E3C" />
      <rect x="48" y="32" width="5" height="40" rx="1" fill="#8B5E3C" />
    </svg>
  ),

  /* ===== BEDS ===== */

  'single-bed': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Frame */}
      <rect x="8" y="24" width="64" height="40" rx="4" fill="#8B6530" />
      {/* Mattress */}
      <rect x="10" y="28" width="60" height="32" rx="3" fill="#F5E6D0" />
      {/* Pillow */}
      <rect x="12" y="30" width="20" height="12" rx="5" fill="#E8D5B8" />
      {/* Blanket */}
      <rect x="10" y="44" width="60" height="16" rx="2" fill="#7B8EB5" />
      {/* Blanket fold */}
      <path d="M10 44 Q40 40 70 44" fill="#8FA0C4" />
      {/* Headboard */}
      <rect x="6" y="14" width="8" height="52" rx="3" fill="#6B4E20" />
      {/* Footboard */}
      <rect x="66" y="24" width="8" height="42" rx="3" fill="#6B4E20" />
    </svg>
  ),

  hammock: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Left post */}
      <line x1="8" y1="10" x2="8" y2="74" stroke="#8B5E3C" strokeWidth="4" />
      {/* Right post */}
      <line x1="72" y1="10" x2="72" y2="74" stroke="#8B5E3C" strokeWidth="4" />
      {/* Hammock fabric */}
      <path d="M10 24 Q40 58 70 24" fill="#E8C4A0" stroke="#D4A878" strokeWidth="2" />
      {/* Net lines */}
      <path d="M16 28 Q40 52 64 28" fill="none" stroke="#C8A060" strokeWidth="1" />
      <path d="M22 32 Q40 48 58 32" fill="none" stroke="#C8A060" strokeWidth="1" />
      {/* Left rope */}
      <line x1="8" y1="18" x2="14" y2="26" stroke="#A08060" strokeWidth="2" />
      {/* Right rope */}
      <line x1="72" y1="18" x2="66" y2="26" stroke="#A08060" strokeWidth="2" />
    </svg>
  ),

  'day-bed': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Frame base */}
      <rect x="6" y="36" width="68" height="28" rx="4" fill="#8B6530" />
      {/* Cushion */}
      <rect x="8" y="34" width="64" height="20" rx="6" fill="#C9A0DC" />
      {/* Back rest */}
      <rect x="6" y="16" width="68" height="22" rx="6" fill="#A878C0" />
      {/* Pillows */}
      <ellipse cx="22" cy="30" rx="10" ry="7" fill="#D4B8E8" />
      <ellipse cx="42" cy="32" rx="8" ry="6" fill="#E0C8F0" />
      {/* Legs */}
      <rect x="10" y="64" width="5" height="10" rx="1" fill="#6B4E20" />
      <rect x="65" y="64" width="5" height="10" rx="1" fill="#6B4E20" />
    </svg>
  ),

  /* ===== STORAGE ===== */

  bookshelf: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Frame */}
      <rect x="10" y="4" width="60" height="72" rx="2" fill="#A0612B" />
      {/* Shelves */}
      <rect x="12" y="4" width="56" height="4" fill="#8B5E3C" />
      <rect x="12" y="26" width="56" height="3" fill="#8B5E3C" />
      <rect x="12" y="50" width="56" height="3" fill="#8B5E3C" />
      {/* Books row 1 */}
      <rect x="16" y="8" width="6" height="18" fill="#D4726A" />
      <rect x="23" y="10" width="5" height="16" fill="#7B8EB5" />
      <rect x="29" y="8" width="7" height="18" fill="#E8C060" />
      <rect x="37" y="9" width="5" height="17" fill="#6BAF7B" />
      <rect x="44" y="8" width="8" height="18" fill="#C9A0DC" />
      {/* Books row 2 */}
      <rect x="16" y="30" width="8" height="20" fill="#E8887E" />
      <rect x="26" y="32" width="6" height="18" fill="#8BB8D0" />
      <rect x="34" y="30" width="5" height="20" fill="#D4A060" />
    </svg>
  ),

  dresser: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="10" y="10" width="60" height="54" rx="3" fill="#B07840" />
      {/* Top */}
      <rect x="8" y="8" width="64" height="6" rx="2" fill="#C8A060" />
      {/* Drawer 1 */}
      <rect x="14" y="18" width="52" height="14" rx="2" fill="#C4935A" />
      <circle cx="40" cy="25" r="2" fill="#6B4E20" />
      {/* Drawer 2 */}
      <rect x="14" y="36" width="52" height="14" rx="2" fill="#C4935A" />
      <circle cx="40" cy="43" r="2" fill="#6B4E20" />
      {/* Drawer 3 */}
      <rect x="14" y="54" width="52" height="8" rx="2" fill="#C4935A" />
      <circle cx="40" cy="58" r="2" fill="#6B4E20" />
      {/* Legs */}
      <rect x="14" y="64" width="5" height="10" rx="1" fill="#8B5E3C" />
      <rect x="61" y="64" width="5" height="10" rx="1" fill="#8B5E3C" />
    </svg>
  ),

  'floating-shelf': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Shelf */}
      <rect x="6" y="32" width="68" height="6" rx="2" fill="#A0612B" />
      {/* Bracket left */}
      <path d="M14 38 L14 50 L6 50" stroke="#8B5E3C" strokeWidth="3" fill="none" />
      {/* Bracket right */}
      <path d="M66 38 L66 50 L74 50" stroke="#8B5E3C" strokeWidth="3" fill="none" />
      {/* Book */}
      <rect x="18" y="20" width="8" height="12" fill="#D4726A" />
      {/* Plant pot */}
      <rect x="34" y="22" width="12" height="10" rx="2" fill="#C8A060" />
      <ellipse cx="40" cy="20" rx="8" ry="5" fill="#6BAF7B" />
      {/* Frame */}
      <rect x="54" y="16" width="10" height="16" rx="1" fill="#E8D5B8" stroke="#8B5E3C" strokeWidth="1" />
    </svg>
  ),

  trunk: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="8" y="28" width="64" height="36" rx="4" fill="#8B6530" />
      {/* Lid */}
      <path d="M8 28 Q40 14 72 28" fill="#A07838" />
      <rect x="8" y="26" width="64" height="6" rx="2" fill="#A07838" />
      {/* Metal bands */}
      <rect x="8" y="40" width="64" height="3" fill="#B8A060" />
      <rect x="8" y="54" width="64" height="3" fill="#B8A060" />
      {/* Latch */}
      <rect x="35" y="26" width="10" height="8" rx="2" fill="#D4A060" />
      <circle cx="40" cy="30" r="2" fill="#8B6530" />
      {/* Corner accents */}
      <rect x="8" y="28" width="6" height="36" rx="1" fill="#A07838" opacity="0.5" />
      <rect x="66" y="28" width="6" height="36" rx="1" fill="#A07838" opacity="0.5" />
    </svg>
  ),

  /* ===== LIGHTING ===== */

  'floor-lamp': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <ellipse cx="40" cy="72" rx="14" ry="4" fill="#8B5E3C" />
      {/* Pole */}
      <rect x="38" y="24" width="4" height="48" fill="#A0612B" />
      {/* Shade */}
      <path d="M22 8 L58 8 L54 28 L26 28 Z" fill="#F5E0B8" />
      {/* Inner glow */}
      <path d="M28 12 L52 12 L50 26 L30 26 Z" fill="#FFF0D0" opacity="0.6" />
      {/* Shade top */}
      <rect x="22" y="6" width="36" height="4" rx="2" fill="#E8D0A0" />
    </svg>
  ),

  'table-lamp': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <ellipse cx="40" cy="70" rx="16" ry="5" fill="#C8A060" />
      {/* Stem */}
      <rect x="37" y="42" width="6" height="28" fill="#A0612B" />
      {/* Shade */}
      <path d="M18 18 L62 18 L56 44 L24 44 Z" fill="#F0D4A0" />
      {/* Inner glow */}
      <path d="M24 22 L56 22 L52 40 L28 40 Z" fill="#FFF5E0" opacity="0.5" />
      {/* Shade top rim */}
      <rect x="18" y="16" width="44" height="4" rx="2" fill="#E0C488" />
    </svg>
  ),

  'string-lights': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Wire */}
      <path d="M4 20 Q20 34 40 22 Q60 10 76 26" fill="none" stroke="#5C5C5C" strokeWidth="1.5" />
      {/* Bulb 1 */}
      <circle cx="12" cy="26" r="5" fill="#FFE680" />
      <circle cx="12" cy="26" r="3" fill="#FFF5C0" />
      {/* Bulb 2 */}
      <circle cx="28" cy="30" r="5" fill="#FFB870" />
      <circle cx="28" cy="30" r="3" fill="#FFDCB0" />
      {/* Bulb 3 */}
      <circle cx="44" cy="22" r="5" fill="#FFE680" />
      <circle cx="44" cy="22" r="3" fill="#FFF5C0" />
      {/* Bulb 4 */}
      <circle cx="60" cy="18" r="5" fill="#FFAA80" />
      <circle cx="60" cy="18" r="3" fill="#FFDCC0" />
      {/* Bulb 5 */}
      <circle cx="72" cy="28" r="5" fill="#FFE680" />
      <circle cx="72" cy="28" r="3" fill="#FFF5C0" />
    </svg>
  ),

  'candle-set': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Candle 1 - tall */}
      <rect x="14" y="30" width="12" height="36" rx="2" fill="#F5E6D0" />
      <ellipse cx="20" cy="24" rx="4" ry="7" fill="#FFB840" />
      <ellipse cx="20" cy="22" rx="2" ry="4" fill="#FFE080" />
      {/* Candle 2 - medium */}
      <rect x="34" y="42" width="12" height="24" rx="2" fill="#E8D5B8" />
      <ellipse cx="40" cy="36" rx="4" ry="7" fill="#FFB840" />
      <ellipse cx="40" cy="34" rx="2" ry="4" fill="#FFE080" />
      {/* Candle 3 - short */}
      <rect x="54" y="50" width="12" height="16" rx="2" fill="#F5E6D0" />
      <ellipse cx="60" cy="44" rx="4" ry="7" fill="#FFB840" />
      <ellipse cx="60" cy="42" rx="2" ry="4" fill="#FFE080" />
      {/* Plate */}
      <ellipse cx="40" cy="68" rx="34" ry="6" fill="#C8B898" opacity="0.5" />
    </svg>
  ),

  /* ===== PLANTS ===== */

  'potted-fern': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <path d="M24 52 L28 72 L52 72 L56 52 Z" fill="#C07040" />
      <rect x="22" y="48" width="36" height="6" rx="2" fill="#D08050" />
      {/* Fronds */}
      <path d="M40 46 Q20 20 8 28" stroke="#4A8C5C" strokeWidth="3" fill="none" />
      <path d="M40 46 Q60 20 72 28" stroke="#4A8C5C" strokeWidth="3" fill="none" />
      <path d="M40 46 Q28 14 18 16" stroke="#5CA06C" strokeWidth="2" fill="none" />
      <path d="M40 46 Q52 14 62 16" stroke="#5CA06C" strokeWidth="2" fill="none" />
      <path d="M40 46 Q38 10 40 6" stroke="#6BAF7B" strokeWidth="2" fill="none" />
      {/* Center leaves */}
      <ellipse cx="40" cy="44" rx="8" ry="5" fill="#5CA06C" />
    </svg>
  ),

  cactus: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <path d="M26 58 L30 74 L50 74 L54 58 Z" fill="#C07040" />
      <rect x="24" y="54" width="32" height="6" rx="2" fill="#D08050" />
      {/* Main body */}
      <rect x="32" y="16" width="16" height="40" rx="8" fill="#5A9E5A" />
      {/* Left arm */}
      <path d="M32 34 L20 34 L20 22 Q20 18 24 18 L24 30 L32 30" fill="#4E8E4E" />
      {/* Right arm */}
      <path d="M48 28 L58 28 L58 18 Q58 14 54 14 L54 24 L48 24" fill="#4E8E4E" />
      {/* Spines */}
      <line x1="40" y1="16" x2="40" y2="12" stroke="#8BC88B" strokeWidth="1" />
      <line x1="34" y1="24" x2="30" y2="22" stroke="#8BC88B" strokeWidth="1" />
      <line x1="46" y1="36" x2="50" y2="34" stroke="#8BC88B" strokeWidth="1" />
      {/* Flower */}
      <circle cx="40" cy="14" r="3" fill="#FF8899" />
    </svg>
  ),

  monstera: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Pot */}
      <path d="M26 58 L30 74 L50 74 L54 58 Z" fill="#D4956A" />
      <rect x="24" y="54" width="32" height="6" rx="2" fill="#E0A878" />
      {/* Stems */}
      <line x1="40" y1="54" x2="30" y2="28" stroke="#3D7A3D" strokeWidth="2" />
      <line x1="40" y1="54" x2="52" y2="24" stroke="#3D7A3D" strokeWidth="2" />
      <line x1="40" y1="54" x2="40" y2="18" stroke="#3D7A3D" strokeWidth="2" />
      {/* Leaf 1 */}
      <path d="M30 28 Q16 18 20 8 Q28 14 30 28" fill="#4A8C5C" />
      <path d="M24 16 Q26 20 26 24" stroke="#3D7A3D" strokeWidth="1" fill="none" />
      {/* Leaf 2 */}
      <path d="M52 24 Q66 14 64 4 Q54 12 52 24" fill="#5CA06C" />
      <path d="M58 12 Q56 16 54 20" stroke="#4A8C5C" strokeWidth="1" fill="none" />
      {/* Leaf 3 */}
      <path d="M40 18 Q32 4 40 -2 Q48 4 40 18" fill="#6BAF7B" />
    </svg>
  ),

  'hanging-plant': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Hanger strings */}
      <line x1="40" y1="2" x2="28" y2="24" stroke="#A08060" strokeWidth="1.5" />
      <line x1="40" y1="2" x2="52" y2="24" stroke="#A08060" strokeWidth="1.5" />
      <line x1="40" y1="2" x2="40" y2="20" stroke="#A08060" strokeWidth="1.5" />
      {/* Hook */}
      <circle cx="40" cy="2" r="2" fill="#8B8B8B" />
      {/* Pot */}
      <path d="M26 24 L30 42 L50 42 L54 24 Z" fill="#C07040" />
      {/* Trailing vines */}
      <path d="M30 40 Q22 56 16 70" stroke="#5CA06C" strokeWidth="2" fill="none" />
      <path d="M50 40 Q58 56 64 68" stroke="#5CA06C" strokeWidth="2" fill="none" />
      <path d="M40 42 Q38 60 34 74" stroke="#6BAF7B" strokeWidth="2" fill="none" />
      {/* Leaves on vines */}
      <ellipse cx="20" cy="60" rx="4" ry="3" fill="#5CA06C" transform="rotate(-20 20 60)" />
      <ellipse cx="60" cy="58" rx="4" ry="3" fill="#5CA06C" transform="rotate(20 60 58)" />
      <ellipse cx="36" cy="64" rx="4" ry="3" fill="#6BAF7B" />
    </svg>
  ),

  'flower-vase': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Vase */}
      <path d="M28 44 Q24 60 28 72 L52 72 Q56 60 52 44 Z" fill="#8BB8D0" />
      <path d="M30 44 Q34 40 40 38 Q46 40 50 44" fill="#8BB8D0" />
      {/* Stems */}
      <line x1="34" y1="42" x2="28" y2="14" stroke="#5CA06C" strokeWidth="2" />
      <line x1="40" y1="38" x2="40" y2="10" stroke="#5CA06C" strokeWidth="2" />
      <line x1="46" y1="42" x2="52" y2="16" stroke="#5CA06C" strokeWidth="2" />
      {/* Flowers */}
      <circle cx="28" cy="12" r="6" fill="#E8887E" />
      <circle cx="28" cy="12" r="3" fill="#FFB8A0" />
      <circle cx="40" cy="8" r="6" fill="#FFD060" />
      <circle cx="40" cy="8" r="3" fill="#FFE8A0" />
      <circle cx="52" cy="14" r="6" fill="#C9A0DC" />
      <circle cx="52" cy="14" r="3" fill="#E0C8F0" />
    </svg>
  ),

  /* ===== ART ===== */

  'painting-abstract': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Frame */}
      <rect x="8" y="10" width="64" height="52" rx="2" fill="#8B6530" />
      {/* Canvas */}
      <rect x="12" y="14" width="56" height="44" fill="#FFF5E6" />
      {/* Abstract shapes */}
      <circle cx="28" cy="30" r="10" fill="#D4726A" opacity="0.8" />
      <rect x="38" y="20" width="18" height="18" fill="#4A8CB0" opacity="0.7" transform="rotate(15 47 29)" />
      <path d="M20 50 L40 28 L60 52" fill="#E8C060" opacity="0.6" />
      <circle cx="52" cy="44" r="8" fill="#6BAF7B" opacity="0.7" />
      {/* Hanging wire */}
      <path d="M30 10 L40 4 L50 10" stroke="#666" strokeWidth="1" fill="none" />
    </svg>
  ),

  'painting-landscape': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Frame */}
      <rect x="8" y="10" width="64" height="52" rx="2" fill="#8B6530" />
      {/* Sky */}
      <rect x="12" y="14" width="56" height="28" fill="#87CEEB" />
      {/* Sun */}
      <circle cx="56" cy="24" r="6" fill="#FFD060" />
      {/* Mountains */}
      <path d="M12 42 L28 22 L44 38 L56 26 L68 42 Z" fill="#8B9EAF" />
      <path d="M12 42 L22 30 L36 42" fill="#A0B0BF" />
      {/* Ground */}
      <rect x="12" y="40" width="56" height="18" fill="#7BAF60" />
      {/* Trees */}
      <path d="M20 36 L24 44 L16 44 Z" fill="#3D7A3D" />
      <path d="M48 34 L52 42 L44 42 Z" fill="#3D7A3D" />
      {/* Hanging wire */}
      <path d="M30 10 L40 4 L50 10" stroke="#666" strokeWidth="1" fill="none" />
    </svg>
  ),

  'wall-mirror': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Frame */}
      <ellipse cx="40" cy="40" rx="28" ry="34" fill="#C8A060" />
      {/* Mirror */}
      <ellipse cx="40" cy="40" rx="24" ry="30" fill="#D8E8F0" />
      {/* Reflection highlight */}
      <ellipse cx="32" cy="30" rx="8" ry="14" fill="#E8F4FC" opacity="0.6" />
      {/* Frame detail */}
      <ellipse cx="40" cy="40" rx="26" ry="32" fill="none" stroke="#B89850" strokeWidth="2" />
      {/* Hanging hook */}
      <circle cx="40" cy="4" r="3" fill="#8B8B8B" />
    </svg>
  ),

  'photo-wall': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Photo 1 */}
      <rect x="4" y="6" width="22" height="18" rx="1" fill="#F5E6D0" stroke="#C8A060" strokeWidth="1" />
      <rect x="6" y="8" width="18" height="14" fill="#B8D4E8" />
      {/* Photo 2 */}
      <rect x="30" y="4" width="20" height="24" rx="1" fill="#F5E6D0" stroke="#C8A060" strokeWidth="1" />
      <rect x="32" y="6" width="16" height="20" fill="#E8C4A0" />
      {/* Photo 3 */}
      <rect x="54" y="8" width="22" height="16" rx="1" fill="#F5E6D0" stroke="#C8A060" strokeWidth="1" />
      <rect x="56" y="10" width="18" height="12" fill="#C9E0B8" />
      {/* Photo 4 */}
      <rect x="8" y="30" width="24" height="20" rx="1" fill="#F5E6D0" stroke="#C8A060" strokeWidth="1" />
      <rect x="10" y="32" width="20" height="16" fill="#E8B8C8" />
      {/* Photo 5 */}
      <rect x="36" y="32" width="18" height="22" rx="1" fill="#F5E6D0" stroke="#C8A060" strokeWidth="1" />
      <rect x="38" y="34" width="14" height="18" fill="#D4C8E8" />
      {/* Photo 6 */}
      <rect x="58" y="28" width="18" height="18" rx="1" fill="#F5E6D0" stroke="#C8A060" strokeWidth="1" />
      <rect x="60" y="30" width="14" height="14" fill="#B8D4C8" />
    </svg>
  ),

  'wall-clock': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Frame */}
      <circle cx="40" cy="40" r="32" fill="#F5E6D0" stroke="#8B6530" strokeWidth="4" />
      {/* Inner ring */}
      <circle cx="40" cy="40" r="28" fill="none" stroke="#C8A060" strokeWidth="1" />
      {/* Hour marks */}
      <line x1="40" y1="14" x2="40" y2="18" stroke="#6B4E20" strokeWidth="2" />
      <line x1="40" y1="62" x2="40" y2="66" stroke="#6B4E20" strokeWidth="2" />
      <line x1="14" y1="40" x2="18" y2="40" stroke="#6B4E20" strokeWidth="2" />
      <line x1="62" y1="40" x2="66" y2="40" stroke="#6B4E20" strokeWidth="2" />
      {/* Hour hand */}
      <line x1="40" y1="40" x2="40" y2="22" stroke="#5C3317" strokeWidth="3" strokeLinecap="round" />
      {/* Minute hand */}
      <line x1="40" y1="40" x2="54" y2="28" stroke="#5C3317" strokeWidth="2" strokeLinecap="round" />
      {/* Center */}
      <circle cx="40" cy="40" r="3" fill="#8B6530" />
    </svg>
  ),

  /* ===== RUGS ===== */

  'round-rug': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Outer ring */}
      <ellipse cx="40" cy="44" rx="34" ry="24" fill="#C4626A" />
      {/* Middle ring */}
      <ellipse cx="40" cy="44" rx="26" ry="18" fill="#D4887E" />
      {/* Inner ring */}
      <ellipse cx="40" cy="44" rx="18" ry="12" fill="#E8A898" />
      {/* Center */}
      <ellipse cx="40" cy="44" rx="8" ry="5" fill="#F0C8B8" />
      {/* Fringe dots */}
      <circle cx="10" cy="44" r="2" fill="#C4626A" opacity="0.5" />
      <circle cx="70" cy="44" r="2" fill="#C4626A" opacity="0.5" />
      <circle cx="20" cy="28" r="2" fill="#C4626A" opacity="0.5" />
      <circle cx="60" cy="28" r="2" fill="#C4626A" opacity="0.5" />
    </svg>
  ),

  'rectangle-rug': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Outer border */}
      <rect x="6" y="18" width="68" height="44" rx="2" fill="#7B6EA0" />
      {/* Inner border */}
      <rect x="12" y="24" width="56" height="32" rx="1" fill="#9688B4" />
      {/* Center field */}
      <rect x="18" y="30" width="44" height="20" fill="#B0A4C8" />
      {/* Pattern - diamond */}
      <path d="M40 32 L52 40 L40 48 L28 40 Z" fill="#7B6EA0" opacity="0.5" />
      {/* Corner accents */}
      <rect x="8" y="20" width="6" height="6" fill="#6B5E90" />
      <rect x="66" y="20" width="6" height="6" fill="#6B5E90" />
      <rect x="8" y="54" width="6" height="6" fill="#6B5E90" />
      <rect x="66" y="54" width="6" height="6" fill="#6B5E90" />
    </svg>
  ),

  'runner-rug': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="24" y="4" width="32" height="72" rx="2" fill="#C08850" />
      {/* Stripe pattern */}
      <rect x="26" y="10" width="28" height="6" fill="#D4A060" />
      <rect x="26" y="22" width="28" height="6" fill="#D4A060" />
      <rect x="26" y="34" width="28" height="6" fill="#D4A060" />
      <rect x="26" y="46" width="28" height="6" fill="#D4A060" />
      <rect x="26" y="58" width="28" height="6" fill="#D4A060" />
      {/* Fringe top */}
      <line x1="28" y1="4" x2="28" y2="0" stroke="#C08850" strokeWidth="2" />
      <line x1="36" y1="4" x2="36" y2="0" stroke="#C08850" strokeWidth="2" />
      <line x1="44" y1="4" x2="44" y2="0" stroke="#C08850" strokeWidth="2" />
      <line x1="52" y1="4" x2="52" y2="0" stroke="#C08850" strokeWidth="2" />
      {/* Fringe bottom */}
      <line x1="28" y1="76" x2="28" y2="80" stroke="#C08850" strokeWidth="2" />
      <line x1="36" y1="76" x2="36" y2="80" stroke="#C08850" strokeWidth="2" />
      <line x1="44" y1="76" x2="44" y2="80" stroke="#C08850" strokeWidth="2" />
      <line x1="52" y1="76" x2="52" y2="80" stroke="#C08850" strokeWidth="2" />
    </svg>
  ),

  /* ===== TECH ===== */

  'record-player': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Base */}
      <rect x="6" y="18" width="68" height="50" rx="4" fill="#5C3317" />
      {/* Top surface */}
      <rect x="8" y="16" width="64" height="48" rx="3" fill="#8B5E3C" />
      {/* Record */}
      <circle cx="36" cy="40" r="18" fill="#1A1A1A" />
      <circle cx="36" cy="40" r="12" fill="#2A2A2A" />
      <circle cx="36" cy="40" r="4" fill="#D4726A" />
      <circle cx="36" cy="40" r="1.5" fill="#1A1A1A" />
      {/* Tone arm */}
      <line x1="62" y1="22" x2="62" y2="26" stroke="#B8B8B8" strokeWidth="3" />
      <line x1="62" y1="26" x2="44" y2="36" stroke="#B8B8B8" strokeWidth="2" />
      {/* Arm base */}
      <circle cx="62" cy="24" r="3" fill="#999" />
    </svg>
  ),

  laptop: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Screen back */}
      <rect x="12" y="10" width="56" height="36" rx="3" fill="#4A4A5A" />
      {/* Screen */}
      <rect x="15" y="13" width="50" height="30" rx="1" fill="#5C8AB4" />
      {/* Screen content */}
      <rect x="20" y="18" width="20" height="3" rx="1" fill="#8BB8D0" />
      <rect x="20" y="24" width="30" height="2" rx="1" fill="#8BB8D0" opacity="0.6" />
      <rect x="20" y="29" width="25" height="2" rx="1" fill="#8BB8D0" opacity="0.6" />
      {/* Base / keyboard */}
      <path d="M6 48 L12 46 L68 46 L74 48 L74 56 L6 56 Z" fill="#5A5A6A" />
      <rect x="14" y="48" width="52" height="6" rx="1" fill="#6A6A7A" />
      {/* Touchpad */}
      <rect x="32" y="50" width="16" height="3" rx="1" fill="#50505E" />
    </svg>
  ),

  speaker: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Body */}
      <rect x="20" y="8" width="40" height="64" rx="6" fill="#3A3A4A" />
      {/* Grille */}
      <rect x="24" y="12" width="32" height="56" rx="4" fill="#4A4A5A" />
      {/* Tweeter */}
      <circle cx="40" cy="26" r="8" fill="#2A2A3A" />
      <circle cx="40" cy="26" r="5" fill="#3A3A4A" />
      <circle cx="40" cy="26" r="2" fill="#5A5A6A" />
      {/* Woofer */}
      <circle cx="40" cy="52" r="12" fill="#2A2A3A" />
      <circle cx="40" cy="52" r="8" fill="#3A3A4A" />
      <circle cx="40" cy="52" r="4" fill="#4A4A5A" />
      <circle cx="40" cy="52" r="2" fill="#5A5A6A" />
    </svg>
  ),

  /* ===== DECOR ===== */

  globe: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Stand base */}
      <ellipse cx="40" cy="72" rx="16" ry="4" fill="#8B6530" />
      {/* Stand pole */}
      <rect x="38" y="58" width="4" height="14" fill="#A0612B" />
      {/* Globe frame arc */}
      <path d="M24 36 Q40 6 56 36 Q40 66 24 36" fill="none" stroke="#C8A060" strokeWidth="2" />
      {/* Globe */}
      <circle cx="40" cy="36" r="22" fill="#5C8AB4" />
      {/* Continents */}
      <path d="M28 28 Q32 24 38 26 Q42 30 36 34 Q30 32 28 28" fill="#6BAF7B" />
      <path d="M44 22 Q50 20 54 26 Q52 32 46 30 Q42 26 44 22" fill="#6BAF7B" />
      <path d="M34 40 Q40 38 46 42 Q44 48 38 46 Q32 44 34 40" fill="#6BAF7B" />
      {/* Latitude line */}
      <ellipse cx="40" cy="36" rx="22" ry="6" fill="none" stroke="#4A7A9E" strokeWidth="0.5" />
    </svg>
  ),

  terrarium: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Glass container */}
      <path d="M20 16 L16 64 Q16 72 24 72 L56 72 Q64 72 64 64 L60 16 Z" fill="#D8E8F0" opacity="0.4" stroke="#A0B8C8" strokeWidth="1.5" />
      {/* Soil */}
      <path d="M18 56 Q40 52 62 56 L62 64 Q62 70 56 70 L24 70 Q18 70 18 64 Z" fill="#8B6530" />
      {/* Pebbles */}
      <circle cx="28" cy="64" r="3" fill="#B8A888" />
      <circle cx="40" cy="66" r="2" fill="#A09878" />
      <circle cx="52" cy="64" r="3" fill="#C8B898" />
      {/* Small plant */}
      <line x1="34" y1="54" x2="34" y2="40" stroke="#5CA06C" strokeWidth="2" />
      <ellipse cx="30" cy="38" rx="6" ry="4" fill="#6BAF7B" />
      <ellipse cx="38" cy="42" rx="5" ry="3" fill="#5CA06C" />
      {/* Mushroom */}
      <line x1="50" y1="56" x2="50" y2="48" stroke="#E8D5B8" strokeWidth="1.5" />
      <ellipse cx="50" cy="46" rx="5" ry="3" fill="#E8887E" />
    </svg>
  ),

  'stack-of-books': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Book 1 - bottom */}
      <rect x="14" y="54" width="52" height="10" rx="2" fill="#7B8EB5" />
      <rect x="14" y="54" width="4" height="10" rx="1" fill="#6B7EA5" />
      {/* Book 2 */}
      <rect x="18" y="42" width="48" height="12" rx="2" fill="#D4726A" />
      <rect x="18" y="42" width="4" height="12" rx="1" fill="#C4625A" />
      {/* Book 3 */}
      <rect x="12" y="32" width="50" height="10" rx="2" fill="#E8C060" />
      <rect x="12" y="32" width="4" height="10" rx="1" fill="#D8B050" />
      {/* Book 4 - top, slightly rotated */}
      <rect x="20" y="20" width="44" height="12" rx="2" fill="#6BAF7B" transform="rotate(-5 42 26)" />
      <rect x="20" y="20" width="4" height="12" rx="1" fill="#5B9F6B" transform="rotate(-5 22 26)" />
    </svg>
  ),

  mug: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Mug body */}
      <rect x="18" y="26" width="36" height="38" rx="4" fill="#E8887E" />
      {/* Handle */}
      <path d="M54 34 Q68 34 68 48 Q68 60 54 58" stroke="#D07868" strokeWidth="4" fill="none" />
      {/* Rim */}
      <ellipse cx="36" cy="26" rx="18" ry="5" fill="#F0A090" />
      {/* Coffee surface */}
      <ellipse cx="36" cy="28" rx="14" ry="3" fill="#6B3A1F" />
      {/* Steam */}
      <path d="M28 18 Q26 10 30 6" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M36 16 Q34 8 38 4" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.5" />
      <path d="M44 18 Q42 10 46 6" stroke="#D8D8D8" strokeWidth="1.5" fill="none" opacity="0.5" />
    </svg>
  ),

  'cat-bed': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Bed rim */}
      <ellipse cx="40" cy="48" rx="34" ry="20" fill="#D4956A" />
      {/* Bed interior */}
      <ellipse cx="40" cy="46" rx="28" ry="14" fill="#E8C4A0" />
      {/* Cushion inside */}
      <ellipse cx="40" cy="48" rx="22" ry="10" fill="#F0D8C0" />
      {/* Sleeping cat - body */}
      <ellipse cx="40" cy="46" rx="16" ry="8" fill="#A0A0A0" />
      {/* Cat head */}
      <circle cx="28" cy="42" r="6" fill="#909090" />
      {/* Cat ears */}
      <path d="M24 36 L22 30 L27 34 Z" fill="#808080" />
      <path d="M32 36 L34 30 L29 34 Z" fill="#808080" />
      {/* Cat tail curve */}
      <path d="M54 44 Q60 38 58 46" stroke="#909090" strokeWidth="3" fill="none" />
    </svg>
  ),

  guitar: () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Neck */}
      <rect x="36" y="2" width="8" height="40" rx="2" fill="#A0612B" />
      {/* Frets */}
      <line x1="36" y1="10" x2="44" y2="10" stroke="#C8C8C8" strokeWidth="0.5" />
      <line x1="36" y1="18" x2="44" y2="18" stroke="#C8C8C8" strokeWidth="0.5" />
      <line x1="36" y1="26" x2="44" y2="26" stroke="#C8C8C8" strokeWidth="0.5" />
      {/* Headstock */}
      <rect x="34" y="0" width="12" height="6" rx="2" fill="#5C3317" />
      <circle cx="36" cy="3" r="1.5" fill="#C8C8C8" />
      <circle cx="44" cy="3" r="1.5" fill="#C8C8C8" />
      {/* Body upper bout */}
      <ellipse cx="40" cy="48" rx="14" ry="10" fill="#C8A060" />
      {/* Body lower bout */}
      <ellipse cx="40" cy="64" rx="18" ry="12" fill="#C8A060" />
      {/* Sound hole */}
      <circle cx="40" cy="52" r="6" fill="#5C3317" />
      {/* Strings */}
      <line x1="38" y1="6" x2="38" y2="70" stroke="#D8D8D8" strokeWidth="0.5" />
      <line x1="40" y1="6" x2="40" y2="70" stroke="#D8D8D8" strokeWidth="0.5" />
      <line x1="42" y1="6" x2="42" y2="70" stroke="#D8D8D8" strokeWidth="0.5" />
    </svg>
  ),

  'yoga-mat': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Rolled portion */}
      <ellipse cx="16" cy="54" rx="10" ry="12" fill="#8EB89E" />
      <ellipse cx="16" cy="54" rx="6" ry="8" fill="#7BA88E" />
      <ellipse cx="16" cy="54" rx="3" ry="4" fill="#6B987E" />
      {/* Unrolled mat portion */}
      <path d="M16 42 L70 32 L70 40 L16 50 Z" fill="#9EC8AE" />
      {/* Mat underside visible */}
      <path d="M16 50 L70 40 L70 44 L16 54 Z" fill="#7BA88E" />
      {/* Mat texture lines */}
      <line x1="30" y1="40" x2="30" y2="48" stroke="#8EB89E" strokeWidth="0.5" />
      <line x1="44" y1="38" x2="44" y2="46" stroke="#8EB89E" strokeWidth="0.5" />
      <line x1="58" y1="36" x2="58" y2="44" stroke="#8EB89E" strokeWidth="0.5" />
    </svg>
  ),

  'dream-catcher': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* Ring */}
      <circle cx="40" cy="28" r="20" fill="none" stroke="#A0612B" strokeWidth="3" />
      {/* Web */}
      <circle cx="40" cy="28" r="14" fill="none" stroke="#D4A878" strokeWidth="0.8" />
      <circle cx="40" cy="28" r="8" fill="none" stroke="#D4A878" strokeWidth="0.8" />
      <circle cx="40" cy="28" r="3" fill="none" stroke="#D4A878" strokeWidth="0.8" />
      {/* Web spokes */}
      <line x1="40" y1="8" x2="40" y2="48" stroke="#D4A878" strokeWidth="0.5" />
      <line x1="20" y1="28" x2="60" y2="28" stroke="#D4A878" strokeWidth="0.5" />
      <line x1="26" y1="14" x2="54" y2="42" stroke="#D4A878" strokeWidth="0.5" />
      <line x1="54" y1="14" x2="26" y2="42" stroke="#D4A878" strokeWidth="0.5" />
      {/* Center bead */}
      <circle cx="40" cy="28" r="2" fill="#8BB8D0" />
      {/* Hanging strings with feathers */}
      <line x1="32" y1="48" x2="28" y2="68" stroke="#A0612B" strokeWidth="1" />
      <line x1="40" y1="48" x2="40" y2="74" stroke="#A0612B" strokeWidth="1" />
      <line x1="48" y1="48" x2="52" y2="68" stroke="#A0612B" strokeWidth="1" />
      {/* Feathers */}
      <path d="M26 66 Q28 72 30 66" fill="#E8D5B8" />
      <path d="M38 72 Q40 78 42 72" fill="#D4A878" />
      <path d="M50 66 Q52 72 54 66" fill="#E8D5B8" />
      {/* Beads on strings */}
      <circle cx="30" cy="58" r="1.5" fill="#E8887E" />
      <circle cx="40" cy="62" r="1.5" fill="#8BB8D0" />
      <circle cx="50" cy="58" r="1.5" fill="#E8C060" />
    </svg>
  ),

  'polaroid-string': () => (
    <svg viewBox="0 0 80 80" width="80" height="80" xmlns="http://www.w3.org/2000/svg">
      {/* String */}
      <path d="M2 12 Q20 20 40 14 Q60 8 78 16" fill="none" stroke="#A08060" strokeWidth="1.5" />
      {/* Polaroid 1 */}
      <rect x="6" y="18" width="18" height="22" rx="1" fill="#F5F5F0" transform="rotate(-8 15 29)" />
      <rect x="9" y="20" width="12" height="12" fill="#B8D4E8" transform="rotate(-8 15 26)" />
      {/* Polaroid 2 */}
      <rect x="30" y="14" width="18" height="22" rx="1" fill="#F5F5F0" transform="rotate(4 39 25)" />
      <rect x="33" y="16" width="12" height="12" fill="#E8C4A0" transform="rotate(4 39 22)" />
      {/* Polaroid 3 */}
      <rect x="54" y="16" width="18" height="22" rx="1" fill="#F5F5F0" transform="rotate(-3 63 27)" />
      <rect x="57" y="18" width="12" height="12" fill="#C9E0B8" transform="rotate(-3 63 24)" />
      {/* Clips */}
      <rect x="13" y="14" width="4" height="8" rx="1" fill="#D4726A" transform="rotate(-8 15 18)" />
      <rect x="37" y="10" width="4" height="8" rx="1" fill="#7B8EB5" transform="rotate(4 39 14)" />
      <rect x="61" y="12" width="4" height="8" rx="1" fill="#E8C060" transform="rotate(-3 63 16)" />
    </svg>
  ),
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Render the inline SVG for the given furniture id.
 * Returns `null` when the id is not recognised.
 */
export function renderFurnitureSVG(id: string): React.ReactNode {
  const renderer = renderers[id];
  return renderer ? renderer() : null;
}

/**
 * Return all furniture definitions that belong to the given category.
 */
export function getFurnitureByCategory(category: string): FurnitureDefinition[] {
  return furnitureDefinitions.filter((d) => d.category === category);
}

/**
 * Look up a single furniture definition by its unique id.
 */
export function getFurnitureById(id: string): FurnitureDefinition | undefined {
  return furnitureDefinitions.find((d) => d.id === id);
}
