import product1 from "@/assets/product-1.jpg";
import product2 from "@/assets/product-2.jpg";
import product3 from "@/assets/product-3.jpg";
import product4 from "@/assets/product-4.jpg";
import thriftCaps from "@/assets/thrift-caps.jpg";
import thriftBags from "@/assets/thrift-bags.jpg";
import thriftHeadgear from "@/assets/thrift-headgear.jpg";
import thriftShirts from "@/assets/thrift-shirts.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "unisex" | "thrift";
  thriftCategory?: "caps" | "shirts" | "bags" | "headgear";
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
  // Thrift — Caps
  {
    id: "thrift-vintage-cap-black",
    name: "Vintage Cap — Black",
    price: 1200,
    category: "thrift",
    thriftCategory: "caps",
    tag: "new",
    sizes: ["One Size"],
    image: thriftCaps,
    description: "Authentic vintage baseball cap in washed black. Adjustable strap back. Pre-loved in excellent condition.",
  },
  {
    id: "thrift-retro-cap-tan",
    name: "Retro Cap — Tan",
    price: 1000,
    category: "thrift",
    thriftCategory: "caps",
    sizes: ["One Size"],
    image: thriftCaps,
    description: "Classic six-panel cap in warm tan. Embroidered logo detail. Authentic vintage piece.",
  },
  // Thrift — Shirts & Tees
  {
    id: "thrift-graphic-tee-white",
    name: "Graphic Tee — White",
    price: 1500,
    category: "thrift",
    thriftCategory: "shirts",
    tag: "bestseller",
    sizes: ["M", "L", "XL"],
    image: thriftShirts,
    description: "Authentic vintage graphic t-shirt. Bold print on heavyweight cotton. One-of-a-kind find.",
  },
  {
    id: "thrift-flannel-shirt-navy",
    name: "Flannel Shirt — Navy",
    price: 2200,
    category: "thrift",
    thriftCategory: "shirts",
    sizes: ["M", "L"],
    image: thriftShirts,
    description: "Heavyweight brushed flannel in navy plaid. Authentic vintage workwear. Button-down collar.",
  },
  // Thrift — Bags
  {
    id: "thrift-leather-bag-brown",
    name: "Leather Satchel — Brown",
    price: 3800,
    category: "thrift",
    thriftCategory: "bags",
    tag: "bestseller",
    sizes: ["One Size"],
    image: thriftBags,
    description: "Authentic designer leather satchel in rich brown. Gold-tone hardware. Verified authentic.",
  },
  {
    id: "thrift-crossbody-black",
    name: "Crossbody Bag — Black",
    price: 2800,
    category: "thrift",
    thriftCategory: "bags",
    tag: "new",
    sizes: ["One Size"],
    image: thriftBags,
    description: "Designer crossbody in smooth black leather. Compact silhouette with adjustable strap. Authenticated.",
  },
  // Thrift — Headgear
  {
    id: "thrift-beanie-charcoal",
    name: "Beanie — Charcoal",
    price: 800,
    category: "thrift",
    thriftCategory: "headgear",
    sizes: ["One Size"],
    image: thriftHeadgear,
    description: "Ribbed knit beanie in charcoal grey. Soft acrylic blend. Authentic vintage streetwear.",
  },
  {
    id: "thrift-bucket-hat-olive",
    name: "Bucket Hat — Olive",
    price: 1100,
    category: "thrift",
    thriftCategory: "headgear",
    tag: "new",
    sizes: ["One Size"],
    image: thriftHeadgear,
    description: "Canvas bucket hat in olive drab. Vintage military surplus style. Wide brim for all-weather wear.",
  },
];

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`;
}
