# Fuentes de v2

Dos bundles, ambos compilados con esbuild a un IIFE minificado. Los `.js` de `v2/` son el resultado; se editan solo las fuentes de esta carpeta.

| Fuente | Salida | Qué es |
|---|---|---|
| `tree.src.js` | `v2/tree.js` | Escena 3D del árbol (three.js) + scroll con peso (Lenis). Expone `window.__lenis`. |
| `motion.src.js` | `v2/motion.js` | Capa de movimiento debajo del hero (GSAP + ScrollTrigger + CustomEase). |

## Build

En un directorio de build con npm (fuera del repo):

```sh
npm i three@0.169.0 lenis@1.1.20 esbuild@0.24.0 gsap@3.12.5
cp v2/src/tree.src.js v2/src/motion.src.js <build>/
cd <build>
npx esbuild tree.src.js   --bundle --minify --format=iife --target=es2019 --outfile=<repo>/v2/tree.js
npx esbuild motion.src.js --bundle --minify --format=iife --target=es2019 --outfile=<repo>/v2/motion.js
```

`index.html` carga `tree.js` y después `motion.js`, los dos con `defer` (el orden importa: motion.js lee `window.__lenis`).

## motion.js en una línea por pieza

- **Progressive enhancement.** Agrega `html.motion` (y `pins`, `carousel` en escritorio) solo al arrancar. Todo estado oculto está en CSS bajo esas clases. Con `prefers-reduced-motion` no agrega nada: queda solo el índice de láminas, estático. Si la inicialización falla, quita las clases y deja todo visible.
- **Ritmo de la bajada (escritorio).** VI y VII: scroll normal. VIII entra como lámina cubriendo a VII (`.under` sticky + `.slide` opaca). IX: carrusel horizontal pinneado (un track con `translate3d`, la línea de proceso avanza con él, indicador "Paso 0n / 04" → "Compromisos"). X: scroll normal. XI entra como lámina cubriendo a X. Las `.under` tienen 30vh de aire abajo y solo se velan en el último 35% de la subida. Sticky solo mientras se pinnea (`.pinning`); cubiertas del todo → `.gone` (vuelven al flujo, `visibility:hidden`).
- **Celular.** Sin pines: scroll normal + reveals; IX es un carrusel táctil con `scroll-snap` que no atrapa el scroll vertical.
- **Posiciones de flujo.** Todo se calcula desde el final de `#story` sumando `offsetHeight` (ResizeObserver). Los anchors hacia una lámina fija la devuelven al flujo (`.measure`) solo durante el click.
- **Telón V → VI (escritorio).** `.plate` y `#bosque` se sostienen con la misma `translateY` mientras VI sube encima con su borde de 4 colores; un velo opaco (opacity) oscurece la placa. tree.js congela el canvas apenas empieza el telón.
- **Índice.** Rail fijo a la derecha (≥ 1024px); en celular "VII / XI" en la nav + filete de progreso.
- **Texto.** H2 por renglones desde máscara, etiquetas con fundido + 40%, párrafos y listas en cascada de 60 ms en orden del DOM (máx. 0,4 s de retraso).
- **Lenis + GSAP.** Un solo rAF: `gsap.ticker.add(t => lenis.raf(t * 1000))` y `window.__lenisTicker = true` (tree.js deja su loop de Lenis). `lenis.on('scroll', ScrollTrigger.update)`.
- **Rendimiento.** Solo se anima transform y opacity. Estrellas: una imagen (`v2/stars.png`, generada con un script determinístico de canvas) como fondo del body. Nav sin backdrop-filter. Animaciones infinitas del hero en pausa con `html.hero-off`. Placa oculta cuando la escena ya pasó (`html.story-off`).

## tree.js: política de render

Bloom solo con el hero en pantalla (p < .12), en escritorio y si el nivel adaptativo lo permite; sin bloom sube el brillo propio del árbol (`uGlow` 1,35 y exposición 1,08). Congela el canvas al empezar el telón V → VI, con la pestaña oculta y fuera de pantalla; baja a 30 fps sin scroll ni puntero. `progress()` usa la posición cacheada de `#story` + `lenis.scroll` (sin getBoundingClientRect por cuadro). QA: `window.__T3` (`setLevel`, `renders`) y `window.__noAQ` desactiva la calidad adaptativa.
