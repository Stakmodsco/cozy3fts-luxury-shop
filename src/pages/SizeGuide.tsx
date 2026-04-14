import { useReveal } from "@/hooks/useReveal";
import { Ruler } from "lucide-react";

const sizeData = {
  tops: {
    title: "Tops, Hoodies & Jackets",
    headers: ["Size", "Chest (in)", "Length (in)", "Shoulder (in)"],
    rows: [
      ["XS", "34–36", "26", "16"],
      ["S", "36–38", "27", "17"],
      ["M", "38–40", "28", "18"],
      ["L", "40–42", "29", "19"],
      ["XL", "42–44", "30", "20"],
      ["XXL", "44–46", "31", "21"],
    ],
  },
  bottoms: {
    title: "Pants, Joggers & Shorts",
    headers: ["Size", "Waist (in)", "Hip (in)", "Inseam (in)"],
    rows: [
      ["XS", "26–28", "34–36", "30"],
      ["S", "28–30", "36–38", "30"],
      ["M", "30–32", "38–40", "31"],
      ["L", "32–34", "40–42", "31"],
      ["XL", "34–36", "42–44", "32"],
    ],
  },
  caps: {
    title: "Caps & Headgear",
    headers: ["Size", "Head Circumference (in)", "Fit"],
    rows: [
      ["One Size", "21.5–23.5", "Adjustable strap / snapback"],
      ["Fitted S/M", "21–22", "Snug"],
      ["Fitted L/XL", "22.5–24", "Standard"],
    ],
  },
  bags: {
    title: "Bags",
    headers: ["Type", "Height (in)", "Width (in)", "Depth (in)"],
    rows: [
      ["Crossbody", "7", "9", "3"],
      ["Satchel", "10", "13", "4"],
      ["Tote", "14", "16", "5"],
      ["Backpack", "16", "12", "6"],
      ["Duffle", "12", "22", "10"],
    ],
  },
};

export default function SizeGuide() {
  const revealRef = useReveal();

  return (
    <div ref={revealRef} className="pt-24 md:pt-28 section-padding pb-20 md:pb-32 min-h-screen">
      <div className="reveal max-w-3xl mb-12">
        <p className="text-xs uppercase tracking-wide-caps text-muted-foreground mb-3 flex items-center gap-2">
          <Ruler className="w-4 h-4" /> Size Guide
        </p>
        <h1 className="font-display text-4xl md:text-5xl tracking-display mb-4">Find Your Fit</h1>
        <p className="text-sm text-muted-foreground leading-relaxed">
          All our pieces run true to size. For an oversized look, we recommend sizing up one. Measurements are approximate — if you're between sizes, go with the larger option.
        </p>
      </div>

      <div className="space-y-12">
        {Object.values(sizeData).map((section, idx) => (
          <div key={section.title} className="reveal" style={{ transitionDelay: `${idx * 80}ms` }}>
            <h2 className="font-display text-xl tracking-display mb-4">{section.title}</h2>
            <div className="overflow-x-auto rounded-lg">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    {section.headers.map((h) => (
                      <th key={h} className="text-left py-3 px-4 text-xs uppercase tracking-wide-caps text-muted-foreground font-medium">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {section.rows.map((row, i) => (
                    <tr key={i} className="border-b border-border/50 hover:bg-accent/30 transition-colors">
                      {row.map((cell, j) => (
                        <td key={j} className={`py-3 px-4 ${j === 0 ? "font-medium" : "text-muted-foreground"}`}>
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>

      <div className="reveal mt-16 p-6 rounded-xl bg-accent/20 border border-border/50">
        <h3 className="font-display text-lg tracking-display mb-2">Need Help?</h3>
        <p className="text-sm text-muted-foreground">
          Not sure about your size? Send us a message on{" "}
          <a href="https://wa.me/254700327881" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground transition-colors">
            WhatsApp
          </a>{" "}
          with your measurements and we'll help you find the perfect fit.
        </p>
      </div>
    </div>
  );
}
