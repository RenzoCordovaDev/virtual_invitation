---
name: run-full-test-suite
description: Corre la suite completa de tests del proyecto (unitarios Vitest + e2e Playwright) y resume el resultado. Úsala antes de que qa-certifier certifique un módulo, o cuando el usuario pida "corre los tests".
---

# Correr la suite de tests

Requiere que el proyecto ya esté scaffoldeado (Fase 1 de `PROGRESS.md`). Si
`package.json` no existe todavía, no hay nada que correr — indícalo en vez de
inventar resultados.

1. Unitarios: `npm run test` (Vitest). Si el módulo bajo prueba es específico, se
   puede acotar con `npm run test -- <patrón>`.
2. E2E: `npm run test:e2e` (Playwright), contra el emulador de Firebase — nunca
   contra el proyecto Firebase productivo. Si el emulador no está corriendo,
   levantarlo primero (`firebase emulators:start` o el script equivalente) antes de
   correr Playwright.
3. Reporta: cuántos tests unitarios y e2e pasaron/fallaron, y para cada falla el
   archivo y la razón (no solo "falló").
4. Si algo falla, no lo marques como éxito parcial — el resultado es "no certificable"
   hasta que esté en verde. Indica a qué agente le corresponde el fix
   (`frontend-developer` si es un bug de producción, `unit-test-developer` o
   `e2e-test-developer` si el test está mal escrito).
