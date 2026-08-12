import { expect, test } from '@playwright/test'
import { openEnvelope } from './helpers'

test('la portada carga con el countdown y las secciones de ubicación', async ({ page }) => {
  await page.goto('/')
  await openEnvelope(page)

  await expect(page.getByRole('heading', { name: /falta muy poco/i })).toBeVisible()
  await expect(page.getByText('Días')).toBeVisible()

  await expect(page.getByRole('heading', { name: 'Ceremonia' })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Recepción' })).toBeVisible()
})
