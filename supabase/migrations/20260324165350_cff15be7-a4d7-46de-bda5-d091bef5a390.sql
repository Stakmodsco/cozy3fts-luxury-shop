CREATE OR REPLACE FUNCTION public.nextval_order_number()
RETURNS bigint
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT nextval('public.order_number_seq');
$$;