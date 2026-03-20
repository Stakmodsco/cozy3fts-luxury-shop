import { Link } from "react-router-dom";
import { Product, formatPrice } from "@/lib/products";

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
        {product.tag && (
          <span className="absolute top-3 left-3 text-[10px] uppercase tracking-wide-caps bg-foreground text-primary-foreground px-2.5 py-1 rounded-sm font-body">
            {product.tag === "new" ? "New" : "Best Seller"}
          </span>
        )}
      </div>
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-body font-medium group-hover:text-muted-foreground transition-colors">{product.name}</h3>
        <p className="text-sm text-muted-foreground tabular-nums">{formatPrice(product.price)}</p>
      </div>
    </Link>
  );
}
