interface WallProps {
  color?: string;
  height?: number;
  opacity?: number;
}

export function Wall({ color = 'var(--living-room)', height = 400, opacity = 0.3 }: WallProps) {
  return (
    <rect
      x="0"
      y="0"
      width="1000"
      height={height}
      fill={color}
      opacity={opacity}
    />
  );
}
