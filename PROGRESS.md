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
- [ ] Habilitar Google Sign-In en Firebase Auth (consola) — manual, pendiente
- [ ] Completar `.env.local` con la config real de Firebase (no comitear)

QA certificado 2026-08-11: `npm run build`, `npm run lint`, `npm run test` y
`npm run test:e2e` en verde. Working tree limpio (sin `node_modules/`, `dist/`
ni `informacion_base.local.md` trackeados).

## Fase 2 — Módulos funcionales (v1)

- [ ] `countdown` — cuenta regresiva
- [ ] `gallery` — galería de fotos / historia de la pareja
- [ ] `location` — mapas + horarios ceremonia/recepción
- [ ] `dress-code` — código de vestimenta y paleta
- [ ] `gift-table` — datos de regalo (bancos, Yape, Plin)
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
- Fotos reales para Hero/Galería.
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
