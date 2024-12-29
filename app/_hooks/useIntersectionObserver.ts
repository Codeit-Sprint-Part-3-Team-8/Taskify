import { useEffect, useRef } from 'react';

export default function useIntersectionObserver(
  callback: IntersectionObserverCallback,
) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!elementRef.current) return;

    observerRef.current = new IntersectionObserver(callback, {
      root: elementRef.current.parentNode as Element,
      threshold: 0.95,
    });
    observerRef.current.observe(elementRef.current);

    return () => observerRef.current?.disconnect();
  }, [callback]);

  return elementRef;
}
