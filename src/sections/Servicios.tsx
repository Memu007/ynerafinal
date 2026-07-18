import { ArrowUpRight, Database, ShieldCheck, Cpu } from "lucide-react";

const CAL_URL = "https://cal.com/ynera/30min";

const SERVICES = [
  {
    num: "01",
    icon: Database,
    title: "Datos",
    problem: "“La información llega tarde, incompleta, y nadie confía en ella.”",
    desc: "Pipelines, calidad de datos y tableros que la gente usa.",
    out: "Datos para decidir, no para discutir.",
    link: "Hablemos de datos",
    accent: "#22d3ee", // cyan-400 — claramente distinto del violeta
    rgb: "34,211,238",
  },
  {
    num: "02",
    icon: ShieldCheck,
    title: "Seguridad",
    problem: "“Tu operación funciona, pero no sabés qué tan expuesta está.”",
    desc: "Auditoría, hardening, APIs seguras y protección de datos.",
    out: "Una operación preparada para crecer sin miedo.",
    link: "Hablemos de seguridad",
    accent: "#a855f7", // purple-500 — más profundo, se separa del sky
    rgb: "168,85,247",
  },
  {
    num: "03",
    icon: Cpu,
    title: "IA aplicada",
    problem: "“El trabajo repetitivo le roba horas a tu equipo.”",
    desc: "Automatizaciones con LLMs y asistentes sobre tus documentos.",
    out: "Procesos más rápidos, con revisión humana y trazabilidad.",
    link: "Hablemos de IA",
    accent: "#fcd34d", // amber-300
    rgb: "252,211,77",
  },
];

export default function Servicios() {
  return (
    <section id="servicios" className="relative pt-40 pb-28">
      <div className="max-w-6xl mx-auto px-8">
        <p className="reveal flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-foreground/50 mb-6">
          <span className="pulse-dot" />
          Servicios
        </p>
        <div className="grid md:grid-cols-[1.2fr_0.8fr] gap-10 items-end mb-16">
          <h2 className="reveal font-display font-medium tracking-[-0.03em] leading-[1.05] text-4xl sm:text-5xl lg:text-6xl">
            Venís por una parte.
            <br />
            Miramos <span className="text-brand-gradient">el todo</span>.
          </h2>
          <p className="reveal text-hero-sub/80 text-lg leading-8 max-w-md" data-delay="1">
            Tres disciplinas independientes. Las combinamos solo cuando el problema lo pide.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {SERVICES.map((s, i) => (
            <article
              key={s.num}
              data-delay={String(i)}
              className="reveal liquid-glass rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-1.5 group/card"
              style={{ ["--card-rgb" as string]: s.rgb }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 24px 70px rgba(${s.rgb},0.22), inset 0 1px 1px rgba(255,255,255,0.1)`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "";
              }}
            >
              {/* glow superior en el color de la card */}
              <div
                aria-hidden="true"
                className="absolute top-0 inset-x-8 h-px"
                style={{
                  background: `linear-gradient(90deg, transparent, rgba(${s.rgb},0.7), transparent)`,
                }}
              />
              <div
                aria-hidden="true"
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-56 h-28 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(ellipse, rgba(${s.rgb},0.16), transparent 70%)`,
                  filter: "blur(14px)",
                }}
              />

              <div className="flex items-center justify-between mb-8">
                <span
                  className="text-xs tracking-[0.14em] font-semibold"
                  style={{ color: s.accent }}
                >
                  {s.num}
                </span>
                <span
                  className="w-12 h-12 rounded-2xl grid place-items-center"
                  style={{
                    background: `rgba(${s.rgb},0.13)`,
                    boxShadow: `inset 0 1px 1px rgba(255,255,255,0.08), 0 0 24px rgba(${s.rgb},0.25)`,
                  }}
                >
                  <s.icon className="w-5 h-5" strokeWidth={1.6} style={{ color: s.accent }} />
                </span>
              </div>
              <h3 className="font-display font-medium text-2xl tracking-tight mb-4">{s.title}</h3>
              <p className="italic text-hero-sub/90 leading-7 mb-3">{s.problem}</p>
              <p className="text-foreground/60 text-sm leading-6 mb-6">{s.desc}</p>
              <div
                className="mt-auto rounded-2xl border border-dashed p-4 mb-6"
                style={{
                  borderColor: `rgba(${s.rgb},0.4)`,
                  background: `rgba(${s.rgb},0.06)`,
                }}
              >
                <span
                  className="block text-[10px] tracking-[0.18em] uppercase mb-1.5"
                  style={{ color: s.accent }}
                >
                  Salida concreta
                </span>
                <p className="text-sm text-foreground/90">{s.out}</p>
              </div>
              <a
                href={CAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-foreground transition-colors group"
              >
                {s.link}
                <ArrowUpRight
                  className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  style={{ color: s.accent }}
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
