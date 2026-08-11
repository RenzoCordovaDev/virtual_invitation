import type { ReactNode } from 'react'
import { Link } from 'react-router'
import { signOutAdmin } from '../../lib/firebase/adminAuth'

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-dvh">
      <header className="border-guinda/40 flex items-center justify-between border-b p-4">
        <nav className="flex gap-4 text-sm">
          <Link to="/admin" className="text-guinda underline">
            Dashboard
          </Link>
          <Link to="/admin/guests" className="text-guinda underline">
            Invitados
          </Link>
        </nav>
        <button type="button" onClick={() => void signOutAdmin()} className="text-sm underline">
          Cerrar sesión
        </button>
      </header>
      <main>{children}</main>
    </div>
  )
}
