# Progreso del proyecto

Checklist vivo del avance. Se actualiza al cerrar cada sesión o al completar una
tarea (ver skill `update-progress`). `[x]` = hecho y certificado por QA, `[~]` = en
progreso, `[ ]` = pendiente.

_Última actualización: 2026-08-11_

## Fase 0 — Planificación

- [x] Definir alcance funcional (`docs/PROJECT.md`)
- [x] Definir stack técnico (React + Vite + Firebase)
- [x] Definir estándar de testing (Vitest + RTL / Playwright)
- [x] Levantar contenido base del evento (`informacion_base.md`)
- [x] Crear agentes especializados (`.claude/agents/`)
- [x] Crear skills globales y específicas
- [x] Definir librería de estilos — Tailwind CSS
- [x] Definir proveedor de sign-in — Google Sign-In (allow-list de 3 correos)
- [x] Definir identidad visual y patrón de navegación (`docs/DESIGN.md`)
- [x] Definir mapa de pantallas (invitado + admin) (`docs/DESIGN.md`)
- [x] Crear proyecto en Firebase Console — `boda-teresa-renzo` (región de
      Firestore/Storage aún sin definir, se elige en Fase 1 al activar esos
      productos)
- [x] Crear repositorio en GitHub y conectar remoto — https://github.com/RenzoCordovaDev/virtual_invitation (público)

## Fase 1 — Setup del proyecto

- [x] Scaffold Vite + React (TypeScript) — Vite 8, React 19, TS 6
- [x] Configurar ESLint + Prettier
- [x] Configurar Tailwind CSS con tokens de `docs/DESIGN.md`
- [x] Configurar Firebase SDK (app/auth/firestore) en el proyecto —
      `src/lib/firebase/config.ts`, vía variables de entorno
- [x] Configurar Vitest + React Testing Library
- [x] Configurar Playwright
- [x] Estructura base `src/features/`, `src/content/`, `src/config/features.ts`,
      `src/layout/`
- [x] Reglas de seguridad de Firestore (`firestore.rules`, allow-list vía
      colección `admins`, sin correos reales) — primer borrador, se afina al
      implementar `rsvp`/`admin`
- [x] Habilitar Cloud Firestore API + crear base de datos — región
      `southamerica-east1`, reglas (`firestore.rules`) ya desplegadas y
      compiladas sin errores
- [x] Habilitar Google Sign-In en Firebase Auth (consola) — confirmado por el
      usuario
- [x] Completar `.env.local` con la config real de Firebase — app web
      registrada por CLI (`Invitacion Teresa y Renzo (web)`), config real
      escrita en `.env.local` (gitignored, nunca comiteado)

Fase 1 100% completa, incluyendo los 3 pasos manuales de consola.

QA certificado 2026-08-11: `npm run build`, `npm run lint`, `npm run test` y
`npm run test:e2e` en verde. Working tree limpio (sin `node_modules/`, `dist/`
ni `informacion_base.local.md` trackeados).

## Fase 2 — Módulos funcionales (v1)

- [x] `countdown` — cuenta regresiva
- [x] `gallery` — galería de fotos / historia de la pareja (estructura +
      estado "próximamente"; contenido real pendiente)
- [x] `location` — mapas + horarios ceremonia/recepción
- [x] `dress-code` — código de vestimenta y paleta
- [x] `gift-table` — datos de regalo (bancos, Yape, Plin) — placeholders,
      números reales pendientes (nunca se comitean)
- [ ] `music-player` — audio de fondo
- [ ] `i18n` — multi-idioma ES/EN
- [ ] `rsvp` — confirmación de asistencia por link personalizado
- [ ] `admin` — login (3 usuarios) + gestión de invitados + links + respuestas

Cada módulo pasa por: frontend → unit tests → e2e (si aplica) → code review → QA
antes de marcarse `[x]`.

## Fase 3 — Integración y despliegue

- [ ] Despliegue a Firebase Hosting (preview channel)
- [ ] Prueba end-to-end en ambiente real con datos de prueba
- [ ] Carga de invitados reales en Firestore
- [ ] Despliegue a producción (subdominio `.web.app`)
- [ ] QA final de certificación completa (todos los módulos)

## Bloqueados / pendientes de decisión

- Detalles finales de mesa de regalos (números de cuenta reales — placeholder en
  `informacion_base.md`, nunca reales en el repo — ver `docs/PROJECT.md` sección 8).
- Fotos reales para Hero/Galería — el módulo `gallery` ya está listo para
  recibirlas en `src/content/gallery.ts` (`galleryPhotos`, `ourStory`) sin
  tocar el componente.
- Coordenadas/place_id exactos de los locales (mejora opcional para QR).

## Notas de sesión

- 2026-08-11: Cierre de fase de planificación. Stack y alcance acordados con el
  usuario. Contenido base completo en `informacion_base.md`. Próximo paso: definir
  estilos/sign-in pendientes y arrancar Fase 1 (scaffold).
- 2026-08-11: Existe un proyecto anterior en `G:\BODA\wedding-invitation`
  (React+TS+Tailwind+Framer Motion, más avanzado a nivel de UI/diseño, sin git ni
  tests). El usuario decidió explícitamente **no reutilizarlo**: este proyecto
  (`virtual_invitation`) se construye de cero siguiendo el plan de este documento.
  No proponer migrar ese código salvo pedido explícito.
- 2026-08-11: Definidas identidad visual y navegación (`docs/DESIGN.md`):
  Tailwind CSS, Google Sign-In para admins, scroll-snap de pantalla completa,
  paleta/tipografía adaptadas de `G:\BODA\PROJECT_CONTEXT.md` (solo el sistema
  de diseño, no el código de wedding-invitation). Se confirmó fecha de boda
  (26 dic 2026) y se corrigió el código de vestimenta en `informacion_base.md`
  para que sea inequívoco: TODOS los colores listados (blanco, vino
  tinto/borgoña, champagne, palo rosa, beige) están prohibidos para invitados
  sin excepción. Próximo paso: crear proyecto en Firebase Console y arrancar
  Fase 1 (scaffold).
- 2026-08-11: Proyecto Firebase creado — ID `boda-teresa-renzo`
  (https://console.firebase.google.com/project/boda-teresa-renzo/overview).
  Falta elegir región de Firestore/Storage y habilitar Firestore, Auth (Google
  Sign-In) y Hosting — se hace en Fase 1 junto con el scaffold. Fase 0
  (planificación) queda cerrada.
- 2026-08-11: Fase 1 (setup) certificada. Scaffold Vite+React+TS, Tailwind con
  tokens de marca, ESLint+Prettier, Firebase SDK (config vía env vars),
  estructura modular (`src/features/`, `src/content/`, `src/config/`,
  `src/layout/`), Vitest+RTL y Playwright configurados con un test de humo
  cada uno. `firestore.rules` primer borrador (allow-list de admins vía
  colección, sin correos reales). Build/lint/unit/e2e en verde. Quedan 3
  pasos manuales de consola antes de poder desplegar: habilitar Cloud
  Firestore API + crear la base de datos, habilitar Google Sign-In en Auth, y
  completar `.env.local` con la config real del proyecto Firebase. Siguiente
  paso: Fase 2, empezar por el módulo `countdown` (el más simple, sin
  dependencias de Firebase) o resolver los pendientes manuales de Firebase
  primero — a decidir con el usuario.
- 2026-08-11: Resueltos los 3 pendientes manuales de Firebase: API de
  Firestore habilitada + base de datos creada (`southamerica-east1`) y
  reglas desplegadas; Google Sign-In habilitado en Auth; app web registrada
  por CLI y `.env.local` completado con la config real (gitignored). Fase 1
  queda 100% cerrada. Siguiente paso: Fase 2, módulo `countdown`.
- 2026-08-11: Módulo `countdown` certificado — primer módulo funcional de la
  Fase 2. Incluye `src/content/event.ts` (contenido tipado desde
  `informacion_base.md`, fecha ancla en ISO con offset -05:00 de Perú para
  que el countdown sea correcto sin importar la zona horaria del invitado) y
  el shell mínimo de scroll-snap (`src/layout/ScrollContainer.tsx` +
  `Section.tsx`) que usarán los próximos módulos. Tests unitarios del hook
  (incluye el caso `isPast`) y del componente, más e2e actualizado al
  contenido real. Build/lint/unit/e2e en verde. Siguiente paso: elegir el
  próximo módulo de la Fase 2 (`gallery`, `location`, `dress-code`,
  `gift-table`, `music-player`, `i18n`, `rsvp` o `admin`).
- 2026-08-11: Módulo `location` certificado — dos secciones (Ceremonia,
  Recepción) con `VenueCard` compartido y `formatVenueTime` (siempre proyecta
  a horario de Perú, probado explícitamente con dos representaciones ISO del
  mismo instante). Mapas embebidos con `title` accesible. Tests unitarios de
  formateo/componente/secciones y e2e reforzado. Build/lint/unit/e2e en
  verde. Siguiente paso: elegir el próximo módulo (`gallery`, `dress-code`,
  `gift-table`, `music-player`, `i18n`, `rsvp` o `admin`).
- 2026-08-11: Módulo `dress-code` certificado. Usuario definió el orden para
  el resto de la Fase 2: `gallery` → `gift-table` → `music-player` → `i18n` →
  `rsvp`/`admin`. Sin e2e dedicado (no es flujo crítico según
  `docs/PROJECT.md` sección 5). Build/lint/unit en verde, e2e sin
  regresiones. Siguiente paso: `gallery`.
- 2026-08-11: Módulo `gallery` certificado con estado "Próximamente"
  (`src/content/gallery.ts` vacío hasta que el usuario provea fotos/historia
  — cuando lleguen, se completan ahí sin tocar el componente). De paso se
  corrigió el orden de secciones en `App.tsx` para que coincida con el mapa
  de pantallas de `docs/DESIGN.md` (Countdown → Galería → Ceremonia →
  Recepción → Dress code), en vez del orden de construcción. Build/lint/unit
  en verde, e2e sin regresiones. Siguiente paso: `gift-table`.
- 2026-08-11: Módulo `gift-table` certificado. `src/content/giftTable.ts`
  con los placeholders actuales de `informacion_base.md`; cuando el usuario
  tenga los números reales, se cargarán vía un mecanismo local no versionado
  (mismo criterio que `informacion_base.local.md`/`.env.local`), nunca
  comiteados. Build/lint/unit en verde, e2e sin regresiones. Siguiente paso:
  `music-player`.
