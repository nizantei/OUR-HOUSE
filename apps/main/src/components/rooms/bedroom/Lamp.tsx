import { bedroomConfig } from '../../../configs/bedroom.config';

export function Lamp() {
  const { base, stem, shade, glow } = bedroomConfig.lamp;

  return (
    <g className="lamp">
      {/* Radial gradient glow definition */}
      <defs>
        <radialGradient id="lamp-glow-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={glow.color} stopOpacity={glow.opacity} />
          <stop offset="60%" stopColor={glow.color} stopOpacity={glow.opacity * 0.4} />
          <stop offset="100%" stopColor={glow.color} stopOpacity={0} />
        </radialGradient>
      </defs>

      {/* Ambient glow circle (behind the lamp) */}
      <circle
        cx={glow.cx}
        cy={glow.cy}
        r={glow.r}
        fill="url(#lamp-glow-gradient)"
      />

      {/* Lamp base (ellipse on the nightstand top) */}
      <ellipse
        cx={base.cx}
        cy={base.cy}
        rx={base.rx}
        ry={base.ry}
        fill={base.color}
      />

      {/* Lamp stem */}
      <rect
        x={stem.x}
        y={stem.y}
        width={stem.width}
        height={stem.height}
        fill={stem.color}
        rx={1}
      />

      {/* Lamp shade */}
      <ellipse
        cx={shade.cx}
        cy={shade.cy}
        rx={shade.rx}
        ry={shade.ry}
        fill={shade.color}
      />
      {/* Shade bottom rim for depth */}
      <ellipse
        cx={shade.cx}
        cy={shade.cy + shade.ry - 2}
        rx={shade.rx - 2}
        ry={3}
        fill="#F5E6D3"
        opacity={0.5}
      />
      {/* Shade inner glow */}
      <ellipse
        cx={shade.cx}
        cy={shade.cy + 2}
        rx={shade.rx - 8}
        ry={shade.ry - 6}
        fill={glow.color}
        opacity={0.3}
      />
    </g>
  );
}
