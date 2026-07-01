import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-main.jpg";
import collectionMen from "@/assets/collection-men.jpg";
import collectionWomen from "@/assets/collection-women.jpg";
import collectionNew from "@/assets/collection-new.jpg";
import collectionThrift from "@/assets/collection-thrift.jpg";
import aboutImg from "@/assets/about-story.jpg";

type Slide = {
  image: string;
  title: string;
  description: string;
  cta: string;
  href: string;
};

const SLIDES: Slide[] = [
  {
    image: heroImg,
    title: "Redefining Comfort",
    description: "Premium essentials crafted in Nairobi — built for the culture, worn by the world.",
    cta: "Shop Now",
    href: "/shop",
  },
  {
    image: collectionMen,
    title: "Men's Edit",
    description: "Heavyweight basics and statement layers tailored for everyday wear.",
    cta: "Shop Men",
    href: "/shop?category=men",
  },
  {
    image: collectionWomen,
    title: "Women's Edit",
    description: "Effortless silhouettes that move with confidence and warmth.",
    cta: "Shop Women",
    href: "/shop?category=women",
  },
  {
    image: collectionNew,
    title: "New Arrivals",
    description: "Fresh drops, freshly inspired. Be the first to wear them.",
    cta: "See New In",
    href: "/new-arrivals",
  },
  {
    image: collectionThrift,
    title: "The Thrift Edit",
    description: "Verified, curated, one-of-one pieces from the archives.",
    cta: "Browse Thrift",
    href: "/thrift",
  },
  {
    image: aboutImg,
    title: "Born in Nairobi",
    description: "A celebration of comfort, identity, and culture.",
    cta: "Our Story",
    href: "/about",
  },
];

const AUTOPLAY_DESKTOP_MS = 5000;
const AUTOPLAY_MOBILE_MS = 4200;
const SWIPE_THRESHOLD = 45; // px
const SWIPE_VELOCITY = 0.35; // px/ms for momentum flick

export default function HeroCarousel() {
  // Order is rotated; index 1 (second item) is the active/foreground one per the CSS pattern.
  const [order, setOrder] = useState<number[]>(() => SLIDES.map((_, i) => i));
  const timer = useRef<number | null>(null);
  const paused = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const tick = () => {
      if (!paused.current && !document.hidden) next();
    };
    const interval = isMobile ? AUTOPLAY_MOBILE_MS : AUTOPLAY_DESKTOP_MS;
    timer.current = window.setInterval(tick, interval);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [reducedMotion, isMobile]);

  // Keyboard navigation when carousel has focus
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    }
  };

  // Touch swipe with momentum for mobile
  const touchState = useRef<{
    startX: number;
    startY: number;
    startT: number;
    lastX: number;
    lastT: number;
    active: boolean;
    axisLocked: null | "x" | "y";
  }>({ startX: 0, startY: 0, startT: 0, lastX: 0, lastT: 0, active: false, axisLocked: null });

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touchState.current = {
      startX: t.clientX,
      startY: t.clientY,
      startT: performance.now(),
      lastX: t.clientX,
      lastT: performance.now(),
      active: true,
      axisLocked: null,
    };
    paused.current = true;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touchState.current.active) return;
    const t = e.touches[0];
    const dx = t.clientX - touchState.current.startX;
    const dy = t.clientY - touchState.current.startY;
    if (!touchState.current.axisLocked) {
      if (Math.abs(dx) > 8 || Math.abs(dy) > 8) {
        touchState.current.axisLocked = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
    }
    if (touchState.current.axisLocked === "x") {
      // Prevent vertical scroll conflict when clearly a horizontal swipe
      if (e.cancelable) e.preventDefault();
      touchState.current.lastX = t.clientX;
      touchState.current.lastT = performance.now();
    }
  };

  const onTouchEnd = () => {
    const s = touchState.current;
    if (!s.active) return;
    s.active = false;
    paused.current = false;
    if (s.axisLocked !== "x") return;
    const dx = s.lastX - s.startX;
    const dt = Math.max(1, s.lastT - s.startT);
    const velocity = Math.abs(dx) / dt;
    if (Math.abs(dx) > SWIPE_THRESHOLD || velocity > SWIPE_VELOCITY) {
      if (dx < 0) next();
      else prev();
    }
  };

  const activeSlide = SLIDES[order[1]];

  return (
    <section
      ref={sectionRef}
      className="hero-carousel relative w-full h-dvh min-h-[600px] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-foreground/60"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onFocus={() => (paused.current = true)}
      onBlur={() => (paused.current = false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
      tabIndex={0}
      style={{ touchAction: "pan-y" }}
      aria-roledescription="carousel"
      aria-label="Featured collections"
      role="region"
    >
      {/* Screen-reader live region announces current slide */}
      <p className="sr-only" aria-live="polite" aria-atomic="true">
        Slide {order[1] + 1} of {SLIDES.length}: {activeSlide.title}. {activeSlide.description}
      </p>

      <ul className="hc-slider">
        {order.map((idx, position) => {
          const slide = SLIDES[idx];
          const isActive = position === 1;
          return (
            <li
              key={idx}
              className="hc-item"
              style={{ backgroundImage: `url(${slide.image})` }}
              aria-hidden={!isActive}
              role="group"
              aria-roledescription="slide"
              aria-label={`${order.indexOf(idx) + 1} of ${SLIDES.length}: ${slide.title}`}
            >
              {isActive && (
                <div className="hc-content">
                  <p className="hc-eyebrow">CoZy 3Fts</p>
                  <h2 className="hc-title font-display tracking-display">{slide.title}</h2>
                  <p className="hc-description">{slide.description}</p>
                  <Link to={slide.href} className="hc-cta">
                    {slide.cta}
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <nav className="hc-nav" aria-label="Carousel navigation">
        <button type="button" className="hc-btn" onClick={prev} aria-label="Previous slide">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button type="button" className="hc-btn" onClick={next} aria-label="Next slide">
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      <div className="hc-dots" role="tablist" aria-label="Slide selector">
        {SLIDES.map((slide, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === order[1]}
            aria-label={`Go to slide ${i + 1}: ${slide.title}`}
            className={`hc-dot ${i === order[1] ? "is-active" : ""}`}
            onClick={() => {
              // Rotate so chosen idx becomes the active (index 1) position
              setOrder((o) => {
                const pos = o.indexOf(i);
                if (pos === -1) return o;
                const shift = (pos - 1 + o.length) % o.length;
                return [...o.slice(shift), ...o.slice(0, shift)];
              });
            }}
          />
        ))}
      </div>
    </section>
  );
}