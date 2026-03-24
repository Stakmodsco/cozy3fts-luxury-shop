import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Search, Package, Truck, CheckCircle, MapPin, Clock, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface OrderData {
  order_number: string;
  created_at: string;
  order_status: string;
  payment_status: string;
  items: { name: string; size: string; qty: number; price: number }[];
  total: number;
  delivery_fee: number;
  subtotal: number;
  city: string;
  delivery_address: string;
  mpesa_receipt: string | null;
  customer_name: string;
}

const statusConfig: Record<string, { label: string; icon: typeof Package; color: string }> = {
  processing: { label: "Processing", icon: Clock, color: "bg-muted text-muted-foreground" },
  shipped: { label: "Shipped", icon: Package, color: "bg-accent text-accent-foreground" },
  "in-transit": { label: "In Transit", icon: Truck, color: "bg-foreground text-primary-foreground" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-[#4CAF50] text-white" },
};

export default function OrderTracking() {
  const revealRef = useReveal();
  const [trackingId, setTrackingId] = useState("");
  const [phone, setPhone] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const { data, error: queryError } = await supabase
        .from("orders")
        .select("*")
        .eq("order_number", trackingId.trim().toUpperCase())
        .eq("customer_phone", phone.trim())
        .single();

      if (queryError || !data) {
        setError("Order not found. Please check your order number and phone number.");
      } else {
        setOrder(data as unknown as OrderData);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const StatusIcon = order ? (statusConfig[order.order_status]?.icon || Package) : Package;
  const statusInfo = order ? (statusConfig[order.order_status] || statusConfig.processing) : statusConfig.processing;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString("en-KE", {
      year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit",
    });
  };

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal max-w-2xl mx-auto text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl tracking-display mb-4">Track Your Order</h1>
        <p className="text-muted-foreground text-sm md:text-base">Enter your order number and phone number to see delivery updates.</p>
      </div>

      <form onSubmit={handleSearch} className="reveal max-w-lg mx-auto mb-12 space-y-3">
        <input
          type="text"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          placeholder="Order number (e.g. CZ-00001000)"
          className="w-full bg-transparent border border-border text-foreground text-sm py-3.5 px-4 rounded-sm focus:outline-none focus:border-foreground placeholder:text-muted-foreground transition-colors"
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number used at checkout"
          className="w-full bg-transparent border border-border text-foreground text-sm py-3.5 px-4 rounded-sm focus:outline-none focus:border-foreground placeholder:text-muted-foreground transition-colors"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-foreground text-primary-foreground py-3.5 flex items-center justify-center gap-2 text-sm uppercase tracking-wide-caps font-medium rounded-sm hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
          {loading ? "Searching..." : "Track Order"}
        </button>
        {error && <p className="text-destructive text-xs mt-2">{error}</p>}
      </form>

      {order && (
        <div className="reveal max-w-2xl mx-auto space-y-8">
          {/* Status header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-sm bg-secondary/50 border border-border">
            <div>
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground">Order {order.order_number}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Placed on {formatDate(order.created_at)}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Customer: {order.customer_name}</p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide-caps px-3 py-1.5 rounded-sm font-medium ${statusInfo.color}`}>
                <StatusIcon className="w-3 h-3" />
                {statusInfo.label}
              </span>
              <span className={`text-[10px] uppercase tracking-wide-caps px-2 py-1 rounded-sm font-medium ${
                order.payment_status === "confirmed" ? "bg-[#4CAF50]/10 text-[#4CAF50]" : "bg-destructive/10 text-destructive"
              }`}>
                Payment: {order.payment_status}
              </span>
            </div>
          </div>

          {/* M-Pesa Receipt */}
          {order.mpesa_receipt && (
            <div className="p-4 rounded-sm bg-[#4CAF50]/5 border border-[#4CAF50]/20">
              <p className="text-xs text-muted-foreground">M-Pesa Receipt</p>
              <p className="font-mono text-sm font-medium text-foreground">{order.mpesa_receipt}</p>
            </div>
          )}

          {/* Items */}
          <div className="p-5 rounded-sm bg-secondary/30 border border-border">
            <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-4">Items</p>
            <div className="space-y-3">
              {(order.items as { name: string; size: string; qty: number; price: number }[]).map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.name} <span className="text-muted-foreground">({item.size} × {item.qty})</span></span>
                  <span className="tabular-nums">KSh {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-3 space-y-1">
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Subtotal</span>
                <span className="tabular-nums">KSh {order.subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>Delivery</span>
                <span className="tabular-nums">{order.delivery_fee === 0 ? "Free" : `KSh ${order.delivery_fee.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-sm font-medium pt-1 border-t border-border">
                <span>Total</span>
                <span className="tabular-nums">KSh {order.total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Delivery address */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Delivering to: <span className="text-foreground font-medium">{order.delivery_address}, {order.city}</span>
          </div>
        </div>
      )}
    </div>
  );
}
