import { renderGiftSVG } from './giftLibrary';

interface GiftSVGProps {
  giftId: string;
  size?: number;
}

export function GiftSVG({ giftId, size = 80 }: GiftSVGProps) {
  return (
    <svg
      viewBox="0 0 60 60"
      width={size}
      height={size}
      className="drop-shadow-sm"
    >
      {renderGiftSVG(giftId)}
    </svg>
  );
}
