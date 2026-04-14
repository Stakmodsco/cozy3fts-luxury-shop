import { useReveal } from "@/hooks/useReveal";
import { Truck, Clock, MapPin, Gift } from "lucide-react";

const zones = [
  { zone: "Nairobi", time: "1–3 business days", fee: "KSh 300", freeAbove: "KSh 5,000" },
  { zone: "Central Kenya", time: "2–4 business days", fee: "KSh 300", freeAbove: "KSh 5,000" },
  { zone: "Coast & Western", time: "3–5 business days", fee: "KSh 300", freeAbove: "KSh 5,000" },
  { zone: "Other Regions", time: "3–7 business days", fee: "KSh 300", freeAbove: "KSh 5,000" },
  { zone: "International", time: "7–21 business days", fee: "Varies", freeAbove: "—" },
];

const highlights = [
  { icon: Truck, title: "Countrywide & Worldwide", desc: "We deliver across Kenya and ship internationally to all major destinations." },
  { icon: Gift, title: "Free Local Shipping Over KSh 5,000", desc: "Kenyan orders above KSh 5,000 qualify for free delivery." },
  { icon: Clock, title: "Order Processing", desc: "Orders are processed within 24 hours on business days." },
  { icon: MapPin, title: "Order Tracking", desc: "Track your order in real-time using your order number." },
];

export default function Shipping() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="min-h-screen bg-background">
      <div className="section-padding py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          <div className="reveal">
            <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">
              Shipping Information
            </h1>
            <p className="text-muted-foreground mb-16 max-w-2xl">
              We deliver across Kenya and ship worldwide. Here's everything you need to know about getting your CoZy gear.
            </p>
          </div>

          {/* Highlights */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {highlights.map((h, i) => (
              <div
                key={i}
                className="reveal border border-border rounded-lg p-6 hover:border-foreground/30 transition-colors hover-lift"
                style={{ transitionDelay: `${i * 80}ms` }}
              >
                <h.icon className="w-6 h-6 mb-4 text-foreground" />
                <h3 className="font-medium mb-2">{h.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{h.desc}</p>
              </div>
            ))}
          </div>

          {/* Delivery Zones Table */}
          <div className="reveal">
            <h2 className="font-display text-2xl mb-6">Delivery Zones & Rates</h2>
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-accent text-accent-foreground">
                    <th className="text-left px-6 py-4 font-medium">Zone</th>
                    <th className="text-left px-6 py-4 font-medium">Estimated Time</th>
                    <th className="text-left px-6 py-4 font-medium">Delivery Fee</th>
                    <th className="text-left px-6 py-4 font-medium">Free Above</th>
                  </tr>
                </thead>
                <tbody>
                  {zones.map((z, i) => (
                    <tr key={i} className="border-t border-border hover:bg-accent/50 transition-colors">
                      <td className="px-6 py-4 font-medium">{z.zone}</td>
                      <td className="px-6 py-4 text-muted-foreground">{z.time}</td>
                      <td className="px-6 py-4 text-muted-foreground">{z.fee}</td>
                      <td className="px-6 py-4 text-muted-foreground">{z.freeAbove}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-6">
              * Delivery times are estimates and may vary due to weather, holidays, or high order volumes. International shipping fees are calculated at checkout based on destination and package weight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
