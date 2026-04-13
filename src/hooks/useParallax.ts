import { useEffect, useRef } from "react";

export function useParallax(speed = 0.3) {
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleScroll = () => {
      const rect = el.getBoundingClientRect();
      const windowH = window.innerHeight;
      if (rect.bottom < 0 || rect.top > windowH) return;
      const offset = (rect.top - windowH / 2) * speed;
      el.style.transform = `translateY(${offset}px) scale(1.1)`;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return ref;
}
