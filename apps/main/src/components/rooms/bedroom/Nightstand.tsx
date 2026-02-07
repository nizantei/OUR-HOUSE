import { bedroomConfig } from '../../../configs/bedroom.config';

export function Nightstand() {
  const { body, top, drawer } = bedroomConfig.nightstand;

  const topSurfaceHeight = 6;
  const drawerMargin = 8;
  const drawerWidth = body.width - drawerMargin * 2;
  const drawerHeight = 24;
  const drawerX = body.x + drawerMargin;
  const drawerY = body.y + topSurfaceHeight + 10;

  return (
    <g className="nightstand">
      {/* Nightstand body */}
      <rect
        x={body.x}
        y={body.y}
        width={body.width}
        height={body.height}
        rx={body.rx}
        fill={body.color}
      />

      {/* Top surface (slightly darker) */}
      <rect
        x={body.x - 2}
        y={body.y}
        width={body.width + 4}
        height={topSurfaceHeight}
        rx={2}
        fill={top.color}
      />

      {/* Drawer front */}
      <rect
        x={drawerX}
        y={drawerY}
        width={drawerWidth}
        height={drawerHeight}
        rx={2}
        fill={drawer.color}
      />

      {/* Drawer handle - small circle */}
      <circle
        cx={drawerX + drawerWidth / 2}
        cy={drawerY + drawerHeight / 2}
        r={3}
        fill={drawer.handleColor}
      />

      {/* Subtle shadow under the top surface */}
      <rect
        x={body.x}
        y={body.y + topSurfaceHeight}
        width={body.width}
        height={3}
        fill="#00000008"
      />

      {/* Legs - short pegs at bottom */}
      <rect
        x={body.x + 6}
        y={body.y + body.height}
        width={6}
        height={4}
        rx={1}
        fill={top.color}
      />
      <rect
        x={body.x + body.width - 12}
        y={body.y + body.height}
        width={6}
        height={4}
        rx={1}
        fill={top.color}
      />
    </g>
  );
}
