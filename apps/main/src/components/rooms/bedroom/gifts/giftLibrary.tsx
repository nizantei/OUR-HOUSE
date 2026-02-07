import React from 'react';

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

export interface GiftDefinition {
  id: string;
  name: string;
  category: (typeof GIFT_CATEGORIES)[number];
}

export const GIFT_CATEGORIES = [
  'Romantic',
  'Fun',
  'Thoughtful',
  'Treats',
  'Experiences',
  'Comfort',
  'Creative',
  'Classic',
] as const;

// ---------------------------------------------------------------------------
// Gift Metadata  (44 gifts, 8 categories)
// ---------------------------------------------------------------------------

export const giftDefinitions: GiftDefinition[] = [
  // Romantic (6)
  { id: 'love-letter', name: 'Love Letter', category: 'Romantic' },
  { id: 'dozen-roses', name: 'Dozen Roses', category: 'Romantic' },
  { id: 'heart-locket', name: 'Heart Locket', category: 'Romantic' },
  { id: 'love-coupons', name: 'Love Coupons', category: 'Romantic' },
  { id: 'star-map', name: 'Star Map', category: 'Romantic' },
  { id: 'promise-ring', name: 'Promise Ring', category: 'Romantic' },

  // Fun (6)
  { id: 'movie-tickets', name: 'Movie Tickets', category: 'Fun' },
  { id: 'board-game', name: 'Board Game', category: 'Fun' },
  { id: 'karaoke-mic', name: 'Karaoke Mic', category: 'Fun' },
  { id: 'water-gun', name: 'Water Gun', category: 'Fun' },
  { id: 'matching-pajamas', name: 'Matching Pajamas', category: 'Fun' },
  { id: 'dance-lesson', name: 'Dance Lesson', category: 'Fun' },

  // Thoughtful (6)
  { id: 'scrapbook', name: 'Scrapbook', category: 'Thoughtful' },
  { id: 'playlist', name: 'Playlist', category: 'Thoughtful' },
  { id: 'poem', name: 'Poem', category: 'Thoughtful' },
  { id: 'reasons-jar', name: 'Reasons Jar', category: 'Thoughtful' },
  { id: 'time-capsule', name: 'Time Capsule', category: 'Thoughtful' },
  { id: 'gratitude-list', name: 'Gratitude List', category: 'Thoughtful' },

  // Treats (6)
  { id: 'chocolate-box', name: 'Chocolate Box', category: 'Treats' },
  { id: 'cupcake-gift', name: 'Cupcake', category: 'Treats' },
  { id: 'breakfast-bed', name: 'Breakfast in Bed', category: 'Treats' },
  { id: 'favorite-snacks', name: 'Favorite Snacks', category: 'Treats' },
  { id: 'tea-set', name: 'Tea Set', category: 'Treats' },
  { id: 'cookie-jar', name: 'Cookie Jar', category: 'Treats' },

  // Experiences (6)
  { id: 'sunset-picnic', name: 'Sunset Picnic', category: 'Experiences' },
  { id: 'road-trip', name: 'Road Trip', category: 'Experiences' },
  { id: 'cooking-together', name: 'Cooking Together', category: 'Experiences' },
  { id: 'stargazing', name: 'Stargazing', category: 'Experiences' },
  { id: 'spa-day', name: 'Spa Day', category: 'Experiences' },
  { id: 'adventure-day', name: 'Adventure Day', category: 'Experiences' },

  // Comfort (5)
  { id: 'cozy-blanket', name: 'Cozy Blanket', category: 'Comfort' },
  { id: 'scented-candle', name: 'Scented Candle', category: 'Comfort' },
  { id: 'fuzzy-socks', name: 'Fuzzy Socks', category: 'Comfort' },
  { id: 'teddy-bear', name: 'Teddy Bear', category: 'Comfort' },
  { id: 'pillow', name: 'Pillow', category: 'Comfort' },

  // Creative (5)
  { id: 'drawing', name: 'Drawing', category: 'Creative' },
  { id: 'origami', name: 'Origami', category: 'Creative' },
  { id: 'mix-tape', name: 'Mix Tape', category: 'Creative' },
  { id: 'photo-collage', name: 'Photo Collage', category: 'Creative' },
  { id: 'diy-craft', name: 'DIY Craft', category: 'Creative' },

  // Classic (4)
  { id: 'flowers-wildflower', name: 'Wildflowers', category: 'Classic' },
  { id: 'jewelry-bracelet', name: 'Bracelet', category: 'Classic' },
  { id: 'perfume', name: 'Perfume', category: 'Classic' },
  { id: 'watch', name: 'Watch', category: 'Classic' },
];

// ---------------------------------------------------------------------------
// Individual Gift SVG Renderers
// Each renders inside an approx 80 x 80 unit coordinate space.
// Wrapped in a <g> so consumers can translate / scale freely.
// ---------------------------------------------------------------------------

// ========================  ROMANTIC (6)  ========================

function LoveLetterGift() {
  return (
    <g>
      {/* Paper peeking out top */}
      <rect x={16} y={16} width={48} height={12} rx={2} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={0.5} />
      <line x1={22} y1={20} x2={58} y2={20} stroke="#FFCDD2" strokeWidth={1} />
      <line x1={22} y1={24} x2={50} y2={24} stroke="#FFCDD2" strokeWidth={1} />
      {/* Envelope body */}
      <rect x={8} y={24} width={64} height={44} rx={4} fill="#FFF8E1" stroke="#FFCC80" strokeWidth={1.5} />
      {/* Envelope flap */}
      <polygon points="8,24 40,52 72,24" fill="#FFF3E0" stroke="#FFCC80" strokeWidth={1.5} />
      {/* Bottom fold lines */}
      <line x1={8} y1={68} x2={40} y2={48} stroke="#FFCC80" strokeWidth={0.8} />
      <line x1={72} y1={68} x2={40} y2={48} stroke="#FFCC80" strokeWidth={0.8} />
      {/* Wax seal heart */}
      <circle cx={40} cy={38} r={8} fill="#E53935" />
      <path
        d="M40,44 C37,41 33,38 33,35 C33,33 35,31 37,31 C38.5,31 40,32.5 40,33.5 C40,32.5 41.5,31 43,31 C45,31 47,33 47,35 C47,38 43,41 40,44 Z"
        fill="#EF5350"
      />
    </g>
  );
}

function DozenRosesGift() {
  return (
    <g>
      {/* Wrapping paper */}
      <path d="M20,72 L10,35 Q40,20 70,35 L60,72 Z" fill="#A5D6A7" />
      <path d="M20,72 L15,40 Q40,28 65,40 L60,72 Z" fill="#C8E6C9" />
      {/* Ribbon */}
      <path d="M30,72 Q40,60 50,72" fill="none" stroke="#E53935" strokeWidth={2} />
      {/* Rose 1 */}
      <circle cx={30} cy={32} r={7} fill="#E53935" />
      <path d="M27,30 Q30,26 33,30 Q30,28 27,30 Z" fill="#C62828" />
      {/* Rose 2 */}
      <circle cx={40} cy={26} r={7} fill="#EF5350" />
      <path d="M37,24 Q40,20 43,24 Q40,22 37,24 Z" fill="#D32F2F" />
      {/* Rose 3 */}
      <circle cx={50} cy={32} r={7} fill="#E53935" />
      <path d="M47,30 Q50,26 53,30 Q50,28 47,30 Z" fill="#C62828" />
      {/* Rose 4 center */}
      <circle cx={40} cy={36} r={6} fill="#D32F2F" />
      {/* Leaves peeking */}
      <ellipse cx={22} cy={40} rx={5} ry={3} fill="#66BB6A" transform="rotate(-30,22,40)" />
      <ellipse cx={58} cy={40} rx={5} ry={3} fill="#66BB6A" transform="rotate(30,58,40)" />
    </g>
  );
}

function HeartLocketGift() {
  return (
    <g>
      {/* Chain */}
      <path d="M25,10 Q40,4 55,10" fill="none" stroke="#FFD54F" strokeWidth={2} />
      <path d="M25,10 L25,20" fill="none" stroke="#FFD54F" strokeWidth={2} />
      <path d="M55,10 L55,20" fill="none" stroke="#FFD54F" strokeWidth={2} />
      {/* Locket heart shape */}
      <path
        d="M40,68 C30,58 14,46 14,32 C14,22 22,16 30,16 C35,16 40,20 40,26 C40,20 45,16 50,16 C58,16 66,22 66,32 C66,46 50,58 40,68 Z"
        fill="#FFD54F"
        stroke="#FFC107"
        strokeWidth={1.5}
      />
      {/* Locket center line */}
      <line x1={40} y1={20} x2={40} y2={62} stroke="#FFA000" strokeWidth={1} />
      {/* Locket clasp */}
      <circle cx={40} cy={22} r={3} fill="#FFA000" />
      {/* Shine */}
      <ellipse cx={28} cy={32} rx={5} ry={4} fill="#FFECB3" opacity={0.5} />
      {/* Inner heart engraving */}
      <path
        d="M40,52 C36,48 30,44 30,38 C30,35 33,33 36,33 C38,33 40,35 40,36 C40,35 42,33 44,33 C47,33 50,35 50,38 C50,44 44,48 40,52 Z"
        fill="none"
        stroke="#FFA000"
        strokeWidth={0.8}
      />
    </g>
  );
}

function LoveCouponsGift() {
  return (
    <g>
      {/* Stack of coupons */}
      <rect x={10} y={28} width={60} height={36} rx={4} fill="#FCE4EC" stroke="#F48FB1" strokeWidth={1} />
      <rect x={13} y={25} width={60} height={36} rx={4} fill="#F8BBD0" stroke="#F48FB1" strokeWidth={1} />
      <rect x={16} y={22} width={60} height={36} rx={4} fill="#FFFFFF" stroke="#F48FB1" strokeWidth={1.5} />
      {/* Perforated edge */}
      {[26, 30, 34, 38, 42, 46, 50, 54].map((y) => (
        <circle key={y} cx={22} cy={y} r={1.2} fill="#F48FB1" opacity={0.4} />
      ))}
      {/* Heart decoration */}
      <path
        d="M56,30 C55,29 53,28 53,26.5 C53,25.5 54,25 55,25 C55.5,25 56,25.5 56,26 C56,25.5 56.5,25 57,25 C58,25 59,25.5 59,26.5 C59,28 57,29 56,30 Z"
        fill="#E91E63"
      />
      {/* Text lines */}
      <text x={40} y={35} textAnchor="middle" fontSize={8} fill="#E91E63" fontWeight="bold">LOVE</text>
      <line x1={28} y1={40} x2={60} y2={40} stroke="#FCE4EC" strokeWidth={1} />
      <line x1={28} y1={45} x2={64} y2={45} stroke="#FCE4EC" strokeWidth={1} />
      <line x1={28} y1={50} x2={55} y2={50} stroke="#FCE4EC" strokeWidth={1} />
    </g>
  );
}

function StarMapGift() {
  return (
    <g>
      {/* Dark circle background */}
      <circle cx={40} cy={40} r={34} fill="#1A237E" />
      <circle cx={40} cy={40} r={32} fill="#0D1B4A" />
      {/* Stars scattered */}
      <circle cx={25} cy={25} r={1.2} fill="#FFFFFF" />
      <circle cx={50} cy={20} r={1.5} fill="#FFFFFF" />
      <circle cx={35} cy={18} r={1} fill="#FFFFFF" opacity={0.8} />
      <circle cx={55} cy={35} r={1.3} fill="#FFFFFF" />
      <circle cx={20} cy={45} r={1} fill="#FFFFFF" opacity={0.7} />
      <circle cx={60} cy={50} r={1.2} fill="#FFFFFF" />
      <circle cx={30} cy={55} r={1.5} fill="#FFFFFF" />
      <circle cx={45} cy={45} r={1} fill="#FFFFFF" opacity={0.9} />
      <circle cx={38} cy={32} r={0.8} fill="#FFFFFF" opacity={0.6} />
      <circle cx={52} cy={55} r={1.1} fill="#FFFFFF" />
      {/* Constellation lines */}
      <line x1={25} y1={25} x2={35} y2={18} stroke="#BBDEFB" strokeWidth={0.5} opacity={0.6} />
      <line x1={35} y1={18} x2={50} y2={20} stroke="#BBDEFB" strokeWidth={0.5} opacity={0.6} />
      <line x1={50} y1={20} x2={55} y2={35} stroke="#BBDEFB" strokeWidth={0.5} opacity={0.6} />
      <line x1={30} y1={55} x2={45} y2={45} stroke="#BBDEFB" strokeWidth={0.5} opacity={0.6} />
      <line x1={45} y1={45} x2={60} y2={50} stroke="#BBDEFB" strokeWidth={0.5} opacity={0.6} />
      {/* Border ring */}
      <circle cx={40} cy={40} r={34} fill="none" stroke="#FFD54F" strokeWidth={2} />
      {/* Heart constellation */}
      <path
        d="M40,48 C38,46 34,43 34,40 C34,38 36,37 38,37 C39,37 40,38 40,38.5 C40,38 41,37 42,37 C44,37 46,38 46,40 C46,43 42,46 40,48 Z"
        fill="none"
        stroke="#FF8A80"
        strokeWidth={1}
      />
    </g>
  );
}

function PromiseRingGift() {
  return (
    <g>
      {/* Ring box lid */}
      <rect x={14} y={30} width={52} height={10} rx={4} fill="#7986CB" />
      <rect x={16} y={32} width={48} height={6} rx={3} fill="#5C6BC0" />
      {/* Ring box base */}
      <rect x={16} y={38} width={48} height={34} rx={4} fill="#5C6BC0" />
      <rect x={18} y={40} width={44} height={30} rx={3} fill="#3F51B5" />
      {/* Velvet interior */}
      <ellipse cx={40} cy={50} rx={18} ry={14} fill="#283593" />
      {/* Ring slit in velvet */}
      <path d="M32,56 Q40,42 48,56" fill="none" stroke="#1A237E" strokeWidth={2} />
      {/* Ring band */}
      <ellipse cx={40} cy={46} rx={10} ry={4} fill="none" stroke="#FFD54F" strokeWidth={3} />
      <ellipse cx={40} cy={46} rx={10} ry={4} fill="none" stroke="#FFECB3" strokeWidth={1} />
      {/* Gem */}
      <polygon points="40,39 36,42 40,45 44,42" fill="#E1F5FE" stroke="#B3E5FC" strokeWidth={0.5} />
      <polygon points="40,39 38,42 40,44 42,42" fill="#FFFFFF" opacity={0.5} />
      {/* Sparkles */}
      <polygon points="40,34 41,32 42,34 41,36" fill="#FFFFFF" opacity={0.7} />
      <polygon points="52,38 53,36 54,38 53,40" fill="#FFFFFF" opacity={0.5} />
    </g>
  );
}

// ========================  FUN (6)  ========================

function MovieTicketsGift() {
  return (
    <g>
      {/* Ticket 1 (behind) */}
      <rect x={18} y={16} width={50} height={24} rx={3} fill="#FF7043" transform="rotate(-8,40,28)" />
      {/* Ticket 2 (front) */}
      <rect x={12} y={28} width={50} height={24} rx={3} fill="#FFCA28" />
      {/* Perforations on front ticket */}
      {[32, 36, 40, 44, 48].map((y) => (
        <circle key={y} cx={48} cy={y} r={1} fill="#FFF8E1" />
      ))}
      {/* Text on front ticket */}
      <text x={28} y={37} fontSize={5} fill="#E65100" fontWeight="bold">ADMIT</text>
      <text x={30} y={44} fontSize={5} fill="#E65100" fontWeight="bold">ONE</text>
      {/* Star decorations */}
      <polygon points="20,36 21,34 22,36 21,38" fill="#FF6F00" />
      <polygon points="42,36 43,34 44,36 43,38" fill="#FF6F00" />
      {/* Film strip icon */}
      <rect x={14} y={58} width={52} height={14} rx={2} fill="#424242" />
      <rect x={18} y={61} width={8} height={8} rx={1} fill="#757575" />
      <rect x={30} y={61} width={8} height={8} rx={1} fill="#757575" />
      <rect x={42} y={61} width={8} height={8} rx={1} fill="#757575" />
      <rect x={54} y={61} width={8} height={8} rx={1} fill="#757575" />
    </g>
  );
}

function BoardGameGift() {
  return (
    <g>
      {/* Board */}
      <rect x={8} y={18} width={64} height={52} rx={4} fill="#A5D6A7" stroke="#66BB6A" strokeWidth={1.5} />
      {/* Grid lines */}
      <line x1={8} y1={31} x2={72} y2={31} stroke="#81C784" strokeWidth={1} />
      <line x1={8} y1={44} x2={72} y2={44} stroke="#81C784" strokeWidth={1} />
      <line x1={8} y1={57} x2={72} y2={57} stroke="#81C784" strokeWidth={1} />
      <line x1={29} y1={18} x2={29} y2={70} stroke="#81C784" strokeWidth={1} />
      <line x1={51} y1={18} x2={51} y2={70} stroke="#81C784" strokeWidth={1} />
      {/* Colored squares */}
      <rect x={9} y={19} width={20} height={12} fill="#EF5350" opacity={0.6} />
      <rect x={52} y={45} width={19} height={12} fill="#42A5F5" opacity={0.6} />
      <rect x={30} y={32} width={21} height={12} fill="#FFCA28" opacity={0.6} />
      {/* Dice */}
      <rect x={55} y={8} width={18} height={18} rx={3} fill="#FFFFFF" stroke="#BDBDBD" strokeWidth={1} />
      <circle cx={60} cy={13} r={1.5} fill="#333" />
      <circle cx={68} cy={13} r={1.5} fill="#333" />
      <circle cx={60} cy={21} r={1.5} fill="#333" />
      <circle cx={68} cy={21} r={1.5} fill="#333" />
      <circle cx={64} cy={17} r={1.5} fill="#333" />
      {/* Game pieces */}
      <circle cx={18} cy={50} r={5} fill="#E91E63" />
      <circle cx={40} cy={24} r={5} fill="#42A5F5" />
    </g>
  );
}

function KaraokeMicGift() {
  return (
    <g>
      {/* Mic head mesh */}
      <ellipse cx={40} cy={22} rx={14} ry={18} fill="#78909C" />
      <ellipse cx={40} cy={22} rx={12} ry={16} fill="#90A4AE" />
      {/* Mesh pattern */}
      <line x1={30} y1={14} x2={50} y2={14} stroke="#78909C" strokeWidth={0.5} />
      <line x1={28} y1={20} x2={52} y2={20} stroke="#78909C" strokeWidth={0.5} />
      <line x1={28} y1={26} x2={52} y2={26} stroke="#78909C" strokeWidth={0.5} />
      <line x1={30} y1={32} x2={50} y2={32} stroke="#78909C" strokeWidth={0.5} />
      <line x1={34} y1={6} x2={34} y2={36} stroke="#78909C" strokeWidth={0.5} />
      <line x1={40} y1={4} x2={40} y2={38} stroke="#78909C" strokeWidth={0.5} />
      <line x1={46} y1={6} x2={46} y2={36} stroke="#78909C" strokeWidth={0.5} />
      {/* Ring */}
      <rect x={32} y={38} width={16} height={4} rx={1} fill="#546E7A" />
      {/* Handle */}
      <rect x={36} y={42} width={8} height={30} rx={3} fill="#37474F" />
      {/* Handle grip lines */}
      <line x1={37} y1={50} x2={43} y2={50} stroke="#455A64" strokeWidth={0.8} />
      <line x1={37} y1={54} x2={43} y2={54} stroke="#455A64" strokeWidth={0.8} />
      <line x1={37} y1={58} x2={43} y2={58} stroke="#455A64" strokeWidth={0.8} />
      {/* Music notes */}
      <text x={56} y={14} fontSize={10} fill="#E040FB" opacity={0.7}>&#9835;</text>
      <text x={18} y={20} fontSize={8} fill="#7C4DFF" opacity={0.6}>&#9833;</text>
    </g>
  );
}

function WaterGunGift() {
  return (
    <g>
      {/* Main body */}
      <rect x={10} y={30} width={50} height={16} rx={4} fill="#42A5F5" />
      {/* Nozzle */}
      <rect x={60} y={33} width={14} height={10} rx={2} fill="#1E88E5" />
      <circle cx={74} cy={38} r={3} fill="#0D47A1" />
      {/* Tank on top */}
      <rect x={18} y={16} width={24} height={16} rx={4} fill="#29B6F6" />
      <rect x={20} y={18} width={20} height={12} rx={3} fill="#4FC3F7" opacity={0.6} />
      {/* Handle/trigger area */}
      <rect x={28} y={46} width={12} height={18} rx={3} fill="#1565C0" />
      <rect x={24} y={56} width={20} height={6} rx={3} fill="#0D47A1" />
      {/* Trigger */}
      <rect x={32} y={46} width={4} height={10} rx={2} fill="#FF7043" />
      {/* Water splash */}
      <circle cx={8} cy={36} r={2} fill="#B3E5FC" opacity={0.6} />
      <circle cx={4} cy={32} r={1.5} fill="#B3E5FC" opacity={0.4} />
      <circle cx={6} cy={40} r={1.8} fill="#E1F5FE" opacity={0.5} />
    </g>
  );
}

function MatchingPajamasGift() {
  return (
    <g>
      {/* Pajama top 1 */}
      <rect x={4} y={12} width={30} height={32} rx={3} fill="#CE93D8" />
      <rect x={4} y={12} width={30} height={6} rx={3} fill="#AB47BC" />
      <rect x={0} y={18} width={8} height={16} rx={3} fill="#CE93D8" />
      <rect x={26} y={18} width={8} height={16} rx={3} fill="#CE93D8" />
      {/* Buttons */}
      <circle cx={19} cy={24} r={1.5} fill="#F3E5F5" />
      <circle cx={19} cy={30} r={1.5} fill="#F3E5F5" />
      <circle cx={19} cy={36} r={1.5} fill="#F3E5F5" />
      {/* Stars pattern */}
      <polygon points="10,26 11,24 12,26 11,28" fill="#F3E5F5" opacity={0.5} />

      {/* Pajama top 2 */}
      <rect x={42} y={12} width={30} height={32} rx={3} fill="#CE93D8" />
      <rect x={42} y={12} width={30} height={6} rx={3} fill="#AB47BC" />
      <rect x={38} y={18} width={8} height={16} rx={3} fill="#CE93D8" />
      <rect x={64} y={18} width={8} height={16} rx={3} fill="#CE93D8" />
      <circle cx={57} cy={24} r={1.5} fill="#F3E5F5" />
      <circle cx={57} cy={30} r={1.5} fill="#F3E5F5" />
      <circle cx={57} cy={36} r={1.5} fill="#F3E5F5" />
      <polygon points="48,26 49,24 50,26 49,28" fill="#F3E5F5" opacity={0.5} />

      {/* Heart between them */}
      <path
        d="M40,58 C39,57 37,55 37,53.5 C37,52.5 38,52 38.5,52 C39,52 39.5,52.5 40,53 C40.5,52.5 41,52 41.5,52 C42,52 43,52.5 43,53.5 C43,55 41,57 40,58 Z"
        fill="#E91E63"
      />
      {/* Pajama pants */}
      <rect x={8} y={44} width={12} height={24} rx={3} fill="#BA68C8" />
      <rect x={18} y={44} width={12} height={24} rx={3} fill="#BA68C8" />
      <rect x={46} y={44} width={12} height={24} rx={3} fill="#BA68C8" />
      <rect x={56} y={44} width={12} height={24} rx={3} fill="#BA68C8" />
    </g>
  );
}

function DanceLessonGift() {
  return (
    <g>
      {/* Dance floor */}
      <rect x={6} y={58} width={68} height={16} rx={2} fill="#FFF3E0" />
      <rect x={6} y={58} width={17} height={8} fill="#FFCC80" opacity={0.4} />
      <rect x={40} y={58} width={17} height={8} fill="#FFCC80" opacity={0.4} />
      <rect x={23} y={66} width={17} height={8} fill="#FFCC80" opacity={0.4} />
      <rect x={57} y={66} width={17} height={8} fill="#FFCC80" opacity={0.4} />
      {/* Person 1 */}
      <circle cx={30} cy={18} r={6} fill="#5C6BC0" />
      <path d="M30,24 L30,48" stroke="#5C6BC0" strokeWidth={3} strokeLinecap="round" />
      <path d="M30,30 L20,40" stroke="#5C6BC0" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M30,48 L24,58" stroke="#5C6BC0" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M30,48 L36,58" stroke="#5C6BC0" strokeWidth={2.5} strokeLinecap="round" />
      {/* Person 2 */}
      <circle cx={50} cy={18} r={6} fill="#EC407A" />
      <path d="M50,24 L50,48" stroke="#EC407A" strokeWidth={3} strokeLinecap="round" />
      <path d="M50,30 L60,40" stroke="#EC407A" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M50,48 L44,58" stroke="#EC407A" strokeWidth={2.5} strokeLinecap="round" />
      <path d="M50,48 L56,58" stroke="#EC407A" strokeWidth={2.5} strokeLinecap="round" />
      {/* Held hands */}
      <line x1={30} y1={30} x2={50} y2={30} stroke="#9FA8DA" strokeWidth={2} strokeLinecap="round" />
      {/* Music notes */}
      <text x={62} y={14} fontSize={8} fill="#E040FB" opacity={0.6}>&#9835;</text>
      <text x={10} y={12} fontSize={6} fill="#7C4DFF" opacity={0.5}>&#9833;</text>
    </g>
  );
}

// ========================  THOUGHTFUL (6)  ========================

function ScrapbookGift() {
  return (
    <g>
      {/* Book cover */}
      <rect x={10} y={10} width={56} height={60} rx={3} fill="#8D6E63" />
      <rect x={14} y={12} width={50} height={56} rx={2} fill="#A1887F" />
      {/* Spine */}
      <rect x={10} y={10} width={6} height={60} rx={2} fill="#6D4C41" />
      {/* Cover decoration - photo placeholder */}
      <rect x={22} y={20} width={34} height={26} rx={2} fill="#FFFFFF" stroke="#BCAAA4" strokeWidth={1} />
      {/* Photo in frame */}
      <rect x={24} y={22} width={30} height={22} fill="#E8F5E9" />
      <circle cx={36} cy={30} r={6} fill="#FFD54F" />
      <path d="M24,44 L30,36 L38,40 L44,32 L54,44 Z" fill="#66BB6A" opacity={0.7} />
      {/* Heart sticker */}
      <path
        d="M56,52 C55,51 53,49.5 53,48 C53,47 54,46 55,46 C55.5,46 56,46.5 56,47 C56,46.5 56.5,46 57,46 C58,46 59,47 59,48 C59,49.5 57,51 56,52 Z"
        fill="#E91E63"
      />
      {/* Star sticker */}
      <polygon points="24,54 25.5,50 27,54 25.5,56" fill="#FFCA28" />
      {/* Title text */}
      <line x1={28} y1={56} x2={52} y2={56} stroke="#6D4C41" strokeWidth={1.5} />
      <line x1={32} y1={60} x2={48} y2={60} stroke="#6D4C41" strokeWidth={1} />
    </g>
  );
}

function PlaylistGift() {
  return (
    <g>
      {/* Phone/device */}
      <rect x={18} y={6} width={44} height={68} rx={6} fill="#263238" />
      <rect x={20} y={12} width={40} height={54} rx={3} fill="#37474F" />
      {/* Screen content */}
      <rect x={22} y={14} width={36} height={50} rx={2} fill="#1A1A2E" />
      {/* Album art */}
      <circle cx={40} cy={34} r={14} fill="#E91E63" opacity={0.3} />
      <circle cx={40} cy={34} r={10} fill="#E91E63" opacity={0.5} />
      <circle cx={40} cy={34} r={4} fill="#F48FB1" />
      {/* Music note on album */}
      <text x={38} y={37} fontSize={8} fill="#FFFFFF">&#9835;</text>
      {/* Progress bar */}
      <rect x={26} y={52} width={28} height={2} rx={1} fill="#455A64" />
      <rect x={26} y={52} width={16} height={2} rx={1} fill="#E91E63" />
      <circle cx={42} cy={53} r={2} fill="#E91E63" />
      {/* Play controls */}
      <polygon points="36,58 36,64 42,61" fill="#FFFFFF" opacity={0.8} />
      <rect x={28} y={58} width={2} height={6} fill="#FFFFFF" opacity={0.6} />
      <rect x={31} y={58} width={2} height={6} fill="#FFFFFF" opacity={0.6} />
      <rect x={46} y={58} width={2} height={6} fill="#FFFFFF" opacity={0.6} />
      <rect x={49} y={58} width={2} height={6} fill="#FFFFFF" opacity={0.6} />
    </g>
  );
}

function PoemGift() {
  return (
    <g>
      {/* Paper */}
      <rect x={14} y={6} width={52} height={68} rx={2} fill="#FFFDE7" stroke="#FFE082" strokeWidth={1} />
      {/* Curled corner */}
      <path d="M66,6 L56,6 L66,16 Z" fill="#FFF8E1" stroke="#FFE082" strokeWidth={0.5} />
      <path d="M56,6 L66,16" fill="none" stroke="#FFE082" strokeWidth={0.8} />
      {/* Poem lines - varied lengths for verse effect */}
      <line x1={22} y1={18} x2={52} y2={18} stroke="#BCAAA4" strokeWidth={1} />
      <line x1={22} y1={24} x2={46} y2={24} stroke="#BCAAA4" strokeWidth={1} />
      <line x1={22} y1={30} x2={54} y2={30} stroke="#BCAAA4" strokeWidth={1} />
      <line x1={22} y1={36} x2={42} y2={36} stroke="#BCAAA4" strokeWidth={1} />
      {/* Stanza break */}
      <line x1={22} y1={46} x2={50} y2={46} stroke="#BCAAA4" strokeWidth={1} />
      <line x1={22} y1={52} x2={44} y2={52} stroke="#BCAAA4" strokeWidth={1} />
      <line x1={22} y1={58} x2={52} y2={58} stroke="#BCAAA4" strokeWidth={1} />
      <line x1={22} y1={64} x2={40} y2={64} stroke="#BCAAA4" strokeWidth={1} />
      {/* Heart doodle */}
      <path
        d="M56,22 C55.5,21.5 54,20.5 54,19.5 C54,19 54.5,18.5 55,18.5 C55.5,18.5 56,19 56,19.5 C56,19 56.5,18.5 57,18.5 C57.5,18.5 58,19 58,19.5 C58,20.5 56.5,21.5 56,22 Z"
        fill="#E91E63"
        opacity={0.6}
      />
      {/* Quill pen hint */}
      <path d="M60,72 L56,54 L58,54 L62,72 Z" fill="#8D6E63" />
      <path d="M56,54 Q54,48 58,42" fill="#5D4037" />
    </g>
  );
}

function ReasonsJarGift() {
  return (
    <g>
      {/* Jar body */}
      <rect x={16} y={22} width={48} height={48} rx={6} fill="#E3F2FD" stroke="#90CAF9" strokeWidth={1.5} />
      {/* Jar shine */}
      <rect x={20} y={26} width={6} height={38} rx={3} fill="#FFFFFF" opacity={0.3} />
      {/* Jar lid */}
      <rect x={14} y={14} width={52} height={10} rx={4} fill="#FFD54F" stroke="#FFC107" strokeWidth={1} />
      <rect x={18} y={16} width={44} height={6} rx={2} fill="#FFECB3" />
      {/* Folded paper notes inside */}
      <rect x={22} y={36} width={14} height={8} rx={1} fill="#F8BBD0" transform="rotate(-10,29,40)" />
      <rect x={34} y={30} width={14} height={8} rx={1} fill="#C5E1A5" transform="rotate(8,41,34)" />
      <rect x={28} y={46} width={14} height={8} rx={1} fill="#FFE082" transform="rotate(-5,35,50)" />
      <rect x={42} y={42} width={14} height={8} rx={1} fill="#B3E5FC" transform="rotate(12,49,46)" />
      <rect x={24} y={56} width={14} height={8} rx={1} fill="#E1BEE7" transform="rotate(-8,31,60)" />
      <rect x={38} y={54} width={14} height={8} rx={1} fill="#FFCCBC" transform="rotate(6,45,58)" />
      {/* Heart on jar */}
      <path
        d="M40,74 C39,73 37.5,72 37.5,71 C37.5,70.5 38,70 38.5,70 C39,70 39.5,70.5 40,71 C40.5,70.5 41,70 41.5,70 C42,70 42.5,70.5 42.5,71 C42.5,72 41,73 40,74 Z"
        fill="#E91E63"
      />
    </g>
  );
}

function TimeCapsuleGift() {
  return (
    <g>
      {/* Capsule body */}
      <rect x={14} y={20} width={52} height={44} rx={8} fill="#78909C" stroke="#546E7A" strokeWidth={1.5} />
      {/* Metallic sheen */}
      <rect x={18} y={24} width={8} height={36} rx={4} fill="#B0BEC5" opacity={0.4} />
      {/* Lid line */}
      <line x1={14} y1={34} x2={66} y2={34} stroke="#546E7A" strokeWidth={2} />
      {/* Clasps */}
      <rect x={24} y={31} width={8} height={6} rx={2} fill="#FFD54F" />
      <rect x={48} y={31} width={8} height={6} rx={2} fill="#FFD54F" />
      {/* Lock */}
      <circle cx={40} cy={34} r={4} fill="#FFD54F" stroke="#FFC107" strokeWidth={1} />
      <rect x={38} y={34} width={4} height={4} rx={1} fill="#FFA000" />
      {/* Date text */}
      <text x={40} y={50} textAnchor="middle" fontSize={6} fill="#ECEFF1" fontWeight="bold">2024</text>
      {/* Heart engraved */}
      <path
        d="M40,58 C39,57 36,55 36,53 C36,52 37,51 38,51 C39,51 40,52 40,52.5 C40,52 41,51 42,51 C43,51 44,52 44,53 C44,55 41,57 40,58 Z"
        fill="none"
        stroke="#ECEFF1"
        strokeWidth={0.8}
      />
      {/* Stars around */}
      <polygon points="10,18 11,16 12,18 11,20" fill="#FFD54F" opacity={0.6} />
      <polygon points="68,18 69,16 70,18 69,20" fill="#FFD54F" opacity={0.6} />
    </g>
  );
}

function GratitudeListGift() {
  return (
    <g>
      {/* Notebook */}
      <rect x={14} y={8} width={52} height={64} rx={3} fill="#FFF9C4" stroke="#FFF176" strokeWidth={1} />
      {/* Spiral binding */}
      {[16, 22, 28, 34, 40, 46, 52, 58, 64].map((y) => (
        <circle key={y} cx={14} cy={y} r={2.5} fill="none" stroke="#BDBDBD" strokeWidth={1.5} />
      ))}
      {/* Title */}
      <text x={42} y={20} textAnchor="middle" fontSize={6} fill="#F57F17" fontWeight="bold">Grateful</text>
      {/* Heart */}
      <path
        d="M42,28 C41,27 39,25.5 39,24 C39,23 40,22.5 40.5,22.5 C41,22.5 41.5,23 42,23.5 C42.5,23 43,22.5 43.5,22.5 C44,22.5 45,23 45,24 C45,25.5 43,27 42,28 Z"
        fill="#E91E63"
      />
      {/* List items with checks */}
      <path d="M22,34 L25,37 L30,32" stroke="#4CAF50" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <line x1={34} y1={35} x2={58} y2={35} stroke="#A1887F" strokeWidth={1} />
      <path d="M22,42 L25,45 L30,40" stroke="#4CAF50" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <line x1={34} y1={43} x2={56} y2={43} stroke="#A1887F" strokeWidth={1} />
      <path d="M22,50 L25,53 L30,48" stroke="#4CAF50" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <line x1={34} y1={51} x2={54} y2={51} stroke="#A1887F" strokeWidth={1} />
      <path d="M22,58 L25,61 L30,56" stroke="#4CAF50" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      <line x1={34} y1={59} x2={58} y2={59} stroke="#A1887F" strokeWidth={1} />
    </g>
  );
}

// ========================  TREATS (6)  ========================

function ChocolateBoxGift() {
  return (
    <g>
      {/* Lid hint */}
      <rect x={4} y={16} width={72} height={10} rx={4} fill="#8D6E63" />
      {/* Bow on lid */}
      <path d="M32,16 Q40,8 48,16" fill="#E91E63" />
      <path d="M36,16 Q40,22 44,16" fill="#E91E63" />
      {/* Box base */}
      <rect x={6} y={24} width={68} height={48} rx={4} fill="#5D4037" />
      <rect x={8} y={26} width={64} height={44} rx={3} fill="#6D4C41" />
      {/* Dividers */}
      <line x1={30} y1={26} x2={30} y2={70} stroke="#5D4037" strokeWidth={1} />
      <line x1={52} y1={26} x2={52} y2={70} stroke="#5D4037" strokeWidth={1} />
      <line x1={8} y1={48} x2={72} y2={48} stroke="#5D4037" strokeWidth={1} />
      {/* Chocolates - various shapes */}
      <circle cx={19} cy={37} r={7} fill="#4E342E" />
      <circle cx={19} cy={37} r={4} fill="#3E2723" opacity={0.5} />
      <rect x={35} y={30} width={12} height={12} rx={2} fill="#795548" />
      <ellipse cx={63} cy={37} rx={7} ry={6} fill="#4E342E" />
      <circle cx={19} cy={59} r={7} fill="#795548" />
      <ellipse cx={41} cy={59} rx={6} ry={7} fill="#4E342E" />
      <circle cx={63} cy={59} r={7} fill="#3E2723" />
      <circle cx={63} cy={59} r={3} fill="#5D4037" opacity={0.6} />
    </g>
  );
}

function CupcakeGiftTreats() {
  return (
    <g>
      {/* Wrapper */}
      <path d="M18,48 L24,74 L56,74 L62,48 Z" fill="#FF7043" />
      {/* Wrapper lines */}
      <line x1={24} y1={48} x2={28} y2={74} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={32} y1={48} x2={34} y2={74} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={40} y1={48} x2={40} y2={74} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={48} y1={48} x2={46} y2={74} stroke="#E64A19" strokeWidth={0.5} />
      <line x1={56} y1={48} x2={52} y2={74} stroke="#E64A19" strokeWidth={0.5} />
      {/* Cake top */}
      <ellipse cx={40} cy={48} rx={23} ry={6} fill="#FFCC80" />
      {/* Frosting swirl */}
      <path d="M18,46 Q22,32 32,28 Q40,18 48,28 Q58,32 62,46" fill="#F48FB1" />
      <path d="M24,40 Q28,28 40,22 Q52,28 56,40" fill="#F8BBD0" />
      {/* Cherry on top */}
      <circle cx={40} cy={14} r={6} fill="#E53935" />
      <circle cx={38} cy={12} r={2} fill="#EF5350" opacity={0.6} />
      {/* Cherry stem */}
      <path d="M40,8 Q44,4 48,2" stroke="#4CAF50" strokeWidth={1.5} fill="none" />
      {/* Sparkles */}
      <polygon points="26,34 27,32 28,34 27,36" fill="#FFFFFF" opacity={0.5} />
      <polygon points="52,34 53,32 54,34 53,36" fill="#FFFFFF" opacity={0.5} />
    </g>
  );
}

function BreakfastBedGift() {
  return (
    <g>
      {/* Tray */}
      <rect x={4} y={40} width={72} height={8} rx={3} fill="#A1887F" />
      <rect x={8} y={44} width={4} height={20} rx={2} fill="#8D6E63" />
      <rect x={68} y={44} width={4} height={20} rx={2} fill="#8D6E63" />
      {/* Plate */}
      <ellipse cx={28} cy={36} rx={18} ry={6} fill="#ECEFF1" stroke="#BDBDBD" strokeWidth={1} />
      {/* Pancake stack */}
      <ellipse cx={28} cy={34} rx={12} ry={4} fill="#FFCC80" />
      <ellipse cx={28} cy={30} rx={11} ry={4} fill="#FFB74D" />
      <ellipse cx={28} cy={26} rx={10} ry={4} fill="#FFCC80" />
      {/* Syrup drip */}
      <path d="M22,26 Q20,30 22,34" stroke="#8D6E63" strokeWidth={1.5} fill="none" />
      {/* Butter pat */}
      <rect x={24} y={22} width={8} height={4} rx={1} fill="#FFF9C4" />
      {/* Coffee mug */}
      <rect x={54} y={24} width={14} height={16} rx={3} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      <ellipse cx={61} cy={26} rx={6} ry={2.5} fill="#5D4037" />
      <path d="M68,28 Q74,28 74,34 Q74,38 68,38" stroke="#E0E0E0" strokeWidth={2} fill="none" />
      {/* Steam */}
      <path d="M58,20 Q56,14 58,8" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
      <path d="M64,18 Q62,12 64,6" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
      {/* Heart on mug */}
      <path
        d="M61,32 C60.5,31.5 59,30.5 59,29.5 C59,29 59.5,28.5 60,28.5 C60.5,28.5 61,29 61,29.5 C61,29 61.5,28.5 62,28.5 C62.5,28.5 63,29 63,29.5 C63,30.5 61.5,31.5 61,32 Z"
        fill="#E91E63"
      />
    </g>
  );
}

function FavoriteSnacksGift() {
  return (
    <g>
      {/* Gift bag */}
      <rect x={12} y={20} width={56} height={52} rx={4} fill="#FFE0B2" stroke="#FFB74D" strokeWidth={1.5} />
      {/* Bag opening tissue paper */}
      <path d="M12,20 Q20,10 28,18 Q36,8 44,16 Q52,8 60,18 Q68,10 68,20" fill="#E1F5FE" />
      {/* Chip bag peeking out */}
      <rect x={18} y={12} width={16} height={22} rx={2} fill="#FF7043" />
      <rect x={20} y={16} width={12} height={6} rx={1} fill="#FFAB91" />
      {/* Candy bar */}
      <rect x={46} y={14} width={14} height={24} rx={2} fill="#8D6E63" />
      <rect x={48} y={18} width={10} height={4} rx={1} fill="#BCAAA4" />
      {/* Cookie visible */}
      <circle cx={30} cy={46} r={8} fill="#FFCC80" />
      <circle cx={27} cy={44} r={1.5} fill="#5D4037" />
      <circle cx={33} cy={44} r={1.5} fill="#5D4037" />
      <circle cx={30} cy={49} r={1.5} fill="#5D4037" />
      {/* Gummy bears */}
      <circle cx={52} cy={44} r={3} fill="#E53935" />
      <circle cx={52} cy={40} r={2} fill="#E53935" />
      <circle cx={48} cy={52} r={3} fill="#4CAF50" />
      <circle cx={48} cy={48} r={2} fill="#4CAF50" />
      {/* Bow */}
      <path d="M32,20 Q40,12 48,20" fill="#E91E63" />
      <path d="M36,20 Q40,26 44,20" fill="#E91E63" />
      <circle cx={40} cy={20} r={2} fill="#C2185B" />
    </g>
  );
}

function TeaSetGift() {
  return (
    <g>
      {/* Saucer */}
      <ellipse cx={32} cy={68} rx={22} ry={6} fill="#E0E0E0" stroke="#BDBDBD" strokeWidth={1} />
      {/* Teacup body */}
      <path d="M14,42 L18,64 Q32,68 46,64 L50,42 Z" fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      {/* Tea inside */}
      <ellipse cx={32} cy={44} rx={17} ry={5} fill="#FFCC80" />
      <ellipse cx={29} cy={43} rx={7} ry={2} fill="#FFE082" opacity={0.5} />
      {/* Handle */}
      <path d="M50,48 Q58,48 58,56 Q58,62 50,62" stroke="#E0E0E0" strokeWidth={3} fill="none" />
      {/* Floral pattern on cup */}
      <circle cx={24} cy={54} r={3} fill="#F48FB1" opacity={0.4} />
      <circle cx={40} cy={54} r={3} fill="#F48FB1" opacity={0.4} />
      <circle cx={32} cy={58} r={2} fill="#CE93D8" opacity={0.3} />
      {/* Steam */}
      <path d="M26,36 Q24,30 26,24" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
      <path d="M32,34 Q30,28 32,22" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
      <path d="M38,36 Q36,30 38,24" stroke="#BDBDBD" strokeWidth={1} fill="none" opacity={0.5} />
      {/* Teapot in background */}
      <ellipse cx={66} cy={50} rx={10} ry={12} fill="#E8F5E9" stroke="#A5D6A7" strokeWidth={1} />
      <rect x={62} y={38} width={8} height={4} rx={2} fill="#A5D6A7" />
      <circle cx={66} cy={38} r={2} fill="#81C784" />
      <path d="M56,48 Q50,48 50,52" stroke="#A5D6A7" strokeWidth={2} fill="none" />
    </g>
  );
}

function CookieJarGift() {
  return (
    <g>
      {/* Jar body */}
      <path d="M16,30 Q12,40 12,52 Q12,70 40,70 Q68,70 68,52 Q68,40 64,30 Z" fill="#FFCC80" stroke="#FFB74D" strokeWidth={1.5} />
      {/* Jar shine */}
      <path d="M20,34 Q18,44 18,54 Q18,62 22,66" stroke="#FFFFFF" strokeWidth={3} fill="none" opacity={0.3} strokeLinecap="round" />
      {/* Jar opening */}
      <ellipse cx={40} cy={30} rx={24} ry={6} fill="#FFE0B2" stroke="#FFB74D" strokeWidth={1} />
      {/* Lid */}
      <ellipse cx={40} cy={24} rx={22} ry={5} fill="#8D6E63" stroke="#6D4C41" strokeWidth={1} />
      {/* Lid knob */}
      <ellipse cx={40} cy={18} rx={6} ry={4} fill="#6D4C41" />
      <ellipse cx={40} cy={16} rx={4} ry={2} fill="#8D6E63" />
      {/* Cookie label */}
      <rect x={26} y={44} width={28} height={16} rx={3} fill="#FFFFFF" stroke="#BCAAA4" strokeWidth={0.8} />
      {/* Cookie drawing on label */}
      <circle cx={40} cy={52} r={5} fill="#FFCC80" />
      <circle cx={38} cy={50} r={1} fill="#5D4037" />
      <circle cx={42} cy={50} r={1} fill="#5D4037" />
      <circle cx={40} cy={54} r={1} fill="#5D4037" />
    </g>
  );
}

// ========================  EXPERIENCES (6)  ========================

function SunsetPicnicGift() {
  return (
    <g>
      {/* Sky - sunset colors */}
      <rect x={4} y={4} width={72} height={36} rx={4} fill="#FF8A65" />
      <rect x={4} y={4} width={72} height={18} rx={4} fill="#FFAB91" />
      {/* Sun */}
      <circle cx={40} cy={18} r={10} fill="#FFEB3B" />
      <circle cx={40} cy={18} r={8} fill="#FFF176" />
      {/* Ground / grass */}
      <rect x={4} y={38} width={72} height={38} rx={4} fill="#81C784" />
      {/* Blanket */}
      <rect x={14} y={42} width={52} height={30} rx={2} fill="#EF5350" />
      <rect x={14} y={42} width={26} height={15} fill="#E53935" opacity={0.4} />
      <rect x={40} y={57} width={26} height={15} fill="#E53935" opacity={0.4} />
      {/* Basket */}
      <rect x={30} y={46} width={20} height={14} rx={3} fill="#A1887F" />
      <path d="M32,46 Q40,36 48,46" fill="none" stroke="#8D6E63" strokeWidth={2} />
      <line x1={30} y1={50} x2={50} y2={50} stroke="#8D6E63" strokeWidth={0.8} />
      <line x1={30} y1={54} x2={50} y2={54} stroke="#8D6E63" strokeWidth={0.8} />
      {/* Wine glass left */}
      <line x1={22} y1={54} x2={22} y2={62} stroke="#E0E0E0" strokeWidth={1.5} />
      <path d="M18,48 Q22,56 26,48" fill="#E8F5E9" stroke="#E0E0E0" strokeWidth={0.8} />
      <line x1={18} y1={62} x2={26} y2={62} stroke="#E0E0E0" strokeWidth={1} />
      {/* Wine glass right */}
      <line x1={56} y1={54} x2={56} y2={62} stroke="#E0E0E0" strokeWidth={1.5} />
      <path d="M52,48 Q56,56 60,48" fill="#FCE4EC" stroke="#E0E0E0" strokeWidth={0.8} />
      <line x1={52} y1={62} x2={60} y2={62} stroke="#E0E0E0" strokeWidth={1} />
    </g>
  );
}

function RoadTripGift() {
  return (
    <g>
      {/* Sky */}
      <rect x={4} y={4} width={72} height={30} rx={4} fill="#81D4FA" />
      {/* Sun */}
      <circle cx={64} cy={14} r={8} fill="#FFF176" />
      {/* Mountains */}
      <polygon points="4,34 24,14 44,34" fill="#A5D6A7" />
      <polygon points="30,34 54,10 76,34" fill="#81C784" />
      {/* Road */}
      <path d="M30,76 L36,34 L44,34 L50,76 Z" fill="#616161" />
      {/* Road dashes */}
      <rect x={38} y={38} width={4} height={6} fill="#FFF176" />
      <rect x={38} y={48} width={4} height={6} fill="#FFF176" />
      <rect x={38} y={58} width={4} height={6} fill="#FFF176" />
      <rect x={38} y={68} width={4} height={6} fill="#FFF176" />
      {/* Car */}
      <rect x={14} y={52} width={22} height={10} rx={3} fill="#E53935" />
      <rect x={12} y={48} width={18} height={8} rx={3} fill="#EF5350" />
      {/* Windows */}
      <rect x={14} y={49} width={6} height={5} rx={1} fill="#B3E5FC" />
      <rect x={22} y={49} width={6} height={5} rx={1} fill="#B3E5FC" />
      {/* Wheels */}
      <circle cx={18} cy={62} r={3} fill="#333" />
      <circle cx={32} cy={62} r={3} fill="#333" />
      <circle cx={18} cy={62} r={1.2} fill="#9E9E9E" />
      <circle cx={32} cy={62} r={1.2} fill="#9E9E9E" />
      {/* Cloud */}
      <circle cx={20} cy={12} r={5} fill="#FFFFFF" opacity={0.7} />
      <circle cx={28} cy={10} r={6} fill="#FFFFFF" opacity={0.7} />
      <circle cx={36} cy={12} r={4} fill="#FFFFFF" opacity={0.7} />
    </g>
  );
}

function CookingTogetherGift() {
  return (
    <g>
      {/* Pot */}
      <rect x={14} y={34} width={52} height={34} rx={6} fill="#EF5350" />
      <rect x={14} y={34} width={52} height={6} rx={3} fill="#E53935" />
      {/* Pot handles */}
      <rect x={6} y={44} width={10} height={6} rx={3} fill="#C62828" />
      <rect x={64} y={44} width={10} height={6} rx={3} fill="#C62828" />
      {/* Lid */}
      <ellipse cx={40} cy={34} rx={28} ry={4} fill="#E0E0E0" stroke="#BDBDBD" strokeWidth={1} />
      <ellipse cx={40} cy={30} rx={6} ry={3} fill="#BDBDBD" />
      {/* Steam puffs */}
      <circle cx={30} cy={22} r={4} fill="#ECEFF1" opacity={0.5} />
      <circle cx={38} cy={18} r={5} fill="#ECEFF1" opacity={0.4} />
      <circle cx={48} cy={20} r={4} fill="#ECEFF1" opacity={0.5} />
      <circle cx={34} cy={12} r={3} fill="#ECEFF1" opacity={0.3} />
      <circle cx={44} cy={10} r={3.5} fill="#ECEFF1" opacity={0.3} />
      {/* Wooden spoon */}
      <line x1={56} y1={28} x2={68} y2={10} stroke="#A1887F" strokeWidth={3} strokeLinecap="round" />
      <ellipse cx={70} cy={8} rx={4} ry={6} fill="#BCAAA4" transform="rotate(30,70,8)" />
      {/* Heart in steam */}
      <path
        d="M40,14 C39,13 37,12 37,10.5 C37,9.5 38,9 38.5,9 C39,9 39.5,9.5 40,10 C40.5,9.5 41,9 41.5,9 C42,9 43,9.5 43,10.5 C43,12 41,13 40,14 Z"
        fill="#E91E63"
        opacity={0.6}
      />
    </g>
  );
}

function StargazingGift() {
  return (
    <g>
      {/* Night sky */}
      <rect x={4} y={4} width={72} height={54} rx={6} fill="#0D1B4A" />
      {/* Stars */}
      <circle cx={15} cy={12} r={1.5} fill="#FFFFFF" />
      <circle cx={30} cy={8} r={1} fill="#FFFFFF" opacity={0.8} />
      <circle cx={50} cy={10} r={1.5} fill="#FFFFFF" />
      <circle cx={65} cy={15} r={1} fill="#FFFFFF" opacity={0.7} />
      <circle cx={25} cy={22} r={1.2} fill="#FFFFFF" opacity={0.9} />
      <circle cx={55} cy={24} r={1} fill="#FFFFFF" />
      <circle cx={12} cy={35} r={0.8} fill="#FFFFFF" opacity={0.6} />
      <circle cx={70} cy={32} r={1.2} fill="#FFFFFF" />
      <circle cx={42} cy={16} r={1.3} fill="#FFFFFF" />
      {/* Shooting star */}
      <line x1={58} y1={8} x2={48} y2={18} stroke="#FFF176" strokeWidth={1.5} strokeLinecap="round" />
      <circle cx={48} cy={18} r={2} fill="#FFF176" />
      {/* Moon */}
      <circle cx={66} cy={42} r={8} fill="#FFC107" />
      <circle cx={70} cy={38} r={7} fill="#0D1B4A" />
      {/* Ground */}
      <path d="M4,56 Q40,50 76,56 L76,76 L4,76 Z" fill="#2E7D32" />
      {/* Blanket on ground */}
      <rect x={20} y={58} width={40} height={14} rx={2} fill="#7986CB" />
      {/* Two people silhouettes */}
      <circle cx={32} cy={54} r={4} fill="#3F51B5" />
      <circle cx={48} cy={54} r={4} fill="#3F51B5" />
    </g>
  );
}

function SpaDayGift() {
  return (
    <g>
      {/* Towel roll */}
      <rect x={8} y={44} width={64} height={24} rx={8} fill="#FFFFFF" />
      <ellipse cx={72} cy={56} rx={4} ry={12} fill="#F5F5F5" stroke="#E0E0E0" strokeWidth={0.5} />
      <ellipse cx={72} cy={56} rx={2} ry={8} fill="#FAFAFA" />
      {/* Towel stripe */}
      <rect x={8} y={52} width={64} height={4} fill="#B3E5FC" opacity={0.5} />
      {/* Cucumber slices */}
      <circle cx={28} cy={30} r={8} fill="#81C784" />
      <circle cx={28} cy={30} r={5} fill="#A5D6A7" />
      <circle cx={52} cy={30} r={8} fill="#81C784" />
      <circle cx={52} cy={30} r={5} fill="#A5D6A7" />
      {/* Face hint */}
      <ellipse cx={40} cy={32} rx={22} ry={18} fill="#FFE0B2" opacity={0.3} />
      {/* Smile */}
      <path d="M34,38 Q40,44 46,38" stroke="#BCAAA4" strokeWidth={1.5} fill="none" strokeLinecap="round" />
      {/* Flower */}
      <circle cx={14} cy={14} r={4} fill="#F48FB1" />
      <circle cx={10} cy={10} r={4} fill="#F48FB1" />
      <circle cx={18} cy={10} r={4} fill="#F48FB1" />
      <circle cx={10} cy={18} r={4} fill="#F48FB1" />
      <circle cx={18} cy={18} r={4} fill="#F48FB1" />
      <circle cx={14} cy={14} r={3} fill="#FFEB3B" />
      {/* Candle */}
      <rect x={62} y={16} width={8} height={24} rx={2} fill="#E1BEE7" />
      <ellipse cx={66} cy={14} rx={3} ry={4} fill="#FFAB00" />
      <ellipse cx={66} cy={13} rx={1.5} ry={2.5} fill="#FFF176" />
    </g>
  );
}

function AdventureDayGift() {
  return (
    <g>
      {/* Compass rose background */}
      <circle cx={40} cy={40} r={34} fill="#FFF8E1" stroke="#FFB300" strokeWidth={2} />
      <circle cx={40} cy={40} r={30} fill="#FFFDE7" />
      {/* Compass directions */}
      <polygon points="40,10 36,40 44,40" fill="#E53935" />
      <polygon points="40,70 36,40 44,40" fill="#ECEFF1" stroke="#BDBDBD" strokeWidth={0.3} />
      <polygon points="10,40 40,36 40,44" fill="#ECEFF1" stroke="#BDBDBD" strokeWidth={0.3} />
      <polygon points="70,40 40,36 40,44" fill="#ECEFF1" stroke="#BDBDBD" strokeWidth={0.3} />
      {/* Center */}
      <circle cx={40} cy={40} r={4} fill="#FFB300" />
      <circle cx={40} cy={40} r={2} fill="#FFF8E1" />
      {/* Cardinal labels */}
      <text x={40} y={20} textAnchor="middle" fontSize={6} fill="#E53935" fontWeight="bold">N</text>
      <text x={40} y={66} textAnchor="middle" fontSize={6} fill="#78909C">S</text>
      <text x={62} y={43} textAnchor="middle" fontSize={6} fill="#78909C">E</text>
      <text x={18} y={43} textAnchor="middle" fontSize={6} fill="#78909C">W</text>
      {/* Excitement sparkles */}
      <polygon points="68,8 70,4 72,8 70,10" fill="#FFD600" />
      <polygon points="8,8 10,4 12,8 10,10" fill="#FFD600" />
    </g>
  );
}

// ========================  COMFORT (5)  ========================

function CozyBlanketGift() {
  return (
    <g>
      {/* Folded blanket */}
      <rect x={8} y={26} width={64} height={44} rx={6} fill="#CE93D8" />
      <rect x={8} y={26} width={64} height={22} rx={6} fill="#BA68C8" />
      {/* Plaid pattern */}
      <line x1={24} y1={26} x2={24} y2={70} stroke="#AB47BC" strokeWidth={1} opacity={0.4} />
      <line x1={40} y1={26} x2={40} y2={70} stroke="#AB47BC" strokeWidth={1} opacity={0.4} />
      <line x1={56} y1={26} x2={56} y2={70} stroke="#AB47BC" strokeWidth={1} opacity={0.4} />
      <line x1={8} y1={36} x2={72} y2={36} stroke="#AB47BC" strokeWidth={1} opacity={0.4} />
      <line x1={8} y1={56} x2={72} y2={56} stroke="#AB47BC" strokeWidth={1} opacity={0.4} />
      {/* Fold line */}
      <line x1={8} y1={48} x2={72} y2={48} stroke="#9C27B0" strokeWidth={1.5} opacity={0.3} />
      {/* Fringe on bottom */}
      {[12, 18, 24, 30, 36, 42, 48, 54, 60, 66].map((x) => (
        <line key={x} x1={x} y1={70} x2={x} y2={76} stroke="#CE93D8" strokeWidth={1.5} strokeLinecap="round" />
      ))}
      {/* Soft texture hints */}
      <ellipse cx={20} cy={34} rx={6} ry={3} fill="#E1BEE7" opacity={0.3} />
      <ellipse cx={52} cy={60} rx={8} ry={3} fill="#E1BEE7" opacity={0.3} />
    </g>
  );
}

function ScentedCandleGift() {
  return (
    <g>
      {/* Candle jar */}
      <rect x={18} y={30} width={44} height={40} rx={6} fill="#E8F5E9" stroke="#A5D6A7" strokeWidth={1.5} />
      {/* Glass shine */}
      <rect x={22} y={34} width={5} height={30} rx={2} fill="#FFFFFF" opacity={0.3} />
      {/* Wax level */}
      <rect x={20} y={44} width={40} height={24} rx={4} fill="#FFF9C4" />
      {/* Wax surface */}
      <ellipse cx={40} cy={44} rx={20} ry={4} fill="#FFF176" />
      {/* Wick */}
      <line x1={40} y1={36} x2={40} y2={44} stroke="#333" strokeWidth={1.5} />
      {/* Flame */}
      <ellipse cx={40} cy={28} rx={5} ry={10} fill="#FF9800" />
      <ellipse cx={40} cy={26} rx={3} ry={7} fill="#FFC107" />
      <ellipse cx={40} cy={24} rx={1.5} ry={4} fill="#FFF176" />
      {/* Glow */}
      <circle cx={40} cy={28} r={14} fill="#FFAB00" opacity={0.1} />
      {/* Label */}
      <rect x={28} y={52} width={24} height={10} rx={2} fill="#FFFFFF" stroke="#BDBDBD" strokeWidth={0.5} />
      <line x1={32} y1={56} x2={48} y2={56} stroke="#A5D6A7" strokeWidth={1} />
      <line x1={34} y1={59} x2={46} y2={59} stroke="#A5D6A7" strokeWidth={0.8} />
    </g>
  );
}

function FuzzySocksGift() {
  return (
    <g>
      {/* Sock 1 */}
      <path d="M10,14 L10,50 Q10,66 24,66 L36,66 Q36,56 26,52 L26,14 Z" fill="#F48FB1" />
      <rect x={10} y={14} width={16} height={10} rx={2} fill="#EC407A" />
      <line x1={10} y1={30} x2={26} y2={30} stroke="#F8BBD0" strokeWidth={1.5} />
      <line x1={10} y1={36} x2={26} y2={36} stroke="#F8BBD0" strokeWidth={1.5} />
      <line x1={10} y1={42} x2={26} y2={42} stroke="#F8BBD0" strokeWidth={1.5} />
      {/* Heart on sock 1 */}
      <path
        d="M18,46 C17.5,45.5 16,44.5 16,43.5 C16,43 16.5,42.5 17,42.5 C17.5,42.5 18,43 18,43.5 C18,43 18.5,42.5 19,42.5 C19.5,42.5 20,43 20,43.5 C20,44.5 18.5,45.5 18,46 Z"
        fill="#C2185B"
      />
      {/* Fuzzy texture */}
      <circle cx={14} cy={28} r={1} fill="#F8BBD0" opacity={0.5} />
      <circle cx={22} cy={34} r={1} fill="#F8BBD0" opacity={0.5} />

      {/* Sock 2 */}
      <path d="M44,14 L44,50 Q44,66 58,66 L70,66 Q70,56 60,52 L60,14 Z" fill="#F48FB1" />
      <rect x={44} y={14} width={16} height={10} rx={2} fill="#EC407A" />
      <line x1={44} y1={30} x2={60} y2={30} stroke="#F8BBD0" strokeWidth={1.5} />
      <line x1={44} y1={36} x2={60} y2={36} stroke="#F8BBD0" strokeWidth={1.5} />
      <line x1={44} y1={42} x2={60} y2={42} stroke="#F8BBD0" strokeWidth={1.5} />
      <path
        d="M52,46 C51.5,45.5 50,44.5 50,43.5 C50,43 50.5,42.5 51,42.5 C51.5,42.5 52,43 52,43.5 C52,43 52.5,42.5 53,42.5 C53.5,42.5 54,43 54,43.5 C54,44.5 52.5,45.5 52,46 Z"
        fill="#C2185B"
      />
      <circle cx={48} cy={28} r={1} fill="#F8BBD0" opacity={0.5} />
      <circle cx={56} cy={34} r={1} fill="#F8BBD0" opacity={0.5} />
    </g>
  );
}

function TeddyBearGift() {
  return (
    <g>
      {/* Body */}
      <ellipse cx={40} cy={54} rx={20} ry={18} fill="#A1887F" />
      {/* Belly */}
      <ellipse cx={40} cy={56} rx={12} ry={12} fill="#BCAAA4" />
      {/* Head */}
      <circle cx={40} cy={28} r={16} fill="#A1887F" />
      {/* Ears */}
      <circle cx={24} cy={16} r={7} fill="#A1887F" />
      <circle cx={56} cy={16} r={7} fill="#A1887F" />
      <circle cx={24} cy={16} r={4} fill="#BCAAA4" />
      <circle cx={56} cy={16} r={4} fill="#BCAAA4" />
      {/* Snout */}
      <ellipse cx={40} cy={34} rx={7} ry={5} fill="#BCAAA4" />
      {/* Nose */}
      <ellipse cx={40} cy={32} rx={3} ry={2} fill="#5D4037" />
      {/* Eyes */}
      <circle cx={33} cy={26} r={3} fill="#333" />
      <circle cx={47} cy={26} r={3} fill="#333" />
      <circle cx={34} cy={25} r={1} fill="#FFFFFF" />
      <circle cx={48} cy={25} r={1} fill="#FFFFFF" />
      {/* Smile */}
      <path d="M36,36 Q40,40 44,36" stroke="#5D4037" strokeWidth={1} fill="none" />
      {/* Arms */}
      <ellipse cx={18} cy={50} rx={6} ry={10} fill="#A1887F" transform="rotate(20,18,50)" />
      <ellipse cx={62} cy={50} rx={6} ry={10} fill="#A1887F" transform="rotate(-20,62,50)" />
      {/* Bow tie */}
      <polygon points="34,42 40,46 34,50" fill="#E53935" />
      <polygon points="46,42 40,46 46,50" fill="#E53935" />
      <circle cx={40} cy={46} r={2} fill="#C62828" />
      {/* Feet */}
      <ellipse cx={30} cy={70} rx={8} ry={5} fill="#A1887F" />
      <ellipse cx={50} cy={70} rx={8} ry={5} fill="#A1887F" />
      <ellipse cx={30} cy={70} rx={5} ry={3} fill="#BCAAA4" />
      <ellipse cx={50} cy={70} rx={5} ry={3} fill="#BCAAA4" />
    </g>
  );
}

function PillowGift() {
  return (
    <g>
      {/* Pillow body */}
      <path
        d="M10,30 Q10,16 24,14 Q40,10 56,14 Q70,16 70,30 Q72,44 56,50 Q40,54 24,50 Q8,44 10,30 Z"
        fill="#E1BEE7"
        stroke="#CE93D8"
        strokeWidth={1.5}
      />
      {/* Pillow puffiness lines */}
      <path d="M16,24 Q28,18 40,20" stroke="#CE93D8" strokeWidth={0.8} fill="none" opacity={0.4} />
      <path d="M40,20 Q52,18 64,24" stroke="#CE93D8" strokeWidth={0.8} fill="none" opacity={0.4} />
      {/* Corner tufts */}
      <circle cx={14} cy={30} r={3} fill="#E1BEE7" stroke="#CE93D8" strokeWidth={0.5} />
      <circle cx={66} cy={30} r={3} fill="#E1BEE7" stroke="#CE93D8" strokeWidth={0.5} />
      {/* Heart pattern */}
      <path
        d="M40,36 C38,34 34,32 34,28 C34,26 36,24 38,24 C39.5,24 40,26 40,27 C40,26 40.5,24 42,24 C44,24 46,26 46,28 C46,32 42,34 40,36 Z"
        fill="#CE93D8"
        opacity={0.5}
      />
      {/* Softness waves */}
      <path d="M24,40 Q28,36 32,40" stroke="#D1C4E9" strokeWidth={0.8} fill="none" opacity={0.5} />
      <path d="M48,40 Q52,36 56,40" stroke="#D1C4E9" strokeWidth={0.8} fill="none" opacity={0.5} />
      {/* Zzz sleep hint */}
      <text x={56} y={10} fontSize={8} fill="#9575CD" opacity={0.5}>z</text>
      <text x={62} y={6} fontSize={6} fill="#9575CD" opacity={0.4}>z</text>
      <text x={66} y={2} fontSize={5} fill="#9575CD" opacity={0.3}>z</text>
    </g>
  );
}

// ========================  CREATIVE (5)  ========================

function DrawingGift() {
  return (
    <g>
      {/* Canvas / paper */}
      <rect x={10} y={8} width={60} height={52} rx={2} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1.5} />
      {/* Simple drawing - landscape */}
      <circle cx={54} cy={20} r={6} fill="#FFF176" />
      <path d="M12,48 L26,28 L38,42 L46,34 L68,48 Z" fill="#81C784" opacity={0.6} />
      <path d="M12,48 L20,36 L32,48 Z" fill="#66BB6A" opacity={0.7} />
      {/* Cloud */}
      <circle cx={26} cy={18} r={4} fill="#ECEFF1" />
      <circle cx={32} cy={16} r={5} fill="#ECEFF1" />
      <circle cx={38} cy={18} r={4} fill="#ECEFF1" />
      {/* Heart drawn in corner */}
      <path
        d="M56,40 C55,39 53,37.5 53,36 C53,35 54,34 55,34 C55.5,34 56,34.5 56,35 C56,34.5 56.5,34 57,34 C58,34 59,35 59,36 C59,37.5 57,39 56,40 Z"
        fill="#E91E63"
        opacity={0.7}
      />
      {/* Pencil */}
      <rect x={54} y={58} width={4} height={18} rx={1} fill="#FFCA28" transform="rotate(-30,56,67)" />
      <path d="M48,72 L50,76 L46,76 Z" fill="#5D4037" transform="rotate(-30,48,74)" />
      {/* Paint palette */}
      <ellipse cx={24} cy={68} rx={14} ry={8} fill="#8D6E63" />
      <circle cx={18} cy={66} r={2.5} fill="#E53935" />
      <circle cx={24} cy={64} r={2.5} fill="#42A5F5" />
      <circle cx={30} cy={66} r={2.5} fill="#FFCA28" />
      <circle cx={22} cy={70} r={2.5} fill="#4CAF50" />
    </g>
  );
}

function OrigamiGift() {
  return (
    <g>
      {/* Origami crane - body */}
      <polygon points="40,30 20,50 60,50" fill="#FF8A80" />
      {/* Head/neck */}
      <polygon points="20,50 8,34 16,44" fill="#FF8A80" />
      <polygon points="8,34 4,28 12,36" fill="#EF5350" />
      {/* Tail */}
      <polygon points="60,50 72,34 64,44" fill="#FF8A80" />
      {/* Left wing */}
      <polygon points="40,30 14,20 20,50" fill="#EF5350" />
      <polygon points="40,30 14,20 26,36" fill="#FFAB91" opacity={0.5} />
      {/* Right wing */}
      <polygon points="40,30 66,20 60,50" fill="#E53935" />
      <polygon points="40,30 66,20 54,36" fill="#FFCDD2" opacity={0.3} />
      {/* Wing fold lines */}
      <line x1={40} y1={30} x2={20} y2={50} stroke="#D32F2F" strokeWidth={0.5} opacity={0.5} />
      <line x1={40} y1={30} x2={60} y2={50} stroke="#D32F2F" strokeWidth={0.5} opacity={0.5} />
      {/* Beak */}
      <polygon points="4,28 2,26 6,30" fill="#FF6F00" />
      {/* Paper texture fold */}
      <line x1={40} y1={30} x2={40} y2={50} stroke="#EF9A9A" strokeWidth={0.5} opacity={0.4} />
      {/* Sparkles */}
      <polygon points="68,14 70,10 72,14 70,18" fill="#FFD600" opacity={0.6} />
      <polygon points="10,16 12,12 14,16 12,20" fill="#FFD600" opacity={0.5} />
    </g>
  );
}

function MixTapeGift() {
  return (
    <g>
      {/* Cassette body */}
      <rect x={8} y={16} width={64} height={44} rx={4} fill="#424242" stroke="#333" strokeWidth={1.5} />
      {/* Label area */}
      <rect x={14} y={20} width={52} height={22} rx={2} fill="#FFFFFF" />
      {/* Label text */}
      <text x={40} y={30} textAnchor="middle" fontSize={5} fill="#E91E63" fontWeight="bold">MIX TAPE</text>
      <line x1={20} y1={34} x2={60} y2={34} stroke="#F48FB1" strokeWidth={0.8} />
      <line x1={24} y1={38} x2={56} y2={38} stroke="#F48FB1" strokeWidth={0.8} />
      {/* Heart on label */}
      <path
        d="M50,26 C49.5,25.5 48,24.5 48,23.5 C48,23 48.5,22.5 49,22.5 C49.5,22.5 50,23 50,23.5 C50,23 50.5,22.5 51,22.5 C51.5,22.5 52,23 52,23.5 C52,24.5 50.5,25.5 50,26 Z"
        fill="#E91E63"
      />
      {/* Tape reels */}
      <circle cx={28} cy={50} r={7} fill="#333" />
      <circle cx={52} cy={50} r={7} fill="#333" />
      <circle cx={28} cy={50} r={4} fill="#8D6E63" />
      <circle cx={52} cy={50} r={4} fill="#8D6E63" />
      <circle cx={28} cy={50} r={1.5} fill="#333" />
      <circle cx={52} cy={50} r={1.5} fill="#333" />
      {/* Tape window */}
      <rect x={34} y={46} width={12} height={8} rx={1} fill="#1A1A1A" />
      <line x1={35} y1={50} x2={45} y2={50} stroke="#8D6E63" strokeWidth={0.5} />
      {/* Screw holes */}
      <circle cx={14} cy={54} r={1.5} fill="#616161" />
      <circle cx={66} cy={54} r={1.5} fill="#616161" />
    </g>
  );
}

function PhotoCollageGift() {
  return (
    <g>
      {/* Photo 1 - tilted left */}
      <rect x={4} y={10} width={28} height={24} rx={1} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={0.8} transform="rotate(-8,18,22)" />
      <rect x={6} y={12} width={24} height={18} fill="#E3F2FD" transform="rotate(-8,18,22)" />
      <circle cx={16} cy={18} r={4} fill="#FFD54F" transform="rotate(-8,18,22)" />
      {/* Photo 2 - tilted right */}
      <rect x={48} y={8} width={28} height={24} rx={1} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={0.8} transform="rotate(6,62,20)" />
      <rect x={50} y={10} width={24} height={18} fill="#FCE4EC" transform="rotate(6,62,20)" />
      <circle cx={60} cy={16} r={3} fill="#EF5350" transform="rotate(6,62,20)" />
      {/* Photo 3 - center */}
      <rect x={20} y={24} width={32} height={26} rx={1} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={1} />
      <rect x={22} y={26} width={28} height={20} fill="#E8F5E9" />
      <path d="M22,46 L32,36 L38,40 L44,32 L50,46 Z" fill="#66BB6A" opacity={0.5} />
      <circle cx={42} cy={32} r={3} fill="#FFF176" />
      {/* Photo 4 - bottom left */}
      <rect x={2} y={44} width={26} height={22} rx={1} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={0.8} transform="rotate(5,15,55)" />
      <rect x={4} y={46} width={22} height={16} fill="#FFF3E0" transform="rotate(5,15,55)" />
      {/* Photo 5 - bottom right */}
      <rect x={50} y={42} width={26} height={22} rx={1} fill="#FFFFFF" stroke="#E0E0E0" strokeWidth={0.8} transform="rotate(-4,63,53)" />
      <rect x={52} y={44} width={22} height={16} fill="#F3E5F5" transform="rotate(-4,63,53)" />
      {/* Heart sticker */}
      <path
        d="M40,68 C39,67 37,65.5 37,64 C37,63 38,62.5 38.5,62.5 C39,62.5 39.5,63 40,63.5 C40.5,63 41,62.5 41.5,62.5 C42,62.5 43,63 43,64 C43,65.5 41,67 40,68 Z"
        fill="#E91E63"
      />
    </g>
  );
}

function DiyCraftGift() {
  return (
    <g>
      {/* Scissors */}
      <circle cx={18} cy={18} r={6} fill="none" stroke="#78909C" strokeWidth={2} />
      <circle cx={30} cy={18} r={6} fill="none" stroke="#78909C" strokeWidth={2} />
      <line x1={22} y1={22} x2={34} y2={38} stroke="#78909C" strokeWidth={2.5} strokeLinecap="round" />
      <line x1={26} y1={22} x2={14} y2={38} stroke="#78909C" strokeWidth={2.5} strokeLinecap="round" />
      {/* Glue bottle */}
      <rect x={56} y={14} width={14} height={28} rx={3} fill="#FF9800" />
      <rect x={60} y={8} width={6} height={8} rx={2} fill="#E65100" />
      <circle cx={63} cy={8} r={2} fill="#FF6F00" />
      {/* Glue drip */}
      <path d="M62,42 Q63,46 64,42" fill="#FFE082" />
      {/* Craft paper pieces */}
      <rect x={8} y={46} width={20} height={14} rx={1} fill="#F48FB1" transform="rotate(-5,18,53)" />
      <rect x={24} y={50} width={18} height={12} rx={1} fill="#81C784" transform="rotate(3,33,56)" />
      <rect x={40} y={48} width={16} height={14} rx={1} fill="#FFD54F" transform="rotate(-2,48,55)" />
      {/* Star cutout */}
      <polygon points="14,68 16,62 18,68 16,72" fill="#FFCA28" />
      {/* Heart cutout */}
      <path
        d="M50,70 C49,69 47,67.5 47,66 C47,65 48,64.5 48.5,64.5 C49,64.5 49.5,65 50,65.5 C50.5,65 51,64.5 51.5,64.5 C52,64.5 53,65 53,66 C53,67.5 51,69 50,70 Z"
        fill="#E91E63"
      />
      {/* Glitter dots */}
      <circle cx={36} cy={44} r={1} fill="#FFD600" opacity={0.7} />
      <circle cx={46} cy={42} r={0.8} fill="#E040FB" opacity={0.6} />
      <circle cx={30} cy={46} r={0.8} fill="#40C4FF" opacity={0.6} />
    </g>
  );
}

// ========================  CLASSIC (4)  ========================

function FlowersWildflowerGift() {
  return (
    <g>
      {/* Stems */}
      <line x1={28} y1={40} x2={24} y2={72} stroke="#4CAF50" strokeWidth={2} strokeLinecap="round" />
      <line x1={40} y1={36} x2={40} y2={72} stroke="#4CAF50" strokeWidth={2} strokeLinecap="round" />
      <line x1={52} y1={40} x2={56} y2={72} stroke="#4CAF50" strokeWidth={2} strokeLinecap="round" />
      <line x1={34} y1={42} x2={30} y2={72} stroke="#66BB6A" strokeWidth={1.5} strokeLinecap="round" />
      <line x1={48} y1={42} x2={50} y2={72} stroke="#66BB6A" strokeWidth={1.5} strokeLinecap="round" />
      {/* Leaves */}
      <ellipse cx={32} cy={56} rx={5} ry={2.5} fill="#66BB6A" transform="rotate(-40,32,56)" />
      <ellipse cx={48} cy={54} rx={5} ry={2.5} fill="#66BB6A" transform="rotate(35,48,54)" />
      <ellipse cx={36} cy={62} rx={4} ry={2} fill="#81C784" transform="rotate(25,36,62)" />
      {/* Daisy flower */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <ellipse
          key={`d${angle}`}
          cx={28 + 7 * Math.cos((angle * Math.PI) / 180)}
          cy={32 + 7 * Math.sin((angle * Math.PI) / 180)}
          rx={4}
          ry={2.5}
          fill="#FFFFFF"
          transform={`rotate(${angle},${28 + 7 * Math.cos((angle * Math.PI) / 180)},${32 + 7 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      <circle cx={28} cy={32} r={4} fill="#FFEB3B" />
      {/* Purple wildflower */}
      {[0, 72, 144, 216, 288].map((angle) => (
        <ellipse
          key={`p${angle}`}
          cx={52 + 6 * Math.cos((angle * Math.PI) / 180)}
          cy={32 + 6 * Math.sin((angle * Math.PI) / 180)}
          rx={4}
          ry={2.5}
          fill="#CE93D8"
          transform={`rotate(${angle},${52 + 6 * Math.cos((angle * Math.PI) / 180)},${32 + 6 * Math.sin((angle * Math.PI) / 180)})`}
        />
      ))}
      <circle cx={52} cy={32} r={3} fill="#FFD54F" />
      {/* Pink center flower */}
      <circle cx={40} cy={28} r={5} fill="#F48FB1" />
      <circle cx={36} cy={24} r={4} fill="#F48FB1" />
      <circle cx={44} cy={24} r={4} fill="#F48FB1" />
      <circle cx={40} cy={22} r={4} fill="#F48FB1" />
      <circle cx={40} cy={26} r={3} fill="#FFEB3B" />
      {/* Tiny blue flowers */}
      <circle cx={34} cy={38} r={3} fill="#90CAF9" />
      <circle cx={34} cy={38} r={1.5} fill="#FFFFFF" />
      <circle cx={48} cy={40} r={3} fill="#90CAF9" />
      <circle cx={48} cy={40} r={1.5} fill="#FFFFFF" />
    </g>
  );
}

function JewelryBraceletGift() {
  return (
    <g>
      {/* Bracelet - oval chain shape */}
      <ellipse cx={40} cy={40} rx={28} ry={20} fill="none" stroke="#FFD54F" strokeWidth={4} />
      <ellipse cx={40} cy={40} rx={28} ry={20} fill="none" stroke="#FFECB3" strokeWidth={1.5} />
      {/* Chain links / beads */}
      <circle cx={12} cy={40} r={4} fill="#E91E63" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={18} cy={26} r={4} fill="#CE93D8" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={32} cy={22} r={4} fill="#81C784" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={48} cy={22} r={4} fill="#42A5F5" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={62} cy={26} r={4} fill="#FFD54F" stroke="#FFC107" strokeWidth={1} />
      <circle cx={68} cy={40} r={4} fill="#FF8A65" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={62} cy={54} r={4} fill="#F48FB1" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={48} cy={58} r={4} fill="#80DEEA" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={32} cy={58} r={4} fill="#C5E1A5" stroke="#FFD54F" strokeWidth={1} />
      <circle cx={18} cy={54} r={4} fill="#FFAB91" stroke="#FFD54F" strokeWidth={1} />
      {/* Heart charm dangling */}
      <line x1={40} y1={58} x2={40} y2={66} stroke="#FFD54F" strokeWidth={1.5} />
      <path
        d="M40,74 C38,72 34,69 34,66 C34,64 36,63 38,63 C39,63 40,64 40,65 C40,64 41,63 42,63 C44,63 46,64 46,66 C46,69 42,72 40,74 Z"
        fill="#E91E63"
      />
    </g>
  );
}

function PerfumeGift() {
  return (
    <g>
      {/* Bottle body */}
      <rect x={22} y={30} width={36} height={40} rx={4} fill="#F3E5F5" stroke="#CE93D8" strokeWidth={1.5} />
      {/* Liquid inside */}
      <rect x={24} y={40} width={32} height={28} rx={3} fill="#E1BEE7" />
      <rect x={24} y={40} width={32} height={14} rx={3} fill="#CE93D8" opacity={0.4} />
      {/* Glass shine */}
      <rect x={26} y={34} width={4} height={30} rx={2} fill="#FFFFFF" opacity={0.3} />
      {/* Neck */}
      <rect x={34} y={20} width={12} height={12} rx={2} fill="#F3E5F5" stroke="#CE93D8" strokeWidth={1} />
      {/* Cap */}
      <rect x={30} y={10} width={20} height={12} rx={4} fill="#FFD54F" stroke="#FFC107" strokeWidth={1} />
      <rect x={32} y={12} width={16} height={8} rx={3} fill="#FFECB3" />
      {/* Spritz lines */}
      <line x1={16} y1={18} x2={8} y2={12} stroke="#CE93D8" strokeWidth={1} strokeLinecap="round" opacity={0.5} />
      <line x1={14} y1={24} x2={6} y2={22} stroke="#CE93D8" strokeWidth={1} strokeLinecap="round" opacity={0.4} />
      <line x1={18} y1={14} x2={12} y2={6} stroke="#CE93D8" strokeWidth={1} strokeLinecap="round" opacity={0.3} />
      {/* Sparkles */}
      <polygon points="8,8 9,6 10,8 9,10" fill="#E040FB" opacity={0.5} />
      <polygon points="4,18 5,16 6,18 5,20" fill="#E040FB" opacity={0.4} />
      {/* Label */}
      <rect x={30} y={48} width={20} height={12} rx={2} fill="#FFFFFF" opacity={0.6} />
      <line x1={34} y1={52} x2={46} y2={52} stroke="#CE93D8" strokeWidth={0.8} />
      <line x1={36} y1={56} x2={44} y2={56} stroke="#CE93D8" strokeWidth={0.6} />
    </g>
  );
}

function WatchGift() {
  return (
    <g>
      {/* Top strap */}
      <rect x={30} y={4} width={20} height={26} rx={4} fill="#8D6E63" />
      <rect x={32} y={6} width={16} height={22} rx={3} fill="#A1887F" />
      {/* Strap holes */}
      <circle cx={40} cy={10} r={1.2} fill="#6D4C41" />
      <circle cx={40} cy={16} r={1.2} fill="#6D4C41" />
      <circle cx={40} cy={22} r={1.2} fill="#6D4C41" />
      {/* Bottom strap */}
      <rect x={30} y={52} width={20} height={26} rx={4} fill="#8D6E63" />
      <rect x={32} y={54} width={16} height={22} rx={3} fill="#A1887F" />
      <circle cx={40} cy={60} r={1.2} fill="#6D4C41" />
      <circle cx={40} cy={66} r={1.2} fill="#6D4C41" />
      <circle cx={40} cy={72} r={1.2} fill="#6D4C41" />
      {/* Watch face - outer ring */}
      <circle cx={40} cy={40} r={18} fill="#FFD54F" stroke="#FFC107" strokeWidth={2} />
      {/* Watch face - inner */}
      <circle cx={40} cy={40} r={15} fill="#FFFDE7" />
      {/* Hour markers */}
      {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((angle) => (
        <line
          key={angle}
          x1={40 + 12 * Math.cos(((angle - 90) * Math.PI) / 180)}
          y1={40 + 12 * Math.sin(((angle - 90) * Math.PI) / 180)}
          x2={40 + 14 * Math.cos(((angle - 90) * Math.PI) / 180)}
          y2={40 + 14 * Math.sin(((angle - 90) * Math.PI) / 180)}
          stroke="#333"
          strokeWidth={1}
        />
      ))}
      {/* Hour hand */}
      <line x1={40} y1={40} x2={40} y2={30} stroke="#333" strokeWidth={2} strokeLinecap="round" />
      {/* Minute hand */}
      <line x1={40} y1={40} x2={50} y2={36} stroke="#333" strokeWidth={1.5} strokeLinecap="round" />
      {/* Center dot */}
      <circle cx={40} cy={40} r={1.5} fill="#333" />
      {/* Crown knob */}
      <rect x={58} y={37} width={5} height={6} rx={2} fill="#FFC107" />
    </g>
  );
}

// ---------------------------------------------------------------------------
// Renderer registry
// ---------------------------------------------------------------------------

const giftRenderers: Record<string, () => React.ReactNode> = {
  // Romantic
  'love-letter': () => <LoveLetterGift />,
  'dozen-roses': () => <DozenRosesGift />,
  'heart-locket': () => <HeartLocketGift />,
  'love-coupons': () => <LoveCouponsGift />,
  'star-map': () => <StarMapGift />,
  'promise-ring': () => <PromiseRingGift />,

  // Fun
  'movie-tickets': () => <MovieTicketsGift />,
  'board-game': () => <BoardGameGift />,
  'karaoke-mic': () => <KaraokeMicGift />,
  'water-gun': () => <WaterGunGift />,
  'matching-pajamas': () => <MatchingPajamasGift />,
  'dance-lesson': () => <DanceLessonGift />,

  // Thoughtful
  'scrapbook': () => <ScrapbookGift />,
  'playlist': () => <PlaylistGift />,
  'poem': () => <PoemGift />,
  'reasons-jar': () => <ReasonsJarGift />,
  'time-capsule': () => <TimeCapsuleGift />,
  'gratitude-list': () => <GratitudeListGift />,

  // Treats
  'chocolate-box': () => <ChocolateBoxGift />,
  'cupcake-gift': () => <CupcakeGiftTreats />,
  'breakfast-bed': () => <BreakfastBedGift />,
  'favorite-snacks': () => <FavoriteSnacksGift />,
  'tea-set': () => <TeaSetGift />,
  'cookie-jar': () => <CookieJarGift />,

  // Experiences
  'sunset-picnic': () => <SunsetPicnicGift />,
  'road-trip': () => <RoadTripGift />,
  'cooking-together': () => <CookingTogetherGift />,
  'stargazing': () => <StargazingGift />,
  'spa-day': () => <SpaDayGift />,
  'adventure-day': () => <AdventureDayGift />,

  // Comfort
  'cozy-blanket': () => <CozyBlanketGift />,
  'scented-candle': () => <ScentedCandleGift />,
  'fuzzy-socks': () => <FuzzySocksGift />,
  'teddy-bear': () => <TeddyBearGift />,
  'pillow': () => <PillowGift />,

  // Creative
  'drawing': () => <DrawingGift />,
  'origami': () => <OrigamiGift />,
  'mix-tape': () => <MixTapeGift />,
  'photo-collage': () => <PhotoCollageGift />,
  'diy-craft': () => <DiyCraftGift />,

  // Classic
  'flowers-wildflower': () => <FlowersWildflowerGift />,
  'jewelry-bracelet': () => <JewelryBraceletGift />,
  'perfume': () => <PerfumeGift />,
  'watch': () => <WatchGift />,
};

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Render a gift's SVG content by its ID.
 *
 * Returns a `<g>` element containing the full SVG artwork for the gift.
 * Each gift is designed to fit within an ~80x80 unit coordinate space.
 *
 * Usage:
 * ```tsx
 * <svg viewBox="0 0 80 80" width={80} height={80}>
 *   {renderGiftSVG('love-letter')}
 * </svg>
 * ```
 */
export function renderGiftSVG(id: string): React.ReactNode {
  const renderer = giftRenderers[id];
  if (!renderer) {
    console.warn(`[giftLibrary] Unknown gift id: "${id}"`);
    return null;
  }
  return renderer();
}

/**
 * Get all gift definitions for a given category.
 */
export function getGiftsByCategory(category: string): GiftDefinition[] {
  return giftDefinitions.filter((g) => g.category === category);
}

/**
 * Get a single gift definition by ID, or undefined if not found.
 */
export function getGiftById(id: string): GiftDefinition | undefined {
  return giftDefinitions.find((g) => g.id === id);
}
