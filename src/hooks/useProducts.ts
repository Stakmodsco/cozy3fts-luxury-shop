import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/products";

export function useProducts(opts: { includeUnpublished?: boolean } = {}) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, [opts.includeUnpublished]);

  const fetchProducts = async () => {
    let query = supabase
      .from("products")
      .select("*")
      .order("display_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (!opts.includeUnpublished) {
      query = query.eq("published", true);
    }

    const { data, error } = await query;

    if (error) {
      console.error("Failed to fetch products:", error);
      setLoading(false);
      return;
    }

    const mapped: Product[] = (data || []).map((row) => ({
      id: row.id,
      name: row.name,
      price: row.price,
      category: row.category as Product["category"],
      thriftCategory: row.thrift_category as Product["thriftCategory"],
      tag: row.tag as Product["tag"],
      sourceTag: row.source_tag as Product["sourceTag"],
      sizes: row.sizes || [],
      image: row.image_url,
      imageAlt: row.image_alt || undefined,
      description: row.description,
      stock: (row as { stock?: number }).stock ?? 0,
      published: (row as { published?: boolean }).published ?? true,
      displayOrder: (row as { display_order?: number }).display_order ?? 0,
    }));

    setProducts(mapped);
    setLoading(false);
  };

  return { products, loading, refetch: fetchProducts };
}
