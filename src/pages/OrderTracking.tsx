import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { Search, Package, Truck, CheckCircle, MapPin, Clock } from "lucide-react";

const DEMO_ORDERS: Record<string, {
  id: string;
  date: string;
  status: "processing" | "shipped" | "in-transit" | "delivered";
  items: { name: string; size: string; qty: number; price: number }[];
  total: number;
  address: string;
  timeline: { label: string; time: string; done: boolean }[];
}> = {
  "CZ-20250001": {
    id: "CZ-20250001",
    date: "March 22, 2025",
    status: "in-transit",
    items: [
      { name: "Essential Hoodie — Black", size: "L", qty: 1, price: 4500 },
      { name: "Vintage Denim Cap", size: "One Size", qty: 1, price: 1200 },
    ],
    total: 5700,
    address: "Nairobi, Kenya",
    timeline: [
      { label: "Order Placed", time: "Mar 22, 10:30 AM", done: true },
      { label: "Payment Confirmed", time: "Mar 22, 10:31 AM", done: true },
      { label: "Packed & Shipped", time: "Mar 23, 2:15 PM", done: true },
      { label: "In Transit", time: "Mar 24, 8:00 AM", done: true },
      { label: "Out for Delivery", time: "Expected today", done: false },
      { label: "Delivered", time: "—", done: false },
    ],
  },
  "CZ-20250002": {
    id: "CZ-20250002",
    date: "March 20, 2025",
    status: "delivered",
    items: [
      { name: "Relaxed Tee — Sand", size: "M", qty: 2, price: 2800 },
    ],
    total: 5600,
    address: "Mombasa, Kenya",
    timeline: [
      { label: "Order Placed", time: "Mar 20, 4:10 PM", done: true },
      { label: "Payment Confirmed", time: "Mar 20, 4:11 PM", done: true },
      { label: "Packed & Shipped", time: "Mar 21, 9:00 AM", done: true },
      { label: "In Transit", time: "Mar 21, 3:00 PM", done: true },
      { label: "Out for Delivery", time: "Mar 22, 8:30 AM", done: true },
      { label: "Delivered", time: "Mar 22, 11:45 AM", done: true },
    ],
  },
};

const statusConfig = {
  processing: { label: "Processing", icon: Clock, color: "bg-muted text-muted-foreground" },
  shipped: { label: "Shipped", icon: Package, color: "bg-accent text-accent-foreground" },
  "in-transit": { label: "In Transit", icon: Truck, color: "bg-foreground text-primary-foreground" },
  delivered: { label: "Delivered", icon: CheckCircle, color: "bg-[#4CAF50] text-white" },
};

export default function OrderTracking() {
  const revealRef = useReveal();
  const [trackingId, setTrackingId] = useState("");
  const [order, setOrder] = useState<typeof DEMO_ORDERS[string] | null>(null);
  const [error, setError] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const found = DEMO_ORDERS[trackingId.trim().toUpperCase()];
    if (found) {
      setOrder(found);
      setError("");
    } else {
      setOrder(null);
      setError("Order not found. Please check your tracking number.");
    }
  };

  const StatusIcon = order ? statusConfig[order.status].icon : Package;

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal max-w-2xl mx-auto text-center mb-10">
        <h1 className="font-display text-3xl md:text-5xl tracking-display mb-4">Track Your Order</h1>
        <p className="text-muted-foreground text-sm md:text-base">Enter your order number to see real-time delivery updates.</p>
      </div>

      <form onSubmit={handleSearch} className="reveal max-w-lg mx-auto mb-12">
        <div className="flex border border-border rounded-sm overflow-hidden">
          <input
            type="text"
            value={trackingId}
            onChange={(e) => setTrackingId(e.target.value)}
            placeholder="e.g. CZ-20250001"
            className="flex-1 bg-transparent text-foreground text-sm py-3.5 px-4 focus:outline-none placeholder:text-muted-foreground"
          />
          <button type="submit" className="bg-foreground text-primary-foreground px-5 flex items-center gap-2 text-sm uppercase tracking-wide-caps font-medium hover:opacity-90 transition-opacity">
            <Search className="w-4 h-4" /> Track
          </button>
        </div>
        {error && <p className="text-destructive text-xs mt-2">{error}</p>}
        <p className="text-[10px] text-muted-foreground mt-2">Demo IDs: CZ-20250001, CZ-20250002</p>
      </form>

      {order && (
        <div className="reveal max-w-2xl mx-auto space-y-8">
          {/* Status header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-sm bg-secondary/50 border border-border">
            <div>
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground">Order {order.id}</p>
              <p className="text-xs text-muted-foreground mt-0.5">Placed on {order.date}</p>
            </div>
            <span className={`inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wide-caps px-3 py-1.5 rounded-sm font-medium ${statusConfig[order.status].color}`}>
              <StatusIcon className="w-3 h-3" />
              {statusConfig[order.status].label}
            </span>
          </div>

          {/* Timeline */}
          <div className="p-5 rounded-sm bg-secondary/30 border border-border">
            <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-5">Delivery Timeline</p>
            <div className="space-y-0">
              {order.timeline.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full border-2 ${step.done ? "bg-foreground border-foreground" : "bg-transparent border-border"}`} />
                    {i < order.timeline.length - 1 && (
                      <div className={`w-px flex-1 min-h-[28px] ${step.done && order.timeline[i + 1]?.done ? "bg-foreground" : "bg-border"}`} />
                    )}
                  </div>
                  <div className="pb-5">
                    <p className={`text-sm ${step.done ? "text-foreground font-medium" : "text-muted-foreground"}`}>{step.label}</p>
                    <p className="text-xs text-muted-foreground">{step.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Items */}
          <div className="p-5 rounded-sm bg-secondary/30 border border-border">
            <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-4">Items</p>
            <div className="space-y-3">
              {order.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span>{item.name} <span className="text-muted-foreground">({item.size} × {item.qty})</span></span>
                  <span className="tabular-nums">KSh {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-border mt-4 pt-3 flex justify-between text-sm font-medium">
              <span>Total</span>
              <span className="tabular-nums">KSh {order.total.toLocaleString()}</span>
            </div>
          </div>

          {/* Delivery address */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="w-4 h-4" />
            Delivering to: <span className="text-foreground font-medium">{order.address}</span>
          </div>
        </div>
      )}
    </div>
  );
}
