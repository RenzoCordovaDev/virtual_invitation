import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import type { User } from 'firebase/auth'

function renderProtected(mockStatus: 'loading' | 'unauthenticated' | 'unauthorized' | 'authorized') {
  vi.resetModules()
  vi.doMock('./useAdminAuth', () => ({
    useAdminAuth: () =>
      mockStatus === 'authorized' || mockStatus === 'unauthorized'
        ? { status: mockStatus, user: { email: 'admin@example.com' } as User }
        : { status: mockStatus },
  }))

  return import('./RequireAdmin').then(({ RequireAdmin }) =>
    render(
      <MemoryRouter initialEntries={['/admin']}>
        <Routes>
          <Route
            path="/admin"
            element={
              <RequireAdmin>
                <p>Contenido protegido</p>
              </RequireAdmin>
            }
          />
          <Route path="/admin/login" element={<p>Página de login</p>} />
        </Routes>
      </MemoryRouter>,
    ),
  )
}

describe('RequireAdmin', () => {
  it('muestra un loader mientras se verifica la sesión', async () => {
    await renderProtected('loading')
    expect(screen.getByText('Cargando…')).toBeInTheDocument()
  })

  it('renderiza a los hijos si está autorizado', async () => {
    await renderProtected('authorized')
    expect(screen.getByText('Contenido protegido')).toBeInTheDocument()
  })

  it('redirige a /admin/login si no está autenticado', async () => {
    await renderProtected('unauthenticated')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })

  it('redirige a /admin/login si está autenticado pero no autorizado', async () => {
    await renderProtected('unauthorized')
    expect(screen.getByText('Página de login')).toBeInTheDocument()
  })
})
