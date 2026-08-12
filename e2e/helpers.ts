import type { Page } from '@playwright/test'

/**
 * La invitación (/, /i/:slug) arranca con el modal de sobre cubriendo toda
 * la pantalla — un usuario real tiene que abrirlo antes de poder interactuar
 * con el contenido de atrás. Los e2e que navegan a esas rutas deben llamar
 * esto antes de cualquier click/fill sobre el contenido.
 */
export async function openEnvelope(page: Page) {
  // El sello tiene una animación de "respiración" infinita (Framer Motion) —
  // Playwright lo considera perpetuamente "inestable" para un click normal,
  // aunque un usuario real puede clickearlo sin problema. force:true evita
  // ese chequeo de estabilidad sin afectar el resto de las validaciones.
  await page.getByRole('button', { name: 'Click para abrir' }).click({ force: true })
  await page.getByRole('button', { name: 'Click para abrir' }).waitFor({ state: 'hidden' })
}
