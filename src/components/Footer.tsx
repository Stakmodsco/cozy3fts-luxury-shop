import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import logo from "@/assets/logo.png";

// Windows 11 Fluency colored icons from icons8 (https://icons8.com/icons/fluency)
const FluencyIcon = ({ name, label }: { name: string; label: string }) => (
  <img
    src={`https://img.icons8.com/fluency/96/${name}.png`}
    alt={label}
    className="w-6 h-6 select-none"
    loading="lazy"
    draggable={false}
  />
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
                { to: "/size-guide", label: "Size Guide" },
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
              <a href="https://www.instagram.com/cozy3fts?igsh=YzN2cDh6djNndTdq" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all" aria-label="Instagram">
                <FluencyIcon name="instagram-new" label="Instagram" />
              </a>
              <a href="https://www.tiktok.com/@cozy.3fts?_r=1&_t=ZS-95PrTo9e113" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all" aria-label="TikTok">
                <FluencyIcon name="tiktok" label="TikTok" />
              </a>
              <a href="https://wa.me/254700327881" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 hover:scale-110 transition-all" aria-label="WhatsApp">
                <FluencyIcon name="whatsapp" label="WhatsApp" />
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
