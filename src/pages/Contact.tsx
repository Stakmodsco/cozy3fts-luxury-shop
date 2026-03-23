import { Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! We'll be in touch.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal max-w-2xl mb-16">
        <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Contact</p>
        <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">Get in Touch</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Have a question, wholesale inquiry, or just want to say hello? We'd love to hear from you.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
        {/* Form */}
        <form onSubmit={handleSubmit} className="reveal space-y-6">
          <div>
            <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Name</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Email</label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors placeholder:text-muted-foreground/50"
              placeholder="Your email"
            />
          </div>
          <div>
            <label className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-2 block">Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
              rows={5}
              className="w-full bg-transparent border-b border-border text-foreground text-sm py-3 focus:outline-none focus:border-foreground transition-colors resize-none placeholder:text-muted-foreground/50"
              placeholder="Tell us what's on your mind"
            />
          </div>
          <button
            type="submit"
            className="bg-foreground text-primary-foreground text-sm uppercase tracking-wide-caps font-medium px-10 py-3.5 rounded-sm hover:opacity-90 active:scale-[0.97] transition-all"
          >
            Send Message
          </button>
        </form>

        {/* Info */}
        <div className="reveal space-y-8" style={{ transitionDelay: "100ms" }}>
          <div className="flex items-start gap-4">
            <Mail className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-1">Email</p>
              <a href="mailto:cozy3fts@gmail.com" className="text-sm hover:text-muted-foreground transition-colors">cozy3fts@gmail.com</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <Phone className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-1">Phone / WhatsApp</p>
              <a href="https://wa.me/254700327881" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-muted-foreground transition-colors">+254 700 327 881</a>
            </div>
          </div>
          <div className="flex items-start gap-4">
            <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
            <div>
              <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-1">Location</p>
              <p className="text-sm">Nairobi, Kenya</p>
            </div>
          </div>

          {/* Socials */}
          <div>
            <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3">Follow Us</p>
            <div className="flex gap-4">
              <a href="https://instagram.com/cozy3fts" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors">
                <Instagram className="w-4 h-4" /> Instagram
              </a>
              <a href="https://tiktok.com/@cozy3fts" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors">
                <TikTokIcon /> TikTok
              </a>
              <a href="https://wa.me/254700327881" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm hover:text-muted-foreground transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
