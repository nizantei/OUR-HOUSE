import { gardenConfig } from '../../../configs/garden.config';

export function Fence() {
  const { fence } = gardenConfig;

  const posts = Array.from({ length: fence.count }, (_, i) => ({
    x: fence.startX + i * fence.postSpacing,
  }));

  const totalWidth = (fence.count - 1) * fence.postSpacing;
  const railStartX = fence.startX;
  const railEndX = fence.startX + totalWidth + fence.postWidth;

  return (
    <g>
      {/* Bottom horizontal rail */}
      <rect
        x={railStartX}
        y={fence.y + fence.postHeight - 20}
        width={railEndX - railStartX}
        height={8}
        fill={fence.railColor}
        rx={2}
      />

      {/* Top horizontal rail */}
      <rect
        x={railStartX}
        y={fence.y + 10}
        width={railEndX - railStartX}
        height={8}
        fill={fence.railColor}
        rx={2}
      />

      {/* Vertical posts */}
      {posts.map((post, i) => (
        <g key={i}>
          <rect
            x={post.x}
            y={fence.y}
            width={fence.postWidth}
            height={fence.postHeight}
            fill={fence.postColor}
            rx={2}
          />
          {/* Pointed top */}
          <polygon
            points={`${post.x},${fence.y} ${post.x + fence.postWidth / 2},${fence.y - 8} ${post.x + fence.postWidth},${fence.y}`}
            fill={fence.postColor}
          />
        </g>
      ))}
    </g>
  );
}
