import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { app } from './config'

// Separado de config.ts a propósito: firebase/auth (Google Sign-In, popup,
// etc.) solo lo necesita el panel admin. Si viviera en config.ts, cualquier
// página de invitado que solo necesita Firestore (ej. RSVP) arrastraría
// también el SDK de Auth al bundle principal.
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

if (import.meta.env.VITE_USE_FIREBASE_EMULATOR === 'true') {
  connectAuthEmulator(auth, 'http://127.0.0.1:9099', { disableWarnings: true })
}
