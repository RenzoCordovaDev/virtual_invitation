# Invitación Virtual — Teresa & Renzo

Definición funcional y técnica del proyecto. Este documento es la fuente de verdad
del _qué_ y _cómo_ se construye la invitación. Para el estado de avance ver
[`PROGRESS.md`](../PROGRESS.md). Para el contenido real del evento (fechas, textos,
ubicaciones) ver [`informacion_base.md`](../informacion_base.md).

## 1. Objetivo

Invitación de boda 100% digital, personalizada por invitado, con confirmación de
asistencia (RSVP) gestionada por los novios y la organizadora desde un panel de
administración propio.

## 2. Alcance funcional (v1)

Todas las funcionalidades se construyen como **módulos independientes y
desacoplables**: cada una vive en su propia carpeta de feature, se activa/desactiva
desde un registro central de features, y no rompe al resto si se retira. Ver
`ARCHITECTURE.md` (sección 4 de este documento) para el patrón exacto.

| Módulo         | Descripción                                                         | Prioridad |
| -------------- | ------------------------------------------------------------------- | --------- |
| `countdown`    | Cuenta regresiva a la fecha/hora del evento religioso               | v1        |
| `gallery`      | Galería de fotos / historia de la pareja                            | v1        |
| `location`     | Mapas embebidos + horarios de iglesia y recepción                   | v1        |
| `dress-code`   | Código de vestimenta y paleta de colores                            | v1        |
| `rsvp`         | Confirmación de asistencia, invitación personalizada por link único | v1        |
| `gift-table`   | Datos de cuentas/Yape/Plin para regalo                              | v1        |
| `music-player` | Reproductor de audio de fondo (autoplay/mute toggle)                | v1        |
| `i18n`         | Multi-idioma (ES por defecto, EN opcional)                          | v1        |
| `admin`        | Panel privado: gestión de invitados, links, respuestas RSVP         | v1        |

Fuera de alcance por ahora (no se descarta a futuro, no se construye en v1):
transmisión en vivo del evento, integración de pagos, app móvil nativa.

## 3. Roles y usuarios

3 usuarios administradores autenticados vía Firebase Auth (correos en
`informacion_base.md`, sección "Datos de usuarios autenticados"):

- **RECO** (Renzo) — novio
- **Jeshu** (Teresa) — novia
- **organizador** — organizadora del evento

Todos con el mismo nivel de acceso al panel admin (no hay jerarquía de roles en v1):
alta/baja/edición de invitados, generación de links personalizados, visualización y
exportación de confirmaciones RSVP (asistencia, número de acompañantes,
restricciones alimenticias, mensaje opcional).

Los invitados (público) no se autentican: acceden por su link único
(`/i/:slug`) y confirman asistencia sin necesidad de cuenta.

## 4. Arquitectura técnica

- **Frontend**: React + Vite (SPA), React Router para rutas públicas (`/`, `/i/:slug`)
  y privadas (`/admin/*`).
- **Backend/datos**: Firebase (proyecto `boda-teresa-renzo`,
  https://console.firebase.google.com/project/boda-teresa-renzo/overview)
  - **Firestore**: colección `guests` (invitados/familias, slug único, cupo de
    acompañantes, estado de confirmación, respuesta) — es la única data dinámica.
    El contenido del evento (nombres, fecha, ubicaciones, dress code, mesa de
    regalos, canción) vive versionado en código (`src/content/`), generado a partir
    de `informacion_base.md`, **no** en Firestore — es contenido estático que no
    necesita edición en caliente.
  - **Firebase Auth**: email/password (o Google) restringido a los 3 correos
    autorizados; reglas de seguridad de Firestore validan `request.auth.token.email`
    contra una allow-list.
  - **Firebase Hosting**: despliegue de producción, subdominio `*.web.app` por ahora.
    Firebase Hosting preview channels para revisar cambios antes de producción.
- **Arquitectura modular**: `src/features/<modulo>/` — cada feature con sus propios
  componentes, hooks, estilos y tests. Un registro central
  (`src/config/features.ts`) activa/desactiva módulos por flag booleana, de forma
  que agregar o quitar una funcionalidad no implica tocar otros módulos.
- **Estado**: React Context + hooks nativos (no se justifica Redux/Zustand para
  este tamaño de app).
- **Estilos**: Tailwind CSS. Tokens de color/tipografía y el resto del sistema
  de diseño en `docs/DESIGN.md`.
- **Navegación de invitados**: scroll-snap de pantalla completa (una sección =
  un viewport, con animación de transición, nunca una sección a medias) vía
  `src/layout/`. Detalle técnico y mapa de pantallas completo en
  `docs/DESIGN.md`.
- **Autenticación admin**: Firebase Auth con Google Sign-In, restringido por
  allow-list de los 3 correos (reglas de Firestore validan
  `request.auth.token.email`).

## 5. Testing (estándar del proyecto)

- **Unitarios**: Vitest + React Testing Library. Cada feature module trae sus tests
  junto al código (`Componente.test.tsx`).
- **E2E**: Playwright. Flujos críticos: invitado confirma asistencia vía link
  personalizado, admin agrega invitado y genera link, admin visualiza respuestas.
- **Cobertura mínima esperada**: lógica de negocio (validación RSVP, generación de
  slugs, reglas de acceso admin) al 100%; UI puramente visual, cobertura razonable
  sin perseguir el 100%.

## 6. Flujo de trabajo profesional (agentes)

1. **project-orchestrator** desglosa el trabajo pendiente (desde `PROGRESS.md`) en
   tareas concretas.
2. **frontend-developer** implementa el módulo/feature.
3. **unit-test-developer** escribe/actualiza tests unitarios del módulo.
4. **e2e-test-developer** escribe/actualiza tests e2e si el módulo afecta un flujo
   crítico.
5. **code-reviewer** revisa el diff (calidad, seguridad, convenciones) antes de dar
   por cerrada la tarea.
6. **qa-certifier** corre la suite completa y certifica el módulo contra los
   criterios de aceptación antes de marcarlo como hecho en `PROGRESS.md`.

Detalle de cada agente en `.claude/agents/`.

## 7. Datos de contenido

Todo el contenido real del evento (nombres, fecha/hora, direcciones, iframes de
mapas, dress code, paleta, datos de mesa de regalos, canción) se mantiene en
`informacion_base.md` en la raíz. Cuando ese archivo cambie, el módulo de contenido
(`src/content/`) debe regenerarse/actualizarse a mano — no hay sincronización
automática en v1.

## 8. Repositorio y manejo de datos sensibles

El repositorio de GitHub es **público** — es, además del código, una pieza de
portafolio profesional que evidencia el uso de agentes de IA especializados
orquestados por un flujo de trabajo definido (ver sección 6 y `.claude/agents/`),
con la traza de autoría visible en los commits.

Por ser público, se sigue esta regla estricta:

- **Nunca se comitea contacto/dato personal real** (correos de administradores,
  celulares, cuentas bancarias/Yape/Plin reales). Esos valores viven en
  `informacion_base.local.md` (gitignored) y se usan solo al configurar el
  despliegue real. `informacion_base.md` (versionado) mantiene la misma
  estructura con placeholders.
- **Contenido propio de la invitación** (nombres de los novios, fecha, nombre y
  dirección de los locales, dress code, paleta de colores) sí puede vivir en el
  repo — es contenido que de todas formas será público en el sitio desplegado.
- **Datos de invitados** (nombres, teléfonos, respuestas RSVP): cualquier dato de
  ejemplo/seed que se comitee (fixtures, datos de prueba para desarrollo) debe ser
  ficticio/aleatorio. La lista real de invitados se carga directo a Firestore de
  producción, nunca como archivo versionado en el repo.
- Antes de cada commit, revisar que no se esté por subir un dato personal real
  "de paso" (ver regla general de "Executing actions with care" del sistema).

## 9. Pendientes de definición

- Región de Firestore/Storage (se elige al habilitar esos productos en Fase 1).
- CI (GitHub Actions) para correr tests en cada PR — deseable, no bloqueante para
  arrancar a codificar.
- Fotos reales, coordenadas exactas de los locales — ver `docs/DESIGN.md`
  sección 4.

Resuelto: librería de estilos (Tailwind CSS), proveedor de sign-in (Google
Sign-In), identidad visual y mapa de pantallas — ver `docs/DESIGN.md`.
Repositorio GitHub: https://github.com/RenzoCordovaDev/virtual_invitation
(público).
