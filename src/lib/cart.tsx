import { createContext, useContext, useState, ReactNode } from "react";
import { Product } from "./products";
import { toast } from "sonner";

export interface CartItem {
  product: Product;
  size: string;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = (product: Product, size: string) => {
    const stock = product.stock ?? Infinity;
    if (stock <= 0) {
      toast.error("This item is out of stock");
      return;
    }
    setItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id && i.size === size);
      const currentQty = existing?.quantity ?? 0;
      if (currentQty + 1 > stock) {
        toast.error(`Only ${stock} in stock`);
        return prev;
      }
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id && i.size === size
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }
      return [...prev, { product, size, quantity: 1 }];
    });
    setIsOpen(true);
  };

  const removeItem = (productId: string, size: string) => {
    setItems((prev) => prev.filter((i) => !(i.product.id === productId && i.size === size)));
  };

  const updateQuantity = (productId: string, size: string, qty: number) => {
    if (qty <= 0) return removeItem(productId, size);
    setItems((prev) =>
      prev.map((i) => {
        if (i.product.id !== productId || i.size !== size) return i;
        const max = i.product.stock ?? Infinity;
        const next = Math.min(qty, max);
        if (qty > max) toast.error(`Only ${max} in stock`);
        return { ...i, quantity: next };
      })
    );
  };

  const clearCart = () => setItems([]);
  const totalItems = items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, totalItems, totalPrice, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
