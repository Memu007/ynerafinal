const BRANDS = [
  { name: "Aira", industry: "Salud mental" },
  { name: "CDI", industry: "Comercio exterior" },
  { name: "ReservaYá", industry: "Hotelería" },
];

function LogoItem({ name, industry }: { name: string; industry: string }) {
  return (
    <div className="flex items-center gap-3.5 shrink-0">
      <span className="liquid-glass w-9 h-9 rounded-xl grid place-items-center text-sm font-semibold text-foreground">
        {name[0]}
      </span>
      <span className="flex flex-col leading-tight">
        <span className="text-base font-semibold text-foreground whitespace-nowrap">{name}</span>
        <span className="text-[11px] tracking-[0.1em] uppercase text-foreground/40 whitespace-nowrap">
          {industry}
        </span>
      </span>
    </div>
  );
}

/** Marquee de sistemas en producción — sección propia entre el hero y Servicios. */
export default function Marquee() {
  return (
    <section aria-label="Sistemas construidos por Ynera" className="relative py-16">
      <div className="max-w-5xl mx-auto px-6 sm:px-8">
        <div className="reveal flex items-center gap-6 sm:gap-12">
          <p className="shrink-0 text-foreground/50 text-xs sm:text-sm leading-5 sm:leading-6">
            Sistemas en
            <br className="sm:hidden" /> producción
            <br />
            construidos por Ynera
          </p>
          <div
            className="relative flex-1 overflow-hidden"
            style={{
              maskImage: "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
            }}
          >
            <div className="flex w-max animate-marquee gap-20 pr-20">
              {[...BRANDS, ...BRANDS, ...BRANDS, ...BRANDS].map((b, i) => (
                <LogoItem key={`${b.name}-${i}`} name={b.name} industry={b.industry} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
