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
- **Ritmo de la bajada (escritorio).** VI y VII: scroll normal. VIII entra como lámina cubriendo a VII (`.under` sticky + `.slide` opaca). IX: carrusel horizontal pinneado (un track con `translate3d`, la línea de proceso avanza con él, indicador "Paso n de 4" → "Compromisos"). X: scroll normal. XI entra como lámina cubriendo a X. Las `.under` tienen 30vh de aire abajo y solo se velan en el último 35% de la subida. Sticky solo mientras se pinnea (`.pinning`); cubiertas del todo → `.gone` (vuelven al flujo, `visibility:hidden`).
- **Celular.** Sin pines: scroll normal + reveals; IX es un carrusel táctil con `scroll-snap` que no atrapa el scroll vertical.
- **Posiciones de flujo.** Todo se calcula desde el final de `#story` sumando `offsetHeight` (ResizeObserver). Los anchors hacia una lámina fija la devuelven al flujo (`.measure`) solo durante el click.
- **Telón V → VI (escritorio).** `.plate` y `#bosque` se sostienen con la misma `translateY` mientras VI sube encima con su borde de 4 colores; un velo opaco (opacity) oscurece la placa. tree.js congela el canvas apenas empieza el telón.
- **Índice.** motion.js sigue creando el rail y el contador de la nav, pero el CSS los oculta (sin numerales de lámina); en celular queda solo el filete de progreso de la nav.
- **Texto.** Sin entradas por sección (se quitaron en sept. 2026: eran el movimiento por defecto). El único movimiento no pedido es el titular del hero, en CSS dentro de `index.html`. motion.js solo vuelve a medir cuando cargan las fuentes.
- **Lenis + GSAP.** Un solo rAF: `gsap.ticker.add(t => lenis.raf(t * 1000))` y `window.__lenisTicker = true` (tree.js deja su loop de Lenis). `lenis.on('scroll', ScrollTrigger.update)`.
- **Rendimiento.** Solo se anima transform y opacity. `v2/stars.png` ya no se usa como fondo (la escena dibuja su propio cielo; debajo, papel). Nav sin backdrop-filter. Animaciones infinitas del hero en pausa con `html.hero-off`. Placa oculta cuando la escena ya pasó (`html.story-off`).

## tree.js: política de render

Se inicializa después de `load`, en `requestIdleCallback` (la placa muestra su fondo y el canvas entra con fundido: `html.tree-ready`). Bloom en todo I–V (escritorio y celular) a media resolución (intensidad .6, umbral .35) dentro de la calidad adaptativa; si el fps real no alcanza, el adaptativo lo apaga y compensa (rim y bands ×1,8, exposición 1,15). La copa pasa a violeta→azul (`uCopa`); las raíces se limitan a #FF9A1F. En celular, durante el hero el árbol se aleja y sube (~30svh) para que entren CTA y micro-texto. Congela el canvas al empezar el telón V → VI, con la pestaña oculta y fuera de pantalla; 30 fps sin scroll ni puntero. QA: `window.__T3` (`setLevel`, `renders`), `window.__noAQ` desactiva el adaptativo.
