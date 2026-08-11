# Invitación Virtual — Teresa & Renzo

Invitación de boda digital y personalizada por invitado. Este archivo se carga
automáticamente en cada sesión de Claude Code dentro de este proyecto — es el punto
de partida para retomar el trabajo sin perder contexto.

**Al iniciar una sesión nueva, lee en este orden:**
1. `PROGRESS.md` — qué está hecho, qué sigue, qué está bloqueado.
2. `docs/PROJECT.md` — definición funcional y técnica completa.
3. `informacion_base.md` — contenido real del evento (nombres, fecha, ubicaciones,
   dress code, mesa de regalos, música, correos de administradores).

## Resumen del stack

- React + Vite (SPA)
- Firebase: Firestore (solo datos dinámicos de invitados/RSVP), Firebase Auth
  (3 administradores), Firebase Hosting (despliegue, subdominio `.web.app`)
- Testing: Vitest + React Testing Library (unitarios), Playwright (e2e)
- Arquitectura modular por feature: `src/features/<modulo>/`, activables/
  desactivables desde `src/config/features.ts`

## Reglas de trabajo

- **No se toca código sin que el módulo correspondiente esté en `PROGRESS.md`.**
  Si surge una funcionalidad nueva, primero se agrega al checklist con su alcance,
  luego se implementa.
- **Repo público, dato sensible fuera de git**: correos/celulares/cuentas reales
  van solo en `informacion_base.local.md` (gitignored), nunca en un commit. Ver
  `docs/PROJECT.md` sección 8. El nombre de los novios, fecha, locales y dress
  code sí van en el repo (van a ser públicos en el sitio de todas formas).
- **El contenido del evento vive en `informacion_base.md`**, no se hardcodea texto
  del evento (nombres, fecha, direcciones) directo en componentes — se centraliza
  en `src/content/`.
- **Cada feature es desacoplable**: si algo deja de necesitarse, se apaga el flag
  en `src/config/features.ts` sin tener que tocar otros módulos.
- **Flujo profesional por tarea**: orquestador → frontend-developer → unit-test-
  developer → e2e-test-developer (si aplica) → code-reviewer → qa-certifier. Ver
  `.claude/agents/` para el detalle de cada rol y `docs/PROJECT.md` sección 6.
- **Testing no es opcional**: ninguna feature se marca como terminada en
  `PROGRESS.md` sin tests unitarios (y e2e si toca un flujo crítico) en verde.
- Al cerrar una sesión de trabajo, actualizar `PROGRESS.md` con el avance real
  (usar la skill `update-progress`).

## Agentes disponibles

Ver `.claude/agents/`: `project-orchestrator`, `frontend-developer`,
`unit-test-developer`, `e2e-test-developer`, `code-reviewer`, `qa-certifier`.

## Skills disponibles

Específicas del proyecto (`.claude/skills/`): `deploy-firebase`,
`run-full-test-suite`, `scaffold-feature-module`, `update-progress`.

Globales (`~/.claude/skills/`): `spec-driven-feature`, `session-handoff`.

## Control de versiones

Repositorio Git local inicializado en la raíz del proyecto. Identidad configurada
localmente (no global): `rcordova.reco@gmail.com`. **Cada agente comitea su propio
trabajo con su nombre de agente como autor** (misma cuenta de correo, nombre
distinto por agente) para que la traza de git muestre qué hizo cada uno — ver la
sección "Commits" en cada archivo de `.claude/agents/`. No mezclar en un commit
trabajo de más de un agente/rol.

Pendiente de conectar a GitHub (confirmar con el usuario nombre y visibilidad del
repo antes de crear el remoto o hacer push).

## Asignación de modelos por agente

Para optimizar uso de tokens: agentes de **desarrollo/implementación**
(`frontend-developer`, `unit-test-developer`, `e2e-test-developer`) usan
`claude-sonnet-4-8`. Agentes de **análisis y toma de decisiones**
(`project-orchestrator`, `code-reviewer`, `qa-certifier`) usan `claude-sonnet-5`.
Esta asignación vive en el frontmatter (`model:`) de cada archivo en
`.claude/agents/` — si cambia la política, actualizar ahí y aquí.
