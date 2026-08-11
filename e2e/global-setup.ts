/**
 * Siembra el emulador de Firestore antes de correr los tests e2e. Requiere
 * que los emuladores ya estén corriendo (`firebase emulators:start` en otra
 * terminal) — no los levanta este script, ver docs/PROJECT.md sección 5.
 */
process.env.FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080'

const PROJECT_ID = 'boda-teresa-renzo'
export const E2E_ADMIN_EMAIL = 'e2e-admin@example.com'

export default async function globalSetup() {
  const { initializeApp } = await import('firebase-admin/app')
  const { getFirestore } = await import('firebase-admin/firestore')

  const app = initializeApp({ projectId: PROJECT_ID })
  const db = getFirestore(app)

  const guestsSnap = await db.collection('guests').get()
  await Promise.all(guestsSnap.docs.map((docSnap) => docSnap.ref.delete()))

  await db.collection('admins').doc(E2E_ADMIN_EMAIL).set({ email: E2E_ADMIN_EMAIL })
}
