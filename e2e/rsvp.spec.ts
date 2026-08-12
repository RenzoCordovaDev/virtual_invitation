import { getApps, initializeApp } from 'firebase-admin/app'
import { getFirestore } from 'firebase-admin/firestore'
import { expect, test } from '@playwright/test'
import { openEnvelope } from './helpers'

process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080'
const PROJECT_ID = 'boda-teresa-renzo'

function adminDb() {
  const app = getApps()[0] ?? initializeApp({ projectId: PROJECT_ID })
  return getFirestore(app)
}

test.describe('rsvp', () => {
  test('un invitado confirma su asistencia desde su link personal', async ({ page }) => {
    const db = adminDb()
    const slug = 'e2e-guest-confirm'
    await db
      .collection('guests')
      .doc(slug)
      .set({
        slug,
        displayName: 'Familia E2E RSVP',
        maxCompanions: 3,
        rsvpStatus: 'pending',
        confirmedCompanions: 0,
        dietaryRestrictions: '',
        message: '',
        respondedAt: null,
        createdAt: new Date().toISOString(),
      })

    await page.goto(`/i/${slug}`)
    await openEnvelope(page)
    await expect(page.getByText(/Familia E2E RSVP/)).toBeVisible()

    await page.getByRole('button', { name: 'Sí, ahí estaré' }).click()
    await page.getByLabel(/Acompañantes/).fill('2')
    await page.getByLabel('Restricciones alimenticias (opcional)').fill('Sin lactosa')
    await page.getByRole('button', { name: 'Confirmar respuesta' }).click()

    await expect(page.getByRole('status')).toContainText('Gracias por confirmar')

    const snap = await db.collection('guests').doc(slug).get()
    const data = snap.data()
    expect(data?.rsvpStatus).toBe('confirmed')
    expect(data?.confirmedCompanions).toBe(2)
    expect(data?.dietaryRestrictions).toBe('Sin lactosa')
  })

  test('un link inválido muestra el mensaje de no encontrado', async ({ page }) => {
    await page.goto('/i/slug-que-no-existe')
    await openEnvelope(page)

    await expect(
      page.getByText('No encontramos tu invitación. Verifica el link que te compartimos.'),
    ).toBeVisible()
  })
})
