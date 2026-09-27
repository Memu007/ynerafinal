# Ynera · Código de marca

Versión 1.0 · septiembre 2026 · Buenos Aires
Archivos de esta carpeta: `ynera-simbolo.svg` (plano, `currentColor`), `ynera-simbolo-color.svg` (degradé), `ynera-favicon.svg` (≤32 px).

Cómo leer este documento: cada regla trae su **por qué** en una línea. Si una regla no tiene porqué, sobra. Si algo del sitio o de una pieza no se puede justificar con este código, se saca.

---

## 1. Plataforma

**Propósito.** Que una PyME o un profesional tenga sistemas que funcionen sin depender de nosotros.
*Por qué:* es lo que ya pasa con Aira, CDI y ReservaYá; no es una aspiración, es un hecho que se puede mostrar.

**Posicionamiento.** Para PyMEs y profesionales que necesitan ordenar datos, protegerse y usar IA sin tercerizar el criterio, Ynera es la consultora de dos socios que diseña, construye y opera el sistema completo, porque ya lo hizo con tres productos propios en producción.
*Por qué:* el diferencial no es "datos + seguridad + IA" (lo dicen todos), es "lo construimos y lo operamos nosotros".

**Personalidad.**

| Somos | No somos | Por qué |
|---|---|---|
| Constructores | Consultores de diapositivas | "Construimos antes de aconsejar": la prueba va antes que la opinión. |
| Precisos | Técnicos por ostentación | El cliente es una PyME: la precisión se nota en el resultado, no en la jerga. |
| Serenos | Entusiastas de la IA | Premium sobrio: la calma es señal de control; el hype es señal de venta. |
| Cercanos | Informales | Dos socios que atienden directo, con criterio de estudio, no de agencia. |

**Promesa.** Software que sigue trabajando cuando nos vamos.
*Por qué:* es la frase más concreta y verificable que tienen; todo lo demás la sostiene.

---

## 2. Concepto rector: **la bifurcación**

Todo sale de una idea: **un sistema sano crece como un árbol, desde un punto donde algo se divide en dos y sigue siendo uno.**

- **Logo:** la Y es esa bifurcación. Un tronco, dos ramas. *Por qué:* es lo único del nombre que ya tiene forma de árbol; no hay que inventar metáfora.
- **Socios:** "Dos ramas, un mismo tronco". Emiliano (seguridad) y Mariano (datos) son los brazos; Ynera es el tronco. *Por qué:* explica la dupla sin foto ni organigrama.
- **Servicios:** raíces = datos (ámbar), corteza = seguridad (violeta), copa = IA (azul), bosque = sistemas en producción. *Por qué:* le da a cada servicio un lugar físico y un color, y el color se vuelve código en toda la marca.
- **Web:** la escena 3D es el logo creciendo. Lámina I la Y es semilla; Lámina V es bosque. *Por qué:* el visitante ve la marca antes de leerla; el logo no es un adorno de la nav, es el protagonista.

Regla de coherencia: **el orden vertical del color es siempre el del árbol.** Ámbar abajo, violeta en el medio, azul arriba. Nunca al revés. *Por qué:* es la única forma de que el degradé signifique algo en lugar de decorar.

---

## 3. Logo

### 3.1 Significado
- **Tronco:** la empresa, una sola base. Base recta = suelo, apoyo.
- **Bifurcación:** el punto donde un problema se abre en caminos (texto del hero). Es donde empieza el trabajo.
- **Dos brazos iguales:** dos socios, mismo peso. *Por qué simétrico:* ninguno de los dos es "el principal".
- **Puntas redondas:** brotes, algo que sigue creciendo. *Por qué:* la única concesión orgánica en un dibujo geométrico; distingue la Y de cualquier Y tipográfica.

### 3.2 Crítica honesta del logo actual (`src/assets/logo.png` y renders `brand-*.jpg`)

| Prueba | Resultado | Por qué importa |
|---|---|---|
| Tamaño chico (16–26 px, nav y favicon) | **Falla.** A 16 px el brillo y los reflejos se vuelven una mancha violeta; la bifurcación se lee pero el volumen ensucia. | El 80 % de las veces el logo se ve a menos de 40 px. |
| Blanco y negro / un color | **Falla.** Pasado a una tinta, los reflejos aparecen como agujeros blancos; no hay versión plana. | Sello, factura, grabado, fax de aduana (CDI), bordado: todos son una tinta. |
| LinkedIn / WhatsApp (avatar circular) | Pasable, pero el recorte circular corta el brillo y el fondo transparente queda gris. | Es el canal principal de venta B2B en Argentina. |
| Archivo | **Falla.** PNG 256 × 256 con paleta indexada de 8 bits. No escala, no se edita. | No se puede imprimir ni ampliar para un deck. |
| Color | **Contradice la narrativa.** El ámbar está en la punta del brazo derecho (arriba). En el código, ámbar = raíz = abajo. Los renders `brand-trabajo.jpg` y `brand-sistema.jpg` repiten el error. | Si el color no respeta el árbol, la historia de la web queda como decoración. |
| "Premium sobrio" | **No.** Vidrio/plástico brillante con degradé tipo ícono de app es el lenguaje de 2021 de las apps de consumo y de los generadores de imagen. | Una consultora que maneja seguridad y datos sensibles no puede verse como una app de juegos. |
| Renders de marca (caos, trabajo, sistema) | Estéticos pero genéricos: se reconocen como imagen generada ("vidrio líquido + partículas"). | Cualquiera puede tener esa imagen mañana; no es un activo propio. |

**Veredicto:** la **idea** (Y como bifurcación) se mantiene; el **dibujo** se reemplaza. **Redibujar**, no refinar: el problema no es de ajuste, es que no existe una versión plana.

### 3.3 Símbolo nuevo: construcción
Archivo maestro: `ynera-simbolo.svg` (viewBox 96 × 96). Módulo **w = 12** (ancho de trazo).

- **Tronco:** vertical, ancho 1w, alto 3,5w. Base cortada recta (suelo).
- **Bifurcación:** los ejes de los brazos parten del tope del tronco.
- **Brazos:** ancho 1w, largo 3,33w (medido en el eje), a **±40° del eje vertical** (80° de apertura). *Por qué 40°:* abre lo suficiente para leerse como rama y como Y a 16 px; más cerrado se lee como "V sobre palo", más abierto como "T".
- **Puntas:** semicírculo de radio w/2. *Por qué:* brote; y evita que el símbolo sea una Y de fuente cualquiera.
- **Horqueta interior:** en ángulo vivo (sin redondeo). *Por qué:* la precisión de la marca está en el corte; lo orgánico queda solo en las puntas.
- **Proporción total:** 5,3w de ancho × 6,55w de alto. Centrado ópticamente en el cuadrado.
- **Una sola forma cerrada** (un `path`), sin trazos. *Por qué:* se puede grabar, bordar, cortar en vinilo y exportar a cualquier formato sin sorpresas.

### 3.4 Versiones
| Versión | Archivo | Uso |
|---|---|---|
| Símbolo plano monocromo | `ynera-simbolo.svg` (`fill="currentColor"`) | **Versión por defecto.** Footer, documentos, sello, una tinta. Luz sobre tinta o tinta sobre papel liquen. |
| Símbolo con degradé | `ynera-simbolo-color.svg` | Solo donde el símbolo está solo y es protagonista: avatar, favicon, portada de deck, lámina de cierre. |
| Favicon | `ynera-favicon.svg` | ≤ 32 px. Trazo reforzado (w = 16, brazos más cortos) sobre cuadrado noche redondeado. Exportar también PNG 32, 180 (apple-touch) y 512. |
| Wordmark | `ynera-wordmark.svg` | **Ynera** en caja baja de Piazzolla (peso 700, tamaño óptico 30), −1 % con el kerning de la fuente, vectorizado a curvas (`currentColor`). En la web se compone en vivo con la misma receta (ver §5.5). |
| Lockup vertical (preferido) | a armar | Símbolo arriba, wordmark centrado abajo. Altura de mayúscula del wordmark = 0,45 × alto del símbolo. Separación = 1,5w. Portada de deck, sello, pie de documento. |
| Lockup horizontal | a armar | Símbolo a la izquierda, base del tronco sobre la línea de base del texto, alto del símbolo = 1,2 × altura de mayúscula, separación = 2,5w. Solo cuando no entra el vertical. |

**Aviso sobre el lockup horizontal:** símbolo Y + "Ynera" se lee "Y Ynera". Por eso la **firma principal en pantalla es el wordmark solo** y el símbolo va solo donde el espacio es cuadrado. El horizontal existe, pero es la tercera opción.

### 3.5 Resguardo y tamaños mínimos
- **Área de resguardo:** 2w alrededor del símbolo (2w = 1/4 del cuadrado de 96). En lockups, 2w medidos con el w del símbolo del lockup. *Por qué:* la bifurcación necesita aire para leerse como forma y no como letra.
- **Mínimos en pantalla:** símbolo plano 16 px (debajo de 24 px, usar `ynera-favicon.svg`); símbolo color 24 px; wordmark 14 px de alto de cuerpo / 60 px de ancho.
- **Mínimos impresos:** símbolo 5 mm; wordmark 16 mm de ancho; lockup vertical 14 mm de alto.

### 3.6 Usos incorrectos
1. Volver al brillo, vidrio, bisel, sombra 3D o reflejo. *Porque no escala y no es sobrio.*
2. Invertir el degradé (azul abajo, ámbar arriba) o hacerlo horizontal. *Porque rompe el orden del árbol.*
3. Agregar magenta, rosa, verde u otros colores al degradé. *Porque cada color es un servicio; un color sin servicio es ruido.*
4. Rotar, inclinar o deformar el símbolo. *Porque el tronco vertical es estabilidad.*
5. Cambiar el ángulo o el largo de los brazos, o hacer un brazo distinto del otro. *Porque son los dos socios, mismo peso.*
6. Poner el símbolo dentro de un círculo o escudo decorativo (salvo el recorte obligatorio de un avatar). *Porque el escudo es cliché de ciberseguridad.*
7. Usar el símbolo como letra dentro de una palabra ("Ynera" con el símbolo en lugar de la Y). *Porque las puntas redondas no conviven con la tipografía.*
8. Glow o neón alrededor del símbolo. *El brillo es de la escena 3D, no del logo.*
9. Símbolo en degradé sobre fondo claro o sobre foto. *Pierde contraste en la raíz ámbar; usar la versión plana.*

---

## 4. Color

> Rehecho en septiembre de 2026 (tercera pasada tipográfica, "sigue genérico"). La página dejó de ser un fondo casi negro con acentos saturados: ese es el default que hoy produce cualquier generador de landings oscuras. Si algo de acá choca con otra sección, manda esta.

### 4.1 Idea: la noche es la escena; el sistema es papel
La escena 3D es de noche porque cuenta lo que no se ve (raíces, corteza, copa en la oscuridad). Cuando termina (el telón V → VI), **la página pasa a papel**: el sistema a la luz, impreso, ordenado. Caos → sistema también en el color. La noche vuelve solo en el pie, como el suelo de donde salen las raíces.

### 4.2 Base (seis tokens)
| Token | Hex | Rol | Por qué este color |
|---|---|---|---|
| `--tinta` | `#17131F` | Texto sobre papel; fondo de la escena y del pie | Sale de la piedra de la isla (`#150f22` / `#2e2640` en tree.js). No es un negro genérico: es el color del suelo del árbol. |
| `--papel` | `#E3E5DD` | Papel de las secciones VI–XI | Liquen: gris verdoso frío, como el papel secante de un herbario. **No es crema** (el crema cálido con serif es otro default de IA) ni blanco. |
| `--papel-2` | `#D3D7CB` | Superficies que contienen algo: la lectura del test, la ficha del diagnóstico | Reemplaza bordes y filetes: una superficie se nota por su tono, no por una línea. |
| `--musgo` | `#1E4D3A` | Acción sobre papel: botón principal, selección | El musgo de la isla (`#1f5a41`). Lo que se hace crece del mismo suelo. 7,6:1 sobre papel. |
| `--luz` | `#EAE8EE` | Texto y botón principal sobre la noche | Blanco apenas frío, del cielo de la escena (antes hueso cálido `#E9E5D9`). 15:1 sobre tinta. |
| `--gris` | `#4E5249` | Texto secundario sobre papel (bajadas, respuestas, pies) | 6,3:1 sobre papel; 5,6:1 sobre papel-2. |

Secundario sobre la noche: `--luz-2` `#B9B5C4` (9,1:1). Filetes, solo donde separan objetos que se abren o se marcan (preguntas del FAQ, casillas del test): `rgb(23 19 31 / .16)`.

### 4.3 Las tres áreas: un color de noche y uno de día
| Área (parte del árbol) | Noche (dentro de la escena) | Día (sobre papel) | Contraste del de día |
|---|---|---|---|
| Datos (raíces) | `#FF9A1F` | `#8A4108` | 5,8:1 |
| Seguridad (corteza) | `#B25BFF` en la escena; `#C58BFF` en texto | `#6A2FB0` | 6,2:1 |
| IA aplicada (copa) | `#3F7BFF` en la escena; `#7FA4FF` en texto | `#2544C4` | 6,1:1 |

- En el CSS, `--root`, `--bark` y `--leaf` valen el color de día en `:root` y el de noche dentro de `.story`: el mismo `style="--c:var(--root)"` sirve en los dos mundos.
- **El color de área solo codifica el área**: términos de II–IV, casillas y medidores del test, el espécimen, las ramas de la dupla. Nunca decora.
- **Sin cian.** El cian `#27F0D2` era "vida/señal" y terminó decorando casos, checks y filetes. El bosque (productos) ya no tiene color propio; la acción es musgo.
- **Sin halos** (`box-shadow` de color alrededor de puntos, barras o nodos), **sin degradés decorativos** (el borde de cuatro colores de la VI y la línea de proceso en degradé se fueron). El degradé ámbar → violeta → azul queda solo en el símbolo color y en la escena.

### 4.4 Proporciones
- Escena (I–V): la ilustración manda; el texto va en luz sobre un velo de tinta.
- Papel (VI–XI): ~90 % papel y tinta, ~7 % musgo (botones, marcas de "incluye"), ~3 % color de área, y solo en el test y la dupla.
- Pie: tinta.

### 4.5 Accesibilidad
Todo texto ≥ 4,5:1 (ver tablas). El foco visible cambia con el fondo: luz sobre la noche, tinta sobre el papel (`--focus`). Nunca transmitir un dato solo por color: los medidores llevan nombre y porcentaje.

---

## 5. Tipografía

> Rehecha por tercera vez en septiembre de 2026. Historia de rechazos: Archivo condensada + Garamond itálica + Plex Mono ("AI slop"); una display dibujada por código ("amateur"); Source Serif 4 + Source Sans 3 compuesta con reglas de Bringhurst ("sigue genérico"). El problema de la última no era la composición sino la elección: una serif de libro correcta, neutral, con su sans de la misma casa, es la receta por defecto de "editorial sobrio". Ninguna de esas vuelve.

### 5.1 Familia: Piazzolla, sola
**Piazzolla** (Juan Pablo del Peral, Huerta Tipográfica, Buenos Aires, 2020; OFL). Variable en peso (100–900) y tamaño óptico (8–30), con itálica. Archivos: `fonts/piazzolla.woff2` (73 KB) y `fonts/piazzolla-italic.woff2` (78 KB), licencia en `fonts/OFL-piazzolla.txt`.

Por qué es de Ynera y no de cualquiera:
- **Es porteña.** La diseñó en Buenos Aires un estudio de Buenos Aires y lleva el nombre de Piazzolla. Una consultora de Buenos Aires puede contar de dónde sale su letra; no es una elección de catálogo.
- **Es de diario, no de lujo.** Se pensó para texto denso y pantallas: compacta, de ojo medio alto, firme en tamaños chicos. Premium sobrio, sin ornamento.
- **Tiene filo.** Los remates son cuñas facetadas; a peso alto el dibujo es angular, casi tallado, y se lleva con la Y geométrica del símbolo y con la idea de "sistema". A peso bajo se vuelve fina y abierta. Ese rango es lo que usamos.
- **El eje de peso permite que el titular haga lo que dice** (5.3), y el eje óptico permite una sola familia de 15 px (botones, cifras del test) a 100 px (titular).
- Trae cifras tabulares y de caja alta (`tnum`, `lnum`): no hace falta una mono ni una sans para las lecturas del test.

**Una sola familia** a propósito: el par "serif para leer + sans para la interfaz" es justo lo que el cliente rechazó dos veces. La diferencia de roles la hacen tamaño, peso y tamaño óptico.

Descartadas en esta pasada: Fraunces (ubicua en sitios generados), Newsreader y Literata (defaults editoriales), Young Serif y Gloock (display sin texto), Alegreya (argentina y buena, pero caligráfica y "de libro"), Montserrat (porteña, pero es el default por excelencia).

### 5.2 Escala (web)
Escala tradicional (Bringhurst): 16 · 18 · 21 · 24 · 36 · 48 · 60 · 72 · 96, interpolada con `clamp()`.

| Nivel | Tamaño (escritorio → celular) | Peso · interlínea · tracking |
|---|---|---|
| H1 hero | 100 → 39 px | 240 / 640 (ver 5.3) · .98 · −1,8 % |
| H2 de cierre ("Diagnóstico sin costo.") | 132 → 54 px | 280 · .94 · −2,5 % |
| H2 | 66 → 38 px (54 → 36 en la escena) | 560 · 1,02 · −1,2 %, espacio de palabra +5 % |
| H3 (personas, pasos, casos) | 28–46 px | 600–700 |
| Bajada (la frase debajo del H2) | 28 → 22 px | 320 · 1,28 · gris |
| Texto | 18 → 17 px | 400 · 1,55 · máx. 34 em ≈ 65 caracteres |
| Términos (`dt`, títulos de columna, "Tu lectura") | 17 px | 620, caja baja, color de área si corresponde |
| Interfaz (nav, botones, cifras) | 15–16 px | 500–620; cifras `lining-nums tabular-nums` |
| Wordmark | 25 px en la nav | 700 · −1 % · caja baja |

Piazzolla es de espaciado de palabra corto (diseño de diario): el texto lleva `word-spacing: .03em` y los títulos `.05em`. En títulos grandes, tracking levemente negativo porque el corte óptico 30 queda abierto a más de 60 px.

### 5.3 El titular es parte del diseño
"Menos planillas. Menos riesgo." va en **240** (fino: lo que se reduce). "Un negocio que sigue creciendo." va en **640** (con cuerpo: lo que crece). No es una palabra acentuada: el peso parte el titular en sus dos ideas.
Es también el **único movimiento no pedido de la página**: con JS, el titular arranca invertido (las dos primeras líneas gruesas, las dos últimas un hilo) y, cuando la escena termina de entrar (`tree-ready`, o a los 1,8 s), las primeras adelgazan y las últimas engordan (1,4–1,8 s, `cubic-bezier(.16,1,.3,1)`). Sin JS o con movimiento reducido se ve el estado final. El ancho de Piazzolla casi no cambia con el peso (±3 %), así que las líneas no se reacomodan durante la animación; en celular el cuerpo (9,9 vw) está calculado para que "Un negocio que sigue" entre en una línea.

### 5.4 Reglas
- **Nada en mayúsculas sostenidas ni versalitas espaciadas.** Ni etiquetas-ceja arriba de los títulos. Si un dato hace falta, va en una frase ("Te lleva dos minutos.").
- **Sin punto medio** para unir metadatos ("A · B · C"): se escribe con comas o con una frase.
- **Sin flechas** en botones ni links: el texto dice qué pasa ("Pedí tu diagnóstico sin costo", "Medilo en el test").
- **Números solo en secuencias reales:** los cuatro pasos ("Paso 1" … "Paso 4"). Nada de 01/02/03, ni "Lám. I–XI", ni contadores en la lista del test.
- **Itálica** solo para lo que por convención va en itálica: el nombre científico *Ynera bifurcata*, los rubros de los casos, el área entre paréntesis de los medidores, los rótulos de la escena.
- **Cifras:** elzevirianas en el texto, de caja alta en títulos y tabulares de caja alta en porcentajes y contadores.
- **Microtipografía en español:** ¿ ¡ siempre; raya para incisos, semirraya para rangos; espacio de no separación entre número y unidad ("30&nbsp;minutos"); `hyphens: auto` solo en celular; `hanging-punctuation` donde se soporte; `text-wrap: balance` en títulos y `pretty` en párrafos.
- **Autoalojada**, subset latín + español (U+20–7E, U+A0–FF, ı, Œœ, comillas, rayas, primas, €, ™, flechas, ✓), todas las features OpenType conservadas. **El subset conserva el hinting y la tabla `prep`** (`options.hinting = True`): sin ellas FreeType espacia mal el texto chico ("pr oblema"). Se precarga la redonda.

### 5.5 Wordmark
"Ynera" en Piazzolla 700, tamaño óptico 30, caja baja, −1 %, con el kerning de la fuente, vectorizado (`brand/ynera-wordmark.svg`, `currentColor`). En la web se compone en vivo con la misma receta. En la nav va **solo el wordmark** (el lockup horizontal se lee "Y Ynera", ver 3.4).

**Archivadas:** Ynera Furca (`src/tipografia/`), Source Serif 4 / Source Sans 3 (se borraron sus woff2 y licencias de `fonts/`).

## 6. Dirección de arte e imagen

### 6.1 La escena 3D: "lámina botánica nocturna"
Referente: láminas de herbario del siglo XIX, pero de noche y con bioluminiscencia. El espécimen es *Ynera bifurcata*. La lámina ya no se numera (se quitaron "Lám. I–XI", los nombres latinos por parte y las coordenadas): la escena lleva un **pie de figura** abajo a la derecha con el nombre de la especie en itálica y la parte que se está viendo con su área ("Raíces: los datos"). Es información, no cromo. Debajo de la escena, cada sección es una lámina impresa de verdad: papel liquen y tinta (§4.1).

On-brand:
- Noche azul-negra, estrellas pequeñas y frías.
- Luz que sale **de adentro** del objeto (savia ámbar en raíces, anillos violetas en corteza, nodos azules en copa, pasto cian). *Por qué:* el sistema está vivo por dentro; no lo ilumina un reflector de marketing.
- Isla flotante como "maceta" del espécimen: aislado para estudiarlo.
- Rótulos de la escena en itálica de Piazzolla, sobre un velo de tinta, sin borde ni versalitas. *Por qué:* es un pie de lámina, no un HUD de videojuego.
- La Y del hero con la **misma geometría del símbolo** (brazos a 40°).

Off-brand:
- Robots, cerebros, circuitos en forma de cerebro, manos humanas tocando manos robot, candados, escudos, código verde tipo Matrix. *Por qué:* es el banco de imágenes de todas las consultoras de IA; nos iguala.
- Neón gamer, magenta/rosa saturado, glitch, líneas de escaneo, vaporwave.
- Vidrio líquido y partículas generadas (los renders `brand-*.jpg`). Se archivan.
- Cielo violeta saturado. El violeta es corteza, no atmósfera.
- Ámbar en puntas de ramas o en la copa. El ámbar vive bajo tierra.

### 6.2 Fotografía de los socios
- **Luz:** una sola fuente lateral cálida (ventana o lámpara), fondo oscuro sin textura o pared de hormigón/madera en penumbra. *Por qué:* continúa la noche de la escena y da seriedad sin frialdad corporativa.
- **Encuadre:** medio cuerpo o busto, de frente o tres cuartos, mirando a cámara, sin sonrisa de catálogo. Los dos con la **misma** luz, lente (50–85 mm) y encuadre. *Por qué:* "mismo tronco": son pares.
- **Ropa:** lisa, oscura o neutra; sin logos.
- **Color:** tratamiento levemente desaturado y cálido; nada de filtros de color de marca sobre la cara.
- **Prohibido:** foto con notebook mostrando código, brazos cruzados de "experto", fondo de oficina coworking, pulgar arriba, retrato con IA.
- **Recorte web:** cuadrado, **sin radio** (lámina), filete 1px `--rule-2`. Una foto "de trabajo" opcional por socio (en su escritorio, manos, papeles), en blanco y negro.

### 6.3 Iconografía
- Preferir **no usar íconos**: un punto de color (`.key::before`) + palabra alcanza. *Por qué:* los íconos genéricos de "base de datos / candado / cerebro" son exactamente lo que evitamos.
- Si hace falta: trazo 1,5px, esquinas rectas, puntas redondas (como el símbolo), grilla 24px, un solo color (bone o el del servicio). Dibujados desde la geometría del árbol: raíz (tres líneas hacia abajo), anillo (círculos concéntricos), nodo (punto con dos ramas).
- Formas: todo rectangular sin radio, salvo círculos de estado. *Por qué:* lámina, archivo, documento.

---

## 7. Movimiento

Principio: **crecer, no aparecer**, y **un solo momento orquestado**. (Revisado en septiembre de 2026: las entradas de texto en cada sección —títulos por renglón, etiquetas y párrafos que subían con fundido— se quitaron de `motion.js`; son el movimiento por defecto de cualquier landing generada.)

| Principio | Regla concreta | Por qué |
|---|---|---|
| Un momento no pedido | El único movimiento que el usuario no provoca es la carga del hero: la escena entra con fundido y el titular cambia de peso (§5.3). | Una sola secuencia se recuerda; diez entradas se ignoran. |
| Lo demás responde al usuario | El scroll mueve la cámara, sostiene la lámina V mientras la VI sube como una hoja, apila VIII sobre VII y XI sobre X, y lleva el carrusel de los pasos. El test, el FAQ y los botones responden al clic o al hover. Los textos de VI–XI están quietos. | El movimiento muestra qué cambió, no decora. |
| Peso e inercia | Curva `cubic-bezier(.16,1,.3,1)` para el hero; UI 180–600 ms con `cubic-bezier(.2,.8,.2,1)`. Scroll suave con Lenis. | Los sistemas sólidos tienen masa; nada salta. |
| Sin rebote ni loops | Prohibido `overshoot`, `elastic`, pulsos, degradés que fluyen, dibujos de línea al entrar. | El rebote es juguete; lo que late distrae. |
| Reducir movimiento | `prefers-reduced-motion`: sin animaciones ni pines; el titular aparece en su estado final. | Accesibilidad y respeto. |

---

## 8. Voz y tono

### Reglas
1. **Hecho antes que adjetivo.** "Tres productos en producción" en vez de "amplia experiencia". *Por qué:* la prueba vende sola.
2. **Frases cortas, verbo al principio.** Una idea por oración.
3. **Voseo rioplatense**, sin exagerarlo ("agendá", "marcá", "escribinos"). *Por qué:* somos de Buenos Aires y hablamos con dueños de PyME, no con corporaciones.
4. **La metáfora del árbol explica, no decora.** Se usa una vez por bloque y siempre aterriza en algo concreto en la oración siguiente.
5. **Decir que no.** "Si no vale la pena, te lo decimos antes de cobrar." La honestidad es nuestro premium.
6. **Nada de hype.** La IA es una herramienta con revisión humana, no una revolución.
7. **Jerga solo si el cliente la usa.** "LLM", "pipeline", "hardening" van en la línea de "qué hacemos", nunca en títulos, y con traducción cerca.

### Vocabulario
| Sí | No |
|---|---|
| construir, operar, cuidar, crecer, medir, asegurar | potenciar, disruptivo, sinergia, revolucionar |
| sistema, proceso, datos, producción | solución integral, ecosistema digital, transformación digital |
| revisión humana, trazabilidad | IA de última generación, inteligencia artificial avanzada |
| PyME, profesional, equipo | cliente corporativo, stakeholders |
| diagnóstico, primera charla | reunión de descubrimiento, workshop |
| raíz, corteza, copa, bosque (con su servicio al lado) | "semilla digital", "árbol del conocimiento" (metáfora sin aterrizar) |

### Antes / después (frases reales de la web)
| Antes | Después | Por qué |
|---|---|---|
| "Una empresa funciona como un organismo vivo." | "Tu empresa ya es un sistema. Nosotros lo hacemos crecer sin que dependa de nosotros." | La primera es un lugar común; la segunda dice qué hacemos y la promesa. |
| "Automatizaciones con LLMs y asistentes sobre tus documentos." | "Asistentes que leen tus documentos y automatizan tareas repetitivas, con IA y revisión humana." | "LLM" no le dice nada a un despachante o a una psicóloga. |
| "Una operación preparada para crecer sin miedo." | "Sabés quién entra a qué, y qué pasa si algo falla." | "Sin miedo" es emocional y vago; lo otro se puede verificar. |
| "Agendá 30 min" / "Agendá 30 minutos" / "Agendá 30 minutos →" | Siempre "Agendá 30 minutos" (la flecha solo en el CTA principal). | Un CTA, una fórmula. |
| "Scrolleá para verlo crecer" | Se mantiene. | Voseo, verbo, metáfora aterrizada en una acción. |
| "Construimos antes de aconsejar." | Se mantiene; merece lugar fijo (debajo de "Dos ramas" o en el cierre). | Es la mejor frase de posicionamiento y hoy no aparece en v2. |

---

## 9. Aplicaciones mínimas

**Web.** Wordmark solo en la nav (luz sobre la escena, tinta sobre el papel). Favicon `ynera-favicon.svg` + PNG 32/180/512. Símbolo plano grande (≥ 120px) en el footer o en el cierre como sello final. Tokens de la sección 4 como única fuente de color.

**LinkedIn.**
- Avatar empresa (400 × 400): fondo `--night`, símbolo color centrado a 56 % del lado. *Por qué:* el recorte circular necesita aire y el degradé solo funciona sobre oscuro.
- Banner (1584 × 396): noche, captura limpia de la Lámina V (bosque) a la derecha; a la izquierda "Construimos antes de aconsejar." en Piazzolla 320 luz y debajo, en redonda gris, "Datos, seguridad e IA aplicada, desde Buenos Aires." Dejar libre el tercio izquierdo inferior (lo tapa el avatar).
- Avatares personales: foto según 6.2; nada de marco con logo.

**Deck.** 16:9. Portada en tinta con el titular en los dos pesos (§5.3); el resto en papel liquen, como la web. Cada sección abre con su parte del árbol en el color de área de día, sin numerales. Una idea por slide, texto a la izquierda, imagen/dato a la derecha. Todo en Piazzolla; cifras grandes en 280, unidad en 400. Cierre: "Empecemos por la raíz." + contacto.

**Firma de mail.** Solo texto, sin imagen (las imágenes se bloquean y pesan):
```
Emiliano [Apellido]
Socio · Seguridad, código e IA
Ynera — Datos · Seguridad · IA aplicada
ynera.com.ar · +54 9 11 …
```
Nombre en negrita, resto en gris. Sin frases motivacionales, sin banners.

**WhatsApp Business.** Foto de perfil = avatar de LinkedIn. Descripción: "Datos, seguridad e IA aplicada para PyMEs y profesionales. Construimos antes de aconsejar." Mensaje de bienvenida: "Hola, somos Emiliano y Mariano de Ynera. Contanos qué te pasa y te respondemos nosotros, en el día." Respuestas en voseo, sin stickers ni emojis de cohete.

**Documento del Diagnóstico** (PDF / A4 o carta). Portada en papel liquen con símbolo plano en tinta y "Diagnóstico de [Empresa], [fecha]" en Piazzolla 560. Estructura en tres láminas: Raíces (ámbar), Corteza (violeta), Copa (azul), cada una con: lo que vimos · riesgo · primer paso · costo estimado. Barras horizontales finas como en la web. Cierre: "Qué haríamos primero" + "Qué no haríamos". Todo en Piazzolla: texto 10,5 pt (tamaño óptico automático), títulos 560, cifras tabulares de caja alta. *Por qué:* es la pieza que el cliente reenvía a su socio; tiene que verse como un documento de estudio, no como una propuesta comercial.

---

## 10. Auditoría adversarial de `v2/` contra este código

Priorizada. Selector o elemento → qué cambiar → por qué.

1. **Logo PNG en nav, footer y favicon** (`.brand img`, `<link rel="icon" href="../src/assets/logo.png">`). → Favicon: `<link rel="icon" type="image/svg+xml" href="brand/ynera-favicon.svg">` + PNG de respaldo y `apple-touch-icon`. Nav: **wordmark solo**, sin imagen (el símbolo ya es la escena). Footer: `ynera-simbolo.svg` inline con `currentColor`. *Por qué:* el PNG brillante se empasta a 26px, no tiene versión plana y contradice el orden de color.

2. **`.grow-word` y `.btn-glow::before`** usan `#FF4FD8` (magenta fuera de paleta) y `.grow-word` corre `flow 9s linear infinite`. → Degradé estático en orden del árbol, sin magenta: `linear-gradient(0deg or 100deg, var(--root), var(--bark) 46%, var(--leaf))`, sin loop. `.btn-glow`: eliminar el halo arcoíris borroso; CTA primario = `.btn-fill` (hueso, hover ámbar). *Por qué:* un halo arcoíris es gamer, no premium sobrio; el loop contradice "crecer, no aparecer".

3. **Tres negros distintos**: `--night:#070908` (verdoso), `.plate{background:#05060a}`, `rgba(6,7,12,…)` en `.nav`, `.plate::after`, `.live`. → Un solo `--night:#06070C` y `--night-rgb:6 7 12` para los `rgba`. *Por qué:* el negro verdoso choca con el cielo azul del 3D y se ve como error de exportación.

4. **Cielo de la escena demasiado violeta** (`tree.src.js`, shader del cielo, banda `c += vec3(.14,.035,.2) …`; visible en todas las capturas). → Bajar esa banda a un índigo tenue (p. ej. `vec3(.05,.03,.12)` y menor intensidad) para que el violeta quede solo en la corteza. *Por qué:* hoy el violeta ocupa ~40 % de la pantalla; rompe el 85/10/5 y hace que la Lámina III no destaque. (A coordinar con quien trabaja la escena.)

5. **Ámbar en la copa** (`tree.src.js`, mezcla `leaf → bark → root` por rama; en Lámina IV una rama entera es ámbar). → Las ramas van `bark → leaf` hacia la punta; el ámbar solo en raíces y savia bajo tierra. *Por qué:* ámbar = datos = raíz; si sube a la copa la leyenda de color miente.

6. **La Y del hero no tiene la geometría del símbolo** (brazos a ~20° del eje, casi una V cerrada). → Abrir a 40° en la Lámina I y puntas redondeadas; que el primer cuadro del hero sea literalmente el logo. *Por qué:* es el momento de mayor atención; tiene que fijar la forma de la marca.

7. **Fallback tipográfico sin condensar** (`--f:"Archivo","Helvetica Neue",Arial`). En las capturas Archivo no cargó y los títulos salen en Arial ancho, con `font-stretch` ignorado. → `--f:"Archivo","Arial Narrow","Roboto Condensed",sans-serif`, autoalojar woff2 y `<link rel="preload">` de Archivo. *Por qué:* el sistema depende del ancho condensado; sin él el hero se ve genérico y desborda en mobile.

8. **Nav transparente sobre texto** (`.nav` con degradé a 0): en Lámina IV y V el `dl.did` del capítulo anterior pasa por debajo del wordmark (capturas d-0.67 y d-0.92). → Al scrollear, `.nav` con fondo `rgb(var(--night-rgb)/.85)` + `backdrop-filter` y filete inferior `--rule`, o máscara en `.chapters`. *Por qué:* la firma de la marca no puede quedar pisada por texto.

9. **Lenguaje de formas mezclado**: `.live` es una píldora (`border-radius:999px`) y `.frame` tiene `border-radius:1.25rem` (heredado del sitio anterior), mientras botones, tarjetas y etiquetas 3D son rectos. → `.live` como etiqueta mono sin contenedor (punto cian + texto) o con radio 0; `.frame` y futuras fotos con radio 0. *Por qué:* la lámina es rectangular; los radios vienen de otra marca.

10. **Voz y consistencia de copy**: CTA en tres versiones ("Agendá 30 min", "Agendá 30 minutos", "…→"); "LLMs" en `#copa .did`; "organismo vivo" en `.hero-lede`; `.limit` sin estilo; falta "Construimos antes de aconsejar". → Unificar CTA, traducir jerga (sección 8), dar a `.limit` estilo `.micro`, sumar la frase bajo "Dos ramas. Un mismo tronco." Limpiar CSS muerto (`.pledges`, `.offer`, `.fit` no se usan). *Por qué:* el premium se pierde en los detalles repetidos.

**Qué NO cambiar:** la escena como protagonista, las láminas numeradas con latín y coordenadas, los puntos de color por servicio (`.key`), los botones rectos hueso, el Diagnóstico con barras por servicio, el hover ámbar y el cian como pulso. Todo eso ya cumple el código.
