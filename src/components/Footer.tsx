import { Link } from "react-router-dom";
import { Instagram, Twitter } from "lucide-react";
import { useState } from "react";

export default function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="section-padding py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <h3 className="font-display text-2xl tracking-display mb-4">CoZy 3Fts</h3>
            <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
              Elevated streetwear rooted in comfort, crafted in Kenya for the world.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-2">
            <p className="text-xs uppercase tracking-wide-caps text-primary-foreground/40 mb-4">Navigate</p>
            <div className="flex flex-col gap-2.5">
              {[{ to: "/shop", label: "Shop" }, { to: "/about", label: "About" }, { to: "/contact", label: "Contact" }].map((l) => (
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
          <div className="md:col-span-4">
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
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
                <Twitter className="w-4 h-4" />
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
