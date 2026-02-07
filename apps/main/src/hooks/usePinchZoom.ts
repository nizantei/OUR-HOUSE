import { useCallback, useRef, useState } from 'react';

interface UsePinchZoomOptions {
  minScale?: number;
  maxScale?: number;
  onScaleChange?: (scale: number) => void;
}

export function usePinchZoom(initialScale: number = 1, options: UsePinchZoomOptions = {}) {
  const { minScale = 0.3, maxScale = 3, onScaleChange } = options;
  const [scale, setScale] = useState(initialScale);
  const initialDistanceRef = useRef(0);
  const initialScaleRef = useRef(initialScale);

  const getDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[1].clientX - touches[0].clientX;
    const dy = touches[1].clientY - touches[0].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      initialDistanceRef.current = getDistance(e.touches);
      initialScaleRef.current = scale;
    }
  }, [scale]);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (e.touches.length !== 2 || initialDistanceRef.current === 0) return;
    const currentDistance = getDistance(e.touches);
    const ratio = currentDistance / initialDistanceRef.current;
    const newScale = Math.max(minScale, Math.min(maxScale, initialScaleRef.current * ratio));
    setScale(newScale);
    onScaleChange?.(newScale);
  }, [minScale, maxScale, onScaleChange]);

  const handleTouchEnd = useCallback(() => {
    initialDistanceRef.current = 0;
  }, []);

  return {
    scale,
    setScale,
    pinchHandlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
    },
  };
}
