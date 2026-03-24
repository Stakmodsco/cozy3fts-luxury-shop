import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const body = await req.json();
    const {
      customerName,
      customerEmail,
      customerPhone,
      deliveryAddress,
      city,
      items,
      subtotal,
      deliveryFee,
      total,
      mpesaPhone,
    } = body;

    // Validate required fields
    if (!customerName || !customerEmail || !customerPhone || !deliveryAddress || !city || !items || !mpesaPhone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Generate order number using sequence
    const { data: seqData, error: seqError } = await supabase.rpc("nextval_order_number");

    let orderNumber: string;
    if (seqError) {
      // Fallback: generate from timestamp
      orderNumber = `CZ-${Date.now().toString(36).toUpperCase()}`;
    } else {
      orderNumber = `CZ-${String(seqData).padStart(8, "0")}`;
    }

    const { data: order, error: insertError } = await supabase
      .from("orders")
      .insert({
        order_number: orderNumber,
        customer_name: customerName,
        customer_email: customerEmail,
        customer_phone: customerPhone,
        delivery_address: deliveryAddress,
        city: city,
        items: items,
        subtotal: subtotal,
        delivery_fee: deliveryFee,
        total: total,
        mpesa_phone: mpesaPhone,
        payment_status: "pending",
        order_status: "processing",
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to create order" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // TODO: When Daraja credentials are added, initiate STK push here
    // For now, simulate payment confirmation
    const { error: updateError } = await supabase
      .from("orders")
      .update({
        payment_status: "confirmed",
        mpesa_receipt: `SIM${Date.now().toString(36).toUpperCase()}`,
      })
      .eq("id", order.id);

    if (updateError) {
      console.error("Update error:", updateError);
    }

    // Re-fetch the updated order
    const { data: finalOrder } = await supabase
      .from("orders")
      .select()
      .eq("id", order.id)
      .single();

    return new Response(
      JSON.stringify({ order: finalOrder }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("Error:", err);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
