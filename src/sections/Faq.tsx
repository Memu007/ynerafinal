import { Plus } from "lucide-react";

const FAQS = [
  {
    q: "¿Puedo contratarlos solo para IA, datos o seguridad?",
    a: "Sí. Cada área se trabaja por separado. Si el problema se beneficia de combinar disciplinas, lo proponemos; no es una condición para trabajar con nosotros.",
  },
  {
    q: "¿Cómo saben si vale la pena hacer el proyecto?",
    a: "Empezamos por el problema, no por la herramienta. En la primera conversación buscamos entender impacto, datos disponibles, riesgos y si tiene sentido avanzar.",
  },
  {
    q: "¿Trabajan con equipos chicos?",
    a: "Sí. Nuestros productos nacieron junto a profesionales independientes y PyMEs. El tamaño no define la oportunidad; el problema concreto sí.",
  },
  {
    q: "¿Cuánto cuesta?",
    a: "Depende del alcance y del punto de partida. Antes de cotizar, preferimos entender qué conviene resolver y qué no.",
  },
  {
    q: "¿Con quién voy a trabajar?",
    a: "Directo con Emiliano y Mariano. Sin capas comerciales entre el problema y quien lo va a resolver.",
  },
];

export default function Faq() {
  return (
    <section id="preguntas" className="relative py-28">
      <div className="max-w-3xl mx-auto px-8">
        <p className="reveal flex items-center gap-3 text-xs tracking-[0.22em] uppercase text-foreground/50 mb-6">
          <span className="pulse-dot" />
          Preguntas frecuentes
        </p>
        <h2 className="reveal font-display font-medium tracking-[-0.03em] leading-[1.05] text-4xl sm:text-5xl mb-12">
          Lo que preguntan <span className="text-brand-gradient">antes de empezar</span>.
        </h2>

        <div className="reveal border-t border-white/10" data-delay="1">
          {FAQS.map((f, i) => (
            <details key={f.q} className="group border-b border-white/10">
              <summary className="flex items-center gap-5 py-6 cursor-pointer list-none font-display font-medium text-lg tracking-tight hover:text-purple-300 transition-colors [&::-webkit-details-marker]:hidden">
                <span className="text-xs text-foreground/40 tracking-[0.1em]">
                  {String(i + 1).padStart(2, "0")}
                </span>
                {f.q}
                <span className="ml-auto shrink-0 w-7 h-7 rounded-full border border-white/15 grid place-items-center transition-transform duration-300 group-open:rotate-45 group-open:bg-purple-400/15">
                  <Plus className="w-3.5 h-3.5" />
                </span>
              </summary>
              <p className="pb-7 pl-12 pr-6 text-foreground/60 text-sm leading-7 max-w-[62ch]">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
