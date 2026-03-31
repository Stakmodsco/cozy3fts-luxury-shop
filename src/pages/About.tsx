import aboutImg from "@/assets/about-story.jpg";
import heroImg from "@/assets/hero-main.jpg";
import { useReveal } from "@/hooks/useReveal";

export default function About() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 min-h-screen">
      {/* Header */}
      <section className="section-padding pb-16 md:pb-24">
        <div className="reveal max-w-2xl">
          <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">About Us</p>
          <h1 className="font-display text-4xl md:text-6xl tracking-display leading-[1.05] mb-6" style={{ textWrap: "balance" } as React.CSSProperties}>
            Comfort Is Not a Compromise
          </h1>
          <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
            CoZy 3Fts was born from a simple belief: you should never have to choose between looking good and feeling good. Based in Nairobi, Kenya, we design premium streetwear that bridges culture, comfort, and confidence.
          </p>
        </div>
      </section>

      {/* Full-width image */}
      <section className="reveal section-padding">
        <div className="overflow-hidden rounded-sm">
          <img src={heroImg} alt="CoZy 3Fts collection" className="w-full h-[50vh] md:h-[60vh] object-cover" loading="lazy" />
        </div>
      </section>

      {/* Story */}
      <section className="section-padding py-20 md:py-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">
          <div className="reveal">
            <h2 className="font-display text-3xl tracking-display mb-6">Our Story</h2>
            <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
              <p>
                We started with a question: why does comfortable clothing have to look basic? From our studio in Nairobi, we set out to create pieces that carry the same weight as high fashion — but feel like home.
              </p>
              <p>
                Every CoZy 3Fts piece is designed with intention. We combine carefully curated thrift pieces (“Cozy Thrifts”) with custom-branded apparel (“Cozy 3 Fits”) for men, women, and kids, covering headwear, upper-body, lower-body, and accessories. We source premium fabrics, obsess over fit, and keep our runs limited. This isn't fast fashion. It's slow, considered, and made to last.
              </p>
              <p>
                Our name is a reminder: three feet of personal space, your comfort zone — that's where confidence begins. We just make sure you look the part.
              </p>
            </div>
          </div>
          <div className="reveal" style={{ transitionDelay: "100ms" }}>
            <img src={aboutImg} alt="CoZy 3Fts studio" className="w-full h-auto rounded-sm" loading="lazy" />
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding pb-20 md:pb-32">
        <h2 className="reveal font-display text-3xl tracking-display mb-12">What We Stand For</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Comfort First", desc: "Every fabric, stitch, and silhouette is chosen for how it feels — not just how it looks." },
            { title: "Cultural Identity", desc: "We draw from Nairobi's creative energy and build for a global audience that values authenticity." },
            { title: "Slow Fashion", desc: "Limited runs, premium materials, zero compromise. We make less to make better." },
          ].map((val, i) => (
            <div key={val.title} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <h3 className="font-display text-xl mb-3">{val.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
