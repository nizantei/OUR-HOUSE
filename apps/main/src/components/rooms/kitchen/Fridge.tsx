import { kitchenConfig } from '../../../configs/kitchen.config';

export function Fridge() {
  const { body, freezer, door, handle, divider, surface } = kitchenConfig.fridge;

  return (
    <g className="fridge">
      {/* Fridge body */}
      <rect
        x={body.x}
        y={body.y}
        width={body.width}
        height={body.height}
        rx={body.rx}
        fill={body.color}
      />

      {/* Freezer compartment */}
      <rect
        x={freezer.x}
        y={freezer.y}
        width={freezer.width}
        height={freezer.height}
        rx={4}
        fill={freezer.color}
      />

      {/* Divider line between freezer and main door */}
      <line
        x1={body.x + 5}
        y1={divider.y}
        x2={body.x + body.width - 5}
        y2={divider.y}
        stroke={divider.color}
        strokeWidth={2}
      />

      {/* Main door */}
      <rect
        x={door.x}
        y={door.y}
        width={door.width}
        height={door.height}
        rx={4}
        fill={door.color}
      />

      {/* Handle */}
      <line
        x1={handle.x}
        y1={handle.y1}
        x2={handle.x}
        y2={handle.y2}
        stroke={handle.color}
        strokeWidth={handle.width}
        strokeLinecap="round"
      />

      {/* Subtle shadow along left edge */}
      <rect
        x={body.x}
        y={body.y}
        width={4}
        height={body.height}
        rx={body.rx}
        fill="rgba(0,0,0,0.05)"
      />

      {/* Interactive surface area (invisible, for magnet/note placement reference) */}
      <rect
        x={surface.x}
        y={surface.y}
        width={surface.width}
        height={surface.height}
        fill="transparent"
        className="fridge-surface"
      />
    </g>
  );
}
