import { expect, test } from '@playwright/test'

test('la portada carga y muestra el countdown', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /falta muy poco/i })).toBeVisible()
  await expect(page.getByText('Días')).toBeVisible()
})
