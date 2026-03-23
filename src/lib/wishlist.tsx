import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./products";

interface WishlistContextType {
  items: Product[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  toggleItem: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  totalItems: number;
}

const WishlistContext = createContext<WishlistContextType | null>(null);

function loadWishlist(): string[] {
  try {
    const raw = localStorage.getItem("cozy3fts-wishlist");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [itemIds, setItemIds] = useState<string[]>(loadWishlist);
  const [items, setItems] = useState<Product[]>([]);

  useEffect(() => {
    localStorage.setItem("cozy3fts-wishlist", JSON.stringify(itemIds));
  }, [itemIds]);

  // We resolve products lazily when needed via the page that uses them
  const addItem = (product: Product) => {
    setItemIds((prev) => (prev.includes(product.id) ? prev : [...prev, product.id]));
  };

  const removeItem = (productId: string) => {
    setItemIds((prev) => prev.filter((id) => id !== productId));
  };

  const toggleItem = (product: Product) => {
    if (itemIds.includes(product.id)) {
      removeItem(product.id);
    } else {
      addItem(product);
    }
  };

  const isInWishlist = (productId: string) => itemIds.includes(productId);

  return (
    <WishlistContext.Provider value={{ items, addItem, removeItem, toggleItem, isInWishlist, totalItems: itemIds.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");
  return ctx;
}

export function useWishlistIds(): string[] {
  return loadWishlist();
}
