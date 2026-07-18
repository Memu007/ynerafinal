const STEPS = [
  {
    num: "01",
    title: "Escuchamos",
    desc: "Traés el problema. El trabajo empieza con una conversación, no con un pitch deck.",
  },
  {
    num: "02",
    title: "Diagnosticamos",
    desc: "Miramos impacto, datos y riesgos. Si no vale la pena, te lo decimos antes de cobrar.",
  },
  {
    num: "03",
    title: "Construimos",
    desc: "Con revisión humana y trazabilidad. Nada de cajas negras.",
  },
  {
    num: "04",
    title: "Operamos",
    desc: "Sale a producción y lo seguimos mejorando. Como Aira, CDI y ReservaYá.",
  },
];

export default function Proceso() {
  return (
    <section id="proceso" className="relative py-28">
      <div className="max-w-6xl mx-auto px-8">
        <p className="reveal flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-foreground/50 mb-6">
          <span className="pulse-dot" />
          Cómo trabajamos
        </p>
        <h2 className="reveal font-display font-medium tracking-[-0.03em] leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mb-16">
          El problema primero.
          <br />
          <span className="text-brand-gradient">La herramienta después</span>.
        </h2>

        <ol className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {STEPS.map((s, i) => (
            <li
              key={s.num}
              data-delay={String(i)}
              className="reveal liquid-glass rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1.5"
            >
              <span className="liquid-glass inline-block rounded-full px-3.5 py-1.5 text-[11px] tracking-[0.14em] text-foreground/80 mb-6">
                {s.num}
              </span>
              <h3 className="font-display font-medium text-xl tracking-tight mb-3">{s.title}</h3>
              <p className="text-foreground/60 text-sm leading-6">{s.desc}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
