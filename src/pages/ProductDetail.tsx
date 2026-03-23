import { useParams, Link } from "react-router-dom";
import { products, formatPrice } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, Award, CheckCircle } from "lucide-react";
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

  const related = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);
  if (related.length < 4) {
    const more = products.filter((p) => p.id !== product.id && !related.includes(p)).slice(0, 4 - related.length);
    related.push(...more);
  }

  const handleAdd = () => {
    if (!selectedSize) return;
    addItem(product, selectedSize);
  };

  const isThrift = product.category === "thrift";
  const backLink = isThrift ? "/thrift" : "/shop";
  const backLabel = isThrift ? "Back to Thrift" : "Back to Shop";

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <Link to={backLink} className="reveal inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8">
        <ArrowLeft className="w-3.5 h-3.5" /> {backLabel}
      </Link>

      <div className="reveal grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
        {/* Image */}
        <div className="overflow-hidden rounded-sm bg-secondary aspect-[3/4]">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="flex flex-wrap gap-2 mb-3">
            {product.tag && (
              <span className="text-xs uppercase tracking-wide-caps text-muted-foreground">
                {product.tag === "new" ? "New Arrival" : "Best Seller"}
              </span>
            )}
            {product.sourceTag && (
              <span className={`text-xs uppercase tracking-wide-caps px-2 py-0.5 rounded-sm ${
                product.sourceTag === "brand-new"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground"
              }`}>
                {product.sourceTag === "brand-new" ? "Brand New" : "Thrifted"}
              </span>
            )}
          </div>
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
                  className={`min-w-[3rem] h-12 flex items-center justify-center text-sm rounded-sm border transition-all duration-200 active:scale-[0.95] px-3 ${
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

          {/* Verified Authentic Badge — Thrift Only */}
          {isThrift && (
            <div className="mt-10 p-5 rounded-sm bg-secondary/60 border border-border">
              <div className="flex items-center gap-2 mb-3">
                <ShieldCheck className="w-5 h-5 text-foreground" />
                <span className="text-sm font-medium uppercase tracking-wide-caps">Verified Authentic</span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed mb-4">
                Every thrift item is inspected and authenticated by our team before listing. We guarantee the authenticity of all designer and branded items.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 text-foreground" />
                  <span>Hand-inspected for quality & condition</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Award className="w-3.5 h-3.5 text-foreground" />
                  <span>Authenticity verified by experts</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-foreground" />
                  <span>Money-back guarantee if not authentic</span>
                </div>
              </div>
            </div>
          )}
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
