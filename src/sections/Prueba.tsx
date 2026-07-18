import { useEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const CAL_URL = "https://cal.com/ynera/30min";

function Shot({ variant, tag }: { variant: "rows" | "docs" | "cal"; tag: string }) {
  return (
    <div className="liquid-glass rounded-2xl p-5 w-full">
      <div className="flex gap-1.5 mb-5">
        <i className="w-2.5 h-2.5 rounded-full bg-pink-400/60" />
        <i className="w-2.5 h-2.5 rounded-full bg-amber-300/60" />
        <i className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
      </div>
      {variant === "docs" && (
        <div className="flex gap-2.5 mb-5">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="flex-1 h-16 rounded-lg border border-purple-400/30"
              style={{
                background:
                  "linear-gradient(rgba(168,85,247,0.14), rgba(168,85,247,0.03)), repeating-linear-gradient(180deg, transparent 0 9px, rgba(196,181,253,0.16) 9px 11px)",
              }}
            />
          ))}
        </div>
      )}
      {variant === "cal" && (
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({ length: 14 }).map((_, i) => (
            <i
              key={i}
              className={`aspect-square rounded-md ${
                [2, 4, 7, 10, 13].includes(i)
                  ? "bg-amber-300/25 border border-amber-300/50 shadow-[0_0_12px_rgba(252,211,77,0.25)]"
                  : "bg-white/10"
              }`}
            />
          ))}
        </div>
      )}
      <div className="flex flex-col gap-2.5">
        {(variant === "rows" ? ["82%", "64%", "91%", "48%"] : ["74%", "56%"]).map((w, i) => (
          <div
            key={i}
            className="h-2.5 rounded-md animate-shimmer"
            style={{
              width: w,
              background:
                "linear-gradient(90deg, rgba(196,181,253,0.28), rgba(196,181,253,0.06))",
            }}
          />
        ))}
      </div>
      <div className="mt-4 pt-3 border-t border-white/10 text-[10px] tracking-[0.14em] uppercase text-foreground/40">
        {tag}
      </div>
    </div>
  );
}

const PROJECTS = [
  {
    num: "01",
    industry: "Salud mental",
    name: "Aira",
    tagline: "La operación de un consultorio, en un solo lugar.",
    desc: "Agenda, historias clínicas, facturación y recordatorios para psicólogos y psiquiatras independientes.",
    chips: ["Agenda", "Historias clínicas", "Facturación"],
    note: "Vista protegida: no publicamos capturas porque Aira trabaja con información clínica.",
    link: "Solicitar recorrido privado",
    shot: "rows" as const,
    tag: "Aira / operación clínica",
    glow: "rgba(34,211,238,0.22)",
    accent: "#22d3ee",
    rgb: "34,211,238",
  },
  {
    num: "02",
    industry: "Comercio exterior",
    name: "CDI",
    tagline: "Menos papel. Menos vencimientos perdidos.",
    desc: "Digitaliza documentos, centraliza conversaciones y controla vencimientos para despachantes de aduana.",
    chips: ["Documentos", "Vencimientos", "Conversaciones"],
    link: "Ver CDI en producción",
    shot: "docs" as const,
    tag: "CDI / vista en producción",
    glow: "rgba(168,85,247,0.22)",
  },
  {
    num: "03",
    industry: "Hotelería",
    name: "ReservaYá",
    tagline: "Reservas y operación, sin planillas sueltas.",
    desc: "Reservas online, check-in digital y reportes de ocupación para hoteles de 10 a 40 habitaciones.",
    chips: ["Reservas online", "Check-in digital", "Ocupación"],
    link: "Ver ReservaYá en producción",
    shot: "cal" as const,
    tag: "ReservaYá / vista en producción",
    glow: "rgba(252,211,77,0.14)",
    accent: "#fcd34d",
    rgb: "252,211,77",
  },
];

export default function Prueba() {
  const trackRef = useRef<HTMLDivElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const [x, setX] = useState(0);
  // maxX cacheado: leer scrollWidth/getComputedStyle por frame fuerza reflows
  const maxXRef = useRef(1);
  const [maxX, setMaxX] = useState(1);
  // en mobile (<md) el carrusel es swipe nativo con snap; en desktop, scroll-scrub
  const [isMobile, setIsMobile] = useState(false);
  const [snapIndex, setSnapIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const updateMq = () => setIsMobile(mq.matches);
    updateMq();
    mq.addEventListener("change", updateMq);
    return () => mq.removeEventListener("change", updateMq);
  }, []);

  useEffect(() => {
    if (isMobile) return; // en mobile el scroll-scrub no corre
    let raf = 0;
    const measure = () => {
      const row = rowRef.current;
      if (!row) return;
      const padLeft = parseFloat(getComputedStyle(row).paddingLeft) || 0;
      const m = Math.max(1, row.scrollWidth - window.innerWidth + padLeft);
      maxXRef.current = m;
      setMaxX(m);
    };
    const update = () => {
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -rect.top / Math.max(total, 1)));
      setX(-p * maxXRef.current);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    const onResize = () => {
      measure();
      onScroll();
    };
    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [isMobile]);

  // índice activo: en mobile por snap (scroll nativo), en desktop por progreso
  const onRowScroll = () => {
    if (!isMobile || !rowRef.current) return;
    const row = rowRef.current;
    const cardW = (row.firstElementChild as HTMLElement)?.offsetWidth || 1;
    const gap = 20;
    const idx = Math.round(row.scrollLeft / (cardW + gap));
    setSnapIndex(Math.min(PROJECTS.length, Math.max(0, idx)));
  };

  const progress = Math.min(1, Math.max(0, -x / maxX));
  const active = isMobile
    ? snapIndex
    : Math.min(PROJECTS.length, Math.max(0, Math.round(progress * (PROJECTS.length + 1))));

  return (
    <section
      id="prueba"
      ref={trackRef}
      className="relative"
      style={{ height: isMobile ? "auto" : "280vh" }}
    >
      <div className={isMobile ? "relative flex flex-col overflow-hidden py-20" : "sticky top-0 h-screen flex flex-col overflow-hidden"}>
        {/* título fijo arriba */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full pt-0 sm:pt-24 pb-6 sm:pb-4 shrink-0">
          <p className="flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-foreground/50 mb-5">
            <span className="pulse-dot" />
            Prueba en producción
          </p>
          <h2 className="font-display font-medium tracking-[-0.03em] leading-[1.05] text-3xl sm:text-5xl lg:text-6xl">
            No traemos demos.
            <br />
            Traemos <span className="text-brand-gradient">sistemas vivos</span>.
          </h2>
        </div>

        {/* fila: swipe nativo con snap en mobile, scroll-scrub en desktop */}
        <div className={isMobile ? "overflow-hidden" : "flex-1 flex items-center overflow-hidden"}>
          <div
            ref={rowRef}
            onScroll={onRowScroll}
            className={
              isMobile
                ? "flex gap-5 items-stretch overflow-x-auto snap-x snap-mandatory px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                : "flex gap-8 items-stretch pl-8 lg:pl-[max(2rem,calc((100vw-72rem)/2+2rem))] will-change-transform"
            }
            style={isMobile ? undefined : { transform: `translateX(${x}px)` }}
          >
          {/* tarjeta introductoria */}
          <div className="shrink-0 w-[85vw] sm:w-[42vw] lg:w-[34vw] snap-center flex flex-col justify-center pr-4">
            <p className="text-hero-sub/80 text-lg leading-8 max-w-xs mb-6">
              Aira, CDI y ReservaYá nacieron de problemas de tres industrias distintas.
              Los construimos, operamos y mejoramos — de ahí sale el criterio.
            </p>
            <div className="hidden sm:flex items-center gap-3 text-foreground/40 text-sm">
              <span className="block w-10 h-px bg-foreground/30" />
              Seguí scrolleando
            </div>
            <div className="flex sm:hidden items-center gap-3 text-foreground/40 text-sm">
              <span className="block w-10 h-px bg-foreground/30" />
              Deslizá →
            </div>
          </div>

          {PROJECTS.map((p) => (
            <article
              key={p.num}
              className="shrink-0 w-[85vw] sm:w-[70vw] lg:w-[58vw] snap-center liquid-glass rounded-[1.75rem] sm:rounded-[2rem] overflow-hidden grid md:grid-cols-2"
            >
              <div
                className="relative min-h-[150px] sm:min-h-[280px] grid place-items-center p-4 sm:p-8"
                style={{
                  background: `radial-gradient(ellipse at 50% 30%, ${p.glow}, transparent 65%)`,
                }}
              >
                <div className="w-full max-w-[300px] sm:max-w-[340px]">
                  <Shot variant={p.shot} tag={p.tag} />
                </div>
              </div>
              <div className="p-5 sm:p-8 md:p-10 flex flex-col">
                <div className="flex justify-between items-center gap-4 flex-wrap text-[10px] sm:text-[11px] tracking-[0.14em] uppercase text-foreground/40 mb-3 sm:mb-5">
                  <span style={{ color: p.accent }}>
                    {p.num} · {p.industry}
                  </span>
                  <span className="inline-flex items-center gap-2 text-emerald-300">
                    <i className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.9)] pulse-green" />
                    en producción
                  </span>
                </div>
                <h3 className="font-display font-medium text-2xl sm:text-3xl tracking-tight mb-1.5 sm:mb-2">{p.name}</h3>
                <p className="italic text-hero-sub text-base sm:text-lg leading-7 mb-2 sm:mb-4">{p.tagline}</p>
                <p className="hidden sm:block text-foreground/60 text-sm leading-6 mb-5 max-w-[46ch]">{p.desc}</p>
                <ul className="flex flex-wrap gap-2 mb-5">
                  {p.chips.map((c) => (
                    <li
                      key={c}
                      className="liquid-glass rounded-full px-3.5 py-1.5 text-xs text-foreground/80"
                    >
                      {c}
                    </li>
                  ))}
                </ul>
                {p.note && (
                  <p className="text-xs text-foreground/40 border-l-2 border-purple-400/40 pl-3 mb-5 leading-5">
                    {p.note}
                  </p>
                )}
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-auto inline-flex items-center gap-2 text-sm text-foreground hover:text-purple-300 transition-colors group"
                >
                  {p.link}
                  <ArrowUpRight className="w-4 h-4 text-purple-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}

          {/* tarjeta final CTA */}
          <div className="shrink-0 w-[85vw] sm:w-[42vw] lg:w-[34vw] snap-center flex flex-col justify-center items-start pr-8">
            <p className="font-display font-medium tracking-[-0.02em] text-3xl sm:text-4xl leading-tight mb-6">
              El próximo puede ser{" "}
              <span className="text-brand-gradient">el tuyo</span>.
            </p>
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary px-7 py-4 text-base"
            >
              Agendá 30 min
              <ArrowUpRight className="w-5 h-5" />
            </a>
          </div>
          </div>
        </div>

        {/* indicadores: dots + nombre activo (la barra solo en desktop) */}
        <div className="max-w-6xl mx-auto px-6 sm:px-8 w-full pb-2 sm:pb-10 pt-2 sm:pt-0 shrink-0">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              {PROJECTS.map((p, i) => (
                <span
                  key={p.num}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: active === i + 1 ? 22 : 6,
                    height: 6,
                    background: active === i + 1 ? "#a855f7" : "rgba(255,255,255,0.2)",
                  }}
                />
              ))}
            </div>
            <span className="text-xs tracking-[0.18em] uppercase text-foreground/40 transition-opacity duration-300">
              {active >= 1 && active <= PROJECTS.length ? PROJECTS[active - 1].name : ""}
            </span>
          </div>
          {!isMobile && (
            <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
              <div
                className="absolute inset-y-0 left-0 w-full origin-left bg-gradient-to-r from-indigo-500 via-purple-500 to-amber-300 rounded-full"
                style={{ transform: `scaleX(${Math.max(0.03, progress)})` }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
