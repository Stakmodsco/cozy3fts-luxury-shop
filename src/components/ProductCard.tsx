import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/lib/products";
import { ShieldCheck, Heart } from "lucide-react";
import { useWishlist } from "@/lib/wishlist";
import { useState } from "react";

export default function ProductCard({ product }: { product: Product }) {
  const { toggleItem, isInWishlist } = useWishlist();
  const wishlisted = isInWishlist(product.id);
  const [animateHeart, setAnimateHeart] = useState(false);

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAnimateHeart(true);
    toggleItem(product);
    setTimeout(() => setAnimateHeart(false), 400);
  };

  return (
    <div className="group relative">
      <Link to={`/product/${product.id}`} className="block">
         <div className="relative overflow-hidden rounded-sm bg-secondary aspect-[3/4] img-3d-float">
           <img
             src={product.image}
             alt={product.name}
             className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 protected-image"
             loading="lazy"
             draggable={false}
             onContextMenu={(e) => e.preventDefault()}
           />
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-500" />
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {product.tag && (
              <span className="text-[10px] uppercase tracking-wide-caps bg-foreground text-primary-foreground px-2.5 py-1 rounded-sm font-body">
                {product.tag === "new" ? "New" : "Best Seller"}
              </span>
            )}
            {product.sourceTag && (
              <span className={`text-[10px] uppercase tracking-wide-caps px-2.5 py-1 rounded-sm font-body ${
                product.sourceTag === "brand-new"
                  ? "bg-accent text-accent-foreground"
                  : "bg-secondary text-secondary-foreground border border-border"
              }`}>
                {product.sourceTag === "brand-new" ? "Brand New" : "Thrifted"}
              </span>
            )}
          </div>
          {product.category === "thrift" && (
            <div className="absolute bottom-3 right-3">
              <span className="flex items-center gap-1 text-[9px] uppercase tracking-wide-caps bg-background/90 backdrop-blur-sm text-foreground px-2 py-1 rounded-sm font-body">
                <ShieldCheck className="w-3 h-3" /> Verified
              </span>
            </div>
          )}
        </div>
        <div className="mt-3 space-y-1">
          <h3 className="text-sm font-body font-medium group-hover:text-muted-foreground transition-colors duration-300 line-clamp-1 pr-8">{product.name}</h3>
          <p className="text-sm text-muted-foreground tabular-nums">{formatPrice(product.price)}</p>
        </div>
      </Link>
      {/* Wishlist button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center rounded-full bg-background/80 backdrop-blur-sm hover:bg-background transition-all duration-300 hover:scale-110 active:scale-90 z-10"
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
      >
        <Heart className={`w-4 h-4 transition-all duration-300 ${wishlisted ? "fill-foreground text-foreground" : "text-muted-foreground"} ${animateHeart ? "animate-heart-beat" : ""}`} />
      </button>
    </div>
  );
}
