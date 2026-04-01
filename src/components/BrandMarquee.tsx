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
import cozy3ftsLogo from "@/assets/logo.png";
import neweraLogo from "@/assets/brands/newera.png";
import louisvuittonLogo from "@/assets/brands/louisvuitton.png";
import gucciLogo from "@/assets/brands/gucci.png";
import celineLogo from "@/assets/brands/celine.png";
import balenciagaLogo from "@/assets/brands/balenciaga.png";
import versaceLogo from "@/assets/brands/versace.png";
import burberryLogo from "@/assets/brands/burberry.png";
import diorLogo from "@/assets/brands/dior.png";
import pradaLogo from "@/assets/brands/prada.png";
import supremeLogo from "@/assets/brands/supreme.png";
import offwhiteLogo from "@/assets/brands/offwhite.png";
import bapeLogo from "@/assets/brands/bape.png";
import underarmourLogo from "@/assets/brands/underarmour.png";
import lacosteLogo from "@/assets/brands/lacoste.png";
import ralphlaurenLogo from "@/assets/brands/ralphlauren.png";
import tommyhilfigerLogo from "@/assets/brands/tommyhilfiger.png";
import hugobossLogo from "@/assets/brands/hugoboss.png";
import calvinkleinLogo from "@/assets/brands/calvinklein.png";
import asicsLogo from "@/assets/brands/asics.png";
import mitchellnessLogo from "@/assets/brands/mitchellness.png";
import fortysevenLogo from "@/assets/brands/fortyseven.png";
import kangolLogo from "@/assets/brands/kangol.png";

const brands = [
  { name: "Nike", logo: nikeLogo },
  { name: "Adidas", logo: adidasLogo },
  { name: "New Era", logo: neweraLogo },
  { name: "Louis Vuitton", logo: louisvuittonLogo },
  { name: "Gucci", logo: gucciLogo },
  { name: "Stüssy", logo: stussyLogo },
  { name: "Balenciaga", logo: balenciagaLogo },
  { name: "Carhartt WIP", logo: carharttLogo },
  { name: "Dior", logo: diorLogo },
  { name: "New Balance", logo: newbalanceLogo },
  { name: "Supreme", logo: supremeLogo },
  { name: "Puma", logo: pumaLogo },
  { name: "Versace", logo: versaceLogo },
  { name: "The North Face", logo: northfaceLogo },
  { name: "Off-White", logo: offwhiteLogo },
  { name: "Champion", logo: championLogo },
  { name: "Celine", logo: celineLogo },
  { name: "Converse", logo: converseLogo },
  { name: "Burberry", logo: burberryLogo },
  { name: "Vans", logo: vansLogo },
  { name: "Prada", logo: pradaLogo },
  { name: "Jordan", logo: jordanLogo },
  { name: "BAPE", logo: bapeLogo },
  { name: "Dickies", logo: dickiesLogo },
  { name: "Ralph Lauren", logo: ralphlaurenLogo },
  { name: "Reebok", logo: reebokLogo },
  { name: "Tommy Hilfiger", logo: tommyhilfigerLogo },
  { name: "FILA", logo: filaLogo },
  { name: "Calvin Klein", logo: calvinkleinLogo },
  { name: "Timberland", logo: timberlandLogo },
  { name: "Hugo Boss", logo: hugobossLogo },
  { name: "Under Armour", logo: underarmourLogo },
  { name: "Lacoste", logo: lacosteLogo },
  { name: "ASICS", logo: asicsLogo },
  { name: "Mitchell & Ness", logo: mitchellnessLogo },
  { name: "'47 Brand", logo: fortysevenLogo },
  { name: "Kangol", logo: kangolLogo },
  { name: "CoZy 3Fts", logo: cozy3ftsLogo },
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

        <div className="flex items-center gap-10 md:gap-14 animate-marquee whitespace-nowrap">
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
