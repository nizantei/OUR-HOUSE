import { Wall } from '../core/Wall';
import { Floor } from '../core/Floor';
import { GalleryWall } from './GalleryWall';
import { PictureFrame } from './PictureFrame';
import { PhotoShelf } from './PhotoShelf';
import { AlbumBook } from './AlbumBook';
import { galleryConfig } from '../../../configs/gallery.config';
import type { WallImage, Album } from '@our-house/shared/types';

interface GallerySceneProps {
  wallImages: WallImage[];
  albums: Album[];
  svgRef: React.RefObject<SVGSVGElement | null>;
  onFrameClick: (id?: string) => void;
  onAlbumClick: (id: string) => void;
}

export function GalleryScene({
  wallImages,
  albums,
  svgRef,
  onFrameClick,
  onAlbumClick,
}: GallerySceneProps) {
  const { colors, wall, frameSlots, spotlights, albumSlots } = galleryConfig;

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 1000 600"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      role="img"
      aria-label="Gallery illustration"
    >
      <defs>
        {/* Spotlight radial gradients */}
        {spotlights.map((_spot, i) => (
          <radialGradient
            key={`spotlight-${i}`}
            id={`spotlight-grad-${i}`}
            cx="50%"
            cy="0%"
            r="100%"
            fx="50%"
            fy="0%"
          >
            <stop
              offset="0%"
              stopColor={wall.spotlightColor}
              stopOpacity={wall.spotlightOpacity}
            />
            <stop
              offset="70%"
              stopColor={wall.spotlightColor}
              stopOpacity={wall.spotlightOpacity * 0.3}
            />
            <stop
              offset="100%"
              stopColor={wall.spotlightColor}
              stopOpacity={0}
            />
          </radialGradient>
        ))}

        {/* Vignette gradient for wall edges */}
        <radialGradient id="gallery-vignette" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="transparent" stopOpacity={0} />
          <stop offset="100%" stopColor="#1a0f0a" stopOpacity={0.4} />
        </radialGradient>
      </defs>

      {/* Textured gallery wall background */}
      <GalleryWall />

      {/* Wall color overlay */}
      <Wall color={colors.wall} height={500} opacity={colors.wallOpacity} />

      {/* Floor */}
      <Floor color={colors.floor} y={500} height={100} />

      {/* Spotlight cone overlays */}
      {spotlights.map((spot, i) => (
        <ellipse
          key={`spotlight-cone-${i}`}
          cx={spot.cx}
          cy={spot.cy}
          rx={spot.r}
          ry={spot.r * 1.8}
          fill={`url(#spotlight-grad-${i})`}
          style={{ mixBlendMode: 'screen' }}
        />
      ))}

      {/* Picture frames: populated ones first, then empty placeholders */}
      {frameSlots.map((slot, i) => {
        const wallImage = wallImages[i];
        return (
          <PictureFrame
            key={wallImage?.id ?? `empty-frame-${i}`}
            slot={slot}
            imageUrl={wallImage?.url}
            onClick={() => onFrameClick(wallImage?.id)}
          />
        );
      })}

      {/* Wooden shelf */}
      <PhotoShelf />

      {/* Album books on the shelf */}
      {albums.slice(0, albumSlots.length).map((album, i) => (
        <AlbumBook
          key={album.id}
          album={album}
          slot={albumSlots[i]}
          index={i}
          onClick={() => onAlbumClick(album.id)}
        />
      ))}
    </svg>
  );
}
