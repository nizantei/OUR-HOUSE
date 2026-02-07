interface WaterDropsProps {
  active: boolean;
}

const dropKeyframes = `
@keyframes water-drop-fall {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  80% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(80px);
    opacity: 0;
  }
}
`;

const drops = [
  { cx: 0, delay: 0 },
  { cx: 5, delay: 0.15 },
  { cx: -4, delay: 0.3 },
  { cx: 8, delay: 0.45 },
  { cx: -2, delay: 0.6 },
  { cx: 3, delay: 0.75 },
];

export function WaterDrops({ active }: WaterDropsProps) {
  if (!active) return null;

  return (
    <g>
      <style>{dropKeyframes}</style>
      {drops.map((drop, i) => (
        <ellipse
          key={i}
          cx={drop.cx}
          cy={0}
          rx={2.5}
          ry={4}
          fill="#64B5F6"
          opacity={0.8}
          style={{
            animation: `water-drop-fall 0.9s ease-in infinite`,
            animationDelay: `${drop.delay}s`,
          }}
        />
      ))}
    </g>
  );
}
