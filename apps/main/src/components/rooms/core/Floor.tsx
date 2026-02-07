interface FloorProps {
  color?: string;
  y?: number;
  height?: number;
}

export function Floor({ color = 'var(--warmth-200)', y = 400, height = 200 }: FloorProps) {
  return (
    <rect
      x="0"
      y={y}
      width="1000"
      height={height}
      fill={color}
    />
  );
}
