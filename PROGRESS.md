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
- [ ] Definir librería de estilos (CSS Modules vs Tailwind)
- [ ] Definir proveedor de sign-in (password vs Google) para Firebase Auth
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

- Librería de estilos.
- Proveedor de sign-in para admins.
- Detalles finales de mesa de regalos (números de cuenta reales — placeholder en
  `informacion_base.md`).

## Notas de sesión

- 2026-08-11: Cierre de fase de planificación. Stack y alcance acordados con el
  usuario. Contenido base completo en `informacion_base.md`. Próximo paso: definir
  estilos/sign-in pendientes y arrancar Fase 1 (scaffold).
- 2026-08-11: Existe un proyecto anterior en `G:\BODA\wedding-invitation`
  (React+TS+Tailwind+Framer Motion, más avanzado a nivel de UI/diseño, sin git ni
  tests). El usuario decidió explícitamente **no reutilizarlo**: este proyecto
  (`virtual_invitation`) se construye de cero siguiendo el plan de este documento.
  No proponer migrar ese código salvo pedido explícito.
