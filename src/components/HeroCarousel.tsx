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

const AUTOPLAY_MS = 5000;

export default function HeroCarousel() {
  // Order is rotated; index 1 (second item) is the active/foreground one per the CSS pattern.
  const [order, setOrder] = useState<number[]>(() => SLIDES.map((_, i) => i));
  const timer = useRef<number | null>(null);
  const paused = useRef(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

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
    if (reducedMotion) return;
    const tick = () => {
      if (!paused.current && !document.hidden) next();
    };
    timer.current = window.setInterval(tick, AUTOPLAY_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [reducedMotion]);

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
      tabIndex={0}
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