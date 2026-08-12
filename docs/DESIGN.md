# Diseño — Identidad visual, navegación y mapa de pantallas

Complementa a `docs/PROJECT.md`. El contenido real (textos, fecha, direcciones)
vive en `informacion_base.md` — este documento define _cómo se ve y cómo se
navega_, no el contenido en sí.

## 1. Identidad visual

Base adaptada de un documento de diseño previo (`G:\BODA\PROJECT_CONTEXT.md`,
fuera de este repo) que el usuario confirmó reutilizar. Los valores hex son
decisiones de sistema de diseño, no contenido — no chocan con la decisión de no
reutilizar el código de `G:\BODA\wedding-invitation` (ver memoria
`prior-project-ignored`).

### Paleta de colores

| Nombre                      | Hex       | Uso                                     |
| --------------------------- | --------- | --------------------------------------- |
| Guinda (vino tinto/borgoña) | `#7B1F3A` | Color primario, fondos oscuros, títulos |
| Champagne                   | `#F7E7CE` | Fondos claros, texto sobre oscuro       |
| Oro                         | `#C9A96E` | Acentos, bordes, detalles decorativos   |
| Blanco Marfil               | `#FAF6F0` | Fondo neutro, cards                     |
| Guinda Oscuro               | `#5A1528` | Sombras, variante hover                 |

Importante: esta es la paleta **visual del sitio**. El código de vestimenta
(qué NO deben usar los invitados) es un dato de contenido distinto y está en
`informacion_base.md` — por diseño, coincide con esta paleta porque esos colores
están reservados para los novios/personas importantes del evento.

### Tipografía

- **Títulos**: `Cormorant Garamond` — serif elegante clásico
- **Subtítulos**: `Playfair Display` — serif sofisticado
- **Cuerpo**: `Lato` o `Montserrat` — sans-serif legible
- **Detalles decorativos** (nombres, frases): `Great Vibes` o `Pinyon Script` —
  cursiva caligráfica

### Estilo

- Moderno con toques clásicos/románticos; ornamentos florales SVG (ramas,
  flores, hojas); texturas sutiles; degradados suaves guinda → champagne.
- Mobile-first: la mayoría de invitados llega desde un link compartido por
  WhatsApp. Breakpoints: base (375px) → md (768px) → lg (1024px+).
- Imágenes en WebP, lazy loading.
- Respetar `prefers-reduced-motion`: usuarios que lo activen reciben
  transiciones reducidas/instantáneas en vez de las animaciones completas.

## 2. Patrón de navegación (invitados)

**Modal de sobre al iniciar.** Antes de ver cualquier sección, la pantalla
completa muestra el dorso de un sobre cerrado: 4 solapas triangulares
(arriba/derecha/abajo/izquierda) que se encuentran en el centro — el patrón
clásico de un sobre visto por detrás — con sombreado distinto por solapa
(más clara arriba, más oscura abajo, simulando luz desde arriba) y líneas
doradas marcando cada pliegue. En el centro, un sello con el monograma
"T&R" y el texto "Click para abrir", con un pulso sutil e infinito que
invita al click. Al hacer click:

1. Una ráfaga de ~45 partículas (pétalos/destellos dorados) explota desde
   el sello.
2. El dorso (4 solapas + líneas) se desvanece.
3. El cuerpo del sobre se separa en dos mitades que se deslizan hacia
   arriba/abajo hasta salir de la pantalla, revelando la sección de atrás.

Implementado en `src/features/envelope-intro/`:

- `EnvelopeIntro.tsx` — orquesta el estado y usa **Framer Motion**
  (`AnimatePresence` + `motion.*`) para las transiciones, en vez de CSS a
  mano — física de animación real y exit animations limpias sin
  `setTimeout` manual.
- `EnvelopeFace.tsx` — las 4 solapas (`clip-path` + `color-mix()` para el
  sombreado) y las líneas de pliegue (SVG, `viewBox="0 0 100 100"` con
  `preserveAspectRatio="none"` para que las diagonales lleguen exacto a
  cada esquina sin importar el aspect ratio de la pantalla).
- `ParticleBurst.tsx` — la ráfaga de partículas usa **`<canvas>`** a
  propósito: animar ~45 partículas con física (gravedad, rotación, fade)
  por frame vía `requestAnimationFrame` es mucho más liviano que animar esa
  cantidad de nodos DOM.

Solo aparece en la experiencia de invitado (`/`, `/i/:slug`), nunca en
`/admin/*`.

**Scroll-snap de pantalla completa.** Cada sección ocupa exactamente un
viewport (100dvh). Un gesto de scroll (rueda, trackpad o swipe táctil) avanza a
la sección completa siguiente o anterior — nunca se ve una sección a medias ni
dos secciones parciales a la vez. Cada sección tiene una animación de
entrada/salida propia.

### Implementación técnica

- CSS nativo `scroll-snap-type: y mandatory` en el contenedor, `scroll-snap-align:
start` + `height: 100dvh` en cada sección. Es la opción más robusta entre
  dispositivos (incluye momentum scroll de iOS) y no requiere capturar eventos
  de wheel/touch a mano.
- Framer Motion (`whileInView` / Intersection Observer) dispara la animación de
  entrada de cada sección cuando se vuelve activa (fade + slide, con variantes
  por sección definidas en el sistema de animación).
- Indicador lateral de sección actual (dots) opcional, permite saltar
  directo a una sección — mejora de accesibilidad/UX, no bloqueante para v1.
- El contenedor de scroll-snap es parte del _shell_ de la app
  (`src/layout/`), no de un feature module — simplemente renderiza, en orden,
  las secciones de los módulos que estén activos en `src/config/features.ts`.
  Así un módulo se puede desactivar sin tocar la lógica de navegación.

## 3. Mapa de pantallas

### Experiencia pública del invitado

Una sola ruta con contenido personalizable por invitado:

- `/` — versión genérica (sin RSVP activo; muestra mensaje de usar el link
  personal para confirmar).
- `/i/:slug` — invitación real que recibe cada invitado/familia. Mismo
  contenido, pero la sección RSVP queda pre-cargada con su nombre y su cupo de
  acompañantes.

Antes de las secciones, el modal de sobre (`envelope-intro`, ver sección 2)
cubre toda la pantalla hasta que el invitado hace click para abrir.

Secciones, en orden (cada una = 1 pantalla completa del scroll-snap):

1. **Hero / Portada** — nombres, fecha, imagen/fondo, CTA para bajar
2. **Countdown** — cuenta regresiva a la fecha/hora de la ceremonia, con la
   fecha completa ("Sábado, 26 de diciembre de 2026") debajo del título —
   para que no dependa solo de la cuenta regresiva para saber cuándo es
3. **Historia / Galería** — fotos y/o historia breve de la pareja
4. **Ceremonia** — iglesia, hora, dirección, mapa embebido
5. **Recepción** — local, hora, dirección, mapa embebido
6. **Dress code** — qué no usar (ver `informacion_base.md`), tono visual acorde
   a la paleta
7. **Mesa de regalos** — datos de regalo (placeholders en el repo, reales solo
   en producción — ver `docs/PROJECT.md` sección 8)
8. **RSVP** — formulario de confirmación; usa nombre/cupo del invitado si vino
   por `/i/:slug`
9. **Cierre / Footer** — agradecimiento, firma de los novios, fecha

Controles flotantes persistentes (no son secciones propias, viven en el shell):
reproductor de música (mute/unmute), selector de idioma ES/EN, dots de
navegación (opcional).

### Panel de administración (`/admin/*`)

Layout de dashboard tradicional — **no** usa scroll-snap, es para uso interno
de los 3 administradores.

1. **Login** (`/admin/login`) — Google Sign-In restringido a los correos en
   la colección `admins` de Firestore
2. **Dashboard** (`/admin`) — resumen: total invitados, confirmados,
   pendientes, rechazados, total de acompañantes confirmados
3. **Invitados** (`/admin/guests`) — listado con alta/edición/eliminación
   inline y el link único (`/i/:slug`) para copiar. Decisión de
   implementación: se combinó con "Respuestas RSVP" en una sola pantalla —
   cada fila ya muestra estado, acompañantes confirmados, restricciones
   alimenticias y mensaje; separarlas no aportaba valor para el volumen de
   invitados esperado.

## 4. Pendiente de definición

- Fotos reales para Hero/Galería (el usuario las proveerá más adelante).
- Coordenadas/place_id exactos de los dos locales, si se agrega QR a Google
  Maps (mejora opcional, no bloqueante).
- Variantes exactas de animación por sección (se define en la fase de
  implementación del shell, junto con `frontend-developer`).
