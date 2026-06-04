import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Mail, ShoppingCart, Package, Plus, Pencil, Trash2, X, GripVertical, Eye, EyeOff, Upload } from "lucide-react";

const ADMIN_PASSWORD = "cozy3fts2025";
const FN_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/admin-products`;

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

interface ProductRow {
  id: string;
  name: string;
  price: number;
  category: string;
  thrift_category: string | null;
  tag: string | null;
  source_tag: string | null;
  sizes: string[];
  image_url: string;
  image_alt: string | null;
  description: string;
  published: boolean;
  stock: number;
  display_order: number;
}

const emptyProduct: ProductRow = {
  id: "",
  name: "",
  price: 0,
  category: "men",
  thrift_category: null,
  tag: null,
  source_tag: "brand-new",
  sizes: [],
  image_url: "",
  image_alt: null,
  description: "",
  published: true,
  stock: 10,
  display_order: 0,
};

export default function Admin() {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"orders" | "messages" | "products">("products");
  const [orders, setOrders] = useState<Order[]>([]);
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [products, setProducts] = useState<ProductRow[]>([]);
  const [editing, setEditing] = useState<ProductRow | null>(null);
  const [saving, setSaving] = useState(false);
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
      } else if (activeTab === "messages") {
        const { data } = await supabase
          .from("contact_messages")
          .select("*")
          .order("created_at", { ascending: false })
          .limit(100);
        setMessages((data as ContactMessage[]) || []);
      } else {
        const { data } = await supabase
          .from("products")
          .select("*")
          .order("created_at", { ascending: false });
        setProducts((data as ProductRow[]) || []);
      }
    } catch {
      toast.error("Failed to load data.");
    }
    setLoading(false);
  };

  const callAdminFn = async (body: Record<string, unknown>) => {
    const res = await fetch(FN_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-admin-password": ADMIN_PASSWORD,
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || "Request failed");
    return data;
  };

  const fileToBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        resolve(result.split(",")[1] || "");
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (file: File) => {
    try {
      const base64 = await fileToBase64(file);
      const data = await callAdminFn({
        action: "upload",
        image: { base64, filename: file.name, contentType: file.type || "image/jpeg" },
      });
      setEditing((p) => (p ? { ...p, image_url: data.url } : p));
      toast.success("Image uploaded");
    } catch (err) {
      toast.error((err as Error).message);
    }
  };

  const handleSaveProduct = async () => {
    if (!editing) return;
    if (!editing.name || !editing.image_url || !editing.id) {
      toast.error("ID, name and image are required.");
      return;
    }
    setSaving(true);
    try {
      const isNew = !products.some((p) => p.id === editing.id);
      const payload = {
        id: editing.id,
        name: editing.name,
        price: Number(editing.price) || 0,
        category: editing.category,
        thrift_category: editing.thrift_category || null,
        tag: editing.tag || null,
        source_tag: editing.source_tag || null,
        sizes: editing.sizes,
        image_url: editing.image_url,
        image_alt: editing.image_alt || null,
        description: editing.description,
      };
      if (isNew) {
        await callAdminFn({ action: "create", product: payload });
        toast.success("Product created");
      } else {
        const { id, ...rest } = payload;
        await callAdminFn({ action: "update", id, product: rest });
        toast.success("Product updated");
      }
      setEditing(null);
      fetchData();
    } catch (err) {
      toast.error((err as Error).message);
    }
    setSaving(false);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm("Delete this product? This cannot be undone.")) return;
    try {
      await callAdminFn({ action: "delete", id });
      toast.success("Deleted");
      setProducts((p) => p.filter((x) => x.id !== id));
    } catch (err) {
      toast.error((err as Error).message);
    }
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
    { id: "products" as const, label: "Products", icon: <Package className="w-4 h-4" />, count: products.length },
    { id: "orders" as const, label: "Orders", icon: <ShoppingCart className="w-4 h-4" />, count: orders.length },
    { id: "messages" as const, label: "Messages", icon: <Mail className="w-4 h-4" />, count: messages.length },
  ];

  return (
    <div className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="font-display text-3xl md:text-4xl tracking-display">Dashboard</h1>
        {activeTab === "products" && (
          <button
            onClick={() => setEditing({ ...emptyProduct, id: `prod-${Date.now()}` })}
            className="inline-flex items-center gap-2 btn-neumorph-dark text-primary-foreground text-xs uppercase tracking-wide-caps px-4 py-2.5 rounded-lg"
          >
            <Plus className="w-4 h-4" /> New Product
          </button>
        )}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 flex-wrap">
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
      ) : activeTab === "products" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.length === 0 ? (
            <p className="text-muted-foreground text-sm py-12 text-center col-span-full">No products yet.</p>
          ) : (
            products.map((p) => (
              <div key={p.id} className="btn-neumorph p-3 rounded-xl cursor-default">
                <div className="aspect-square w-full overflow-hidden rounded-lg bg-muted mb-3">
                  <img src={p.image_url} alt={p.image_alt || p.name} className="w-full h-full object-cover" />
                </div>
                <p className="font-medium text-sm truncate">{p.name}</p>
                <p className="text-xs text-muted-foreground mb-3">KSh {p.price.toLocaleString()} · {p.category}</p>
                <div className="flex gap-2">
                  <button onClick={() => setEditing(p)} className="flex-1 inline-flex items-center justify-center gap-1 text-xs btn-neumorph px-3 py-2 rounded-md">
                    <Pencil className="w-3 h-3" /> Edit
                  </button>
                  <button onClick={() => handleDeleteProduct(p.id)} className="inline-flex items-center justify-center text-xs btn-neumorph px-3 py-2 rounded-md text-destructive">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              </div>
            ))
          )}
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

      {editing && (
        <div className="fixed inset-0 z-50 bg-foreground/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto" onClick={() => !saving && setEditing(null)}>
          <div className="bg-background w-full max-w-2xl rounded-xl p-6 md:p-8 max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-display text-2xl tracking-display">
                {products.some((p) => p.id === editing.id) ? "Edit Product" : "New Product"}
              </h2>
              <button onClick={() => setEditing(null)} className="text-muted-foreground hover:text-foreground" aria-label="Close">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">ID</span>
                  <input value={editing.id} onChange={(e) => setEditing({ ...editing, id: e.target.value })} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Name</span>
                  <input value={editing.name} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40" />
                </label>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Price (KSh)</span>
                  <input type="number" value={editing.price} onChange={(e) => setEditing({ ...editing, price: Number(e.target.value) })} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40" />
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Category</span>
                  <select value={editing.category} onChange={(e) => setEditing({ ...editing, category: e.target.value })} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40">
                    <option value="men">Men</option>
                    <option value="women">Women</option>
                    <option value="unisex">Unisex</option>
                    <option value="thrift">Thrift</option>
                  </select>
                </label>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <label className="block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Tag</span>
                  <select value={editing.tag || ""} onChange={(e) => setEditing({ ...editing, tag: e.target.value || null })} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40">
                    <option value="">None</option>
                    <option value="new">New</option>
                    <option value="bestseller">Bestseller</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Source</span>
                  <select value={editing.source_tag || ""} onChange={(e) => setEditing({ ...editing, source_tag: e.target.value || null })} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40">
                    <option value="brand-new">Brand New</option>
                    <option value="thrifted">Thrifted</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Thrift Cat.</span>
                  <select value={editing.thrift_category || ""} onChange={(e) => setEditing({ ...editing, thrift_category: e.target.value || null })} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40">
                    <option value="">None</option>
                    <option value="caps">Caps</option>
                    <option value="shirts">Shirts</option>
                    <option value="bags">Bags</option>
                    <option value="headgear">Headgear</option>
                  </select>
                </label>
              </div>

              <label className="block">
                <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Sizes (comma separated)</span>
                <input
                  value={editing.sizes.join(", ")}
                  onChange={(e) => setEditing({ ...editing, sizes: e.target.value.split(",").map((s) => s.trim()).filter(Boolean) })}
                  className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40"
                  placeholder="S, M, L, XL"
                />
              </label>

              <label className="block">
                <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Description</span>
                <textarea value={editing.description} onChange={(e) => setEditing({ ...editing, description: e.target.value })} rows={3} className="w-full mt-1 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40" />
              </label>

              <div>
                <span className="text-xs text-muted-foreground uppercase tracking-wide-caps">Image</span>
                <div className="mt-1 flex items-center gap-3">
                  {editing.image_url && (
                    <img src={editing.image_url} alt="" className="w-20 h-20 object-cover rounded-md border border-border" />
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => e.target.files?.[0] && handleImageUpload(e.target.files[0])}
                    className="text-xs"
                  />
                </div>
                <input
                  value={editing.image_url}
                  onChange={(e) => setEditing({ ...editing, image_url: e.target.value })}
                  placeholder="Or paste image URL"
                  className="w-full mt-2 bg-card border border-border rounded-md px-3 py-2 focus:outline-none focus:border-foreground/40 text-xs"
                />
              </div>

              <div className="flex justify-end gap-2 pt-4">
                <button onClick={() => setEditing(null)} disabled={saving} className="text-xs uppercase tracking-wide-caps btn-neumorph px-5 py-2.5 rounded-lg">
                  Cancel
                </button>
                <button onClick={handleSaveProduct} disabled={saving} className="text-xs uppercase tracking-wide-caps btn-neumorph-dark text-primary-foreground px-5 py-2.5 rounded-lg disabled:opacity-50">
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
