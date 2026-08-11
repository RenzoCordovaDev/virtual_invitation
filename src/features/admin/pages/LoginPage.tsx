import { Navigate } from 'react-router'
import { signInAdminWithGoogle, signOutAdmin } from '../../../lib/firebase/adminAuth'
import { useAdminAuth } from '../useAdminAuth'

export function LoginPage() {
  const state = useAdminAuth()

  if (state.status === 'authorized') {
    return <Navigate to="/admin" replace />
  }

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 p-8 text-center">
      <h1 className="font-title text-3xl text-guinda">Panel de administración</h1>

      {state.status === 'unauthorized' ? (
        <>
          <p className="text-guinda-oscuro">
            {state.user.email} no está autorizado para entrar al panel.
          </p>
          <button
            type="button"
            onClick={() => void signOutAdmin()}
            className="bg-guinda text-marfil rounded-full px-6 py-3"
          >
            Probar con otra cuenta
          </button>
        </>
      ) : (
        <button
          type="button"
          onClick={() => void signInAdminWithGoogle()}
          disabled={state.status === 'loading'}
          className="bg-guinda text-marfil rounded-full px-6 py-3 disabled:opacity-50"
        >
          Iniciar sesión con Google
        </button>
      )}
    </div>
  )
}
