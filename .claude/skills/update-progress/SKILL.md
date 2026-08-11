---
name: update-progress
description: Actualiza PROGRESS.md al terminar una tarea o cerrar una sesión de trabajo en este proyecto. Úsala cuando se complete/certifique un módulo, cuando cambie el alcance, o al final de la sesión para dejar contexto claro para la próxima.
---

# Actualizar PROGRESS.md

1. Lee `PROGRESS.md` completo antes de editarlo — no dupliques ítems ni pierdas
   notas previas.
2. Reglas de estado:
   - `[x]` únicamente si `qa-certifier` certificó el ítem (tests en verde,
     criterios de aceptación cumplidos).
   - `[~]` si hay trabajo iniciado pero no certificado.
   - `[ ]` si no se ha empezado.
3. Si se agregó alcance nuevo (una funcionalidad no listada antes), primero
   reflejarlo en `docs/PROJECT.md` sección 2, luego agregar el ítem correspondiente
   aquí.
4. Actualiza la línea `_Última actualización: YYYY-MM-DD_` al tope del archivo.
5. Agrega una entrada breve en "Notas de sesión" (fecha + 1-3 líneas) con: qué se
   avanzó, qué quedó pendiente/bloqueado, y cuál es el siguiente paso concreto —
   debe ser suficiente para que alguien retome el trabajo sin releer todo el
   historial de la conversación.
6. Si algo quedó bloqueado por una decisión del usuario, agrégalo (o actualízalo)
   bajo "Bloqueados / pendientes de decisión" con la pregunta concreta pendiente.
