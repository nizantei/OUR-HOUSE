import { useState } from 'react';
import { galleryConfig } from '../../../configs/gallery.config';

interface PictureFrameProps {
  slot: { x: number; y: number; width: number; height: number };
  imageUrl?: string;
  onClick: () => void;
}

export function PictureFrame({ slot, imageUrl, onClick }: PictureFrameProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { frameStyle } = galleryConfig;
  const { borderWidth, borderColor, matColor, matWidth, shadowColor } = frameStyle;

  const clipId = `frame-clip-${slot.x}-${slot.y}`;
  const centerX = slot.x + slot.width / 2;
  const centerY = slot.y + slot.height / 2;

  // Image area is inside the mat
  const imgX = slot.x + matWidth;
  const imgY = slot.y + matWidth;
  const imgW = slot.width - matWidth * 2;
  const imgH = slot.height - matWidth * 2;

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
        transform: isHovered ? 'scale(1.04)' : 'scale(1)',
        transformOrigin: `${centerX}px ${centerY}px`,
        transition: 'transform 0.25s ease',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={imageUrl ? 'Wall photo - click to view' : 'Empty frame - click to upload'}
      onKeyDown={handleKeyDown}
    >
      {/* Drop shadow */}
      <rect
        x={slot.x + 3}
        y={slot.y + 4}
        width={slot.width}
        height={slot.height}
        rx={2}
        fill={shadowColor}
        opacity={0.5}
      />

      {/* Outer frame border */}
      <rect
        x={slot.x - borderWidth}
        y={slot.y - borderWidth}
        width={slot.width + borderWidth * 2}
        height={slot.height + borderWidth * 2}
        rx={3}
        fill={borderColor}
      />

      {/* Inner frame line (ornate double-border effect) */}
      <rect
        x={slot.x - borderWidth + 2}
        y={slot.y - borderWidth + 2}
        width={slot.width + borderWidth * 2 - 4}
        height={slot.height + borderWidth * 2 - 4}
        rx={2}
        fill="none"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth={1}
      />

      {/* Mat (inner border area) */}
      <rect
        x={slot.x}
        y={slot.y}
        width={slot.width}
        height={slot.height}
        fill={matColor}
      />

      {imageUrl ? (
        <>
          <defs>
            <clipPath id={clipId}>
              <rect x={imgX} y={imgY} width={imgW} height={imgH} />
            </clipPath>
          </defs>
          <image
            href={imageUrl}
            x={imgX}
            y={imgY}
            width={imgW}
            height={imgH}
            preserveAspectRatio="xMidYMid slice"
            clipPath={`url(#${clipId})`}
          />
        </>
      ) : (
        <>
          {/* Empty frame placeholder */}
          <rect
            x={imgX}
            y={imgY}
            width={imgW}
            height={imgH}
            fill="#E8E0D4"
            opacity={0.5}
          />
          <text
            x={centerX}
            y={centerY + 8}
            textAnchor="middle"
            fontSize={28}
            fontWeight="300"
            fill="#B8A89A"
            style={{ userSelect: 'none' }}
          >
            +
          </text>
        </>
      )}

      {/* Hover glow */}
      {isHovered && (
        <rect
          x={slot.x - borderWidth - 3}
          y={slot.y - borderWidth - 3}
          width={slot.width + borderWidth * 2 + 6}
          height={slot.height + borderWidth * 2 + 6}
          rx={5}
          fill="none"
          stroke={borderColor}
          strokeWidth={2}
          opacity={0.5}
        />
      )}
    </g>
  );
}
