import { useParams, Link } from "react-router-dom";
import { products, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProductCard from "@/components/ProductCard";
import { useReveal } from "@/hooks/useReveal";

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [selectedSize, setSelectedSize] = useState("");
  const revealRef = useReveal();

  if (!product) {
    return (
      <div className="pt-32 section-padding text-center min-h-screen">
        <p className="text-muted-foreground">Product not found.</p>
        <Link to="/shop" className="text-sm underline mt-4 inline-block">Back to Shop</Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
  };

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <Link to="/shop" className="reveal inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Shop
      </Link>

      <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Image */}
        <div className="overflow-hidden rounded-sm bg-secondary aspect-[3/4]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          {product.tag && (
            <span className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2">
              {product.tag === "new" ? "New Arrival" : "Best Seller"}
            </span>
          )}
          <h1 className="font-display text-3xl md:text-4xl tracking-display mb-2">{product.name}</h1>
          <p className="text-lg tabular-nums text-muted-foreground mb-6">{formatPrice(product.price)}</p>
          <p className="text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">{product.description}</p>

          {/* Size selector */}
          <div className="mb-8">
            <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-12 h-12 flex items-center justify-center text-sm rounded-sm border transition-all duration-200 active:scale-[0.95] ${
                    selectedSize === size
                      ? "bg-foreground text-primary-foreground border-foreground"
                      : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAdd}
            disabled={!selectedSize}
            className="w-full md:w-auto bg-foreground text-primary-foreground py-3.5 px-12 text-sm uppercase tracking-wide-caps font-medium rounded-sm hover:opacity-90 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {selectedSize ? "Add to Bag" : "Select a Size"}
          </button>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <section className="mt-24 md:mt-32">
          <h2 className="reveal font-display text-2xl md:text-3xl tracking-display mb-8">You May Also Like</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {related.map((p, i) => (
              <div key={p.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
                <ProductCard product={p} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
