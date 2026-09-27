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
| Símbolo plano monocromo | `ynera-simbolo.svg` (`fill="currentColor"`) | **Versión por defecto.** Nav, footer, documentos, sello, una tinta. Hueso sobre noche o noche sobre hueso. |
| Símbolo con degradé | `ynera-simbolo-color.svg` | Solo donde el símbolo está solo y es protagonista: avatar, favicon, portada de deck, lámina de cierre. |
| Favicon | `ynera-favicon.svg` | ≤ 32 px. Trazo reforzado (w = 16, brazos más cortos) sobre cuadrado noche redondeado. Exportar también PNG 32, 180 (apple-touch) y 512. |
| Wordmark | `ynera-wordmark.svg` | **YNERA** en versales de Source Serif 4 (peso 500, tamaño óptico 36), espaciadas 16 % con el kerning de la fuente, vectorizado a curvas (`currentColor`). En la web se compone en vivo con la misma receta (ver §5). |
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

### 4.1 Roles
| Token | Hex | Rol en el árbol | Servicio | Por qué este color |
|---|---|---|---|---|
| `--root` | `#FF9A1F` | Raíces | Datos | Ámbar = savia, calor subterráneo, lo que alimenta. Es también el color de "acción" (hover del CTA, focus): los datos mueven todo. |
| `--bark` | `#B25BFF` | Corteza | Seguridad | Violeta = capa, protección, lo denso. Viene del logo original; se conserva como puente. |
| `--leaf` | `#3F7BFF` | Copa | IA aplicada | Azul = luz, cielo, energía que llega de arriba. Es el color más "tecnológico" y va en la punta, donde está la IA. |
| `--cyan` | `#27F0D2` | Vida / señal | Estado "en producción" | No es servicio, es pulso: algo vivo y funcionando (punto "live", pasto bioluminiscente, checks). Nunca se usa para decorar. |

Colores fuera de esta tabla **no existen** (hoy aparecen `#FF4FD8` magenta y `#c9a4ff` lila heredado: salen).

### 4.2 Neutros
| Token | Hex | Uso | Por qué |
|---|---|---|---|
| `--night` | `#06070C` | Fondo base | Negro azulado, igual al cielo de la escena. Hoy hay tres negros (`#070908` verdoso, `#05060a`, `rgba(6,7,12)`); queda uno. |
| `--night-2` | `#0C0E16` | Superficies, tarjetas | Un escalón, sin sombras. |
| `--rule` | `#1D2130` | Filetes | Líneas de lámina, apenas visibles. |
| `--rule-2` | `#30354A` | Bordes de controles | Visible sin competir. |
| `--bone` | `#E9E5D9` | Texto principal, botón primario | Papel de lámina botánica: cálido contra la noche fría. Contraste 16:1. |
| `--mute` | `#8F8D82` | Etiquetas en versalitas, pies | 6:1 sobre noche. |
| `--dim` | `#5E5D56` | Solo decorativo o placeholders | 3:1: **prohibido para texto de lectura.** |

Los neutros cálidos (bone/mute) y los fondos fríos (night) son intencionales: el papel es naturaleza, la noche es tecnología.

### 4.3 Proporciones: 85 / 10 / 5
- **85 %** noche + neutros. *Por qué:* sobriedad; el color gana valor si escasea.
- **10 %** hueso (texto, botón primario).
- **5 %** color de servicio (puntos, barras, una palabra, la escena). *Por qué:* un color de servicio aparece cuando se habla de ese servicio, no antes.
- Excepción: la escena 3D puede llevar más color porque es la ilustración; aun así, **el violeta no debe teñir el cielo** (ver auditoría).

### 4.4 Degradé
- **Sí:** en el símbolo color, en la escena 3D (tronco→copa), y en filetes y líneas (el borde de la Lámina VI, la línea de proceso). **No en letras** (ver §5). Siempre vertical o en el orden ámbar → violeta → azul.
- **No:** en botones, fondos de secciones, bordes, halos, textos largos, ni animado en loop. *Por qué:* un degradé repetido es papel de regalo; uno solo es firma.
- Paradas del degradé: `#FF9A1F 0 %`, `#B25BFF 46 %`, `#3F7BFF 100 %`.

### 4.5 Accesibilidad (WCAG AA sobre `--night`)
| Color | Contraste | Puede ir en |
|---|---|---|
| bone | 16:1 | todo |
| `#B9B6AA` | 9,9:1 | leads |
| mute | 6,0:1 | etiquetas en versalitas y pies ≥ 15 px (el texto secundario usa `--ink-2` #BDB9AD) |
| root / cyan | 9,5:1 / 13,9:1 | texto y UI |
| bark / leaf | 5,6:1 / 5,3:1 | texto ≥ 16 px o UI; en tamaños menores usar `#C792FF` / `#7FA4FF` (8,6 / 8,3:1) |
| dim | 3,0:1 | nunca texto de lectura |

Mínimo: 4,5:1 para texto normal, 3:1 para títulos ≥ 24 px y componentes. Nunca transmitir un dato **solo** por color: los medidores del Diagnóstico ya llevan etiqueta y porcentaje; mantenerlo.

---

## 5. Tipografía

> Rehecha en septiembre de 2026 a pedido del cliente ("es fea la tipografía… se siente full AI"). Esta sección explica qué se cambió, por qué, y con qué libros se decidió. Si algo de acá choca con otra sección, manda esta.

### 5.1 Qué había y por qué no funcionaba
Cuatro voces tipográficas a la vez: una display dibujada por código (Ynera Furca), una grotesca para el texto, una serif itálica "de acento" y una mono en mayúsculas espaciadas para las etiquetas. Es exactamente la receta que hoy produce cualquier generador de landings: **titular en sans + una frase en serif itálica que carga la emoción + etiquetas mono en mayúscula en cada esquina + una palabra en degradé sobre fondo oscuro**. Además:
- **Furca** tenía espaciado, curvas y detalles (muescas, biseles) de fuente amateur; en tamaños grandes se notaba el dibujo por código, sin corrección óptica. Una display propia solo suma si está al nivel de una fuente comercial; si no, resta.
- **Demasiados niveles antes del texto.** Una lámina apilaba: nº de lámina mono + nombre latino itálico + etiqueta mono de color + H2 + frase itálica + bajada + lista con `dt` mono. Butterick lo describe tal cual: demasiados niveles llevan a "intentos cada vez más desesperados de diferenciarlos" con itálica, mayúsculas, tamaño y color.
- **Mono para texto que no es código.** Butterick: en texto no hay buenas razones para usar monoespaciada. Y todo en mayúsculas a 11,5 px.
- **Degradé dentro de la letra**, interlineado de títulos por debajo de 1 (.94–.98) y tracking negativo sobre minúsculas (Bringhurst: no espaciar ni apretar la caja baja sin motivo).

### 5.2 Qué leímos (y la regla que sacamos de cada uno)
| Fuente | Regla aplicada |
|---|---|
| Butterick, *Practical Typography* — Summary of key rules, Line length, Line spacing, Point size | Texto 15–25 px en web; medida 45–90 caracteres; interlineado 120–145 %. → Texto a 18 px (17 en celular), interlínea 1,5, medida 33 em ≈ 66 caracteres. |
| Butterick — Headings, Hierarchical headings | Los títulos se destacan con **espacio** antes que con efectos; el menor aumento de tamaño que se note; pocos niveles. → Un solo peso de títulos (500; 400 en el hero y el cierre), sin itálica, sin mayúsculas, sin degradé. |
| Butterick — All caps, Letterspacing | Las mayúsculas y versalitas siempre llevan 5–12 % de espacio extra; las minúsculas no. → Versalitas a +6 %, wordmark en versales a +16 %, minúsculas a 0. |
| Butterick — Monospaced fonts, Font recommendations | Mono solo para código; usar fuentes profesionales, no "de sistema" ni caprichosas. → Fuera la mono; fuera la display hecha por código. |
| Bringhurst, *The Elements of Typographic Style* 2.1.2 | Medida cómoda: 45–75 caracteres, 66 ideal. → `--measure: 33em`. |
| Bringhurst 2.1.6 / 2.1.7 | Espaciar toda secuencia de versales o versalitas (5–10 %); no espaciar la caja baja sin razón, y nunca con valores negativos. |
| Bringhurst 3.2.1 | Cifras de caja alta (lining) con versales; cifras elzevirianas (old-style) en todo lo demás. → `oldstyle-nums` en el texto y las etiquetas; `lining-nums` en títulos; `tabular-nums` de la sans en las lecturas del test. |
| Bringhurst cap. 3 y 6 (*Harmony & counterpoint*, *Choosing and combining type*) | Empezar con una sola familia: da variedad y homogeneidad a la vez; si se suma otra, que sea pariente. Escala tradicional 6·7·8·9·10·11·12·14·16·18·21·24·36·48·60·72. → Tamaños tomados de esa escala (ver 5.4). |
| Lupton, *Thinking with Type* (Letter / Text) | Jerarquía con pocos contrastes bien elegidos; versalitas y cifras elzevirianas como herramientas de texto; puntuación colgante. → `hanging-punctuation`, versalitas reales (no mayúsculas achicadas). |
| Tim Brown, "More Meaningful Typography" (A List Apart) | Medidas relacionadas por una escala, no números arbitrarios. |
| Müller-Brockmann, *Grid Systems* | Pocos tamaños, saltos claros; ancho de columna según tamaño de letra. |
| Google Fonts Knowledge — *Optical size axis*, *Choosing typefaces that have optical sizes*, *Pairing within a superfamily* | Tamaños ópticos: menos contraste y más aire en chico, más refinamiento en grande; emparejar dentro de una misma superfamilia. → Source Serif 4 con eje `opsz` (el navegador elige el corte según el tamaño) + Source Sans 3. |
| Artículos sobre el "look IA" (p. ej. *AI Design Already Has a Cliché*, Superdesign "6 tells") | Las marcas del cliché: serif itálica suave en la frase clave, mono en mayúsculas en esquinas, fondo oscuro con ámbar/violeta, palabra en degradé. → Se eliminaron las tres que son tipográficas. |
| Referentes mirados | Fonts In Use (una condensada para mandar + una serif de texto para todo lo demás, sin color decorativo), Stripe Press (libros: serif, jerarquía por tamaño y aire), Vercel/Geist y Stripe (una sola familia de sistema bien espaciada). Común a todos: **pocas familias, una voz dominante, jerarquía por escala y espacio, no por efectos.** |

### 5.3 Familias
| Rol | Familia | Uso | Por qué |
|---|---|---|---|
| Texto, títulos y etiquetas | **Source Serif 4** (Frank Grießhammer / Adobe, OFL), variable `opsz` 20–60 × `wght` 400–600, `fonts/source-serif-4.woff2` | Todo lo que se lee: H1–H3, bajadas, párrafos, listas, FAQ, etiquetas de lámina (en versalitas), wordmark (en versales). | Serif de libro de corte Fournier: sobria, con tamaños ópticos reales (el titular a 72 px usa el corte "display", el texto a 18 px el de lectura), versalitas y cifras elzevirianas verdaderas. Da la voz de "lámina de naturalista impresa" sin disfrazarse de antigua, y no está gastada en landings de IA. |
| Itálica | **Source Serif 4 Italic** (instancia fija 400 / opsz 24), `fonts/source-serif-4-italic.woff2` | **Solo** nombres científicos: *Radix*, *Cortex*, *Coma*, *Silva*, *Ynera bifurcata*. | Es la convención tipográfica de la nomenclatura binomial, no un "acento". |
| Interfaz | **Source Sans 3** (Paul D. Hunt / Adobe, OFL), `wght` 400–600, `fonts/source-sans-3.woff2` | Navegación, botones, barra móvil y lecturas numéricas del test (0 %, 0 de 10). | Pariente de la serif (misma casa, proporciones compatibles): lo que se opera se distingue de lo que se lee, sin sumar una tercera voz. |

Dos familias de una misma superfamilia. Antes: cuatro familias y cinco archivos (118 KB). Ahora: tres archivos (≈151 KB, la serif lleva los dos ejes).

**Ynera Furca queda archivada** (`src/tipografia/`, `brand/ynera-furca-specimen.png`). No se usa en la web ni en piezas nuevas. Si alguna vez vuelve una letra propia, que sea solo el wordmark, dibujado por un diseñador de tipos y corregido a mano.

### 5.4 Escala y composición (web)
Tamaños tomados de la escala tradicional (Bringhurst): 14 · 16 · 18 · 21 · 24 · 36 · 48 · 60 · 72. Entre escritorio y celular se interpola con `clamp()`.

| Nivel | Tamaño (desktop → celular) | Peso / interlínea / tracking |
|---|---|---|
| H1 hero, H2 de cierre | 72 → 34–50 px (hero) · 80 → 44 px (cierre) | 400 · 1,02–1,04 · 0 |
| H2 | 48 → 34 px | 500 · 1,08 · 0 · `text-wrap: balance` |
| H3 (personas, pasos, casos) | 24–40 px | 500 (600 en las fichas de 24 px) · 1,08–1,1 |
| Bajada (la frase debajo del H2) | 25 → 21 px | 400 redonda · 1,3 · `--ink-2` |
| Lead | 20 → 18 px | 400 · 1,5 · máx. 30 em |
| Texto | 18 → 17 px | 400 · 1,5 · máx. 33 em ≈ 66 caracteres · `text-wrap: pretty` |
| Pie / micro | 15–16 px | 400 · 1,4–1,45 |
| Etiqueta (ex-mono) | 16 px en versalitas (`all-small-caps`) | 400 · +6 % · cifras elzevirianas |
| Wordmark | 19 px en versales | 500 · +16 % |
| Interfaz (sans) | 15 px | 400 nav, 600 botones |

### 5.5 Reglas
- **Una voz.** Todo lo que se lee va en Source Serif 4. La sans solo en lo que se toca (nav, botones) y en cifras de instrumento.
- **Jerarquía por tamaño y espacio**, no por efectos. Nada de itálica, subrayado, mayúsculas sostenidas ni degradé para destacar.
- **Sin degradé en letras.** El degradé vive en el símbolo, en la escena y en filetes (ver 4.4).
- **Itálica solo para nombres latinos.** Las frases de lámina ("Lo que no se ve alimenta todo lo demás.") son bajadas en redonda, no epígrafes en itálica.
- **Nunca mayúsculas sostenidas en texto.** Las etiquetas van en versalitas reales (`font-variant-caps: all-small-caps`), espaciadas 6 %. Las versales espaciadas quedan solo para el wordmark.
- **Cifras:** elzevirianas en texto y etiquetas; de caja alta en títulos; tabulares de la sans en porcentajes y contadores.
- **Tracking:** 0 en minúsculas en cualquier tamaño (el eje óptico ya ajusta el espaciado del corte display). Nunca negativo.
- **Microtipografía en español:** signos de apertura ¿ ¡ siempre; raya (—) para incisos, semirraya (–) para rangos; comillas latinas « » y, dentro, “ ”; espacio de no separación entre número y unidad ("30&nbsp;minutos") y entre "Lám." y su número; `hyphens: auto` solo en celular (medida corta, `lang="es-AR"`); `hanging-punctuation` donde el navegador lo soporte.
- **Autoalojado** (woff2, subset latín + español: U+20–7E, U+A0–FF, Œœ, comillas, rayas, primas, flechas). Se precargan la serif y la sans. **No quitar las instrucciones de hinting (`prep`) al hacer el subset:** sin ellas, FreeType (Chrome en Linux/Android) espacia mal el texto chico ("pr oblema").
- Licencias: Source Serif 4 y Source Sans 3 son OFL (textos en `fonts/`).

## 6. Dirección de arte e imagen

### 6.1 La escena 3D: "lámina botánica nocturna"
Referente: láminas de herbario del siglo XIX, pero de noche y con bioluminiscencia. Cada capítulo es una **Lámina** numerada en romanos (I Semilla, II Raíces, III Corteza, IV Copa, V Bosque), con nombre latino y coordenadas de Buenos Aires. El espécimen es *Ynera bifurcata*.

On-brand:
- Noche azul-negra, estrellas pequeñas y frías.
- Luz que sale **de adentro** del objeto (savia ámbar en raíces, anillos violetas en corteza, nodos azules en copa, pasto cian). *Por qué:* el sistema está vivo por dentro; no lo ilumina un reflector de marketing.
- Isla flotante como "maceta" del espécimen: aislado para estudiarlo.
- Etiquetas de lámina rectas, filete fino, en versalitas. *Por qué:* es un documento, no un videojuego.
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

Principio: **crecer, no aparecer.** Las cosas salen desde su base y ganan altura; no se materializan de la nada ni rebotan.

| Principio | Regla concreta | Por qué |
|---|---|---|
| Crecer desde abajo | Entradas con `translateY(18–105%) → 0`, recortadas por `overflow:hidden`. Nunca `scale` desde 0, nunca fade solo. | Un brote empuja hacia arriba. |
| Peso e inercia | Curva de entrada `cubic-bezier(.16,1,.3,1)` (arranque decidido, llegada lenta). Scroll suave con `lerp .085`. | Los sistemas sólidos tienen masa; nada salta. |
| Duración | Micro (hover, color) 180–220 ms; UI (barras, menú) 350–600 ms con `cubic-bezier(.2,.8,.2,1)`; entradas de título 900–1100 ms; escalonado 80–100 ms entre líneas. | Rápido donde el usuario espera respuesta; lento donde contamos una historia. |
| Sin rebote | Prohibido `overshoot`, `elastic`, `spring` con rebote. | El rebote es juguete. |
| Loops | Solo uno a la vez en pantalla y solo como señal de vida: el punto cian "live" (2,2 s) y la gota del scroll-cue. **No** degradés que fluyen en loop. | Lo que late indica que algo funciona; lo que gira es distracción. |
| La escena manda | El scroll mueve la cámara y hace crecer el árbol; el texto no compite con parallax propio. | Una sola fuente de movimiento por pantalla. |
| Reducir movimiento | `prefers-reduced-motion`: sin animaciones, la escena en su estado final estático por lámina. | Accesibilidad y respeto. |

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

**Web.** Wordmark solo en la nav (hueso). Favicon `ynera-favicon.svg` + PNG 32/180/512. Símbolo plano grande (≥ 120px) en el footer o en el cierre como sello final. Tokens de la sección 4 como única fuente de color.

**LinkedIn.**
- Avatar empresa (400 × 400): fondo `--night`, símbolo color centrado a 56 % del lado. *Por qué:* el recorte circular necesita aire y el degradé solo funciona sobre oscuro.
- Banner (1584 × 396): noche, captura limpia de la Lámina V (bosque) a la derecha; a la izquierda "Construimos antes de aconsejar." en Source Serif 4 (peso 400) hueso y debajo en versalitas mute "Datos · Seguridad · IA aplicada · Buenos Aires". Dejar libre el tercio izquierdo inferior (lo tapa el avatar).
- Avatares personales: foto según 6.2; nada de marco con logo.

**Deck.** 16:9, fondo noche. Portada: lockup vertical + título en Source Serif 4. Cada sección abre con su lámina (número romano + nombre latino + color del servicio). Una idea por slide, texto a la izquierda, imagen/dato a la derecha. Números grandes en Archivo, unidad en mono. Cierre: "Empecemos por la raíz." + contacto. Exportar también en fondo hueso para imprimir.

**Firma de mail.** Solo texto, sin imagen (las imágenes se bloquean y pesan):
```
Emiliano [Apellido]
Socio · Seguridad, código e IA
Ynera — Datos · Seguridad · IA aplicada
ynera.com.ar · +54 9 11 …
```
Nombre en negrita, resto en gris. Sin frases motivacionales, sin banners.

**WhatsApp Business.** Foto de perfil = avatar de LinkedIn. Descripción: "Datos, seguridad e IA aplicada para PyMEs y profesionales. Construimos antes de aconsejar." Mensaje de bienvenida: "Hola, somos Emiliano y Mariano de Ynera. Contanos qué te pasa y te respondemos nosotros, en el día." Respuestas en voseo, sin stickers ni emojis de cohete.

**Documento del Diagnóstico** (PDF / A4 o carta). Portada hueso con símbolo plano noche y "Diagnóstico · [Empresa] · [fecha]" en versalitas de Source Serif 4. Estructura en tres láminas: Raíces (ámbar), Corteza (violeta), Copa (azul), cada una con: lo que vimos · riesgo · primer paso · costo estimado. Barras horizontales finas como en la web. Cierre: "Qué haríamos primero" + "Qué no haríamos". Texto en Archivo 10,5 pt, notas en Garamond itálica, datos en Plex Mono. *Por qué:* es la pieza que el cliente reenvía a su socio; tiene que verse como un documento de estudio, no como una propuesta comercial.

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
