interface WallProps {
  color?: string;
}

export function Wall({ color = 'var(--living-room)' }: WallProps) {
  return (
    <rect
      x="0"
      y="0"
      width="1000"
      height="400"
      fill={color}
      opacity="0.3"
    />
  );
}
