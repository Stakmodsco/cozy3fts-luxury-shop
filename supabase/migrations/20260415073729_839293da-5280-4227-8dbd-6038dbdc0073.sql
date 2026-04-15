
-- Create products table
CREATE TABLE public.products (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  price INTEGER NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('men', 'women', 'unisex', 'thrift')),
  thrift_category TEXT CHECK (thrift_category IN ('caps', 'shirts', 'bags', 'headgear')),
  tag TEXT CHECK (tag IN ('new', 'bestseller')),
  source_tag TEXT CHECK (source_tag IN ('brand-new', 'thrifted')),
  sizes TEXT[] NOT NULL DEFAULT '{}',
  image_url TEXT NOT NULL,
  image_alt TEXT,
  description TEXT NOT NULL DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Anyone can view products
CREATE POLICY "Anyone can view products"
  ON public.products FOR SELECT
  USING (true);

-- Service role can manage products
CREATE POLICY "Service role can insert products"
  ON public.products FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update products"
  ON public.products FOR UPDATE
  TO service_role
  USING (true);

CREATE POLICY "Service role can delete products"
  ON public.products FOR DELETE
  TO service_role
  USING (true);

-- Trigger for updated_at
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) VALUES ('product-images', 'product-images', true);

-- Anyone can view product images
CREATE POLICY "Anyone can view product images"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'product-images');

-- Service role can manage product images
CREATE POLICY "Service role can upload product images"
  ON storage.objects FOR INSERT
  TO service_role
  WITH CHECK (bucket_id = 'product-images');

CREATE POLICY "Service role can delete product images"
  ON storage.objects FOR DELETE
  TO service_role
  USING (bucket_id = 'product-images');
