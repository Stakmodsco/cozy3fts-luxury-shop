import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useState, useEffect } from "react";
import logo from "@/assets/logo.png";

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
    { to: "/", label: "Home" },
    { to: "/shop", label: "Shop" },
    { to: "/thrift", label: "Thrift" },
    { to: "/new-arrivals", label: "New In" },
    { to: "/about", label: "About" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-[0_1px_0_hsl(var(--border))]"
          : "bg-transparent"
      }`}
    >
      <nav className="section-padding flex items-center justify-between h-16 md:h-20">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="CoZy 3Fts" className="h-10 md:h-12 w-auto" />
          <span className="font-display text-lg md:text-xl tracking-display">CoZy 3Fts</span>
        </Link>

        <div className="hidden md:flex items-center gap-8 lg:gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm font-body tracking-wide-caps uppercase transition-colors duration-200 underline-hover ${
                location.pathname === link.to
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/wishlist"
            className="relative text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-foreground text-primary-foreground text-[10px] flex items-center justify-center font-body animate-pop">
                {wishlistCount}
              </span>
            )}
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="relative text-foreground hover:text-muted-foreground transition-colors"
            aria-label="Open cart"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-foreground text-primary-foreground text-[10px] flex items-center justify-center font-body animate-pop">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ${
          mobileOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="section-padding pb-6 flex flex-col gap-4 bg-background/95 backdrop-blur-md">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`text-sm tracking-wide-caps uppercase font-body ${
                location.pathname === link.to ? "text-foreground" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/wishlist" className={`text-sm tracking-wide-caps uppercase font-body ${
            location.pathname === "/wishlist" ? "text-foreground" : "text-muted-foreground"
          }`}>
            Wishlist {wishlistCount > 0 && `(${wishlistCount})`}
          </Link>
        </div>
      </div>
    </header>
  );
}
