import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-admin-password",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const ADMIN_PASSWORD = "cozy3fts2025";
const BUCKET = "product-images";

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  const password = req.headers.get("x-admin-password");
  if (password !== ADMIN_PASSWORD) return json({ error: "Unauthorized" }, 401);

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const body = await req.json();
    const { action, product, id, image, order } = body as {
      action: "create" | "update" | "delete" | "upload" | "reorder";
      product?: Record<string, unknown>;
      id?: string;
      image?: { base64: string; filename: string; contentType: string };
      order?: string[];
    };

    if (action === "upload") {
      if (!image) return json({ error: "Missing image" }, 400);
      const bytes = Uint8Array.from(atob(image.base64), (c) => c.charCodeAt(0));
      const ext = image.filename.split(".").pop() || "jpg";
      const path = `uploads/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error: upErr } = await supabase.storage
        .from(BUCKET)
        .upload(path, bytes, { contentType: image.contentType, upsert: false });
      if (upErr) return json({ error: upErr.message }, 500);
      const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(path);
      return json({ url: pub.publicUrl, path });
    }

    if (action === "create") {
      if (!product) return json({ error: "Missing product" }, 400);
      const { data, error } = await supabase.from("products").insert(product).select().single();
      if (error) return json({ error: error.message }, 500);
      return json({ product: data });
    }

    if (action === "update") {
      if (!id || !product) return json({ error: "Missing id/product" }, 400);
      const { data, error } = await supabase
        .from("products")
        .update({ ...product, updated_at: new Date().toISOString() })
        .eq("id", id)
        .select()
        .single();
      if (error) return json({ error: error.message }, 500);
      return json({ product: data });
    }

    if (action === "delete") {
      if (!id) return json({ error: "Missing id" }, 400);
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) return json({ error: error.message }, 500);
      return json({ ok: true });
    }

    if (action === "reorder") {
      if (!order || !Array.isArray(order)) return json({ error: "Missing order" }, 400);
      // Assign display_order values in steps of 10 based on array index.
      const results = await Promise.all(
        order.map((pid, idx) =>
          supabase
            .from("products")
            .update({ display_order: (idx + 1) * 10, updated_at: new Date().toISOString() })
            .eq("id", pid)
        )
      );
      const errs = results.map((r) => r.error).filter(Boolean);
      if (errs.length) return json({ error: errs[0]!.message }, 500);
      return json({ ok: true });
    }

    return json({ error: "Unknown action" }, 400);
  } catch (err) {
    console.error(err);
    return json({ error: (err as Error).message }, 500);
  }
});