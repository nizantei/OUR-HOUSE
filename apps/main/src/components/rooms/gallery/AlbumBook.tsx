import { useState } from 'react';
import type { Album } from '@our-house/shared/types';

const SPINE_COLORS = ['#8B4513', '#2E4057', '#6B3A2A', '#3D5A3E', '#5C3D6E'];

interface AlbumBookProps {
  album: Album;
  slot: { x: number; y: number };
  index: number;
  onClick: () => void;
}

export function AlbumBook({ album, slot, index, onClick }: AlbumBookProps) {
  const [isHovered, setIsHovered] = useState(false);

  const spineWidth = 30;
  const spineHeight = 50;
  const color = SPINE_COLORS[index % SPINE_COLORS.length];

  const centerX = slot.x + spineWidth / 2;
  const centerY = slot.y + spineHeight / 2;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <g
      className="cursor-pointer"
      style={{
        transform: isHovered ? 'scale(1.1)' : 'scale(1)',
        transformOrigin: `${centerX}px ${slot.y + spineHeight}px`,
        transition: 'transform 0.2s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={`Album: ${album.name}`}
      onKeyDown={handleKeyDown}
    >
      {/* Book spine body */}
      <rect
        x={slot.x}
        y={slot.y}
        width={spineWidth}
        height={spineHeight}
        fill={color}
        rx={2}
      />

      {/* Spine highlight (left edge) */}
      <rect
        x={slot.x}
        y={slot.y}
        width={3}
        height={spineHeight}
        fill="rgba(255,255,255,0.12)"
        rx={1}
      />

      {/* Spine shadow (right edge) */}
      <rect
        x={slot.x + spineWidth - 3}
        y={slot.y}
        width={3}
        height={spineHeight}
        fill="rgba(0,0,0,0.15)"
        rx={1}
      />

      {/* Top decorative band */}
      <rect
        x={slot.x + 3}
        y={slot.y + 4}
        width={spineWidth - 6}
        height={2}
        fill="rgba(255,215,0,0.4)"
        rx={0.5}
      />

      {/* Bottom decorative band */}
      <rect
        x={slot.x + 3}
        y={slot.y + spineHeight - 6}
        width={spineWidth - 6}
        height={2}
        fill="rgba(255,215,0,0.4)"
        rx={0.5}
      />

      {/* Album name as vertical rotated text */}
      <text
        x={centerX}
        y={centerY}
        textAnchor="middle"
        dominantBaseline="central"
        fontSize={7}
        fontWeight="600"
        fill="rgba(255,255,255,0.85)"
        style={{
          userSelect: 'none',
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
        }}
        transform={`rotate(-90, ${centerX}, ${centerY})`}
      >
        {album.name.length > 12 ? album.name.slice(0, 11) + '\u2026' : album.name}
      </text>

      {/* Hover glow */}
      {isHovered && (
        <rect
          x={slot.x - 2}
          y={slot.y - 2}
          width={spineWidth + 4}
          height={spineHeight + 4}
          rx={3}
          fill="none"
          stroke="rgba(255,215,0,0.4)"
          strokeWidth={1.5}
        />
      )}
    </g>
  );
}
