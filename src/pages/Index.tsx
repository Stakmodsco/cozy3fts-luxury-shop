import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import heroImg from "@/assets/hero-main.jpg";
import collectionMen from "@/assets/collection-men.jpg";
import collectionWomen from "@/assets/collection-women.jpg";
import collectionNew from "@/assets/collection-new.jpg";
import collectionThrift from "@/assets/collection-thrift.jpg";
import aboutImg from "@/assets/about-story.jpg";
import { products, formatPrice } from "@/lib/products";
import { useReveal } from "@/hooks/useReveal";
import { useParallax } from "@/hooks/useParallax";
import ProductCard from "@/components/ProductCard";
import BrandMarquee from "@/components/BrandMarquee";
import Carousel3D from "@/components/Carousel3D";

export default function Index() {
  const revealRef = useReveal();
  const heroParallax = useParallax(0.25);

  const bestsellers = products.filter((p) => p.tag === "bestseller" || p.tag === "new").slice(0, 4);

  const collections = [
    { name: "Men", image: collectionMen, link: "/shop?category=men" },
    { name: "Women", image: collectionWomen, link: "/shop?category=women" },
    { name: "New Arrivals", image: collectionNew, link: "/new-arrivals" },
    { name: "The Thrift Edit", image: collectionThrift, link: "/thrift" },
  ];

  return (
    <div ref={revealRef}>
      {/* Hero */}
      <section className="relative h-screen min-h-[600px] flex items-end overflow-hidden">
        <img
          ref={heroParallax}
          src={heroImg}
          alt="CoZy 3Fts campaign"
          className="absolute inset-0 w-full h-full object-cover scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-foreground/10 to-transparent" />
        <div className="relative section-padding pb-16 md:pb-24 w-full">
          <h1
            className="font-display text-primary-foreground text-4xl md:text-6xl lg:text-7xl tracking-display leading-[1.05] max-w-2xl animate-fade-up"
            style={{ textWrap: "balance" } as React.CSSProperties}
          >
            Redefining Comfort. Elevated Streetwear.
          </h1>
          <p className="text-primary-foreground/70 text-sm md:text-base mt-4 max-w-md animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Premium essentials crafted in Nairobi — built for the culture, worn by the world.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 mt-8 text-sm uppercase tracking-wide-caps font-medium px-8 py-3.5 rounded-sm btn-neumorph-dark text-primary-foreground animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Collections */}
      <section className="section-padding py-20 md:py-32">
        <div className="reveal">
          <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Collections</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-display">Explore the Range</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-10">
          {collections.map((col, i) => (
            <Link
              key={col.name}
              to={col.link}
              className="reveal group relative overflow-hidden rounded-sm aspect-[3/4] img-3d-float"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <img
                src={col.image}
                alt={col.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/50 to-transparent" />
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="font-display text-primary-foreground text-2xl">{col.name}</h3>
                <span className="text-primary-foreground/70 text-xs uppercase tracking-wide-caps mt-1 inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  View Collection <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="section-padding pb-20 md:pb-32">
        <div className="reveal flex items-end justify-between mb-10">
          <div>
            <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Curated</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-display">Featured Pieces</h2>
          </div>
          <Link
            to="/shop"
            className="hidden md:inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors uppercase tracking-wide-caps"
          >
            View All <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {bestsellers.map((product, i) => (
            <div key={product.id} className="reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Brand Marquee */}
      <BrandMarquee />

      {/* 3D Merchandise Carousel */}
      <section className="section-padding py-16 md:py-24">
        <div className="reveal text-center mb-8">
          <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Showcase</p>
          <h2 className="font-display text-3xl md:text-4xl tracking-display">Our Collection</h2>
        </div>
        <div className="reveal">
          <Carousel3D />
        </div>
      </section>

      {/* Brand story */}
      <section className="section-padding pb-20 md:pb-32">
        <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center">
          <div className="overflow-hidden rounded-sm img-3d-float">
            <img src={aboutImg} alt="CoZy 3Fts studio" className="w-full h-auto object-cover" loading="lazy" />
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Our Story</p>
            <h2 className="font-display text-3xl md:text-4xl tracking-display mb-6" style={{ textWrap: "balance" } as React.CSSProperties}>
              Born in Nairobi. Made for Everywhere.
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8 max-w-md">
              CoZy 3Fts is a celebration of comfort, identity, and culture. We craft premium streetwear that feels as intentional as it looks — because looking good shouldn't come at the cost of feeling good.
            </p>
            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-sm uppercase tracking-wide-caps font-medium px-6 py-3 rounded-sm btn-neumorph"
            >
              Read More <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
