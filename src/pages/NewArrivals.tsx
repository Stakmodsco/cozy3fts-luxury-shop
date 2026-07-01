import { useState, useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/ProductCard";

const sourceFilters = [
  { value: "all", label: "All" },
  { value: "brand-new", label: "Brand New" },
  { value: "thrifted", label: "Thrifted" },
];

const sortOptions = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name", label: "Name A–Z" },
];

export default function NewArrivals() {
  const { products, loading } = useProducts();
  const [activeSource, setActiveSource] = useState("all");
  const [sortBy, setSortBy] = useState("newest");

  const newProducts = useMemo(() => {
    let base = products.filter((p) => p.tag === "new");
    if (activeSource !== "all") base = base.filter((p) => p.sourceTag === activeSource);
    const sorted = [...base];
    switch (sortBy) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
    return sorted;
  }, [activeSource, sortBy, products]);

  return (
    <div className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div>
        <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Just Dropped</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">New Arrivals</h1>
        <p className="text-muted-foreground text-sm max-w-lg mb-10 leading-relaxed">
          The latest additions to our collection — fresh brand-new pieces and newly curated thrift finds, all in one place.
        </p>
      </div>

      {/* Filters + sort */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div className="flex flex-wrap gap-2">
          {sourceFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveSource(filter.value)}
              aria-pressed={activeSource === filter.value}
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
        <label className="flex items-center gap-2 text-xs uppercase tracking-wide-caps text-muted-foreground">
          Sort
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-secondary text-foreground px-3 py-2 rounded-sm text-xs focus:outline-none focus:ring-1 focus:ring-foreground"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Grid — instant updates, no reveal animation to keep scroll stable */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={`sk-${i}`} className="space-y-3">
              <div className="aspect-[3/4] skeleton-shimmer rounded-sm" />
              <div className="h-3 skeleton-shimmer rounded-sm w-3/4" />
              <div className="h-3 skeleton-shimmer rounded-sm w-1/3" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {newProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          {newProducts.length === 0 && (
            <p className="text-center text-muted-foreground mt-20">No new arrivals in this category yet.</p>
          )}
        </>
      )}
    </div>
  );
}
