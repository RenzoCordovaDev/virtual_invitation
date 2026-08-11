import type { ReactNode } from 'react'
import { Navigate } from 'react-router'
import { useAdminAuth } from './useAdminAuth'

export function RequireAdmin({ children }: { children: ReactNode }) {
  const state = useAdminAuth()

  if (state.status === 'authorized') {
    return <>{children}</>
  }
  if (state.status === 'loading') {
    return <p className="p-8 text-center">Cargando…</p>
  }
  return <Navigate to="/admin/login" replace />
}
