import { kitchenConfig } from '../../../configs/kitchen.config';

export function KitchenWindow() {
  const { frame, glass, sill, panes } = kitchenConfig.window;

  const glassX = frame.x + 6;
  const glassY = frame.y + 6;
  const glassWidth = frame.width - 12;
  const glassHeight = frame.height - 12;

  // Calculate pane divider positions (2x2 grid for 4 panes)
  const midX = glassX + glassWidth / 2;
  const midY = glassY + glassHeight / 2;

  return (
    <g className="kitchen-window">
      {/* Window frame */}
      <rect
        x={frame.x}
        y={frame.y}
        width={frame.width}
        height={frame.height}
        rx={frame.rx}
        fill={frame.color}
      />

      {/* Glass area with sky blue fill */}
      <rect
        x={glassX}
        y={glassY}
        width={glassWidth}
        height={glassHeight}
        rx={3}
        fill={glass.color}
      />

      {/* Simple outdoor scenery hints */}
      {/* Distant cloud */}
      <ellipse cx={glassX + 40} cy={glassY + 25} rx={20} ry={8} fill="rgba(255,255,255,0.6)" />
      <ellipse cx={glassX + 55} cy={glassY + 22} rx={15} ry={7} fill="rgba(255,255,255,0.5)" />

      {/* Green area at bottom of window (trees/grass) */}
      <rect
        x={glassX}
        y={glassY + glassHeight - 30}
        width={glassWidth}
        height={30}
        fill="#7CB68E"
        opacity={0.5}
      />

      {/* Pane dividers (cross pattern for 4 panes) */}
      {panes >= 2 && (
        <>
          {/* Vertical divider */}
          <line
            x1={midX}
            y1={glassY}
            x2={midX}
            y2={glassY + glassHeight}
            stroke={frame.color}
            strokeWidth={4}
          />
          {/* Horizontal divider */}
          <line
            x1={glassX}
            y1={midY}
            x2={glassX + glassWidth}
            y2={midY}
            stroke={frame.color}
            strokeWidth={4}
          />
        </>
      )}

      {/* Window sill */}
      <rect
        x={frame.x - 8}
        y={frame.y + frame.height}
        width={frame.width + 16}
        height={sill.height}
        rx={2}
        fill={sill.color}
      />
    </g>
  );
}
