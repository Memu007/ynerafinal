import { useEffect, useRef, useState } from "react";
import logo from "@/assets/logo.png";
import sceneCaosAvif from "@/assets/brand-caos.avif";
import sceneCaosWebp from "@/assets/brand-caos.webp";
import sceneCaos from "@/assets/brand-caos.jpg";
import sceneTrabajoAvif from "@/assets/brand-trabajo.avif";
import sceneTrabajoWebp from "@/assets/brand-trabajo.webp";
import sceneTrabajo from "@/assets/brand-trabajo.jpg";
import sceneSistemaAvif from "@/assets/brand-sistema.avif";
import sceneSistemaWebp from "@/assets/brand-sistema.webp";
import sceneSistema from "@/assets/brand-sistema.jpg";
import { ArrowUpRight } from "lucide-react";

const NAV_ITEMS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Sistemas", href: "#prueba" },
  { label: "Nosotros", href: "#nosotros" },
  { label: "Preguntas", href: "#preguntas" },
];

const CAL_URL = "https://cal.com/ynera/30min";

const SCENES = [
  {
    avif: sceneCaosAvif,
    webp: sceneCaosWebp,
    img: sceneCaos,
    phrase: "Datos que no llegan.\nSistemas que nadie audita.",
    sub: "Planillas que no cierran. Vencimientos que se pierden. Horas que se van en lo manual.",
  },
  {
    avif: sceneTrabajoAvif,
    webp: sceneTrabajoWebp,
    img: sceneTrabajo,
    phrase: "Lo convertimos en sistema.",
    sub: "Dos personas. Tres disciplinas: datos, seguridad e IA. Construimos antes de aconsejar.",
  },
  {
    avif: sceneSistemaAvif,
    webp: sceneSistemaWebp,
    img: sceneSistema,
    phrase: "Ynera.",
    sub: "Software que sigue trabajando cuando nos vamos. Aira, CDI y ReservaYá son la prueba.",
  },
];

/* segmentos de progreso: 3 escenas + final */
const SEG = 1 / 4;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));

/** dentro del segmento i, devuelve {local} 0..1 */
function localProgress(p: number, i: number) {
  return clamp((p - i * SEG) / SEG);
}

export default function Hero() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  // intro 0→1 al montar: la primera escena aparece sola, sin depender del scroll
  const [intro, setIntro] = useState(0);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const DURATION = 1400;
    const tick = (now: number) => {
      const t = clamp((now - start) / DURATION);
      // ease-out suave
      setIntro(1 - Math.pow(1 - t, 3));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      const el = trackRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      const scrolled = clamp(-rect.top / Math.max(total, 1));
      setP(scrolled);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const finalP = localProgress(p, 3); // 0..1 dentro del tramo final

  return (
    <section id="top" ref={trackRef} className="relative" style={{ height: "330vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* ── escenas ── */}
        {SCENES.map((s, i) => {
          const local = localProgress(p, i);
          const isLast = i === SCENES.length - 1;
          // Escena 1 visible desde el inicio (fade automático con `intro`),
          // las demás entran con scroll. La última se disipa al aterrizar el final.
          const sceneIn = i === 0 ? intro : clamp(local / 0.22);
          const sceneOut = isLast
            ? 1 - clamp((finalP - 0.3) / 0.35)
            : 1 - clamp((local - 0.82) / 0.18);
          const opacity = clamp(sceneIn * sceneOut);
          // La frase entra apenas después de la imagen y vive plena en el medio.
          // En la escena 1 (la portada) aparece casi de inmediato; en las demás,
          // cuando la imagen ya cubre la pantalla.
          const phraseIn =
            i === 0 ? clamp((intro - 0.35) / 0.4) : clamp((local - 0.2) / 0.14);
          const phraseOut = isLast
            ? 1 - clamp((finalP - 0.18) / 0.25)
            : 1 - clamp((local - 0.74) / 0.08);
          // ken burns por escena
          const scale = 1.08 + local * 0.08;
          const driftX = (i % 2 === 0 ? -1 : 1) * local * 1.6;
          const driftY = -local * 1.8;
          return (
            <div key={i} className="absolute inset-0" style={{ opacity }} aria-hidden={opacity === 0}>
              <picture>
                <source srcSet={s.avif} type="image/avif" />
                <source srcSet={s.webp} type="image/webp" />
                <img
                  src={s.img}
                  alt=""
                  loading={i === 0 ? "eager" : "lazy"}
                  fetchPriority={i === 0 ? "high" : "auto"}
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{
                    transform: `scale(${scale}) translate(${driftX}%, ${driftY}%)`,
                  }}
                />
              </picture>
              {/* frase de la escena: scrim radial + sombras fuertes, sin panel blur */}
              <div
                className="absolute inset-0 flex items-center justify-center px-8"
                style={{ opacity: phraseIn * phraseOut }}
              >
                {/* scrim radial que oscurece solo detrás del texto */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background:
                      "radial-gradient(ellipse 60% 45% at 50% 52%, rgba(3,1,10,0.72) 0%, rgba(3,1,10,0.35) 55%, transparent 100%)",
                  }}
                />
                <div
                  className="relative text-center max-w-4xl"
                  style={{ transform: `translateY(${(1 - phraseIn) * 30}px)` }}
                >
                  <h2
                    className="font-display font-normal tracking-[-0.024em] leading-[1.06] text-[10vw] sm:text-6xl lg:text-8xl text-foreground whitespace-pre-line"
                    style={{ textShadow: "0 4px 40px rgba(0,0,0,0.9), 0 1px 8px rgba(0,0,0,0.8)" }}
                  >
                    {s.phrase}
                  </h2>
                  <p
                    className="mt-4 sm:mt-5 text-hero-sub text-sm sm:text-lg leading-6 sm:leading-7 max-w-xl mx-auto"
                    style={{ textShadow: "0 2px 20px rgba(0,0,0,0.95), 0 1px 6px rgba(0,0,0,0.9)" }}
                  >
                    {s.sub}
                  </p>
                </div>
              </div>
            </div>
          );
        })}

        {/* ── final: IA real ── */}
        <div
          className="absolute inset-0 flex flex-col bg-background"
          style={{
            opacity: clamp((finalP - 0.15) / 0.45),
            pointerEvents: finalP > 0.5 ? "auto" : "none",
          }}
        >
          <div className="relative flex-1 flex flex-col">
            {/* fondo final: la escena sistema, quieta y tenue */}
            <div className="absolute inset-0 overflow-hidden">
              <picture>
                <source srcSet={sceneSistemaAvif} type="image/avif" />
                <source srcSet={sceneSistemaWebp} type="image/webp" />
                <img
                  src={sceneSistema}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
              </picture>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[984px] h-[527px] max-w-[140vw] opacity-90 bg-gray-950 blur-[82px]"
              />
            </div>

            <div className="relative z-10 flex-1 flex items-center justify-center px-8">
              <div
                className="flex flex-col items-center text-center"
                style={{ transform: `translateY(${(1 - clamp((finalP - 0.2) / 0.5)) * 40}px)` }}
              >
                <h1 className="font-display font-normal leading-[1.02] tracking-[-0.024em] text-[20vw] sm:text-[16vw] lg:text-[200px]">
                  <span className="text-foreground">IA </span>
                  <span className="text-brand-gradient">real</span>
                </h1>
                <p className="text-hero-sub text-lg leading-8 max-w-md mt-[9px] opacity-80">
                  La consultoría que construye
                  <br />
                  antes de aconsejar.
                </p>
                <a
                  href={CAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hero-secondary px-[29px] py-[24px] mt-[25px] text-base"
                  tabIndex={finalP > 0.5 ? 0 : -1}
                >
                  Agendá 30 min
                  <ArrowUpRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── navbar fija sobre todo ── */}
        <header
          className="absolute top-0 inset-x-0 z-20 w-full py-5 px-8 flex items-center justify-between"
          style={{ opacity: 1 - clamp((finalP - 0.55) / 0.3) * 0 }}
        >
          <a href="#top" className="flex items-center gap-3" aria-label="Ynera — inicio">
            <img src={logo} alt="Ynera" className="h-8 w-8" />
            <span className="font-display font-semibold text-lg tracking-tight text-foreground">
              Ynera
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Principal">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-foreground/90 hover:text-foreground transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary rounded-full px-4 py-2 text-sm"
            >
              Agendá 30 min
            </a>
            {/* hamburguesa solo mobile */}
            <button
              type="button"
              onClick={() => setMenuOpen((v) => !v)}
              aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={menuOpen}
              className="md:hidden liquid-glass w-10 h-10 rounded-full grid place-items-center"
            >
              <span className="relative block w-4 h-3">
                <i
                  className="absolute left-0 top-0 block h-px w-4 bg-foreground transition-transform duration-300"
                  style={{ transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none" }}
                />
                <i
                  className="absolute left-0 top-1/2 block h-px w-4 bg-foreground transition-opacity duration-300"
                  style={{ opacity: menuOpen ? 0 : 1 }}
                />
                <i
                  className="absolute left-0 bottom-0 block h-px w-4 bg-foreground transition-transform duration-300"
                  style={{ transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none" }}
                />
              </span>
            </button>
          </div>
        </header>

        {/* menú mobile desplegable */}
        <div
          className="absolute top-[76px] inset-x-0 z-20 md:hidden overflow-hidden transition-[max-height,opacity] duration-300"
          style={{ maxHeight: menuOpen ? 320 : 0, opacity: menuOpen ? 1 : 0 }}
        >
          <nav
            className="mx-4 mt-2 liquid-glass-strong rounded-3xl p-4 flex flex-col"
            aria-label="Menú móvil"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3.5 text-base text-foreground/90 hover:text-foreground rounded-2xl hover:bg-white/5 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
        <div className="absolute top-[76px] inset-x-0 z-20 h-px bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />

        {/* indicador de scroll (solo al inicio) */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-3"
          style={{ opacity: 1 - clamp(p / 0.06) }}
        >
          <span className="text-[11px] tracking-[0.22em] uppercase text-foreground/60">
            Scrolleá
          </span>
          <span className="block w-px h-10 bg-gradient-to-b from-foreground/60 to-transparent" />
        </div>

        {/* progreso de la historia */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 hidden sm:flex flex-col gap-2.5">
          {SCENES.map((_, i) => {
            const active = p >= i * SEG && p < (i + 1) * SEG;
            return (
              <span
                key={i}
                className="w-1.5 rounded-full transition-all duration-300"
                style={{
                  height: active ? 22 : 6,
                  background: active ? "#a855f7" : "rgba(255,255,255,0.25)",
                }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
