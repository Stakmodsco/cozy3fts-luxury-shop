import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Heart, Home, Shirt, Tag, Sparkles, User, Mail } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";
import ThemeToggle from "@/components/ThemeToggle";

export default function Navbar() {
  const { totalItems, setIsOpen } = useCart();
  const { totalItems: wishlistCount } = useWishlist();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navLinks = [
    { to: "/", label: "Home", Icon: Home },
    { to: "/shop", label: "Shop", Icon: Shirt },
    { to: "/thrift", label: "Thrift", Icon: Tag },
    { to: "/new-arrivals", label: "New In", Icon: Sparkles },
    { to: "/about", label: "About", Icon: User },
    { to: "/contact", label: "Contact", Icon: Mail },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "pt-2 md:pt-3" : "pt-3 md:pt-5"
      }`}
    >
      <div className="hanger-wrap section-padding">
        {/* Hanger hook */}
        <div className="hanger-hook" aria-hidden="true">
          <svg viewBox="0 0 40 60" className="w-8 h-12 md:w-10 md:h-14">
            <path
              d="M20 60 V30 C20 18 30 14 30 8 A6 6 0 1 0 18 8"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        {/* Hanger bar */}
        <nav className="hanger-bar" aria-label="Primary">
          {/* Left brand tag */}
          <Link to="/" className="hanger-tag" aria-label="CoZy 3Fts home">
            <img
              src={logo}
              alt="CoZy 3Fts"
              className="h-7 md:h-9 w-auto brightness-0 invert"
            />
            <span className="hanger-tag-sub">EST. 2024</span>
          </Link>

          {/* Center nav items — desktop */}
          <ul className="hanger-nav">
            {navLinks.map(({ to, label, Icon }, i) => {
              const active = location.pathname === to;
              return (
                <li key={to} className="hanger-nav-item">
                  <Link to={to} className={`hanger-link ${active ? "is-active" : ""}`}>
                    <Icon className="w-4 h-4 lg:w-[18px] lg:h-[18px]" strokeWidth={1.5} />
                    <span>{label}</span>
                  </Link>
                  {i < navLinks.length - 1 && <span className="hanger-sep" aria-hidden="true" />}
                </li>
              );
            })}
          </ul>

          {/* Actions */}
          <div className="hanger-actions">
            <div className="hidden md:flex items-center">
              <ThemeToggle />
            </div>
            <Link to="/wishlist" className="hanger-icon-btn" aria-label="Wishlist">
              <Heart className="w-4 h-4" strokeWidth={1.5} />
              {wishlistCount > 0 && <span className="hanger-badge">{wishlistCount}</span>}
            </Link>

            {/* Cart strap */}
            <button
              onClick={() => setIsOpen(true)}
              className="hanger-cart"
              aria-label="Open cart"
            >
              <span className="hanger-strap" aria-hidden="true" />
              <ShoppingBag className="w-4 h-4" strokeWidth={1.5} />
              <span className="hanger-cart-count">({totalItems})</span>
            </button>

            <button
              className="md:hidden hanger-icon-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-400 ${
            mobileOpen ? "max-h-[420px] opacity-100 mt-2" : "max-h-0 opacity-0"
          }`}
        >
          <div className="hanger-mobile">
            {navLinks.map(({ to, label, Icon }) => (
              <Link
                key={to}
                to={to}
                className={`hanger-mobile-link ${location.pathname === to ? "is-active" : ""}`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
                <span>{label}</span>
              </Link>
            ))}
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-[hsl(var(--hanger-trim)/0.25)]">
              <ThemeToggle />
              <Link to="/wishlist" className="hanger-mobile-link !py-0">
                <Heart className="w-4 h-4" strokeWidth={1.5} />
                <span>Wishlist {wishlistCount > 0 && `(${wishlistCount})`}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
