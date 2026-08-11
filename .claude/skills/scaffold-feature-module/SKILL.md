---
name: scaffold-feature-module
description: Crea la estructura de carpetas y archivos base para un nuevo módulo/feature de la invitación (ej. countdown, gallery, rsvp), siguiendo la arquitectura modular definida en docs/PROJECT.md. Úsala antes de empezar a implementar un módulo nuevo.
---

# Scaffold de un feature module

Aplica la convención de `docs/PROJECT.md` sección 4 ("Arquitectura modular").

1. Confirma el nombre del módulo (kebab-case) contra la tabla de `docs/PROJECT.md`
   sección 2 — no inventes módulos fuera de esa lista sin confirmar con el usuario.
2. Crea la carpeta `src/features/<modulo>/` con:
   - `index.ts` (barrel export del módulo — lo único que otros módulos importan)
   - `<Componente>.tsx` — componente principal
   - `<Componente>.test.tsx` — stub de test unitario (lo completa
     `unit-test-developer`)
   - `styles` según la librería de estilos definida en `docs/PROJECT.md` (pendiente
     de decisión — no asumir Tailwind ni CSS Modules si aún no está definido)
3. Registra el módulo en `src/config/features.ts` con su flag booleana (default
   `true` salvo que el usuario pida lo contrario), sin tocar la lógica de otros
   módulos ya registrados.
4. Si el módulo consume contenido del evento, agrega/reutiliza el bloque
   correspondiente en `src/content/` — nunca strings del evento sueltos dentro del
   componente.
5. Si el módulo consume datos dinámicos (Firestore), la llamada va en
   `src/lib/firebase/`, no directo en el componente.
6. No implementes la lógica de negocio del módulo en este paso — el scaffold deja
   la estructura lista para que `frontend-developer` implemente.
