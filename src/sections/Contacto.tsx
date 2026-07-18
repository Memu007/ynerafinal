import { ArrowUpRight } from "lucide-react";

const CAL_URL = "https://cal.com/ynera/30min";
const WA_URL = "https://wa.me/5491100000000";

export default function Contacto() {
  return (
    <section id="contacto" className="relative pt-8 pb-32">
      <div className="max-w-6xl mx-auto px-8">
        <div className="reveal liquid-glass-strong rounded-[2.5rem] relative overflow-hidden text-center px-8 py-20 sm:py-24">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-[-20%] bottom-[-55%] h-[340px]"
            style={{
              background:
                "radial-gradient(ellipse at 50% 100%, rgba(168,85,247,0.22), transparent 70%)",
            }}
          />
          <p className="flex items-center justify-center gap-3 text-xs tracking-[0.22em] uppercase text-foreground/50 mb-6">
            <span className="pulse-dot" />
            Mesa de entrada
          </p>
          <h2 className="font-display font-medium tracking-[-0.03em] leading-[1.05] text-4xl sm:text-5xl lg:text-6xl mb-6">
            Contanos tu caos.
            <br />
            Lo convertimos en <span className="text-brand-gradient">sistema</span>.
          </h2>
          <p className="text-hero-sub/80 text-lg leading-8 max-w-xl mx-auto mb-10">
            Un dato que no llega, una operación expuesta o un proceso que te roba horas.
            Venís por una cosa o por las tres.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-7">
            <a
              href={CAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary px-[29px] py-[24px] text-base"
            >
              Agendá 30 minutos
              <ArrowUpRight className="w-5 h-5" />
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hero-secondary px-7 py-[24px] text-base"
            >
              Escribinos por WhatsApp
            </a>
          </div>
          <p className="text-[11px] tracking-[0.14em] uppercase text-foreground/40">
            sin compromiso · te decimos si podemos ayudarte — y si no, también
          </p>
        </div>
      </div>
    </section>
  );
}
