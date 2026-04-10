import { Mail, Phone, MapPin, Instagram, MessageCircle, Send } from "lucide-react";
import qrTiktok from "@/assets/qr-tiktok.png";
import qrInstagram from "@/assets/qr-instagram.png";
import { useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { toast } from "sonner";

const TikTokIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.72a8.2 8.2 0 004.76 1.52V6.79a4.84 4.84 0 01-1-.1z"/>
  </svg>
);

export default function Contact() {
  const revealRef = useReveal();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div ref={revealRef} className="relative min-h-screen overflow-hidden">
      {/* Animated background pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-background" />
        {/* Fabric-like texture pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              hsl(var(--foreground)) 10px,
              hsl(var(--foreground)) 11px
            )`,
          }}
        />
        {/* Floating gradient orbs */}
        <div className="absolute top-20 -left-32 w-96 h-96 rounded-full bg-accent/20 blur-3xl animate-pulse" />
        <div className="absolute bottom-20 -right-32 w-80 h-80 rounded-full bg-accent/15 blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="pt-24 md:pt-28 section-padding pb-20 md:pb-32">
        {/* 3D Animated Header */}
        <div className="reveal max-w-2xl mb-16" style={{ perspective: "800px" }}>
          <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Contact</p>
          <h1
            className="font-display text-4xl md:text-6xl tracking-display mb-4 animate-float-text animate-pulse-glow"
            style={{ transformStyle: "preserve-3d" }}
          >
            Get in Touch
          </h1>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Have a question, wholesale inquiry, or just want to say hello? We'd love to hear from you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Form with neuromorphic style */}
          <form onSubmit={handleSubmit} className="reveal space-y-6">
            {[
              { id: "name", label: "Name", type: "text", placeholder: "Your name", value: form.name },
              { id: "email", label: "Email", type: "email", placeholder: "Your email", value: form.email },
            ].map((field) => (
              <div key={field.id} className="relative">
                <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">
                  {field.label}
                </label>
                <input
                  type={field.type}
                  value={field.value}
                  onChange={(e) => setForm({ ...form, [field.id]: e.target.value })}
                  onFocus={() => setFocused(field.id)}
                  onBlur={() => setFocused(null)}
                  required
                  className={`w-full bg-card text-foreground text-sm py-3.5 px-4 rounded-lg focus:outline-none transition-all duration-300 placeholder:text-muted-foreground/50 ${
                    focused === field.id
                      ? "shadow-[inset_3px_3px_6px_hsl(var(--border)),inset_-2px_-2px_5px_hsl(var(--background))]"
                      : "shadow-[4px_4px_8px_hsl(var(--border)),-3px_-3px_6px_hsl(var(--background))]"
                  }`}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
            <div className="relative">
              <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                required
                rows={5}
                className={`w-full bg-card text-foreground text-sm py-3.5 px-4 rounded-lg focus:outline-none transition-all duration-300 resize-none placeholder:text-muted-foreground/50 ${
                  focused === "message"
                    ? "shadow-[inset_3px_3px_6px_hsl(var(--border)),inset_-2px_-2px_5px_hsl(var(--background))]"
                    : "shadow-[4px_4px_8px_hsl(var(--border)),-3px_-3px_6px_hsl(var(--background))]"
                }`}
                placeholder="Tell us what's on your mind"
              />
            </div>
            <button
              type="submit"
              className="btn-neumorph-dark text-primary-foreground text-sm uppercase tracking-wide-caps font-medium px-10 py-3.5 rounded-lg flex items-center gap-2 group"
            >
              <Send className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              Send Message
            </button>
          </form>

          {/* Info */}
          <div className="reveal space-y-8" style={{ transitionDelay: "100ms" }}>
            {/* Contact cards with neumorphic style */}
            {[
              {
                icon: <Mail className="w-4 h-4" />,
                label: "Email",
                content: <a href="mailto:cozy3fts@gmail.com" className="text-sm hover:text-muted-foreground transition-colors">cozy3fts@gmail.com</a>,
              },
              {
                icon: <Phone className="w-4 h-4" />,
                label: "Phone / WhatsApp",
                content: <a href="https://wa.me/254700327881" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-muted-foreground transition-colors">+254 700 327 881</a>,
              },
              {
                icon: <MapPin className="w-4 h-4" />,
                label: "Location",
                content: <p className="text-sm">Nairobi, Kenya</p>,
              },
            ].map((item, i) => (
              <div
                key={i}
                className="btn-neumorph flex items-start gap-4 p-5 rounded-xl cursor-default"
              >
                <div className="text-muted-foreground mt-0.5">{item.icon}</div>
                <div>
                  <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-1">{item.label}</p>
                  {item.content}
                </div>
              </div>
            ))}

            {/* Socials */}
            <div>
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Follow Us</p>
              <div className="flex gap-3">
                {[
                  { href: "https://www.instagram.com/cozy3fts?igsh=YzN2cDh6djNndTdq", icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                  { href: "https://www.tiktok.com/@cozy.3fts?_r=1&_t=ZS-95PrTo9e113", icon: <TikTokIcon />, label: "TikTok" },
                  { href: "https://wa.me/254700327881", icon: <MessageCircle className="w-4 h-4" />, label: "WhatsApp" },
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-neumorph flex items-center gap-2 text-sm px-4 py-2.5 rounded-lg hover:scale-105 active:scale-95 transition-transform"
                  >
                    {social.icon} {social.label}
                  </a>
                ))}
              </div>

              {/* QR Codes */}
              <div className="flex gap-8 mt-8">
                <div className="text-center">
                  <div className="btn-neumorph p-3 rounded-xl inline-block">
                    <img src={qrInstagram} alt="Instagram QR Code" className="w-28 h-28 rounded-md" loading="lazy" width={112} height={112} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">Instagram</p>
                </div>
                <div className="text-center">
                  <div className="btn-neumorph p-3 rounded-xl inline-block">
                    <img src={qrTiktok} alt="TikTok QR Code" className="w-28 h-28 rounded-md" loading="lazy" width={112} height={112} />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2 font-medium">TikTok</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
