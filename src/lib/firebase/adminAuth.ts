import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  type User,
  type Unsubscribe,
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'
import { auth, googleProvider } from './authConfig'
import { db } from './config'

export function signInAdminWithGoogle(): Promise<User> {
  return signInWithPopup(auth, googleProvider).then((result) => result.user)
}

export function signOutAdmin(): Promise<void> {
  return signOut(auth)
}

export function subscribeToAuthState(callback: (user: User | null) => void): Unsubscribe {
  return onAuthStateChanged(auth, callback)
}

/**
 * Verifica contra la colección `admins` de Firestore (ver firestore.rules)
 * que el correo autenticado está en el allow-list. Un correo de Google no
 * autorizado obtiene permission-denied al intentar leer su propio doc — se
 * interpreta como "no es admin".
 */
export async function verifyIsAdmin(email: string): Promise<boolean> {
  try {
    const snap = await getDoc(doc(db, 'admins', email))
    return snap.exists()
  } catch {
    return false
  }
}
