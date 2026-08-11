import { expect, test } from '@playwright/test'

test('la portada muestra los nombres de los novios', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading', { name: /teresa.*renzo/i })).toBeVisible()
})
