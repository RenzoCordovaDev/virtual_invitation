import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import type { User } from 'firebase/auth'

async function renderAdminAt(
  path: string,
  status: 'loading' | 'unauthenticated' | 'unauthorized' | 'authorized',
) {
  vi.resetModules()
  vi.doMock('./useAdminAuth', () => ({
    useAdminAuth: () =>
      status === 'authorized' || status === 'unauthorized'
        ? { status, user: { email: 'admin@example.com' } as User }
        : { status },
  }))
  vi.doMock('./useGuests', () => ({
    useGuests: () => ({ guests: [], loading: false, error: null, reload: vi.fn() }),
  }))
  vi.doMock('../../lib/firebase/adminAuth', () => ({
    signInAdminWithGoogle: vi.fn(),
    signOutAdmin: vi.fn(),
  }))
  const { AdminRoutes } = await import('./AdminRoutes')

  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('AdminRoutes', () => {
  it('/admin/login muestra el login sin necesitar autorización', async () => {
    await renderAdminAt('/admin/login', 'unauthenticated')
    expect(screen.getByRole('button', { name: /iniciar sesión con google/i })).toBeInTheDocument()
  })

  it('/admin sin sesión redirige al login', async () => {
    await renderAdminAt('/admin', 'unauthenticated')
    expect(screen.getByRole('button', { name: /iniciar sesión con google/i })).toBeInTheDocument()
  })

  it('/admin autorizado muestra el Dashboard', async () => {
    await renderAdminAt('/admin', 'authorized')
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })

  it('/admin/guests autorizado muestra Invitados', async () => {
    await renderAdminAt('/admin/guests', 'authorized')
    expect(screen.getByRole('heading', { name: 'Invitados' })).toBeInTheDocument()
  })

  it('una ruta admin desconocida redirige al Dashboard', async () => {
    await renderAdminAt('/admin/algo-que-no-existe', 'authorized')
    expect(screen.getByRole('heading', { name: 'Dashboard' })).toBeInTheDocument()
  })
})
