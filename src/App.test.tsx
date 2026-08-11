import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import { getGuestBySlug } from './lib/firebase/guests'

vi.mock('./features/admin', () => ({
  AdminRoutes: () => <p>Rutas de administración (mock)</p>,
}))
vi.mock('./lib/firebase/guests', () => ({
  getGuestBySlug: vi.fn().mockResolvedValue(null),
  submitRsvp: vi.fn(),
}))

async function renderAt(path: string) {
  const App = (await import('./App')).default
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App (routing)', () => {
  it('"/" renderiza la invitación genérica, sin intentar cargar ningún invitado', async () => {
    await renderAt('/')
    expect(screen.getByRole('heading', { name: /falta muy poco/i })).toBeInTheDocument()
    expect(
      screen.getByText('Usa el link personal que te compartimos para confirmar tu asistencia.'),
    ).toBeInTheDocument()
    expect(getGuestBySlug).not.toHaveBeenCalled()
  })

  it('"/i/:slug" pasa el slug real hasta el módulo rsvp', async () => {
    await renderAt('/i/abc123')
    expect(screen.getByRole('heading', { name: /falta muy poco/i })).toBeInTheDocument()
    expect(getGuestBySlug).toHaveBeenCalledWith('abc123')
  })

  it('"/admin/*" delega en AdminRoutes, cargado como chunk separado (probado a fondo en features/admin)', async () => {
    await renderAt('/admin')
    expect(await screen.findByText('Rutas de administración (mock)')).toBeInTheDocument()
  })
})
