import React from 'react';

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

export interface MagnetDefinition {
  id: string;
  name: string;
  category: (typeof MAGNET_CATEGORIES)[number];
}

export const MAGNET_CATEGORIES = [
  'Animals',
  'Food',
  'Travel',
  'Love',
  'Nature',
  'Fun',
] as const;

// ---------------------------------------------------------------------------
// Magnet Metadata  (30 magnets, 6 categories)
// ---------------------------------------------------------------------------

export const magnetDefinitions: MagnetDefinition[] = [
  // Animals (6)
  { id: 'cat', name: 'Cat', category: 'Animals' },
  { id: 'dog', name: 'Dog', category: 'Animals' },
  { id: 'bunny', name: 'Bunny', category: 'Animals' },
  { id: 'bear', name: 'Bear', category: 'Animals' },
  { id: 'penguin', name: 'Penguin', category: 'Animals' },
  { id: 'butterfly', name: 'Butterfly', category: 'Animals' },

  // Food (6)
  { id: 'pizza-slice', name: 'Pizza Slice', category: 'Food' },
  { id: 'coffee-cup', name: 'Coffee Cup', category: 'Food' },
  { id: 'donut', name: 'Donut', category: 'Food' },
  { id: 'avocado', name: 'Avocado', category: 'Food' },
  { id: 'cupcake', name: 'Cupcake', category: 'Food' },
  { id: 'ice-cream', name: 'Ice Cream', category: 'Food' },

  // Travel (5)
  { id: 'airplane', name: 'Airplane', category: 'Travel' },
  { id: 'palm-tree', name: 'Palm Tree', category: 'Travel' },
  { id: 'eiffel-tower', name: 'Eiffel Tower', category: 'Travel' },
  { id: 'compass', name: 'Compass', category: 'Travel' },
  { id: 'camera', name: 'Camera', category: 'Travel' },

  // Love (5)
  { id: 'heart-red', name: 'Red Heart', category: 'Love' },
  { id: 'heart-pink', name: 'Pink Heart', category: 'Love' },
  { id: 'love-letter', name: 'Love Letter', category: 'Love' },
  { id: 'infinity', name: 'Infinity', category: 'Love' },
  { id: 'couple-silhouette', name: 'Couple', category: 'Love' },

  // Nature (4)
  { id: 'sun', name: 'Sun', category: 'Nature' },
  { id: 'moon-stars', name: 'Moon & Stars', category: 'Nature' },
  { id: 'rainbow', name: 'Rainbow', category: 'Nature' },
  { id: 'flower-daisy', name: 'Daisy', category: 'Nature' },

  // Fun (4)
  { id: 'music-note', name: 'Music Note', category: 'Fun' },
  { id: 'star-gold', name: 'Gold Star', category: 'Fun' },
  { id: 'lightning', name: 'Lightning', category: 'Fun' },
  { id: 'peace-sign', name: 'Peace Sign', category: 'Fun' },
];

// ---------------------------------------------------------------------------
// Individual Magnet SVG Renderers
// Each renders inside an approx 40 x 60 unit coordinate space.
// Wrapped in a <g> so consumers can translate / scale freely.
// ---------------------------------------------------------------------------

/* ---- magnet base: a subtle rounded-rect shadow to simulate a real fridge
   magnet body.  Every magnet calls this first so they all look "stuck on". */
function magnetBase(fill = '#e0e0e0') {
  return (
    <>
      <rect x={0} y={0} width={40} height={60} rx={6} ry={6} fill={fill} opacity={0.25} />
      <rect x={1} y={1} width={38} height={58} rx={5} ry={5} fill={fill} opacity={0.10} />
    </>
  );
}

// ========================  ANIMALS  ========================

function CatMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Body */}
      <ellipse cx={20} cy={40} rx={12} ry={14} fill="#F5A623" />
      {/* Head */}
      <circle cx={20} cy={22} r={10} fill="#F5A623" />
      {/* Ears */}
      <polygon points="12,14 10,4 18,12" fill="#F5A623" />
      <polygon points="28,14 30,4 22,12" fill="#F5A623" />
      {/* Inner ears */}
      <polygon points="13,13 12,6 17,12" fill="#FFCB8E" />
      <polygon points="27,13 28,6 23,12" fill="#FFCB8E" />
      {/* Eyes */}
      <circle cx={16} cy={21} r={2} fill="#333" />
      <circle cx={24} cy={21} r={2} fill="#333" />
      {/* Nose */}
      <polygon points="20,25 18,27 22,27" fill="#FF8A80" />
      {/* Whiskers */}
      <line x1={6} y1={25} x2={16} y2={26} stroke="#999" strokeWidth={0.5} />
      <line x1={6} y1={28} x2={16} y2={27} stroke="#999" strokeWidth={0.5} />
      <line x1={34} y1={25} x2={24} y2={26} stroke="#999" strokeWidth={0.5} />
      <line x1={34} y1={28} x2={24} y2={27} stroke="#999" strokeWidth={0.5} />
      {/* Tail */}
      <path d="M32,42 Q38,30 34,22" stroke="#F5A623" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

function DogMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Body */}
      <ellipse cx={20} cy={42} rx={13} ry={12} fill="#C68642" />
      {/* Head */}
      <circle cx={20} cy={22} r={11} fill="#C68642" />
      {/* Floppy ears */}
      <ellipse cx={9} cy={24} rx={5} ry={9} fill="#8B5E3C" />
      <ellipse cx={31} cy={24} rx={5} ry={9} fill="#8B5E3C" />
      {/* Snout */}
      <ellipse cx={20} cy={27} rx={5} ry={4} fill="#DEB887" />
      {/* Nose */}
      <ellipse cx={20} cy={25} rx={2.5} ry={2} fill="#333" />
      {/* Eyes */}
      <circle cx={15} cy={20} r={2} fill="#333" />
      <circle cx={25} cy={20} r={2} fill="#333" />
      {/* Eye highlights */}
      <circle cx={15.7} cy={19.3} r={0.7} fill="#fff" />
      <circle cx={25.7} cy={19.3} r={0.7} fill="#fff" />
      {/* Tongue */}
      <ellipse cx={20} cy={31} rx={2} ry={2.5} fill="#FF6B8A" />
      {/* Tail */}
      <path d="M33,38 Q39,30 36,24" stroke="#C68642" strokeWidth={3} fill="none" strokeLinecap="round" />
    </g>
  );
}

function BunnyMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Body */}
      <ellipse cx={20} cy={44} rx={11} ry={12} fill="#F0F0F0" />
      {/* Head */}
      <circle cx={20} cy={28} r={9} fill="#F0F0F0" />
      {/* Long ears */}
      <ellipse cx={14} cy={12} rx={4} ry={12} fill="#F0F0F0" />
      <ellipse cx={26} cy={12} rx={4} ry={12} fill="#F0F0F0" />
      {/* Inner ears */}
      <ellipse cx={14} cy={12} rx={2} ry={9} fill="#FFB6C1" />
      <ellipse cx={26} cy={12} rx={2} ry={9} fill="#FFB6C1" />
      {/* Eyes */}
      <circle cx={16} cy={27} r={2} fill="#FF6B8A" />
      <circle cx={24} cy={27} r={2} fill="#FF6B8A" />
      {/* Nose */}
      <circle cx={20} cy={30} r={1.5} fill="#FFB6C1" />
      {/* Mouth */}
      <path d="M18,32 Q20,35 22,32" stroke="#ccc" strokeWidth={0.7} fill="none" />
      {/* Cheeks */}
      <ellipse cx={13} cy={30} rx={3} ry={2} fill="#FFE0E8" opacity={0.6} />
      <ellipse cx={27} cy={30} rx={3} ry={2} fill="#FFE0E8" opacity={0.6} />
      {/* Tail puff */}
      <circle cx={28} cy={50} r={4} fill="#fff" />
    </g>
  );
}

function BearMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Body */}
      <ellipse cx={20} cy={42} rx={14} ry={14} fill="#8B6914" />
      {/* Head */}
      <circle cx={20} cy={22} r={11} fill="#A0782C" />
      {/* Round ears */}
      <circle cx={10} cy={13} r={5} fill="#A0782C" />
      <circle cx={30} cy={13} r={5} fill="#A0782C" />
      {/* Inner ears */}
      <circle cx={10} cy={13} r={3} fill="#C6975B" />
      <circle cx={30} cy={13} r={3} fill="#C6975B" />
      {/* Snout */}
      <ellipse cx={20} cy={26} rx={5} ry={4} fill="#C6975B" />
      {/* Nose */}
      <ellipse cx={20} cy={25} rx={2} ry={1.5} fill="#333" />
      {/* Eyes */}
      <circle cx={15} cy={20} r={2} fill="#333" />
      <circle cx={25} cy={20} r={2} fill="#333" />
      {/* Smile */}
      <path d="M17,28 Q20,32 23,28" stroke="#6B4C1E" strokeWidth={1} fill="none" />
      {/* Belly */}
      <ellipse cx={20} cy={44} rx={8} ry={8} fill="#C6975B" opacity={0.5} />
    </g>
  );
}

function PenguinMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Body */}
      <ellipse cx={20} cy={38} rx={13} ry={18} fill="#2D2D2D" />
      {/* White belly */}
      <ellipse cx={20} cy={40} rx={9} ry={14} fill="#F5F5F5" />
      {/* Head */}
      <circle cx={20} cy={18} r={10} fill="#2D2D2D" />
      {/* Eyes */}
      <circle cx={16} cy={17} r={2.5} fill="#fff" />
      <circle cx={24} cy={17} r={2.5} fill="#fff" />
      <circle cx={16} cy={17} r={1.2} fill="#333" />
      <circle cx={24} cy={17} r={1.2} fill="#333" />
      {/* Beak */}
      <polygon points="17,22 20,26 23,22" fill="#FF9800" />
      {/* Wings */}
      <ellipse cx={6} cy={36} rx={4} ry={10} fill="#2D2D2D" transform="rotate(-10,6,36)" />
      <ellipse cx={34} cy={36} rx={4} ry={10} fill="#2D2D2D" transform="rotate(10,34,36)" />
      {/* Feet */}
      <ellipse cx={15} cy={56} rx={4} ry={2} fill="#FF9800" />
      <ellipse cx={25} cy={56} rx={4} ry={2} fill="#FF9800" />
    </g>
  );
}

function ButterflyMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Upper wings */}
      <ellipse cx={10} cy={22} rx={9} ry={12} fill="#E040FB" opacity={0.85} />
      <ellipse cx={30} cy={22} rx={9} ry={12} fill="#E040FB" opacity={0.85} />
      {/* Lower wings */}
      <ellipse cx={11} cy={40} rx={7} ry={9} fill="#AA00FF" opacity={0.75} />
      <ellipse cx={29} cy={40} rx={7} ry={9} fill="#AA00FF" opacity={0.75} />
      {/* Wing spots */}
      <circle cx={10} cy={20} r={3} fill="#FCE4EC" opacity={0.7} />
      <circle cx={30} cy={20} r={3} fill="#FCE4EC" opacity={0.7} />
      <circle cx={11} cy={38} r={2} fill="#F3E5F5" opacity={0.6} />
      <circle cx={29} cy={38} r={2} fill="#F3E5F5" opacity={0.6} />
      {/* Body */}
      <ellipse cx={20} cy={30} rx={2} ry={14} fill="#4A148C" />
      {/* Head */}
      <circle cx={20} cy={14} r={3} fill="#4A148C" />
      {/* Antennae */}
      <path d="M18,12 Q14,4 12,2" stroke="#4A148C" strokeWidth={1} fill="none" />
      <path d="M22,12 Q26,4 28,2" stroke="#4A148C" strokeWidth={1} fill="none" />
      <circle cx={12} cy={2} r={1} fill="#E040FB" />
      <circle cx={28} cy={2} r={1} fill="#E040FB" />
    </g>
  );
}

// ========================  FOOD  ========================

function PizzaSliceMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Crust arc */}
      <path d="M4,52 L20,4 L36,52 Z" fill="#F5C342" />
      {/* Cheese layer */}
      <path d="M6,48 L20,8 L34,48 Z" fill="#FFE082" />
      {/* Crust edge */}
      <path d="M4,52 Q20,58 36,52" fill="#D4A24C" />
      {/* Pepperoni */}
      <circle cx={16} cy={32} r={3.5} fill="#E53935" />
      <circle cx={25} cy={38} r={3} fill="#E53935" />
      <circle cx={20} cy={22} r={2.5} fill="#E53935" />
      <circle cx={13} cy={42} r={2.8} fill="#E53935" />
      {/* Pepperoni shine */}
      <circle cx={16.8} cy={31} r={1} fill="#EF5350" opacity={0.5} />
      <circle cx={25.8} cy={37} r={0.8} fill="#EF5350" opacity={0.5} />
    </g>
  );
}

function CoffeeCupMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Saucer */}
      <ellipse cx={20} cy={54} rx={16} ry={4} fill="#BDBDBD" />
      {/* Cup body */}
      <path d="M7,24 L10,50 Q20,54 30,50 L33,24 Z" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      {/* Coffee inside */}
      <ellipse cx={20} cy={26} rx={12} ry={4} fill="#5D4037" />
      {/* Coffee shine */}
      <ellipse cx={17} cy={25} rx={5} ry={1.5} fill="#795548" opacity={0.5} />
      {/* Handle */}
      <path d="M33,30 Q40,30 40,38 Q40,46 33,46" stroke="#E0E0E0" strokeWidth={2.5} fill="none" />
      {/* Steam lines */}
      <path d="M14,18 Q12,12 14,6" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
      <path d="M20,16 Q18,10 20,4" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
      <path d="M26,18 Q24,12 26,6" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
    </g>
  );
}

function DonutMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Donut body */}
      <circle cx={20} cy={32} r={16} fill="#D4A24C" />
      {/* Hole */}
      <circle cx={20} cy={32} r={6} fill="#e0e0e0" opacity={0.25} />
      {/* Frosting */}
      <path d="M4,30 Q6,22 12,20 Q16,18 20,16 Q24,18 28,20 Q34,22 36,30 Q36,34 34,36 Q28,38 26,36 Q24,40 20,38 Q16,40 14,36 Q12,38 6,36 Q4,34 4,30 Z" fill="#FF80AB" />
      {/* Sprinkles */}
      <rect x={10} y={24} width={3} height={1.2} rx={0.6} fill="#FFEB3B" transform="rotate(-30,11,24)" />
      <rect x={16} y={20} width={3} height={1.2} rx={0.6} fill="#4FC3F7" transform="rotate(20,17,20)" />
      <rect x={24} y={22} width={3} height={1.2} rx={0.6} fill="#81C784" transform="rotate(-15,25,22)" />
      <rect x={28} y={28} width={3} height={1.2} rx={0.6} fill="#FFB74D" transform="rotate(40,29,28)" />
      <rect x={12} y={32} width={3} height={1.2} rx={0.6} fill="#BA68C8" transform="rotate(-50,13,32)" />
      <rect x={22} y={18} width={3} height={1.2} rx={0.6} fill="#E53935" transform="rotate(10,23,18)" />
    </g>
  );
}

function AvocadoMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Outer skin */}
      <ellipse cx={20} cy={34} rx={14} ry={20} fill="#558B2F" />
      {/* Inner flesh */}
      <ellipse cx={20} cy={35} rx={11} ry={16} fill="#C5E1A5" />
      {/* Pit */}
      <circle cx={20} cy={38} r={7} fill="#795548" />
      {/* Pit highlight */}
      <ellipse cx={18} cy={36} rx={3} ry={2} fill="#8D6E63" opacity={0.6} />
      {/* Flesh highlight */}
      <ellipse cx={15} cy={28} rx={3} ry={6} fill="#DCEDC8" opacity={0.5} />
    </g>
  );
}

function CupcakeMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Wrapper */}
      <path d="M8,36 L12,56 L28,56 L32,36 Z" fill="#FF7043" />
      {/* Wrapper lines */}
      <line x1={12} y1={36} x2={14} y2={56} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={16} y1={36} x2={17} y2={56} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={20} y1={36} x2={20} y2={56} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={24} y1={36} x2={23} y2={56} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={28} y1={36} x2={26} y2={56} stroke="#E64A19" strokeWidth={0.5} />
      {/* Cake top */}
      <ellipse cx={20} cy={36} rx={13} ry={4} fill="#FFCC80" />
      {/* Frosting swirl */}
      <path d="M8,34 Q10,24 16,22 Q20,14 24,22 Q30,24 32,34" fill="#F48FB1" />
      <path d="M12,30 Q14,22 20,18 Q26,22 28,30" fill="#F8BBD0" />
      {/* Cherry on top */}
      <circle cx={20} cy={12} r={4} fill="#E53935" />
      <circle cx={18.5} cy={10.5} r={1.2} fill="#EF5350" opacity={0.6} />
      {/* Cherry stem */}
      <path d="M20,8 Q22,4 24,3" stroke="#4CAF50" strokeWidth={1} fill="none" />
    </g>
  );
}

function IceCreamMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Cone */}
      <polygon points="12,34 20,58 28,34" fill="#D4A24C" />
      {/* Cone cross-hatch */}
      <line x1={14} y1={38} x2={24} y2={50} stroke="#C69226" strokeWidth={0.5} />
      <line x1={18} y1={38} x2={26} y2={46} stroke="#C69226" strokeWidth={0.5} />
      <line x1={26} y1={38} x2={16} y2={50} stroke="#C69226" strokeWidth={0.5} />
      <line x1={22} y1={38} x2={14} y2={46} stroke="#C69226" strokeWidth={0.5} />
      {/* Scoop 1 - strawberry */}
      <circle cx={20} cy={26} r={10} fill="#F48FB1" />
      {/* Scoop 2 - vanilla */}
      <circle cx={14} cy={18} r={7} fill="#FFF9C4" />
      {/* Scoop 3 - chocolate */}
      <circle cx={26} cy={18} r={7} fill="#795548" />
      {/* Scoop highlights */}
      <circle cx={18} cy={24} r={2} fill="#F8BBD0" opacity={0.5} />
      <circle cx={12} cy={16} r={1.5} fill="#FFFDE7" opacity={0.5} />
      <circle cx={24} cy={16} r={1.5} fill="#8D6E63" opacity={0.4} />
    </g>
  );
}

// ========================  TRAVEL  ========================

function AirplaneMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Fuselage */}
      <ellipse cx={20} cy={30} rx={4} ry={20} fill="#90CAF9" />
      {/* Nose */}
      <ellipse cx={20} cy={8} rx={3} ry={5} fill="#64B5F6" />
      {/* Main wings */}
      <polygon points="4,28 20,32 36,28 36,34 20,36 4,34" fill="#42A5F5" />
      {/* Tail wings */}
      <polygon points="12,48 20,46 28,48 28,52 20,50 12,52" fill="#42A5F5" />
      {/* Tail fin */}
      <polygon points="18,44 20,38 22,44" fill="#1E88E5" />
      {/* Windows */}
      <circle cx={20} cy={16} r={1.2} fill="#E3F2FD" />
      <circle cx={20} cy={20} r={1.2} fill="#E3F2FD" />
      <circle cx={20} cy={24} r={1.2} fill="#E3F2FD" />
      {/* Cockpit window */}
      <ellipse cx={20} cy={11} rx={2} ry={1.5} fill="#B3E5FC" />
    </g>
  );
}

function PalmTreeMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Trunk */}
      <path d="M18,56 Q20,40 22,20" stroke="#8D6E63" strokeWidth={5} fill="none" strokeLinecap="round" />
      {/* Trunk segments */}
      <line x1={17} y1={50} x2={23} y2={50} stroke="#6D4C41" strokeWidth={0.8} />
      <line x1={17.5} y1={44} x2={23} y2={44} stroke="#6D4C41" strokeWidth={0.8} />
      <line x1={18} y1={38} x2={23} y2={38} stroke="#6D4C41" strokeWidth={0.8} />
      <line x1={18.5} y1={32} x2={23} y2={32} stroke="#6D4C41" strokeWidth={0.8} />
      {/* Fronds */}
      <path d="M21,18 Q30,10 38,12" stroke="#4CAF50" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M21,18 Q10,10 2,12" stroke="#4CAF50" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M21,18 Q28,6 34,2" stroke="#66BB6A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M21,18 Q14,6 6,2" stroke="#66BB6A" strokeWidth={2.5} fill="none" strokeLinecap="round" />
      <path d="M21,18 Q20,6 20,0" stroke="#81C784" strokeWidth={2} fill="none" strokeLinecap="round" />
      {/* Coconuts */}
      <circle cx={20} cy={20} r={2.5} fill="#795548" />
      <circle cx={23} cy={22} r={2} fill="#795548" />
    </g>
  );
}

function EiffelTowerMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Base legs */}
      <path d="M2,58 L14,32 L20,32 L8,58 Z" fill="#78909C" />
      <path d="M38,58 L26,32 L20,32 L32,58 Z" fill="#78909C" />
      {/* Middle section */}
      <path d="M14,32 L17,18 L23,18 L26,32 Z" fill="#90A4AE" />
      {/* Top section */}
      <path d="M17,18 L19,8 L21,8 L23,18 Z" fill="#B0BEC5" />
      {/* Antenna */}
      <line x1={20} y1={8} x2={20} y2={2} stroke="#78909C" strokeWidth={1.5} />
      {/* Platform 1 */}
      <rect x={12} y={31} width={16} height={2} rx={0.5} fill="#607D8B" />
      {/* Platform 2 */}
      <rect x={16} y={17} width={8} height={1.5} rx={0.5} fill="#607D8B" />
      {/* Arch */}
      <path d="M10,44 Q20,36 30,44" stroke="#607D8B" strokeWidth={1.2} fill="none" />
    </g>
  );
}

function CompassMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Outer ring */}
      <circle cx={20} cy={30} r={18} fill="#FFF8E1" stroke="#FFB300" strokeWidth={2} />
      {/* Inner ring */}
      <circle cx={20} cy={30} r={14} fill="#FFFDE7" stroke="#FFC107" strokeWidth={1} />
      {/* N pointer (red) */}
      <polygon points="20,14 17,30 23,30" fill="#E53935" />
      {/* S pointer (white) */}
      <polygon points="20,46 17,30 23,30" fill="#ECEFF1" stroke="#BDBDBD" strokeWidth={0.5} />
      {/* Center pin */}
      <circle cx={20} cy={30} r={2} fill="#FFB300" />
      {/* Cardinal directions */}
      <text x={20} y={18} textAnchor="middle" fontSize={4} fill="#E53935" fontWeight="bold">N</text>
      <text x={20} y={46} textAnchor="middle" fontSize={4} fill="#78909C" fontWeight="bold">S</text>
      <text x={33} y={32} textAnchor="middle" fontSize={3.5} fill="#78909C">E</text>
      <text x={7} y={32} textAnchor="middle" fontSize={3.5} fill="#78909C">W</text>
    </g>
  );
}

function CameraMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Camera body */}
      <rect x={3} y={20} width={34} height={26} rx={4} fill="#455A64" />
      {/* Top bump / viewfinder */}
      <rect x={14} y={14} width={12} height={8} rx={2} fill="#546E7A" />
      {/* Lens outer ring */}
      <circle cx={20} cy={34} r={10} fill="#37474F" />
      <circle cx={20} cy={34} r={8} fill="#263238" />
      {/* Lens glass */}
      <circle cx={20} cy={34} r={6} fill="#4FC3F7" opacity={0.7} />
      {/* Lens reflection */}
      <ellipse cx={17} cy={31} rx={2.5} ry={1.5} fill="#B3E5FC" opacity={0.5} />
      {/* Flash */}
      <rect x={28} y={16} width={5} height={3} rx={1} fill="#FFEE58" />
      {/* Shutter button */}
      <circle cx={28} cy={18} r={2} fill="#E0E0E0" />
    </g>
  );
}

// ========================  LOVE  ========================

function HeartRedMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Heart shape */}
      <path
        d="M20,52 C10,42 0,30 0,20 C0,10 8,6 14,6 C18,6 20,10 20,14 C20,10 22,6 26,6 C32,6 40,10 40,20 C40,30 30,42 20,52 Z"
        fill="#E53935"
      />
      {/* Highlight / shine */}
      <ellipse cx={12} cy={18} rx={5} ry={4} fill="#EF5350" opacity={0.5} />
      <ellipse cx={10} cy={14} rx={2} ry={1.5} fill="#FFCDD2" opacity={0.4} />
    </g>
  );
}

function HeartPinkMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Heart shape */}
      <path
        d="M20,52 C10,42 0,30 0,20 C0,10 8,6 14,6 C18,6 20,10 20,14 C20,10 22,6 26,6 C32,6 40,10 40,20 C40,30 30,42 20,52 Z"
        fill="#F48FB1"
      />
      {/* Highlight */}
      <ellipse cx={12} cy={18} rx={5} ry={4} fill="#F8BBD0" opacity={0.5} />
      {/* Little sparkle */}
      <polygon points="30,14 31,12 32,14 31,16" fill="#FCE4EC" opacity={0.7} />
      <polygon points="8,26 9,24 10,26 9,28" fill="#FCE4EC" opacity={0.6} />
    </g>
  );
}

function LoveLetterMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Envelope body */}
      <rect x={3} y={18} width={34} height={28} rx={3} fill="#FFFDE7" stroke="#FFE082" strokeWidth={1} />
      {/* Envelope flap */}
      <polygon points="3,18 20,36 37,18" fill="#FFF8E1" stroke="#FFE082" strokeWidth={1} />
      {/* Envelope bottom fold lines */}
      <line x1={3} y1={46} x2={20} y2={34} stroke="#FFE082" strokeWidth={0.8} />
      <line x1={37} y1={46} x2={20} y2={34} stroke="#FFE082" strokeWidth={0.8} />
      {/* Heart seal */}
      <path
        d="M20,28 C18,26 15,24.5 15,22 C15,20 16.5,19 18,19 C19,19 20,20 20,20.5 C20,20 21,19 22,19 C23.5,19 25,20 25,22 C25,24.5 22,26 20,28 Z"
        fill="#E53935"
      />
    </g>
  );
}

function InfinityMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Infinity symbol - thick, colorful */}
      <path
        d="M20,30 C20,22 12,16 8,22 C4,28 12,38 20,30 C28,22 36,28 32,34 C28,40 20,38 20,30 Z"
        fill="none"
        stroke="#E040FB"
        strokeWidth={4}
        strokeLinecap="round"
      />
      {/* Second layer for depth */}
      <path
        d="M20,30 C20,22 12,16 8,22 C4,28 12,38 20,30 C28,22 36,28 32,34 C28,40 20,38 20,30 Z"
        fill="none"
        stroke="#CE93D8"
        strokeWidth={2}
        strokeLinecap="round"
      />
      {/* Sparkles around it */}
      <circle cx={8} cy={18} r={1} fill="#F3E5F5" />
      <circle cx={32} cy={20} r={1.2} fill="#F3E5F5" />
      <circle cx={10} cy={38} r={0.8} fill="#F3E5F5" />
      <circle cx={30} cy={40} r={1} fill="#F3E5F5" />
    </g>
  );
}

function CoupleSilhouetteMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Person 1 (left) head */}
      <circle cx={14} cy={14} r={6} fill="#5C6BC0" />
      {/* Person 1 body */}
      <path d="M14,20 Q14,34 10,48 L18,48 Q14,34 14,20 Z" fill="#5C6BC0" />
      {/* Person 2 (right) head */}
      <circle cx={26} cy={14} r={6} fill="#EC407A" />
      {/* Person 2 body */}
      <path d="M26,20 Q26,34 22,48 L30,48 Q26,34 26,20 Z" fill="#EC407A" />
      {/* Heart between them */}
      <path
        d="M20,22 C19,21 17.5,20 17.5,19 C17.5,18 18.5,17.5 19,17.5 C19.5,17.5 20,18 20,18.5 C20,18 20.5,17.5 21,17.5 C21.5,17.5 22.5,18 22.5,19 C22.5,20 21,21 20,22 Z"
        fill="#E53935"
      />
      {/* Holding hands hint */}
      <line x1={16} y1={34} x2={24} y2={34} stroke="#9FA8DA" strokeWidth={1.5} strokeLinecap="round" />
    </g>
  );
}

// ========================  NATURE  ========================

function SunMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1={20}
          y1={30}
          x2={20 + 18 * Math.cos((angle * Math.PI) / 180)}
          y2={30 + 18 * Math.sin((angle * Math.PI) / 180)}
          stroke="#FFC107"
          strokeWidth={2.5}
          strokeLinecap="round"
        />
      ))}
      {/* Sun body */}
      <circle cx={20} cy={30} r={12} fill="#FFEB3B" />
      {/* Face - eyes */}
      <circle cx={16} cy={28} r={1.5} fill="#F57F17" />
      <circle cx={24} cy={28} r={1.5} fill="#F57F17" />
      {/* Face - smile */}
      <path d="M15,33 Q20,38 25,33" stroke="#F57F17" strokeWidth={1.2} fill="none" strokeLinecap="round" />
      {/* Cheeks */}
      <circle cx={13} cy={32} r={2} fill="#FFCC80" opacity={0.5} />
      <circle cx={27} cy={32} r={2} fill="#FFCC80" opacity={0.5} />
    </g>
  );
}

function MoonStarsMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Moon crescent */}
      <circle cx={22} cy={28} r={14} fill="#FFC107" />
      <circle cx={28} cy={24} r={12} fill="#e0e0e0" opacity={0.25} />
      {/* Re-draw the overlap with a matching background to create crescent effect */}
      <circle cx={28} cy={24} r={12} fill="#E8EAF6" />
      {/* Stars */}
      <polygon points="8,12 9.5,16 14,16 10.5,19 12,24 8,20.5 4,24 5.5,19 2,16 6.5,16" fill="#FFEB3B" />
      <polygon points="32,40 33,43 36,43 34,45 35,48 32,46 29,48 30,45 28,43 31,43" fill="#FFEB3B" opacity={0.8} />
      <polygon points="10,44 11,46 13,46 11.5,47.5 12,50 10,48.5 8,50 8.5,47.5 7,46 9,46" fill="#FFF176" opacity={0.7} />
      {/* Moon crater hints */}
      <circle cx={16} cy={26} r={1.5} fill="#FFB300" opacity={0.3} />
      <circle cx={18} cy={34} r={2} fill="#FFB300" opacity={0.2} />
    </g>
  );
}

function RainbowMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Rainbow arcs from outside in */}
      <path d="M2,50 Q2,10 38,50" stroke="#E53935" strokeWidth={3} fill="none" />
      <path d="M5,50 Q5,14 35,50" stroke="#FF9800" strokeWidth={3} fill="none" />
      <path d="M8,50 Q8,18 32,50" stroke="#FFEB3B" strokeWidth={3} fill="none" />
      <path d="M11,50 Q11,22 29,50" stroke="#4CAF50" strokeWidth={3} fill="none" />
      <path d="M14,50 Q14,26 26,50" stroke="#2196F3" strokeWidth={3} fill="none" />
      <path d="M17,50 Q17,30 23,50" stroke="#9C27B0" strokeWidth={3} fill="none" />
      {/* Cloud left */}
      <circle cx={6} cy={50} r={5} fill="#ECEFF1" />
      <circle cx={2} cy={48} r={4} fill="#ECEFF1" />
      {/* Cloud right */}
      <circle cx={34} cy={50} r={5} fill="#ECEFF1" />
      <circle cx={38} cy={48} r={4} fill="#ECEFF1" />
    </g>
  );
}

function FlowerDaisyMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Stem */}
      <line x1={20} y1={30} x2={18} y2={56} stroke="#4CAF50" strokeWidth={2.5} strokeLinecap="round" />
      {/* Leaf left */}
      <ellipse cx={14} cy={46} rx={5} ry={2.5} fill="#66BB6A" transform="rotate(-30,14,46)" />
      {/* Leaf right */}
      <ellipse cx={24} cy={50} rx={4} ry={2} fill="#66BB6A" transform="rotate(25,24,50)" />
      {/* Petals */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <ellipse
          key={angle}
          cx={20 + 9 * Math.cos((angle * Math.PI) / 180)}
          cy={24 + 9 * Math.sin((angle * Math.PI) / 180)}
          rx={5}
          ry={3}
          fill="#FFFFFF"
          stroke="#E0E0E0"
          strokeWidth={0.3}
          transform={`rotate(${angle},${20 + 9 * Math.cos((angle * Math.PI) / 180)},${24 + 9 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      {/* Center */}
      <circle cx={20} cy={24} r={5} fill="#FFEB3B" />
      {/* Center detail */}
      <circle cx={20} cy={24} r={3} fill="#FFC107" opacity={0.5} />
    </g>
  );
}

// ========================  FUN  ========================

function MusicNoteMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Note stem */}
      <line x1={26} y1={10} x2={26} y2={42} stroke="#333" strokeWidth={2} />
      {/* Note head */}
      <ellipse cx={20} cy={44} rx={7} ry={5} fill="#333" transform="rotate(-20,20,44)" />
      {/* Flag */}
      <path d="M26,10 Q34,14 30,22 Q34,18 26,20" fill="#333" />
      {/* Musical sparkles */}
      <circle cx={10} cy={16} r={1.5} fill="#E040FB" opacity={0.6} />
      <circle cx={34} cy={28} r={1.2} fill="#7C4DFF" opacity={0.5} />
      <circle cx={8} cy={36} r={1} fill="#40C4FF" opacity={0.5} />
      {/* Small notes floating */}
      <text x={6} y={24} fontSize={6} fill="#CE93D8" opacity={0.6}>&#9835;</text>
      <text x={32} y={38} fontSize={5} fill="#80DEEA" opacity={0.5}>&#9833;</text>
    </g>
  );
}

function StarGoldMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Star shape */}
      <polygon
        points="20,4 25,20 40,22 28,34 32,50 20,42 8,50 12,34 0,22 15,20"
        fill="#FFD600"
      />
      {/* Inner star highlight */}
      <polygon
        points="20,12 23,22 32,23 25,30 28,40 20,34 12,40 15,30 8,23 17,22"
        fill="#FFEB3B"
        opacity={0.6}
      />
      {/* Sparkle */}
      <ellipse cx={15} cy={18} rx={3} ry={1.5} fill="#FFF9C4" opacity={0.5} transform="rotate(-30,15,18)" />
    </g>
  );
}

function LightningMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Lightning bolt */}
      <polygon
        points="22,2 8,28 18,28 14,58 34,24 22,24 28,2"
        fill="#FFEB3B"
      />
      {/* Inner highlight */}
      <polygon
        points="22,6 12,28 19,28 16,50 30,26 23,26 27,6"
        fill="#FFF176"
        opacity={0.6}
      />
      {/* Edge glow */}
      <polygon
        points="22,2 8,28 18,28 14,58 34,24 22,24 28,2"
        fill="none"
        stroke="#FFD600"
        strokeWidth={1}
      />
    </g>
  );
}

function PeaceSignMagnet() {
  return (
    <g>
      {magnetBase('#ccc')}
      {/* Outer circle */}
      <circle cx={20} cy={30} r={17} fill="none" stroke="#7C4DFF" strokeWidth={4} />
      {/* Vertical line */}
      <line x1={20} y1={13} x2={20} y2={47} stroke="#7C4DFF" strokeWidth={4} />
      {/* Left branch */}
      <line x1={20} y1={30} x2={8} y2={42} stroke="#7C4DFF" strokeWidth={4} strokeLinecap="round" />
      {/* Right branch */}
      <line x1={20} y1={30} x2={32} y2={42} stroke="#7C4DFF" strokeWidth={4} strokeLinecap="round" />
      {/* Inner circle fill for friendliness */}
      <circle cx={20} cy={30} r={15} fill="#EDE7F6" opacity={0.3} />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Renderer registry
// ---------------------------------------------------------------------------

const magnetRenderers: Record<string, () => React.ReactNode> = {
  // Animals
  'cat': () => <CatMagnet />,
  'dog': () => <DogMagnet />,
  'bunny': () => <BunnyMagnet />,
  'bear': () => <BearMagnet />,
  'penguin': () => <PenguinMagnet />,
  'butterfly': () => <ButterflyMagnet />,

  // Food
  'pizza-slice': () => <PizzaSliceMagnet />,
  'coffee-cup': () => <CoffeeCupMagnet />,
  'donut': () => <DonutMagnet />,
  'avocado': () => <AvocadoMagnet />,
  'cupcake': () => <CupcakeMagnet />,
  'ice-cream': () => <IceCreamMagnet />,

  // Travel
  'airplane': () => <AirplaneMagnet />,
  'palm-tree': () => <PalmTreeMagnet />,
  'eiffel-tower': () => <EiffelTowerMagnet />,
  'compass': () => <CompassMagnet />,
  'camera': () => <CameraMagnet />,

  // Love
  'heart-red': () => <HeartRedMagnet />,
  'heart-pink': () => <HeartPinkMagnet />,
  'love-letter': () => <LoveLetterMagnet />,
  'infinity': () => <InfinityMagnet />,
  'couple-silhouette': () => <CoupleSilhouetteMagnet />,

  // Nature
  'sun': () => <SunMagnet />,
  'moon-stars': () => <MoonStarsMagnet />,
  'rainbow': () => <RainbowMagnet />,
  'flower-daisy': () => <FlowerDaisyMagnet />,

  // Fun
  'music-note': () => <MusicNoteMagnet />,
  'star-gold': () => <StarGoldMagnet />,
  'lightning': () => <LightningMagnet />,
  'peace-sign': () => <PeaceSignMagnet />,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Render a magnet's SVG content by its ID.
 *
 * Returns a `<g>` element containing the full SVG artwork for the magnet.
 * Each magnet is designed to fit within a ~40x60 unit coordinate space.
 *
 * Usage:
 * ```tsx
 * <svg viewBox="0 0 40 60" width={40} height={60}>
 *   {renderMagnetSVG('cat')}
 * </svg>
 * ```
 */
export function renderMagnetSVG(id: string): React.ReactNode {
  const renderer = magnetRenderers[id];
  if (!renderer) {
    console.warn(`[magnetLibrary] Unknown magnet id: "${id}"`);
    return null;
  }
  return renderer();
}

/**
 * Get all magnet definitions for a given category.
 */
export function getMagnetsByCategory(
  category: (typeof MAGNET_CATEGORIES)[number],
): MagnetDefinition[] {
  return magnetDefinitions.filter((m) => m.category === category);
}

/**
 * Get a single magnet definition by ID, or undefined if not found.
 */
export function getMagnetById(id: string): MagnetDefinition | undefined {
  return magnetDefinitions.find((m) => m.id === id);
}
