import { ArrowUpRight } from "lucide-react";

const PEOPLE = [
  {
    initial: "E",
    name: "Emiliano",
    tags: ["Ciberseguridad", "Código", "IA"],
    desc: "Construye sistemas desde la arquitectura hasta el despliegue. Para él, la seguridad no es una capa final: es una condición para que algo pueda salir a producción.",
    avatar: "linear-gradient(135deg, #6366f1 0%, #a855f7 60%, #c084fc 100%)",
    shadow: "0 12px 34px rgba(139,92,246,0.35), inset 0 1px 1px rgba(255,255,255,0.3)",
  },
  {
    initial: "M",
    name: "Mariano",
    tags: ["Ciencia de datos", "Negocio"],
    desc: "Convierte conversaciones de negocio en problemas que se pueden medir y resolver. Trabaja entre los datos, el contexto y las decisiones que el equipo necesita tomar.",
    avatar: "linear-gradient(135deg, #a855f7 0%, #e879f9 40%, #fcd34d 100%)",
    shadow: "0 12px 34px rgba(252,211,77,0.25), inset 0 1px 1px rgba(255,255,255,0.3)",
  },
];

export default function Nosotros() {
  return (
    <section id="nosotros" className="relative py-28">
      <div className="max-w-6xl mx-auto px-8">
        <p className="reveal flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-foreground/50 mb-6">
          <span className="pulse-dot" />
          Quiénes somos
        </p>
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-end mb-16">
          <h2 className="reveal font-display font-medium tracking-[-0.03em] leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
            Dos perfiles.
            <br />
            Un modo: <span className="text-brand-gradient">entender, construir, probar</span>.
          </h2>
          <p className="reveal text-hero-sub/80 text-lg leading-8 max-w-md" data-delay="1">
            Emiliano construye y asegura sistemas. Mariano convierte problemas de negocio
            en preguntas que los datos responden. Juntos llevaron tres productos a producción.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {PEOPLE.map((p, i) => (
            <article
              key={p.name}
              data-delay={String(i)}
              className="reveal liquid-glass rounded-3xl p-8 flex flex-col sm:flex-row gap-7 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <div
                className="shrink-0 w-20 h-20 rounded-3xl grid place-items-center font-display font-semibold text-3xl text-[#0a0518]"
                style={{ background: p.avatar, boxShadow: p.shadow }}
                aria-hidden="true"
              >
                {p.initial}
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-white/10 px-3 py-1 text-[10px] tracking-[0.14em] uppercase text-foreground/50"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="font-display font-medium text-2xl tracking-tight mb-3">{p.name}</h3>
                <p className="text-foreground/60 text-sm leading-6 mb-5">{p.desc}</p>
                <a
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm text-foreground hover:text-purple-300 transition-colors group"
                >
                  LinkedIn
                  <ArrowUpRight className="w-4 h-4 text-purple-300 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </div>
            </article>
          ))}
        </div>

        <blockquote className="reveal text-center max-w-3xl mx-auto mb-14">
          <p className="font-display font-normal tracking-[-0.02em] text-3xl sm:text-4xl lg:text-5xl leading-[1.15] mb-6">
            “La tecnología entiende el negocio,{" "}
            <span className="text-brand-gradient">no al revés</span>.”
          </p>
          <footer className="text-[11px] tracking-[0.18em] uppercase text-foreground/40">
            Lo que aprendimos en tres industrias distintas
          </footer>
        </blockquote>

        <p className="reveal mx-auto max-w-2xl flex items-center justify-center gap-3 rounded-2xl border border-dashed border-pink-400/35 px-6 py-4 text-xs tracking-[0.06em] text-foreground/60 text-center">
          <span className="shrink-0 w-6 h-6 rounded-full border border-pink-400/55 text-pink-300 grid place-items-center text-xs">
            !
          </span>
          Límite de trabajo — no trabajamos en apuestas online ni en productos que dañen a las
          personas.
        </p>
      </div>
    </section>
  );
}
