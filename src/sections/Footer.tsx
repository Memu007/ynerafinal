import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export default function Footer() {
  const [time, setTime] = useState("--:--");

  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("es-AR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "America/Argentina/Buenos_Aires",
    });
    const update = () => setTime(fmt.format(new Date()));
    update();
    const id = setInterval(update, 30000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-white/10 py-9">
      <div className="max-w-6xl mx-auto px-8 flex flex-wrap items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-3" aria-label="Ynera — inicio">
          <img src={logo} alt="Ynera" className="h-7 w-7" />
          <span className="font-display font-semibold tracking-tight text-foreground">Ynera</span>
        </a>
        <p className="text-foreground/60 text-sm">Software que sigue trabajando cuando nos vamos.</p>
        <p className="text-[11px] tracking-[0.14em] uppercase text-foreground/40">
          © 2026 · Buenos Aires · {time} ART · sin cookies de tracking
        </p>
      </div>
    </footer>
  );
}
