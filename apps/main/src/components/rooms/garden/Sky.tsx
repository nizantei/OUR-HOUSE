import { gardenConfig } from '../../../configs/garden.config';

const cloudKeyframes = `
@keyframes cloud-float-1 {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(30px); }
}
@keyframes cloud-float-2 {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(-25px); }
}
@keyframes cloud-float-3 {
  0%, 100% { transform: translateX(0px); }
  50% { transform: translateX(20px); }
}
`;

const cloudAnimations = [
  'cloud-float-1 8s ease-in-out infinite',
  'cloud-float-2 10s ease-in-out infinite',
  'cloud-float-3 12s ease-in-out infinite',
];

export function Sky() {
  const { sky, sun, clouds } = gardenConfig;

  return (
    <g>
      <style>{cloudKeyframes}</style>

      {/* Sky gradient */}
      <defs>
        <linearGradient id="sky-gradient" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={sky.gradient.top} />
          <stop offset="100%" stopColor={sky.gradient.bottom} />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1000} height={sky.height} fill="url(#sky-gradient)" />

      {/* Sun glow + sun */}
      <circle cx={sun.cx} cy={sun.cy} r={sun.glowR} fill={sun.glowColor} opacity={0.4} />
      <circle cx={sun.cx} cy={sun.cy} r={sun.r} fill={sun.color} />

      {/* Clouds */}
      {clouds.map((cloud, i) => (
        <g
          key={i}
          transform={`translate(${cloud.cx}, ${cloud.cy}) scale(${cloud.scale})`}
          style={{ animation: cloudAnimations[i] }}
        >
          <ellipse cx={0} cy={0} rx={50} ry={20} fill="white" opacity={0.9} />
          <ellipse cx={-30} cy={5} rx={35} ry={18} fill="white" opacity={0.85} />
          <ellipse cx={25} cy={8} rx={40} ry={16} fill="white" opacity={0.85} />
        </g>
      ))}
    </g>
  );
}
