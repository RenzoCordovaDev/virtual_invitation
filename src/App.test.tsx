import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'

vi.mock('./features/admin', () => ({
  AdminRoutes: () => <p>Rutas de administración (mock)</p>,
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
  it('"/" renderiza la invitación genérica', async () => {
    await renderAt('/')
    expect(screen.getByRole('heading', { name: /falta muy poco/i })).toBeInTheDocument()
  })

  it('"/i/:slug" renderiza la invitación (personalización la agrega el módulo rsvp)', async () => {
    await renderAt('/i/abc123')
    expect(screen.getByRole('heading', { name: /falta muy poco/i })).toBeInTheDocument()
  })

  it('"/admin/*" delega en AdminRoutes, cargado como chunk separado (probado a fondo en features/admin)', async () => {
    await renderAt('/admin')
    expect(await screen.findByText('Rutas de administración (mock)')).toBeInTheDocument()
  })
})
