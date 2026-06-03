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

  const next = () => setOrder((o) => [...o.slice(1), o[0]]);
  const prev = () => setOrder((o) => [o[o.length - 1], ...o.slice(0, -1)]);

  useEffect(() => {
    const tick = () => {
      if (!paused.current) next();
    };
    timer.current = window.setInterval(tick, AUTOPLAY_MS);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, []);

  return (
    <section
      className="hero-carousel relative w-full h-screen min-h-[600px] overflow-hidden"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      aria-roledescription="carousel"
    >
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
        <button className="hc-btn" onClick={prev} aria-label="Previous slide">
          <ArrowLeft className="w-4 h-4" />
        </button>
        <button className="hc-btn" onClick={next} aria-label="Next slide">
          <ArrowRight className="w-4 h-4" />
        </button>
      </nav>

      <div className="hc-dots" aria-hidden="true">
        {SLIDES.map((_, i) => (
          <span key={i} className={`hc-dot ${i === order[1] ? "is-active" : ""}`} />
        ))}
      </div>
    </section>
  );
}