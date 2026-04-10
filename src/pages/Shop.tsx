import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { products } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import { useReveal } from "@/hooks/useReveal";

const categories = [
  { value: "all", label: "All" },
  { value: "men", label: "Men" },
  { value: "women", label: "Women" },
  { value: "unisex", label: "Unisex" },
  { value: "new", label: "New Arrivals" },
];

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const revealRef = useReveal();

  const filtered = useMemo(() => {
    if (activeCategory === "all") return products;
    if (activeCategory === "new") return products.filter((p) => p.tag === "new");
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const handleCategory = (value: string) => {
    setActiveCategory(value);
    if (value === "all") {
      setSearchParams({});
    } else {
      setSearchParams({ category: value });
    }
  };

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal">
        <h1 className="font-display text-4xl md:text-5xl tracking-display mb-8">Shop</h1>
      </div>

      {/* Filters */}
      <div className="reveal flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            className={`text-xs uppercase tracking-wide-caps px-4 py-2 rounded-sm transition-all duration-200 active:scale-[0.96] ${
              activeCategory === cat.value
                ? "bg-foreground text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid - key forces re-mount so useReveal re-observes new elements */}
      <div key={activeCategory} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product, i) => (
          <div key={product.id} className="reveal visible" style={{ transitionDelay: `${i * 60}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-20">No products found in this category.</p>
      )}
    </div>
  );
}
