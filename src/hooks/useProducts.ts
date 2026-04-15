import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Product } from "@/lib/products";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: true });

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
    }));

    setProducts(mapped);
    setLoading(false);
  };

  return { products, loading, refetch: fetchProducts };
}
