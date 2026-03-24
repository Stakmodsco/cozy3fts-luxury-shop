-- Drop overly permissive policies
DROP POLICY "Service role can insert orders" ON public.orders;
DROP POLICY "Service role can update orders" ON public.orders;

-- Recreate with service role restriction
CREATE POLICY "Service role can insert orders"
  ON public.orders FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update orders"
  ON public.orders FOR UPDATE
  TO service_role
  USING (true);