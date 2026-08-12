import type { Page } from '@playwright/test'

/**
 * La invitación (/, /i/:slug) arranca con el modal de sobre cubriendo toda
 * la pantalla — un usuario real tiene que abrirlo antes de poder interactuar
 * con el contenido de atrás. Los e2e que navegan a esas rutas deben llamar
 * esto antes de cualquier click/fill sobre el contenido.
 */
export async function openEnvelope(page: Page) {
  await page.getByRole('button', { name: 'Click para abrir' }).click()
  await page.getByRole('button', { name: 'Click para abrir' }).waitFor({ state: 'hidden' })
}
