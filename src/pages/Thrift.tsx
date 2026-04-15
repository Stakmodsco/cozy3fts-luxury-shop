import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";
import { useReveal } from "@/hooks/useReveal";

const thriftCategories = [
  { value: "all", label: "All" },
  { value: "caps", label: "Caps" },
  { value: "shirts", label: "Shirts & Tees" },
  { value: "bags", label: "Bags" },
  { value: "headgear", label: "Headgear" },
];

export default function Thrift() {
  const [active, setActive] = useState("all");
  const revealRef = useReveal();
  const { products, loading } = useProducts();

  const thriftProducts = useMemo(() => {
    const base = products.filter((p) => p.category === "thrift");
    if (active === "all") return base;
    return base.filter((p) => p.thriftCategory === active);
  }, [active, products]);

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal">
        <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Authenticated & Curated</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">The Thrift Edit</h1>
        <p className="text-muted-foreground text-sm max-w-lg mb-10 leading-relaxed">
          Hand-picked, authentic pre-loved pieces — from designer bags to vintage caps.
          Every item verified, every find one-of-a-kind.
        </p>
      </div>

      {/* Filters */}
      <div className="reveal flex flex-wrap gap-2 mb-10">
        {thriftCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActive(cat.value)}
            className={`text-xs uppercase tracking-wide-caps px-4 py-2 rounded-sm transition-all duration-200 active:scale-[0.96] ${
              active === cat.value
                ? "bg-foreground text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {thriftProducts.map((product, i) => (
              <div key={product.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {thriftProducts.length === 0 && (
            <p className="text-center text-muted-foreground mt-20">No items found in this category.</p>
          )}
        </>
      )}
    </div>
  );
}
