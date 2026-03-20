import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { Link } from "react-router-dom";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm transition-opacity duration-300 ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 h-full w-full max-w-md bg-background shadow-2xl transition-transform duration-400 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="font-display text-lg">Your Bag</h2>
            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-muted-foreground">
              <ShoppingBag className="w-10 h-10" />
              <p className="text-sm">Your bag is empty</p>
              <Link
                to="/shop"
                onClick={() => setIsOpen(false)}
                className="text-sm uppercase tracking-wide-caps text-foreground border-b border-foreground pb-0.5 hover:text-muted-foreground hover:border-muted-foreground transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-4">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-20 h-24 object-cover rounded-sm"
                    />
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <p className="text-sm font-body font-medium">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity - 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm tabular-nums w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.size, item.quantity + 1)}
                            className="w-6 h-6 flex items-center justify-center border border-border rounded-sm text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <p className="text-sm tabular-nums">{formatPrice(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-border p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subtotal</span>
                  <span className="font-display text-lg tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
                <button className="w-full bg-foreground text-primary-foreground py-3.5 text-sm uppercase tracking-wide-caps font-body font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-200 rounded-sm">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
