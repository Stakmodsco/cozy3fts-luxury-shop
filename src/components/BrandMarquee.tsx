const brands = [
  "Nike", "Adidas", "Stüssy", "Carhartt WIP", "New Balance",
  "Puma", "The North Face", "Champion", "Converse", "Vans",
  "Jordan", "Dickies", "Reebok", "FILA", "Timberland",
];

export default function BrandMarquee() {
  // Duplicate for seamless loop
  const items = [...brands, ...brands];

  return (
    <section className="py-12 md:py-16 border-y border-border overflow-hidden">
      <p className="text-center text-[10px] uppercase tracking-wide-caps text-muted-foreground mb-6">
        Brands We Carry & Love
      </p>
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex items-center gap-12 md:gap-16 animate-marquee whitespace-nowrap">
          {items.map((brand, i) => (
            <span
              key={`${brand}-${i}`}
              className="text-lg md:text-xl font-display tracking-display text-muted-foreground/40 hover:text-foreground transition-colors duration-300 cursor-default select-none flex-shrink-0"
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
