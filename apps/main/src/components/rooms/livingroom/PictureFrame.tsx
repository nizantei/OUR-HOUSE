import { useState } from 'react';

interface PictureFrameProps {
  imageUrl?: string;
  onClick: () => void;
}

export function PictureFrame({ imageUrl, onClick }: PictureFrameProps) {
  const [isHovered, setIsHovered] = useState(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <g
      className="picture-frame cursor-pointer transition-transform duration-300"
      style={{
        transform: isHovered ? 'scale(1.05)' : 'scale(1)',
        transformOrigin: '525px 190px',
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      aria-label={imageUrl ? 'Featured image - click to change' : 'Click to upload featured image'}
      onKeyDown={handleKeyDown}
    >
      {/* Frame background */}
      <rect
        x="405"
        y="105"
        width="240"
        height="170"
        fill="#FFFFFF"
        rx="4"
      />

      {/* Image or placeholder */}
      {imageUrl ? (
        <>
          <defs>
            <clipPath id="frame-clip">
              <rect x="415" y="115" width="220" height="150" rx="2" />
            </clipPath>
          </defs>
          <image
            href={imageUrl}
            x="415"
            y="115"
            width="220"
            height="150"
            preserveAspectRatio="xMidYMid slice"
            clipPath="url(#frame-clip)"
          />
        </>
      ) : (
        <>
          {/* Empty state with floating animation */}
          <g className="animate-float" style={{ transformOrigin: '525px 190px' }}>
            <text
              x="525"
              y="205"
              textAnchor="middle"
              fontSize="48"
              fill="#D6D3D1"
            >
              📸
            </text>
          </g>
        </>
      )}

      {/* Wooden frame border */}
      <rect
        x="400"
        y="100"
        width="250"
        height="180"
        fill="none"
        stroke="#8B5A3C"
        strokeWidth="10"
        rx="6"
        style={{
          filter: 'drop-shadow(0px 4px 6px rgba(0, 0, 0, 0.15))',
        }}
      />

      {/* Inner frame detail */}
      <rect
        x="408"
        y="108"
        width="234"
        height="164"
        fill="none"
        stroke="#A0826D"
        strokeWidth="2"
        rx="4"
      />

      {/* Hover glow effect */}
      {isHovered && (
        <rect
          x="395"
          y="95"
          width="260"
          height="190"
          fill="none"
          stroke="#E8A87C"
          strokeWidth="3"
          opacity="0.6"
          rx="8"
          className="animate-breathe"
        />
      )}
    </g>
  );
}
