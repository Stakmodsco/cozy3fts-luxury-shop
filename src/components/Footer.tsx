import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.72a8.2 8.2 0 004.76 1.52V6.79a4.84 4.84 0 01-1-.1z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const MpesaIcon = () => (
  <svg viewBox="0 0 100 36" className="h-7 w-auto">
    <rect rx="6" fill="#4CAF50" width="100" height="36"/>
    <text x="50" y="15" textAnchor="middle" fill="#FFFFFF" fontSize="8" fontWeight="bold" fontFamily="sans-serif">Safaricom</text>
    <text x="50" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="bold" fontFamily="sans-serif">M-PESA</text>
  </svg>
);

const VisaIcon = () => (
  <svg viewBox="0 0 60 36" className="h-7 w-auto">
    <rect rx="6" fill="#FFFFFF" width="60" height="36"/>
    <rect x="0" y="0" width="60" height="5" fill="#1A1F71"/>
    <rect x="0" y="31" width="60" height="5" rx="0" fill="#F7B600"/>
    <text x="30" y="23" textAnchor="middle" fill="#1A1F71" fontSize="16" fontWeight="bold" fontStyle="italic" fontFamily="sans-serif">VISA</text>
  </svg>
);

const MastercardIcon = () => (
  <svg viewBox="0 0 60 36" className="h-7 w-auto">
    <rect rx="6" fill="#252525" width="60" height="36"/>
    <circle cx="23" cy="18" r="10" fill="#EB001B"/>
    <circle cx="37" cy="18" r="10" fill="#F79E1B"/>
    <path d="M30 10.5a10 10 0 000 15 10 10 0 000-15z" fill="#FF5F00"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async () => {
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from("newsletter_subscribers")
      .insert({ email: trimmed });
    setLoading(false);

    if (error) {
      if (error.code === "23505") {
        toast.info("You're already subscribed!");
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      return;
    }
    toast.success("Welcome to the CoZy family! 🎉");
    setEmail("");
  };

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-padding py-16 md:py-24 page-enter">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="CoZy 3Fts" className="h-8 w-auto brightness-0 invert dark:invert-0" />
              <span className="font-display text-xl tracking-display">CoZy 3Fts</span>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
              Elevated streetwear rooted in comfort, crafted in Kenya for the world.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-wide-caps text-primary-foreground/40 mb-4">Navigate</p>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/shop", label: "Shop" },
                { to: "/thrift", label: "Thrift" },
                { to: "/new-arrivals", label: "New In" },
                { to: "/track-order", label: "Track Order" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-wide-caps text-primary-foreground/40 mb-4">Help</p>
            <div className="flex flex-col gap-2.5">
              {[
                { to: "/shipping", label: "Shipping" },
                { to: "/returns", label: "Returns" },
                { to: "/faq", label: "FAQ" },
              ].map((l) => (
                <Link key={l.to} to={l.to} className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {l.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="col-span-2 md:col-span-4">
            <p className="text-xs uppercase tracking-wide-caps text-primary-foreground/40 mb-4">Stay Connected</p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSubscribe()}
                placeholder="Your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-primary-foreground/50 transition-colors"
              />
              <button
                onClick={handleSubscribe}
                disabled={loading}
                className="text-foreground text-sm px-5 py-2.5 rounded-sm font-medium btn-neumorph-dark text-primary-foreground active:scale-[0.97] transition-all disabled:opacity-50"
              >
                {loading ? "..." : "Join"}
              </button>
            </div>
            <div className="flex gap-4 mt-6">
              <a href="https://www.instagram.com/cozy3fts?igsh=YzN2cDh6djNndTdq" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="Instagram">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://www.tiktok.com/@cozy.3fts?_r=1&_t=ZS-95PrTo9e113" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="TikTok">
                <TikTokIcon />
              </a>
              <a href="https://wa.me/254700327881" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors" aria-label="WhatsApp">
                <WhatsAppIcon />
              </a>
            </div>

            {/* Payment Methods */}
            <div className="mt-8">
              <p className="text-xs uppercase tracking-wide-caps text-primary-foreground/40 mb-3">We Accept</p>
              <div className="flex items-center gap-3 text-primary-foreground/60">
                <MpesaIcon />
                <VisaIcon />
                <MastercardIcon />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-primary-foreground/10 text-center">
          <p className="text-xs text-primary-foreground/30">© 2025 CoZy 3Fts. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
