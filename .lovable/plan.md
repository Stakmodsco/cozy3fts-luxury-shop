

## Current State

Right now, the entire order and payment system is **client-side only**:
- M-Pesa payment is simulated with a `setTimeout` — no real transaction occurs
- Orders are hardcoded demo data — nothing is stored in a database
- Order tracking IDs are static — anyone can view them
- There's no verification that payment actually went through
- A user could screenshot the "success" page and claim they paid without actually paying
- The cart clears on page refresh since it's in React state

This means **no real order fulfillment can happen** and the system is completely vulnerable to fraud.

---

## Plan: Secure Order Fulfillment System

### What needs to happen (non-technical summary)

1. **A real database** stores every order with a unique ID, payment status, and details
2. **M-Pesa payments are verified server-side** — the site calls Safaricom's Daraja API from a secure backend function, not from the browser
3. **Each order gets a unique, non-guessable tracking number** tied to a confirmed payment
4. **Payment confirmation is checked server-side** via M-Pesa callback — users can't fake it
5. **Order tracking only shows orders linked to the customer's phone/email** — not freely browsable

### Technical implementation

#### Step 1: Enable Supabase backend
- Set up Lovable Cloud (or connect Supabase) for database + edge functions

#### Step 2: Create `orders` table
```sql
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number TEXT UNIQUE NOT NULL,        -- e.g. CZ-20250003
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  delivery_address TEXT NOT NULL,
  city TEXT NOT NULL,
  items JSONB NOT NULL,                     -- cart snapshot
  subtotal INTEGER NOT NULL,
  delivery_fee INTEGER NOT NULL,
  total INTEGER NOT NULL,
  payment_status TEXT DEFAULT 'pending',    -- pending | confirmed | failed
  mpesa_receipt TEXT,                       -- Safaricom transaction ID
  mpesa_phone TEXT NOT NULL,
  order_status TEXT DEFAULT 'processing',   -- processing | shipped | in-transit | delivered
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);
```

#### Step 3: M-Pesa Daraja edge function (`mpesa-stk-push`)
- Accepts order details, initiates a real STK push via Safaricom Daraja API
- Requires your **Consumer Key**, **Consumer Secret**, **Shortcode**, and **Passkey** as secrets
- Returns a checkout request ID to poll for status

#### Step 4: M-Pesa callback edge function (`mpesa-callback`)
- Safaricom calls this URL after payment completes
- Updates the order's `payment_status` to `confirmed` and stores the `mpesa_receipt` (transaction code)
- This is the **only** way an order gets marked as paid — no client-side spoofing possible

#### Step 5: Fraud prevention measures
- **Unique M-Pesa receipt validation**: Each Safaricom transaction code can only be used once — stored in the DB and checked for duplicates
- **Order number generation**: Server-generated sequential IDs (not guessable)
- **Order tracking requires verification**: Customer must enter both order number AND phone number (or email) to view status — prevents strangers from viewing orders
- **Cart cleared only after server confirms payment** — not on button click
- **Idempotency**: If STK push is re-triggered, it checks for existing pending order first

#### Step 6: Update frontend
- **Checkout.tsx**: Replace `setTimeout` simulation with real edge function call; poll for payment confirmation
- **OrderTracking.tsx**: Query the `orders` table instead of hardcoded data; require phone number + order ID to look up
- **Cart**: Add a `clearCart` method; only call it after confirmed payment response from server
- **Success page**: Display the real M-Pesa receipt code and order number from the database

### Prerequisites before implementation
You'll need to provide your **Safaricom Daraja API credentials**:
1. Go to [developer.safaricom.co.ke](https://developer.safaricom.co.ke)
2. Create an app to get **Consumer Key** and **Consumer Secret**
3. Get your **Business Shortcode** and **Passkey** (for Lipa Na M-Pesa Online)
4. We'll store these securely as project secrets

Would you like to proceed? I'll need to set up the backend (Lovable Cloud or Supabase connection) and your Daraja credentials first.

