# Handoff — Ynera

Guía completa para levantar, modificar y deployar el proyecto.

---

## 1. Qué es esto

Sitio de Ynera (consultoría de IA, datos y seguridad para PyMEs). Una sola página con:

- **Hero cinematográfico**: 3 escenas con scroll-scrub (Caos → Trabajo → Sistema) con la Y de marca, cierre "IA real" + CTA.
- **Marquee**: logos de los 3 sistemas (Aira, CDI, ReservaYá) como sección propia.
- **Servicios**: 3 tarjetas con color por familia (Datos cyan, Seguridad violeta, IA ámbar).
- **Prueba**: carrusel — scroll-scrub en desktop, swipe nativo con snap en mobile.
- **Proceso, Nosotros, FAQ, Contacto, Footer**.
- **Fondo vivo**: auroras (imagen estática) + fragmentos geométricos + Ys fantasma que se forman/deforman.
- **Scroll con imán suave** (encaje al detenerte cerca de una sección).

## 2. Stack

- React 19 + TypeScript + Vite
- Tailwind CSS 3.4 + shadcn/ui (componentes en `src/components/ui/`)
- Tipografías: Geist Sans (`@fontsource/geist-sans`, cuerpo) + General Sans (Fontshare, display)

## 3. Levantar el proyecto

```bash
npm ci            # instalar dependencias (usa package-lock.json)
npm run dev       # desarrollo → http://localhost:5173
npm run build     # build de producción → dist/
npm run preview   # sirve el build local
```

Node 20+ recomendado.

## 4. Deploy en Railway

El proyecto ya está configurado:

- `railway.json` → build `npm ci && npm run build`, start `npm start`
- `nixpacks.toml` → Node 20
- `serve` (en dependencies) sirve el `dist/` estático

**Pasos:**

1. Subí este repo a GitHub (`Memu007/ynera4`).
2. En [railway.app](https://railway.app): *New Project* → *Deploy from GitHub repo* → elegí `ynera4`.
3. Railway detecta todo solo. Sin variables de entorno.
4. Te da una URL `*.up.railway.app` — podés conectar tu dominio propio después.

**Alternativa con CLI:**
```bash
npm i -g @railway/cli
railway login
railway link   # o railway init
railway up
```

## 5. Estructura del código

```
src/
├── App.tsx                      # ensambla todo + hooks (reveal, scroll-snap)
├── index.css                    # variables de tema, liquid-glass, keyframes, fondo
├── main.tsx
├── assets/
│   ├── logo.png                 # monograma Y de cristal (256px)
│   ├── bg-nebula.jpg            # auroras del fondo (17KB, estática)
│   └── brand-{caos,trabajo,sistema}.{avif,webp,jpg}   # 3 escenas del hero
├── components/
│   ├── LivingBackground.tsx     # fondo: auroras + fragmentos + Ys fantasma
│   └── ui/                      # shadcn/ui (no tocar salvo necesidad)
├── hooks/
│   ├── useReveal.ts             # fade-in de secciones al entrar al viewport
│   └── useScrollSnap.ts         # imán suave de scroll
│   └── use-mobile.ts
├── lib/utils.ts                 # cn() de shadcn
└── sections/
    ├── Hero.tsx                 # hero cinematográfico (scroll-scrub, 3 escenas)
    ├── Marquee.tsx              # marquee de sistemas
    ├── Servicios.tsx            # 3 tarjetas con color por familia
    ├── Prueba.tsx               # carrusel (desktop scroll-scrub / mobile swipe)
    ├── Proceso.tsx              # 4 pasos
    ├── Nosotros.tsx             # Emiliano + Mariano
    ├── Faq.tsx                  # acordeón
    ├── Contacto.tsx             # CTA final
    └── Footer.tsx               # footer con reloj de Buenos Aires
```

## 6. Sistema de marca

| Token | Valor | Uso |
|---|---|---|
| Fondo | `260 87% 3%` (HSL) | azul-violeta profundo |
| Texto | `40 6% 95%` | off-white |
| Gradiente marca | indigo `#6366f1` → violeta `#a855f7` → ámbar `#fcd34d` | titulares, "IA real" |
| Datos / Aira | cyan `#22d3ee` | tarjetas, acentos |
| Seguridad / CDI | violeta `#a855f7` | tarjetas, acentos |
| IA / ReservaYá | ámbar `#fcd34d` | tarjetas, acentos |

- Tipografía display: **General Sans** (`font-display`)
- Tipografía cuerpo: **Geist Sans**
- Utilidad `.liquid-glass` y `.liquid-glass-strong` para el efecto vidrio

## 7. Cosas a saber / dónde tocar

- **Copy de las escenas del hero**: array `SCENES` en `src/sections/Hero.tsx`.
- **Colores de tarjetas**: `accent` y `rgb` en `SERVICES` (Servicios.tsx) y `PROJECTS` (Prueba.tsx).
- **Velocidad del scroll-scrub**: alturas `330vh` (Hero) y `280vh` (Prueba) — más alto = más lento.
- **Ys fantasma del fondo**: array `GHOST_YS` en `LivingBackground.tsx` (posición, tamaño, timing).
- **Imán de scroll**: `useScrollSnap.ts` — umbral de velocidad y distancia de snap.
- **Links de Cal.com y WhatsApp**: constantes `CAL_URL` / `WA_URL` en las secciones. **Actualizar `WA_URL` con el número real** (hoy es placeholder `5491100000000`).

## 8. Pendientes (cuando tengan contenido real)

- Reemplazar avatares E/M en Nosotros por fotos reales.
- Agregar testimonios / métricas de los 3 sistemas.
- Actualizar `WA_URL` (WhatsApp) y revisar el link de Cal.com.
