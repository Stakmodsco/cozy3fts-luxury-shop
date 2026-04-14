import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, X } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const revealRef = useReveal();

  const filtered = useMemo(() => {
    let result = products;
    if (activeCategory === "new") {
      result = result.filter((p) => p.tag === "new");
    } else if (activeCategory !== "all") {
      result = result.filter((p) => p.category === activeCategory);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }
    return result;
  }, [activeCategory, searchQuery]);

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

      {/* Search */}
      <div className="reveal mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full bg-card text-foreground text-sm py-2.5 pl-10 pr-10 rounded-lg border border-border focus:outline-none focus:border-foreground/30 transition-colors placeholder:text-muted-foreground/50"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <div className="reveal flex flex-wrap gap-2 mb-10">
        {categories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => handleCategory(cat.value)}
            className={`text-xs uppercase tracking-wide-caps px-4 py-2 rounded-sm transition-all duration-200 active:scale-[0.96] ${
              activeCategory === cat.value
                ? "btn-neumorph-dark text-primary-foreground"
                : "btn-neumorph text-muted-foreground hover:text-foreground"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div key={`${activeCategory}-${searchQuery}`} className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filtered.map((product, i) => (
          <div key={product.id} className="reveal visible" style={{ transitionDelay: `${i * 60}ms` }}>
            <ProductCard product={product} />
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground mt-20">
          {searchQuery ? `No products found for "${searchQuery}".` : "No products found in this category."}
        </p>
      )}
    </div>
  );
}
