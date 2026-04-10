import { Link } from "react-router-dom";
import { Instagram, MessageCircle } from "lucide-react";
import { useState } from "react";
import logo from "@/assets/logo.png";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.72a8.2 8.2 0 004.76 1.52V6.79a4.84 4.84 0 01-1-.1z"/>
  </svg>
);

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-padding py-16 md:py-24 page-enter">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="CoZy 3Fts" className="h-8 w-auto brightness-0 invert" />
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
              {["Shipping", "Returns", "FAQ"].map((l) => (
                <span key={l} className="text-sm text-primary-foreground/70 cursor-default">{l}</span>
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
                placeholder="Your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/30 text-sm px-4 py-2.5 rounded-sm focus:outline-none focus:border-primary-foreground/50 transition-colors"
              />
              <button className="bg-primary-foreground text-foreground text-sm px-5 py-2.5 rounded-sm font-medium hover:opacity-90 active:scale-[0.97] transition-all">
                Join
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
                <MessageCircle className="w-4 h-4" />
              </a>
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
