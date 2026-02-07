import { galleryConfig } from '../../../configs/gallery.config';

export function GalleryWall() {
  const { wall } = galleryConfig;

  return (
    <g>
      {/* Base textured wall background */}
      <rect x="0" y="0" width="1000" height="500" fill={wall.texture} />

      {/* Linen crosshatch texture pattern */}
      <defs>
        <pattern
          id="gallery-wall-texture"
          patternUnits="userSpaceOnUse"
          width="8"
          height="8"
        >
          {/* Horizontal fine lines */}
          <line
            x1="0"
            y1="2"
            x2="8"
            y2="2"
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
          <line
            x1="0"
            y1="6"
            x2="8"
            y2="6"
            stroke="rgba(0,0,0,0.04)"
            strokeWidth="0.5"
          />
          {/* Vertical fine lines */}
          <line
            x1="2"
            y1="0"
            x2="2"
            y2="8"
            stroke="rgba(255,255,255,0.03)"
            strokeWidth="0.5"
          />
          <line
            x1="6"
            y1="0"
            x2="6"
            y2="8"
            stroke="rgba(0,0,0,0.03)"
            strokeWidth="0.5"
          />
          {/* Diagonal crosshatch */}
          <line
            x1="0"
            y1="0"
            x2="8"
            y2="8"
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="0.3"
          />
          <line
            x1="8"
            y1="0"
            x2="0"
            y2="8"
            stroke="rgba(0,0,0,0.02)"
            strokeWidth="0.3"
          />
        </pattern>
      </defs>

      {/* Texture overlay */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="500"
        fill="url(#gallery-wall-texture)"
      />

      {/* Subtle vignette darkening at edges */}
      <rect
        x="0"
        y="0"
        width="1000"
        height="500"
        fill="url(#gallery-vignette)"
        opacity="0.3"
      />
    </g>
  );
}
