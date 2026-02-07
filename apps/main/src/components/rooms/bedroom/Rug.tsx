import { bedroomConfig } from '../../../configs/bedroom.config';

export function Rug() {
  const { cx, cy, rx, ry, color, borderColor } = bedroomConfig.rug;

  return (
    <g className="rug">
      {/* Border ellipse (outer) */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx}
        ry={ry}
        fill={borderColor}
      />
      {/* Inner rug surface */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx - 8}
        ry={ry - 4}
        fill={color}
      />
      {/* Decorative inner ring */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={rx - 20}
        ry={ry - 10}
        fill="none"
        stroke={borderColor}
        strokeWidth={1}
        opacity={0.4}
      />
      {/* Center motif - subtle pattern */}
      <ellipse
        cx={cx}
        cy={cy}
        rx={30}
        ry={12}
        fill={borderColor}
        opacity={0.2}
      />
    </g>
  );
}
