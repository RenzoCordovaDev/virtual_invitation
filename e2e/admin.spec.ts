import { expect, test, type Page } from '@playwright/test'
import { E2E_ADMIN_EMAIL } from './global-setup'

async function signInAsEmulatedAdmin(page: Page) {
  const popupPromise = page.waitForEvent('popup')
  await page.getByRole('button', { name: /iniciar sesión con google/i }).click()
  const popup = await popupPromise
  await popup.waitForLoadState()

  // UI del emulador de Firebase Auth: si no hay cuentas de prueba todavía,
  // primero hay que crear una ("Add new account") antes de que aparezca el
  // campo de correo.
  const addAccount = popup.getByRole('button', { name: /add new account/i })
  if (await addAccount.isVisible().catch(() => false)) {
    await addAccount.click()
  }

  await popup.getByLabel(/email/i).fill(E2E_ADMIN_EMAIL)
  await popup.getByRole('button', { name: /sign in|log in|continue/i }).click()
}

test.describe('admin', () => {
  test('acceso sin sesión redirige a login; iniciar sesión lleva al dashboard', async ({
    page,
  }) => {
    await page.goto('/admin/guests')
    await expect(page.getByRole('button', { name: /iniciar sesión con google/i })).toBeVisible()

    await signInAsEmulatedAdmin(page)

    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible()
  })

  test('agregar un invitado genera su link único', async ({ page }) => {
    await page.goto('/admin/login')
    await signInAsEmulatedAdmin(page)

    await page.getByRole('link', { name: 'Invitados', exact: true }).click()
    await page.getByRole('button', { name: 'Agregar invitado' }).click()
    await page.getByLabel(/nombre \/ familia/i).fill('Familia E2E')
    await page.getByLabel(/cupo de acompañantes/i).fill('2')
    await page.getByRole('button', { name: 'Crear' }).click()

    await expect(page.getByText('Familia E2E')).toBeVisible()
    await expect(page.getByText('Pendiente')).toBeVisible()
  })
})
