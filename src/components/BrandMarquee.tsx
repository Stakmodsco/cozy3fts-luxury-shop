import nikeLogo from "@/assets/brands/nike.png";
import adidasLogo from "@/assets/brands/adidas.png";
import stussyLogo from "@/assets/brands/stussy.png";
import carharttLogo from "@/assets/brands/carhartt.png";
import newbalanceLogo from "@/assets/brands/newbalance.png";
import pumaLogo from "@/assets/brands/puma.png";
import northfaceLogo from "@/assets/brands/northface.png";
import championLogo from "@/assets/brands/champion.png";
import converseLogo from "@/assets/brands/converse.png";
import vansLogo from "@/assets/brands/vans.png";
import jordanLogo from "@/assets/brands/jordan.png";
import dickiesLogo from "@/assets/brands/dickies.png";
import reebokLogo from "@/assets/brands/reebok.png";
import filaLogo from "@/assets/brands/fila.png";
import timberlandLogo from "@/assets/brands/timberland.png";
import cozy3ftsLogo from "@/assets/brands/cozy3fts.png";
import neweraLogo from "@/assets/brands/newera.png";

const brands = [
  { name: "Nike", logo: nikeLogo },
  { name: "Adidas", logo: adidasLogo },
  { name: "Stüssy", logo: stussyLogo },
  { name: "Carhartt WIP", logo: carharttLogo },
  { name: "New Balance", logo: newbalanceLogo },
  { name: "Puma", logo: pumaLogo },
  { name: "The North Face", logo: northfaceLogo },
  { name: "Champion", logo: championLogo },
  { name: "Converse", logo: converseLogo },
  { name: "Vans", logo: vansLogo },
  { name: "Jordan", logo: jordanLogo },
  { name: "Dickies", logo: dickiesLogo },
  { name: "Reebok", logo: reebokLogo },
  { name: "FILA", logo: filaLogo },
  { name: "Timberland", logo: timberlandLogo },
  { name: "CoZy 3Fts", logo: cozy3ftsLogo },
  { name: "New Era", logo: neweraLogo },
];

export default function BrandMarquee() {
  const items = [...brands, ...brands];

  return (
    <section className="py-12 md:py-16 border-y border-border overflow-hidden">
      <p className="text-center text-[10px] uppercase tracking-wide-caps text-muted-foreground mb-6">
        Brands We Carry & Love
      </p>
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-12 md:gap-16 animate-marquee whitespace-nowrap">
          {items.map((brand, i) => (
            <img
              key={`${brand.name}-${i}`}
              src={brand.logo}
              alt={brand.name}
              className="h-12 md:h-14 w-auto object-contain opacity-40 hover:opacity-100 transition-opacity duration-300 cursor-default select-none flex-shrink-0 dark:invert"
              loading="lazy"
              draggable={false}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
