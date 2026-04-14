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
  <svg viewBox="0 0 175.216 175.552" className="w-4 h-4">
    <defs>
      <linearGradient id="wa-grad" x1="85.915" y1="175.016" x2="85.915" y2="0.596" gradientUnits="userSpaceOnUse">
        <stop offset="0" stopColor="#20b038"/>
        <stop offset="1" stopColor="#60d66a"/>
      </linearGradient>
    </defs>
    <path fill="url(#wa-grad)" d="M87.184.56C39.132.56 0 39.474 0 87.085c0 15.32 4.08 30.2 11.822 43.275L.224 175.552l46.484-12.088a87.8 87.8 0 0040.476 9.93c48.052 0 87.032-38.914 87.032-86.525S135.236.56 87.184.56z"/>
    <path fill="#fff" d="M126.066 101.477c-1.83-.914-10.826-5.34-12.506-5.952-1.68-.612-2.902-.916-4.124.916-1.222 1.83-4.736 5.952-5.806 7.174-1.07 1.222-2.14 1.374-3.97.458-1.83-.916-7.728-2.848-14.72-9.084-5.442-4.854-9.116-10.852-10.186-12.682-1.07-1.83-.114-2.82.804-3.732.824-.82 1.83-2.136 2.748-3.204.916-1.07 1.222-1.83 1.834-3.052.612-1.222.306-2.292-.152-3.208-.458-.916-4.124-9.942-5.652-13.61-1.488-3.576-2.998-3.092-4.124-3.148-1.07-.054-2.292-.066-3.514-.066-1.222 0-3.208.458-4.888 2.29-1.68 1.83-6.416 6.268-6.416 15.29 0 9.024 6.568 17.742 7.484 18.964.916 1.222 12.93 19.736 31.326 27.682 4.374 1.888 7.788 3.016 10.452 3.862 4.394 1.394 8.394 1.198 11.556.726 3.526-.526 10.826-4.426 12.354-8.7 1.528-4.274 1.528-7.942 1.07-8.706-.458-.764-1.68-1.222-3.51-2.136z"/>
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
