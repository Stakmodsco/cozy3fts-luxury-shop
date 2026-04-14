import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Package, Mail, ShoppingCart, Eye, Trash2, Check } from "lucide-react";

const ADMIN_PASSWORD = "cozy3fts2025";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total: number;
  order_status: string;
  payment_status: string;
  created_at: string;
}

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "messages">("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      toast.success("Welcome, Admin!");
    } else {
      toast.error("Incorrect password.");
    }
  };

  useEffect(() => {
    if (!authenticated) return;
    fetchData();
  }, [authenticated, activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === "orders") {
        const { data } = await supabase
          .from("orders")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100);
        setOrders((data as Order[]) || []);
      } else {
        const { data } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100);
        setMessages((data as ContactMessage[]) || []);
      }
    } catch {
      toast.error("Failed to load data.");
    }
    setLoading(false);
  };

  if (!authenticated) {
    return (
      <div className="pt-24 md:pt-28 section-padding pb-20 min-h-screen flex items-center justify-center">
        <form onSubmit={handleLogin} className="w-full max-w-sm space-y-4">
          <h1 className="font-display text-3xl tracking-display text-center mb-6">Admin Access</h1>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter admin password"
            className="w-full bg-card text-foreground text-sm py-3 px-4 rounded-lg border border-border focus:outline-none focus:border-foreground/30 transition-colors"
            autoFocus
          />
          <button type="submit" className="w-full btn-neumorph-dark text-primary-foreground text-sm uppercase tracking-wide-caps font-medium py-3 rounded-lg">
            Enter
          </button>
        </form>
      </div>
    );
  }

  const tabs = [
    { id: "orders" as const, label: "Orders", icon: <ShoppingCart className="w-4 h-4" />, count: orders.length },
    { id: "messages" as const, label: "Messages", icon: <Mail className="w-4 h-4" />, count: messages.length },
  ];

  return (
    <div className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <h1 className="font-display text-3xl md:text-4xl tracking-display mb-8">Dashboard</h1>

      {/* Tabs */}
      <div className="flex gap-2 mb-8">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 text-xs uppercase tracking-wide-caps px-4 py-2.5 rounded-lg transition-all ${
              activeTab === tab.id
                ? "btn-neumorph-dark text-primary-foreground"
                : "btn-neumorph text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab.icon} {tab.label}
            {tab.count > 0 && (
              <span className="ml-1 bg-accent/50 text-foreground text-[10px] px-1.5 py-0.5 rounded-full">{tab.count}</span>
            )}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
        </div>
      ) : activeTab === "orders" ? (
        <div className="space-y-3">
          {orders.length === 0 ? (
            <p className="text-muted-foreground text-sm py-12 text-center">No orders yet.</p>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="btn-neumorph p-4 rounded-xl cursor-default">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="font-medium text-sm">{order.order_number}</p>
                    <p className="text-xs text-muted-foreground">{order.customer_name} · {order.customer_email}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      order.payment_status === "paid" ? "bg-green-500/10 text-green-600" : "bg-yellow-500/10 text-yellow-600"
                    }`}>
                      {order.payment_status}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      KSh {order.total.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(order.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {messages.length === 0 ? (
            <p className="text-muted-foreground text-sm py-12 text-center">No messages yet.</p>
          ) : (
            messages.map((msg) => (
              <div key={msg.id} className={`btn-neumorph p-4 rounded-xl cursor-default ${!msg.read ? "border-l-2 border-l-accent" : "opacity-70"}`}>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{msg.name}</p>
                    <p className="text-xs text-muted-foreground mb-1">{msg.email}</p>
                    <p className="text-sm text-muted-foreground line-clamp-2">{msg.message}</p>
                  </div>
                  <span className="text-xs text-muted-foreground whitespace-nowrap">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
