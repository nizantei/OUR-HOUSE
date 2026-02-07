import { galleryConfig } from '../../../configs/gallery.config';

export function PhotoShelf() {
  const { shelf } = galleryConfig;
  const supportWidth = 10;
  const supportHeight = 30;

  // Place 3 support brackets evenly along the shelf
  const supportPositions = [
    shelf.x + shelf.width * 0.2,
    shelf.x + shelf.width * 0.5,
    shelf.x + shelf.width * 0.8,
  ];

  return (
    <g>
      {/* Main shelf surface */}
      <rect
        x={shelf.x}
        y={shelf.y}
        width={shelf.width}
        height={shelf.height}
        fill={shelf.color}
        rx={2}
      />

      {/* Top highlight edge */}
      <rect
        x={shelf.x}
        y={shelf.y}
        width={shelf.width}
        height={3}
        fill="rgba(255,255,255,0.15)"
        rx={1}
      />

      {/* Bottom shadow edge */}
      <rect
        x={shelf.x + 2}
        y={shelf.y + shelf.height}
        width={shelf.width - 4}
        height={2}
        fill="rgba(0,0,0,0.15)"
        rx={1}
      />

      {/* Support brackets */}
      {supportPositions.map((sx, i) => (
        <g key={i}>
          {/* Vertical bracket */}
          <rect
            x={sx - supportWidth / 2}
            y={shelf.y + shelf.height}
            width={supportWidth}
            height={supportHeight}
            fill={shelf.supportColor}
            rx={1}
          />
          {/* Diagonal brace */}
          <polygon
            points={`
              ${sx - supportWidth / 2},${shelf.y + shelf.height}
              ${sx - supportWidth / 2 - 12},${shelf.y + shelf.height}
              ${sx - supportWidth / 2},${shelf.y + shelf.height + 18}
            `}
            fill={shelf.supportColor}
            opacity={0.8}
          />
        </g>
      ))}
    </g>
  );
}
