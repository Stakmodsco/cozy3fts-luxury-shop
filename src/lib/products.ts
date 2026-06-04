export interface Product {
  id: string;
  name: string;
  price: number;
  category: "men" | "women" | "unisex" | "thrift";
  thriftCategory?: "caps" | "shirts" | "bags" | "headgear";
  tag?: "new" | "bestseller";
  sourceTag?: "brand-new" | "thrifted";
  sizes: string[];
  image: string;
  imageAlt?: string;
  description: string;
  stock?: number;
  published?: boolean;
  displayOrder?: number;
}

export function formatPrice(price: number): string {
  return `KSh ${price.toLocaleString()}`;
}
