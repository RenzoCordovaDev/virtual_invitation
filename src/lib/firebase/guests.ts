import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import { nanoid } from 'nanoid'
import type { Guest, NewGuestInput, RsvpSubmission } from '../../types/guest'
import { db } from './config'

const GUESTS_COLLECTION = 'guests'

function guestRef(slug: string) {
  return doc(db, GUESTS_COLLECTION, slug)
}

/** Público: usado por la página /i/:slug. Devuelve null si el slug no existe. */
export async function getGuestBySlug(slug: string): Promise<Guest | null> {
  const snap = await getDoc(guestRef(slug))
  return snap.exists() ? (snap.data() as Guest) : null
}

/** Público: el invitado confirma/rechaza desde su propio link. */
export async function submitRsvp(slug: string, submission: RsvpSubmission): Promise<void> {
  await updateDoc(guestRef(slug), {
    ...submission,
    respondedAt: new Date().toISOString(),
  })
}

/** Solo admin (reglas de Firestore lo exigen). */
export async function listGuests(): Promise<Guest[]> {
  const snap = await getDocs(query(collection(db, GUESTS_COLLECTION), orderBy('createdAt', 'desc')))
  return snap.docs.map((d) => d.data() as Guest)
}

/** Solo admin. Genera un slug aleatorio no adivinable (no basado en el nombre). */
export async function createGuest(input: NewGuestInput): Promise<Guest> {
  const guest: Guest = {
    slug: nanoid(10),
    displayName: input.displayName,
    maxCompanions: input.maxCompanions,
    rsvpStatus: 'pending',
    confirmedCompanions: 0,
    dietaryRestrictions: '',
    message: '',
    respondedAt: null,
    createdAt: new Date().toISOString(),
  }
  await setDoc(guestRef(guest.slug), guest)
  return guest
}

/** Solo admin. Edita nombre/cupo — nunca el slug ni los campos de respuesta RSVP. */
export async function updateGuest(
  slug: string,
  patch: Partial<NewGuestInput>,
): Promise<void> {
  await updateDoc(guestRef(slug), patch)
}

/** Solo admin. */
export async function deleteGuest(slug: string): Promise<void> {
  await deleteDoc(guestRef(slug))
}
