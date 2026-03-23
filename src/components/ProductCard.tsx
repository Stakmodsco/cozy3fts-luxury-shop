import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/lib/products";
import { ShieldCheck } from "lucide-react";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link to={`/product/${product.id}`} className="group block">
      <div className="relative overflow-hidden rounded-sm bg-secondary aspect-[3/4]">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
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
        <h3 className="text-sm font-body font-medium group-hover:text-muted-foreground transition-colors line-clamp-1">{product.name}</h3>
        <p className="text-sm text-muted-foreground tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
