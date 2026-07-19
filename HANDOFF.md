# Ynera — Handoff

## Contenido
- `Ynera.dc.html` — página completa (una sola landing, self-contained salvo assets/fuentes).
- `support.js` — runtime necesario para abrir el `.dc.html` en el navegador.
- `src/assets/` — imágenes:
  - `logo.png` — logo/isotipo Ynera (28–32px en uso).
  - `bg-nebula.jpg` — fondo nebulosa fijo.
  - `brand-caos` / `brand-trabajo` / `brand-sistema` (`.avif` + `.webp` + `.jpg`) — escenas del hero.

## Cómo abrir
Abrir `Ynera.dc.html` en un navegador moderno. Requiere que `support.js` y `src/assets/` estén en las rutas relativas actuales.

## Estructura de secciones (orden)
Hero (scroll-scrub, 3 escenas) → Marquee → Servicios → Prueba (carrusel horizontal) → Proceso → Nosotros → FAQ → Contacto → Footer → wordmark grande.

## Sistema visual
- Fondo violeta muy oscuro (`--background: 260 87% 3%`), texto `40 6% 95%`.
- Fuentes: General Sans (fontshare) display + fallback system.
- Gradiente arcoíris (`.text-brand-gradient`) SOLO en hero ("real") y CTA final ("el tuyo").
- Emphasis de secciones: `.text-em` (violeta plano `#c9a4ff`).
- Secciones post-hero apiladas como láminas sticky (`.stack-card`).

## Pendientes antes de producción
1. Reemplazar el placeholder de WhatsApp `WA_URL` (5491100000000) por el número real.
2. Fotos reales de Emiliano y Mariano en Nosotros — hoy son marcos monograma (E/M) listos para foto; reemplazar el `<div>` por `<img>` dentro del marco de 84×84 con `border-radius: 1.25rem`.
3. Verificar el link de agenda (`https://cal.com/ynera/30min`) y LinkedIn del equipo.
