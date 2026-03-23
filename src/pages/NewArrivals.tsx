import { useState, useMemo } from "react";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useReveal } from "@/hooks/useReveal";

const sourceFilters = [
  { value: "all", label: "All" },
  { value: "brand-new", label: "Brand New" },
  { value: "thrifted", label: "Thrifted" },
];

export default function NewArrivals() {
  const [activeSource, setActiveSource] = useState("all");
  const revealRef = useReveal();

  const newProducts = useMemo(() => {
    const base = products.filter((p) => p.tag === "new");
    if (activeSource === "all") return base;
    return base.filter((p) => p.sourceTag === activeSource);
  }, [activeSource]);

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal">
        <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Just Dropped</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">New Arrivals</h1>
        <p className="text-muted-foreground text-sm max-w-lg mb-10 leading-relaxed">
          The latest additions to our collection — fresh brand-new pieces and newly curated thrift finds, all in one place.
        </p>
      </div>

      {/* Source filters */}
      <div className="reveal flex flex-wrap gap-2 mb-10">
        {sourceFilters.map((filter) => (
          <button
            key={filter.value}
            onClick={() => setActiveSource(filter.value)}
            className={`text-xs uppercase tracking-wide-caps px-4 py-2 rounded-sm transition-all duration-200 active:scale-[0.96] ${
              activeSource === filter.value
                ? "bg-foreground text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {newProducts.map((product, i) => (
          <div key={product.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {newProducts.length === 0 && (
        <p className="text-center text-muted-foreground mt-20">No new arrivals in this category yet.</p>
      )}
    </div>
  );
}
