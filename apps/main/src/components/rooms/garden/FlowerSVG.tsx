interface FlowerSVGProps {
  flowerType: string;
  x: number;
  y: number;
  scale?: number;
}

function Rose() {
  return (
    <g>
      {/* Stem */}
      <line x1={0} y1={-10} x2={0} y2={30} stroke="#2E7D32" strokeWidth={3} />
      {/* Leaves */}
      <ellipse cx={-8} cy={15} rx={6} ry={3} fill="#43A047" transform="rotate(-30 -8 15)" />
      <ellipse cx={8} cy={20} rx={6} ry={3} fill="#43A047" transform="rotate(30 8 20)" />
      {/* Petals - layered */}
      <circle cx={0} cy={-14} r={6} fill="#E53935" />
      <circle cx={-5} cy={-10} r={5} fill="#C62828" />
      <circle cx={5} cy={-10} r={5} fill="#C62828" />
      <circle cx={-3} cy={-16} r={5} fill="#EF5350" />
      <circle cx={3} cy={-16} r={5} fill="#EF5350" />
      {/* Center */}
      <circle cx={0} cy={-13} r={3} fill="#B71C1C" />
    </g>
  );
}

function Sunflower() {
  return (
    <g>
      {/* Tall stem */}
      <line x1={0} y1={-15} x2={0} y2={30} stroke="#33691E" strokeWidth={4} />
      {/* Leaves */}
      <ellipse cx={-10} cy={10} rx={8} ry={4} fill="#558B2F" transform="rotate(-40 -10 10)" />
      <ellipse cx={10} cy={18} rx={8} ry={4} fill="#558B2F" transform="rotate(40 10 18)" />
      {/* Petals */}
      {Array.from({ length: 10 }, (_, i) => {
        const angle = (i * 36 * Math.PI) / 180;
        const px = Math.cos(angle) * 12;
        const py = -18 + Math.sin(angle) * 12;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={5}
            ry={3}
            fill="#FDD835"
            transform={`rotate(${i * 36} ${px} ${py})`}
          />
        );
      })}
      {/* Brown center */}
      <circle cx={0} cy={-18} r={7} fill="#5D4037" />
      <circle cx={0} cy={-18} r={5} fill="#795548" />
    </g>
  );
}

function Tulip() {
  return (
    <g>
      {/* Curved stem */}
      <path d="M 0 30 Q -2 10 0 -8" stroke="#2E7D32" strokeWidth={3} fill="none" />
      {/* Leaves */}
      <path d="M 0 25 Q -15 15 -5 5" stroke="#43A047" strokeWidth={2} fill="#66BB6A" />
      {/* Cup-shaped petals */}
      <path d="M -8 -8 Q -10 -22 0 -28 Q 10 -22 8 -8 Z" fill="#E53935" />
      <path d="M -4 -8 Q -2 -25 0 -28 Q 2 -25 4 -8 Z" fill="#EF5350" />
    </g>
  );
}

function Daisy() {
  return (
    <g>
      {/* Short stem */}
      <line x1={0} y1={-8} x2={0} y2={30} stroke="#2E7D32" strokeWidth={2.5} />
      {/* Small leaves */}
      <ellipse cx={-6} cy={18} rx={5} ry={2.5} fill="#43A047" transform="rotate(-25 -6 18)" />
      <ellipse cx={5} cy={22} rx={5} ry={2.5} fill="#43A047" transform="rotate(25 5 22)" />
      {/* White petals */}
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i * 45 * Math.PI) / 180;
        const px = Math.cos(angle) * 9;
        const py = -14 + Math.sin(angle) * 9;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={5}
            ry={2.5}
            fill="white"
            stroke="#E0E0E0"
            strokeWidth={0.5}
            transform={`rotate(${i * 45} ${px} ${py})`}
          />
        );
      })}
      {/* Yellow center */}
      <circle cx={0} cy={-14} r={5} fill="#FDD835" />
    </g>
  );
}

function Lavender() {
  return (
    <g>
      {/* Thin stem */}
      <line x1={0} y1={-5} x2={0} y2={30} stroke="#558B2F" strokeWidth={2} />
      {/* Small leaves */}
      <ellipse cx={-5} cy={20} rx={4} ry={1.5} fill="#689F38" transform="rotate(-30 -5 20)" />
      <ellipse cx={4} cy={24} rx={4} ry={1.5} fill="#689F38" transform="rotate(30 4 24)" />
      {/* Purple spike clusters */}
      {Array.from({ length: 6 }, (_, i) => (
        <ellipse
          key={i}
          cx={i % 2 === 0 ? -2 : 2}
          cy={-8 - i * 5}
          rx={4}
          ry={3}
          fill={i % 2 === 0 ? '#7B1FA2' : '#9C27B0'}
          opacity={0.9}
        />
      ))}
    </g>
  );
}

function Bluebell() {
  return (
    <g>
      {/* Curved stem */}
      <path d="M 0 30 Q 2 10 5 -5 Q 8 -15 4 -20" stroke="#2E7D32" strokeWidth={2} fill="none" />
      {/* Leaves */}
      <path d="M 0 25 Q -12 18 -4 10" stroke="#43A047" strokeWidth={1.5} fill="#66BB6A" />
      {/* Drooping bell shapes */}
      <path d="M 4 -20 Q -2 -18 -4 -12 Q 0 -10 4 -12 Q 8 -14 12 -18 Z" fill="#1976D2" />
      <path d="M 2 -16 Q -3 -14 -4 -8 Q 0 -6 3 -8 Q 6 -10 9 -14 Z" fill="#1E88E5" />
      <path d="M 0 -12 Q -4 -10 -4 -4 Q 0 -2 3 -4 Q 5 -6 7 -10 Z" fill="#2196F3" />
    </g>
  );
}

function Marigold() {
  return (
    <g>
      {/* Stem */}
      <line x1={0} y1={-8} x2={0} y2={30} stroke="#33691E" strokeWidth={3} />
      {/* Bushy leaves */}
      <ellipse cx={-8} cy={12} rx={7} ry={4} fill="#558B2F" transform="rotate(-35 -8 12)" />
      <ellipse cx={8} cy={16} rx={7} ry={4} fill="#558B2F" transform="rotate(35 8 16)" />
      <ellipse cx={-6} cy={22} rx={6} ry={3} fill="#689F38" transform="rotate(-20 -6 22)" />
      {/* Orange ruffled petals */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const px = Math.cos(angle) * 10;
        const py = -14 + Math.sin(angle) * 10;
        return (
          <ellipse
            key={i}
            cx={px}
            cy={py}
            rx={5}
            ry={3}
            fill={i % 2 === 0 ? '#FF9800' : '#F57C00'}
            transform={`rotate(${i * 30} ${px} ${py})`}
          />
        );
      })}
      {/* Center */}
      <circle cx={0} cy={-14} r={5} fill="#E65100" />
    </g>
  );
}

function Lily() {
  return (
    <g>
      {/* Long stem */}
      <line x1={0} y1={-12} x2={0} y2={30} stroke="#2E7D32" strokeWidth={3} />
      {/* Leaves */}
      <ellipse cx={-8} cy={15} rx={8} ry={3} fill="#43A047" transform="rotate(-30 -8 15)" />
      <ellipse cx={7} cy={20} rx={8} ry={3} fill="#43A047" transform="rotate(25 7 20)" />
      {/* Elegant petals - white/pink */}
      <path d="M 0 -28 Q -6 -22 -10 -14 Q -4 -12 0 -16 Z" fill="#F8BBD0" />
      <path d="M 0 -28 Q 6 -22 10 -14 Q 4 -12 0 -16 Z" fill="#FCE4EC" />
      <path d="M 0 -28 Q -8 -24 -12 -18 Q -6 -14 0 -18 Z" fill="white" opacity={0.9} />
      <path d="M 0 -28 Q 8 -24 12 -18 Q 6 -14 0 -18 Z" fill="white" opacity={0.9} />
      <path d="M 0 -28 Q -4 -20 -6 -12 Q 0 -10 0 -16 Z" fill="#F48FB1" opacity={0.7} />
      <path d="M 0 -28 Q 4 -20 6 -12 Q 0 -10 0 -16 Z" fill="#F48FB1" opacity={0.7} />
      {/* Pistil */}
      <line x1={0} y1={-18} x2={0} y2={-12} stroke="#FDD835" strokeWidth={1.5} />
      <circle cx={0} cy={-12} r={1.5} fill="#F9A825" />
    </g>
  );
}

const flowerComponents: Record<string, () => JSX.Element> = {
  rose: Rose,
  sunflower: Sunflower,
  tulip: Tulip,
  daisy: Daisy,
  lavender: Lavender,
  bluebell: Bluebell,
  marigold: Marigold,
  lily: Lily,
};

export function FlowerSVG({ flowerType, x, y, scale = 1 }: FlowerSVGProps) {
  const FlowerComponent = flowerComponents[flowerType] ?? Daisy;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <FlowerComponent />
    </g>
  );
}
