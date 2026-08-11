import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter, Route, Routes } from 'react-router'
import type { User } from 'firebase/auth'

async function setup(
  authState: { status: 'loading' } | { status: 'unauthenticated' } | { status: 'unauthorized'; user: User },
  mocks: { signIn?: ReturnType<typeof vi.fn>; signOut?: ReturnType<typeof vi.fn> } = {},
) {
  vi.resetModules()
  vi.doMock('../useAdminAuth', () => ({ useAdminAuth: () => authState }))
  vi.doMock('../../../lib/firebase/adminAuth', () => ({
    signInAdminWithGoogle: mocks.signIn ?? vi.fn(),
    signOutAdmin: mocks.signOut ?? vi.fn(),
  }))
  const { LoginPage } = await import('./LoginPage')

  return render(
    <MemoryRouter initialEntries={['/admin/login']}>
      <Routes>
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin" element={<p>Dashboard</p>} />
      </Routes>
    </MemoryRouter>,
  )
}

describe('LoginPage', () => {
  it('muestra el botón de Google deshabilitado mientras carga', async () => {
    await setup({ status: 'loading' })
    expect(screen.getByRole('button', { name: /iniciar sesión con google/i })).toBeDisabled()
  })

  it('llama a signInAdminWithGoogle al hacer click', async () => {
    const signIn = vi.fn()
    await setup({ status: 'unauthenticated' }, { signIn })

    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión con google/i }))

    expect(signIn).toHaveBeenCalledTimes(1)
  })

  it('muestra el mensaje de no autorizado y permite cerrar sesión para reintentar', async () => {
    const signOut = vi.fn()
    await setup(
      { status: 'unauthorized', user: { email: 'intruso@example.com' } as User },
      { signOut },
    )

    expect(screen.getByText(/intruso@example.com/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /probar con otra cuenta/i }))
    expect(signOut).toHaveBeenCalledTimes(1)
  })
})
