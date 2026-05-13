import { useRef, useCallback } from 'react';

export default function useDragScroll(speed: number = 2.5) {
  const scrollRef = useRef<HTMLElement>(null);
  const hasDragged = useRef(false);

  const handleMouseDown = useCallback((e: React.MouseEvent<HTMLElement>) => {
    const slider = scrollRef.current;
    if (!slider) return;

    hasDragged.current = false;
    const startX = e.pageX - slider.offsetLeft;
    const scrollLeft = slider.scrollLeft;

    const onMouseMove = (e: MouseEvent) => {
      const x = e.pageX - slider.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > 5) hasDragged.current = true;
      slider.scrollLeft = scrollLeft - walk * speed;
    };

    const onMouseUp = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }, [speed]);

  return [scrollRef, handleMouseDown, hasDragged] as const;
};