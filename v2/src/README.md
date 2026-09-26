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

- **Progressive enhancement.** Agrega `html.motion` (y `stack`, `curtain` en escritorio) solo al arrancar. Todo estado oculto está en CSS bajo esas clases. Con `prefers-reduced-motion` no agrega nada: queda solo el índice de láminas, estático. Si la inicialización falla, quita las clases y deja todo visible.
- **Láminas apiladas (VI–XI).** Cada `.sec` es `position: sticky` con `top = min(0, 100vh − alto)`: se lee entera y recién cuando su borde inferior toca el pie de pantalla queda fija mientras la siguiente sube encima (borde superior de 1px con el color del servicio). La de abajo se escala a 0,94, se vela y muestra un filete hueso con esquinas redondeadas. Cuando queda tapada del todo pasa a `.gone` (vuelve al flujo) para no seguir pintándose ni engañar a los IntersectionObserver de la barra móvil. En celular: sin escala ni recorte, solo el velo.
- **Posiciones de flujo.** Como las láminas fijas/escaladas mienten en `getBoundingClientRect`, todo se calcula desde el final de `#story` sumando `offsetHeight` (se remide con ResizeObserver: FAQ abierta, resultado del test, fuentes). Los anchors que apuntan dentro de una lámina la devuelven al flujo (`.measure`) solo durante el click para que el `lenis.scrollTo(el)` de tree.js mida bien.
- **Telón V → VI (escritorio).** Mientras la Lám. VI sube, `.plate` se compensa con `translateY` para que el bosque quede quieto, y `.plate-in` se aleja (0,94), se apaga y se recorta como placa. No se transforma `#story` ni sus ancestros; tree.js sigue midiendo el progreso igual.
- **Índice.** Rail fijo a la derecha (≥ 1024px) I–XI; activo con su color y un trazo que crece; click → `lenis.scrollTo`. Debajo de 1024px: filete de progreso en la nav; debajo de 981px además "VII / XI".
- **Texto.** H2 por renglones desde máscara (split propio por renglón medido, se rehace en resize y al cargar fuentes), etiquetas de lámina con filete que crece + mono tipeado + latín que sube, párrafos y listas en cascada (IntersectionObserver por lotes, 80 ms entre ítems), pasos que cuentan 00 → 0n. Paneles II–V: misma gramática al entrar y se desvanecen al salir (ScrollTrigger scrub, cuando el texto ya pasó la mitad superior).
- **Microinteracciones.** Relleno que crece desde la izquierda (hueso → ámbar / línea → hueso), flecha que avanza, subrayado que se dibuja, magnetismo corto solo en el CTA principal (hero y su eco en el cierre, puntero fino), fichas de casos con inclinación ≤ 1,5° y brillo que sigue al puntero.
- **Lenis + ScrollTrigger.** `lenis.on('scroll', ScrollTrigger.update)`. No se agrega `lenis.raf` al ticker de GSAP: tree.js ya lo llama en su loop.
