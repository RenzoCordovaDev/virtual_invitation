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
- [ ] Crear proyecto en Firebase Console (nombre, región)
- [x] Crear repositorio en GitHub y conectar remoto — https://github.com/RenzoCordovaDev/virtual_invitation (público)

## Fase 1 — Setup del proyecto

- [ ] Scaffold Vite + React (TypeScript)
- [ ] Configurar ESLint + Prettier
- [ ] Configurar Firebase SDK (Firestore, Auth, Hosting) en el proyecto
- [ ] Configurar Vitest + React Testing Library
- [ ] Configurar Playwright
- [ ] Estructura base `src/features/`, `src/content/`, `src/config/features.ts`
- [ ] Reglas de seguridad de Firestore (allow-list de 3 correos admin)

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
