interface FloorProps {
  color?: string;
}

export function Floor({ color = 'var(--warmth-200)' }: FloorProps) {
  return (
    <rect
      x="0"
      y="400"
      width="1000"
      height="200"
      fill={color}
    />
  );
}
