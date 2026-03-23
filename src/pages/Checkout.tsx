import { useState } from "react";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/products";
import { useReveal } from "@/hooks/useReveal";
import { ArrowLeft, Phone, CheckCircle, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

export default function Checkout() {
  const { items, totalPrice, setIsOpen } = useCart();
  const revealRef = useReveal();
  const navigate = useNavigate();
  const [step, setStep] = useState<"details" | "payment" | "success">("details");
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    mpesaPhone: "",
  });

  const deliveryFee = totalPrice >= 5000 ? 0 : 300;
  const grandTotal = totalPrice + deliveryFee;

  if (items.length === 0 && step !== "success") {
    return (
      <div className="pt-32 section-padding text-center min-h-screen">
        <p className="text-muted-foreground mb-4">Your bag is empty</p>
        <Link to="/shop" className="text-sm underline">Continue Shopping</Link>
      </div>
    );
  }

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setForm((prev) => ({ ...prev, mpesaPhone: prev.mpesaPhone || prev.phone }));
    setStep("payment");
  };

  const handleMpesaPayment = async () => {
    setLoading(true);
    // Simulate M-Pesa STK push — in production this would call the Daraja API via an edge function
    await new Promise((resolve) => setTimeout(resolve, 3000));
    setLoading(false);
    setStep("success");
    toast.success("Payment received! Order confirmed.");
  };

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      {step !== "success" && (
        <button
          onClick={() => step === "payment" ? setStep("details") : navigate(-1)}
          className="reveal inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> {step === "payment" ? "Back to Details" : "Back"}
        </button>
      )}

      <div className="reveal">
        <h1 className="font-display text-3xl md:text-4xl tracking-display mb-8">
          {step === "details" && "Checkout"}
          {step === "payment" && "Payment"}
          {step === "success" && "Order Confirmed!"}
        </h1>
      </div>

      {/* Progress */}
      {step !== "success" && (
        <div className="reveal flex items-center gap-4 mb-10">
          {["Details", "Payment"].map((label, i) => {
            const isActive = (i === 0 && step === "details") || (i === 1 && step === "payment");
            const isDone = i === 0 && step === "payment";
            return (
              <div key={label} className="flex items-center gap-2">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                  isActive ? "bg-foreground text-primary-foreground" : isDone ? "bg-foreground text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>
                  {isDone ? <CheckCircle className="w-3.5 h-3.5" /> : i + 1}
                </div>
                <span className={`text-xs uppercase tracking-wide-caps ${isActive || isDone ? "text-foreground" : "text-muted-foreground"}`}>{label}</span>
                {i < 1 && <div className="w-8 h-px bg-border" />}
              </div>
            );
          })}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
        {/* Left column */}
        <div className="lg:col-span-7">
          {step === "details" && (
            <form onSubmit={handleDetailsSubmit} className="reveal space-y-6">
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2">Delivery Information</p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">First Name</label>
                  <input type="text" required value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })}
                    className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors" />
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Last Name</label>
                  <input type="text" required value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })}
                    className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Phone Number</label>
                <input type="tel" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors" placeholder="+254 7XX XXX XXX" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Delivery Address</label>
                <input type="text" required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                  className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors" placeholder="Street address" />
              </div>
              <div>
                <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">City / Town</label>
                <input type="text" required value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors" placeholder="Nairobi" />
              </div>
              <button type="submit"
                className="w-full bg-foreground text-primary-foreground py-3.5 text-sm uppercase tracking-wide-caps font-medium rounded-sm hover:opacity-90 active:scale-[0.98] transition-all mt-4">
                Continue to Payment
              </button>
            </form>
          )}

          {step === "payment" && (
            <div className="reveal space-y-8">
              <div className="p-6 rounded-sm bg-secondary/60 border border-border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#4CAF50] flex items-center justify-center">
                    <span className="text-white font-bold text-xs">M</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium">M-Pesa (Lipa Na M-Pesa)</p>
                    <p className="text-xs text-muted-foreground">Pay directly from your phone</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">M-Pesa Phone Number</label>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <input type="tel" required value={form.mpesaPhone} onChange={(e) => setForm({ ...form, mpesaPhone: e.target.value })}
                        className="flex-1 bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors"
                        placeholder="+254 7XX XXX XXX" />
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground leading-relaxed p-3 bg-background rounded-sm">
                    <p className="font-medium text-foreground mb-1">How it works:</p>
                    <ol className="list-decimal list-inside space-y-1">
                      <li>Click "Pay with M-Pesa" below</li>
                      <li>You'll receive an STK push on your phone</li>
                      <li>Enter your M-Pesa PIN to confirm</li>
                      <li>Payment is processed instantly</li>
                    </ol>
                  </div>
                </div>
              </div>

              <button
                onClick={handleMpesaPayment}
                disabled={loading || !form.mpesaPhone}
                className="w-full bg-[#4CAF50] text-white py-4 text-sm uppercase tracking-wide-caps font-medium rounded-sm hover:bg-[#43A047] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Waiting for M-Pesa...
                  </>
                ) : (
                  `Pay ${formatPrice(grandTotal)} with M-Pesa`
                )}
              </button>
            </div>
          )}

          {step === "success" && (
            <div className="reveal text-center py-10">
              <div className="w-16 h-16 rounded-full bg-[#4CAF50] flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h2 className="font-display text-2xl tracking-display mb-3">Thank You for Your Order!</h2>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-2">
                Your payment of <span className="font-medium text-foreground">{formatPrice(grandTotal)}</span> has been received via M-Pesa.
              </p>
              <p className="text-sm text-muted-foreground max-w-md mx-auto mb-8">
                A confirmation has been sent to <span className="font-medium text-foreground">{form.email}</span>. We'll deliver to <span className="font-medium text-foreground">{form.city}</span>.
              </p>
              <Link to="/shop"
                className="inline-flex bg-foreground text-primary-foreground py-3.5 px-10 text-sm uppercase tracking-wide-caps font-medium rounded-sm hover:opacity-90 transition-all">
                Continue Shopping
              </Link>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        {step !== "success" && (
          <div className="lg:col-span-5">
            <div className="reveal sticky top-28 p-6 bg-secondary/40 rounded-sm border border-border">
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-4">Order Summary</p>
              <div className="space-y-4 mb-6">
                {items.map((item) => (
                  <div key={`${item.product.id}-${item.size}`} className="flex gap-3">
                    <img src={item.product.image} alt={item.product.name} className="w-14 h-16 object-cover rounded-sm" />
                    <div className="flex-1 flex justify-between">
                      <div>
                        <p className="text-sm font-medium line-clamp-1">{item.product.name}</p>
                        <p className="text-xs text-muted-foreground">Size: {item.size} × {item.quantity}</p>
                      </div>
                      <p className="text-sm tabular-nums">{formatPrice(item.product.price * item.quantity)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t border-border pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="tabular-nums">{formatPrice(totalPrice)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Delivery</span>
                  <span className="tabular-nums">{deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}</span>
                </div>
                {deliveryFee === 0 && (
                  <p className="text-[10px] text-muted-foreground">Free delivery on orders over KSh 5,000</p>
                )}
                <div className="flex justify-between text-base font-medium pt-2 border-t border-border">
                  <span>Total</span>
                  <span className="font-display tabular-nums">{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
