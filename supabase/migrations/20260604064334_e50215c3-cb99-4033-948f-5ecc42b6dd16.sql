ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS published BOOLEAN NOT NULL DEFAULT true,
  ADD COLUMN IF NOT EXISTS stock INTEGER NOT NULL DEFAULT 10,
  ADD COLUMN IF NOT EXISTS display_order INTEGER NOT NULL DEFAULT 0;

-- Backfill display_order from created_at order so existing items have a stable order
WITH ordered AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at) * 10 AS rn
  FROM public.products
)
UPDATE public.products p
SET display_order = ordered.rn
FROM ordered
WHERE p.id = ordered.id AND p.display_order = 0;

CREATE INDEX IF NOT EXISTS idx_products_display_order ON public.products(display_order);
CREATE INDEX IF NOT EXISTS idx_products_published ON public.products(published);