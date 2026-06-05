import { useState } from "react";
import { Link } from "react-router-dom";
import aboutImg from "@/assets/about-story.jpg";
import heroImg from "@/assets/hero-main.jpg";
import collectionMen from "@/assets/collection-men.jpg";
import collectionThrift from "@/assets/collection-thrift.jpg";
import collectionWomen from "@/assets/collection-women.jpg";

type Effect = "blink" | "horizontal-scroll" | "backwards-scroll" | "zoom-scroll";

const sections = [
  {
    id: "intro",
    eyebrow: "About Us",
    title: "Comfort Is Not a Compromise",
    body: "CoZy 3Fts was born from a simple belief: you should never have to choose between looking good and feeling good. Based in Nairobi, Kenya, we design premium streetwear that bridges culture, comfort, and confidence.",
    image: heroImg,
  },
  {
    id: "story",
    eyebrow: "Our Story",
    title: "Made Slow, Made to Last",
    body: "From our studio in Nairobi, we set out to create pieces that carry the weight of high fashion but feel like home. Premium fabrics, obsessed-over fits, limited runs. This isn't fast fashion — it's slow, considered, and built to outlive trends.",
    image: aboutImg,
  },
  {
    id: "curation",
    eyebrow: "Cozy Thrifts × Cozy 3 Fits",
    title: "Two Worlds, One Wardrobe",
    body: "We pair carefully curated thrifted pieces with custom-branded apparel for men, women, and kids — headwear, upper-body, lower-body, and accessories. Every piece earns its place.",
    image: collectionThrift,
  },
  {
    id: "comfort",
    eyebrow: "Comfort First",
    title: "Three Feet of Confidence",
    body: "Our name is a reminder: three feet of personal space, your comfort zone — that's where confidence begins. Every fabric, stitch and silhouette is chosen for how it feels, not just how it looks.",
    image: collectionMen,
  },
  {
    id: "culture",
    eyebrow: "Cultural Identity",
    title: "Rooted in Nairobi, Built for the World",
    body: "We draw from Nairobi's creative energy and build for a global audience that values authenticity. Slow fashion, sharp identity, zero compromise.",
    image: collectionWomen,
  },
];

const effects: { value: Effect; label: string }[] = [
  { value: "blink", label: "Blink" },
  { value: "horizontal-scroll", label: "Slide" },
  { value: "backwards-scroll", label: "Lift" },
  { value: "zoom-scroll", label: "Zoom" },
];

export default function About() {
  const [effect, setEffect] = useState<Effect>("blink");

  return (
    <div className="about-snap-root pt-24 md:pt-28" data-effect={effect}>
      <style>{aboutStyles}</style>

      {/* Effect picker */}
      <div className="about-effects">
        {effects.map((e) => (
          <button
            key={e.value}
            type="button"
            onClick={() => setEffect(e.value)}
            className={`about-effect-btn ${effect === e.value ? "is-active" : ""}`}
            aria-pressed={effect === e.value}
          >
            {e.label}
          </button>
        ))}
      </div>

      {/* Indicator dots */}
      <nav aria-label="Section indicator" className="about-indicator">
        <ul>
          {sections.map((s) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-label={s.title}>
                <span className="sr-only">{s.title}</span>
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <main className="about-main">
        {sections.map((s, i) => (
          <section key={s.id} id={s.id} className="about-section">
            <div className="about-content">
              <div className="about-grid">
                <div className="about-text">
                  <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">
                    {s.eyebrow}
                  </p>
                  <h2
                    className="font-display text-4xl md:text-6xl tracking-display leading-[1.05] mb-6"
                    style={{ textWrap: "balance" } as React.CSSProperties}
                  >
                    {s.title}
                  </h2>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed max-w-prose">
                    {s.body}
                  </p>
                  {i === sections.length - 1 && (
                    <div className="mt-8 flex flex-wrap gap-3">
                      <Link
                        to="/shop"
                        className="inline-flex items-center text-xs uppercase tracking-wide-caps px-5 py-3 rounded-sm bg-foreground text-primary-foreground hover:opacity-90 transition"
                      >
                        Shop the Edit
                      </Link>
                      <Link
                        to="/thrift"
                        className="inline-flex items-center text-xs uppercase tracking-wide-caps px-5 py-3 rounded-sm border border-border hover:border-foreground/40 transition"
                      >
                        Browse Thrifts
                      </Link>
                    </div>
                  )}
                </div>
                <div className="about-image">
                  <img src={s.image} alt={s.title} loading="lazy" draggable={false} />
                </div>
              </div>
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

const aboutStyles = `
.about-snap-root {
  position: relative;
  height: 100dvh;
  overflow-y: scroll;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  timeline-scope: --about-section;
  background: hsl(var(--background));
}
.about-main { position: relative; }
.about-section {
  scroll-snap-align: start;
  scroll-snap-stop: always;
  height: 100dvh;
  position: relative;
  view-timeline: --about-section;
}
.about-content {
  position: sticky;
  top: 0;
  height: 100dvh;
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 1.25rem;
  background: hsl(var(--background));
  overflow: hidden;
  animation: about-blink ease-in-out both;
  animation-timeline: --about-section;
}
@media (min-width: 768px) { .about-content { padding: 0 4rem; } }

.about-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  align-items: center;
}
@media (min-width: 900px) {
  .about-grid { grid-template-columns: 1fr 1fr; gap: 4rem; }
}
.about-image {
  position: relative;
  aspect-ratio: 4/5;
  overflow: hidden;
  border-radius: 4px;
  box-shadow: 0 30px 60px -20px hsl(0 0% 0% / 0.45);
}
.about-image img {
  width: 100%; height: 100%; object-fit: cover;
  transform: scale(1.02);
}

/* Effect switching */
.about-snap-root[data-effect="horizontal-scroll"] .about-content { animation-name: about-horizontal; }
.about-snap-root[data-effect="backwards-scroll"] .about-content { animation-name: about-backwards; }
.about-snap-root[data-effect="zoom-scroll"] .about-content { animation-name: about-zoom; }

@keyframes about-blink {
  0%, 100% { filter: blur(8px) contrast(4); opacity: 0; visibility: hidden; }
  50%     { filter: blur(0) contrast(1);   opacity: 1; visibility: visible; }
}
@keyframes about-horizontal {
  0%   { transform: translate3d(100%, 0, 0); }
  50%  { transform: none; }
  100% { transform: translate3d(-100%, 0, 0); }
}
@keyframes about-backwards {
  0%   { transform: translate3d(0, -100%, 0); }
  50%  { transform: none; }
  100% { transform: translate3d(0, 100%, 0); }
}
@keyframes about-zoom {
  0%   { filter: blur(4rem); transform: scale(0.2); opacity: 0; }
  50%  { filter: blur(0);    transform: none;        opacity: 1; }
  100% { filter: blur(2rem); transform: scale(1.4); opacity: 0; }
}

/* Effect buttons */
.about-effects {
  position: fixed;
  top: calc(env(safe-area-inset-top, 0px) + 88px);
  right: 1rem;
  z-index: 30;
  display: flex;
  flex-wrap: wrap;
  gap: 0.375rem;
  padding: 0.375rem;
  background: hsl(var(--background) / 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid hsl(var(--border));
  border-radius: 999px;
}
.about-effect-btn {
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  padding: 0.4rem 0.75rem;
  border-radius: 999px;
  color: hsl(var(--muted-foreground));
  transition: all 0.2s ease;
}
.about-effect-btn:hover { color: hsl(var(--foreground)); }
.about-effect-btn.is-active {
  background: hsl(var(--foreground));
  color: hsl(var(--primary-foreground));
}

/* Indicator */
.about-indicator {
  position: fixed;
  right: 1.25rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 20;
  display: none;
}
@media (min-width: 768px) { .about-indicator { display: block; } }
.about-indicator ul { display: flex; flex-direction: column; gap: 0.75rem; }
.about-indicator a {
  display: block;
  width: 8px; height: 8px;
  border-radius: 999px;
  background: hsl(var(--foreground) / 0.25);
  transition: all 0.3s ease;
}
.about-indicator a:hover { background: hsl(var(--foreground) / 0.6); transform: scale(1.4); }

@media (prefers-reduced-motion: reduce) {
  .about-snap-root { scroll-snap-type: none; }
  .about-content { animation: none !important; position: relative; height: auto; padding: 4rem 1.25rem; }
  .about-section { height: auto; }
}
`;
