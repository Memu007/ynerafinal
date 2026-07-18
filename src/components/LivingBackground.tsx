import { useEffect, useRef } from "react";
import bgNebula from "@/assets/bg-nebula.jpg";

/**
 * Fondo de marca: imagen estática con auroras (17KB, parallax sutil)
 * + constelación viva en canvas: nodos dispersos que se ENSAMBLAN en
 * una red conectada al bajar el scroll, y se dispersan al subir —
 * la IA "organizándose". Conecta con los fragmentos de la Y del hero.
 * Canvas 2D, sin blur runtime, respeta reduced-motion.
 */

// nodos de la red en colores de marca: índigo / violeta / ámbar
const PALETTE = ["99,102,241", "168,85,247", "252,211,77"];

type Particle = {
  hx: number; // posición "home" (ensamblada), fracción del viewport
  hy: number;
  sx: number; // deriva cuando está dispersa, fracción del viewport
  sy: number;
  r: number;
  color: string;
  delay: number; // escalonado del ensamblaje (efecto cascada)
  wobAmp: number; // deriva suave permanente: la red siempre está viva
  wobSpeed: number;
  wobPhase: number;
};

function buildParticles(w: number, h: number): Particle[] {
  const count = Math.round(Math.min(Math.max((w * h) / 24000, 36), 84));
  return Array.from({ length: count }, () => ({
    hx: 0.04 + Math.random() * 0.92,
    hy: 0.04 + Math.random() * 0.92,
    sx: (Math.random() - 0.5) * 0.9,
    sy: (Math.random() - 0.5) * 0.9,
    r: 1.2 + Math.random() * 1.8,
    color: PALETTE[Math.floor(Math.random() * PALETTE.length)],
    delay: Math.random() * 0.55,
    wobAmp: 4 + Math.random() * 8,
    wobSpeed: 0.0004 + Math.random() * 0.0008,
    wobPhase: Math.random() * Math.PI * 2,
  }));
}

const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
const easeInOut = (v: number) =>
  v < 0.5 ? 2 * v * v : 1 - Math.pow(-2 * v + 2, 2) / 2;

export default function LivingBackground() {
  const imgRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // parallax sutil de la imagen de fondo
  useEffect(() => {
    const img = imgRef.current;
    if (!img) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? window.scrollY / max : 0;
        img.style.transform = `scale(1.12) translateY(${(-p * 5).toFixed(2)}%)`;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // constelación que se ensambla/desarma con el scroll
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: Particle[] = [];
    let w = 0;
    let h = 0;
    let lastW = 0;
    // maxScroll cacheado: leer scrollHeight por frame puede forzar reflows
    let maxScroll = 1;
    const measureScroll = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    };

    const resize = () => {
      // DPR cappeado en 1.5: puntos y líneas suaves no necesitan más;
      // a 2x el raster del canvas full-screen cuesta ~80% más
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // re-randomizar solo si cambia el ANCHO: en mobile la barra de URL
      // dispara resize de alto en pleno scroll y las partículas "saltaban"
      if (w !== lastW) {
        particles = buildParticles(w, h);
        lastW = w;
      }
    };

    const scrollProgress = () => clamp01(window.scrollY / maxScroll);

    const draw = (t: number, time: number) => {
      ctx.clearRect(0, 0, w, h);
      const th = Math.min(w, h) * 0.16; // distancia máxima de conexión
      const pts = particles.map((p) => {
        // progreso propio del nodo (escalonado): 0 = disperso, 1 = ensamblado
        const e = easeInOut(clamp01(t * 1.55 - p.delay));
        const spread = 1 - e;
        const wob = p.wobAmp * (0.4 + spread);
        return {
          x: (p.hx + p.sx * spread) * w + Math.cos(time * p.wobSpeed + p.wobPhase) * wob,
          y: (p.hy + p.sy * spread) * h + Math.sin(time * p.wobSpeed * 1.3 + p.wobPhase) * wob,
          r: p.r,
          color: p.color,
          e,
        };
      });

      // conexiones: solo aparecen entre nodos ya ensamblados
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 > th * th) continue;
          const strength = (1 - Math.sqrt(d2) / th) * Math.min(a.e, b.e);
          if (strength <= 0.01) continue;
          ctx.strokeStyle = `rgba(${a.color},${(strength * 0.3).toFixed(3)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }

      // nodos: tenues al dispersarse, plenos al ensamblarse
      for (const p of pts) {
        ctx.fillStyle = `rgba(${p.color},${(0.18 + 0.6 * p.e).toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    measureScroll();
    // el alto del contenido cambia al cargar imágenes/fuentes: re-medir sin leer por frame
    const ro = new ResizeObserver(measureScroll);
    ro.observe(document.body);

    if (reduced) {
      // sin movimiento: red ya ensamblada, estática
      draw(1, 0);
      const onResize = () => {
        resize();
        draw(1, 0);
      };
      window.addEventListener("resize", onResize);
      return () => {
        window.removeEventListener("resize", onResize);
        ro.disconnect();
      };
    }

    window.addEventListener("resize", resize);

    let raf = 0;
    let cur = scrollProgress();
    const loop = (time: number) => {
      const target = scrollProgress();
      cur += (target - cur) * 0.08; // suavizado: la red se arma con "peso"
      draw(cur, time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, []);

  return (
    <div aria-hidden="true" className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      <img
        ref={imgRef}
        src={bgNebula}
        alt=""
        loading="eager"
        decoding="async"
        className="w-full h-full object-cover"
        style={{ transform: "scale(1.12)", willChange: "transform" }}
      />
      {/* constelación que se ensambla con el scroll */}
      <canvas ref={canvasRef} className="absolute inset-0" />
    </div>
  );
}
