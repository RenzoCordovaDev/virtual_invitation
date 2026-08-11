---
name: deploy-firebase
description: Despliega la invitación a Firebase Hosting (preview channel o producción). Úsala cuando el usuario pida ver los cambios en un ambiente real o publicar la versión productiva.
---

# Deploy a Firebase Hosting

Requiere que el proyecto Firebase ya esté creado y vinculado (`firebase init` /
`.firebaserc` presente) — si no existe todavía, es un pendiente de Fase 0/1 en
`PROGRESS.md`, no algo que improvisar aquí.

## Preview (por defecto — para revisar cambios antes de producción)

1. `npm run build`
2. `firebase hosting:channel:deploy <nombre-del-preview>` — usar un nombre
   descriptivo de la tarea/rama (ej. `rsvp-module`).
3. Compartir la URL de preview generada; **no** es la URL de producción.

## Producción

Solo desplegar a producción cuando el usuario lo pida explícitamente (es una
acción visible externamente — los invitados verían el sitio). Antes de desplegar:

1. Confirmar que `run-full-test-suite` está en verde.
2. Confirmar que `qa-certifier` certificó los módulos incluidos en este deploy.
3. `npm run build`
4. `firebase deploy --only hosting`
5. Verificar manualmente la URL productiva (`*.web.app`) después del deploy.

Nunca ejecutar `firebase deploy` (producción) sin confirmación explícita del
usuario para ese despliegue puntual.
