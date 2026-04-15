import { useMemo } from "react";
import { useProducts } from "@/hooks/useProducts";
import { useWishlist } from "@/lib/wishlist";
import ProductCard from "@/components/ProductCard";
import { useReveal } from "@/hooks/useReveal";
import { Heart } from "lucide-react";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const revealRef = useReveal();
  const { isInWishlist } = useWishlist();
  const { products, loading } = useProducts();

  const wishlistProducts = useMemo(() => {
    return products.filter((p) => isInWishlist(p.id));
  }, [isInWishlist, products]);

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal">
        <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Saved Items</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">Your Wishlist</h1>
        <p className="text-muted-foreground text-sm max-w-lg mb-10 leading-relaxed">
          Products you've saved for later. Tap the heart to remove.
        </p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      ) : wishlistProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlistProducts.map((product, i) => (
            <div key={product.id} className="reveal" style={{ transitionDelay: `${i * 60}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <Heart className="w-12 h-12 mb-4" />
          <p className="text-sm mb-4">Your wishlist is empty</p>
          <Link
            to="/shop"
            className="text-sm uppercase tracking-wide-caps text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
          >
            Browse Products
          </Link>
        </div>
      )}
    </div>
  );
}
