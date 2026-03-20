import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "unisex";
  tag?: "new" | "bestseller";
  sizes: string[];
  image: string;
  imageAlt?: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "essential-hoodie-sand",
    name: "Essential Hoodie — Sand",
    price: 4800,
    category: "unisex",
    tag: "bestseller",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: product1,
    description: "Heavyweight 400gsm French terry. Oversized fit, ribbed cuffs, kangaroo pocket. Made for all-day comfort.",
  },
  {
    id: "relaxed-jogger-midnight",
    name: "Relaxed Jogger — Midnight",
    price: 3900,
    category: "men",
    tag: "bestseller",
    sizes: ["S", "M", "L", "XL"],
    image: product2,
    description: "Tapered fit jogger in premium brushed fleece. Elastic waistband with internal drawcord.",
  },
  {
    id: "oversized-tee-cream",
    name: "Oversized Tee — Cream",
    price: 2400,
    category: "unisex",
    tag: "new",
    sizes: ["S", "M", "L", "XL", "XXL"],
    image: product3,
    description: "250gsm cotton jersey with dropped shoulders. Boxy silhouette for effortless layering.",
  },
  {
    id: "utility-jacket-olive",
    name: "Utility Jacket — Olive",
    price: 7200,
    category: "men",
    tag: "new",
    sizes: ["M", "L", "XL"],
    image: product4,
    description: "Water-resistant ripstop shell with fleece liner. Full zip with branded hardware.",
  },
  {
    id: "wide-leg-pant-stone",
    name: "Wide Leg Pant — Stone",
    price: 4200,
    category: "women",
    sizes: ["XS", "S", "M", "L"],
    image: product1,
    description: "Relaxed wide-leg trouser in washed cotton twill. High waist with pleated front.",
  },
  {
    id: "cropped-hoodie-espresso",
    name: "Cropped Hoodie — Espresso",
    price: 4500,
    category: "women",
    tag: "new",
    sizes: ["XS", "S", "M", "L"],
    image: product2,
    description: "Cropped silhouette with raw-edge hem. Heavyweight fleece with tonal embroidery.",
  },
];

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`;
}
