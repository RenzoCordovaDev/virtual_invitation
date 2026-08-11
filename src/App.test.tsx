import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { MemoryRouter } from 'react-router'
import App from './App'

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  )
}

describe('App (routing)', () => {
  it('"/" renderiza la invitación genérica', () => {
    renderAt('/')
    expect(screen.getByRole('heading', { name: /falta muy poco/i })).toBeInTheDocument()
  })

  it('"/i/:slug" renderiza la invitación (personalización la agrega el módulo rsvp)', () => {
    renderAt('/i/abc123')
    expect(screen.getByRole('heading', { name: /falta muy poco/i })).toBeInTheDocument()
  })

  it('"/admin" renderiza las rutas de administración', () => {
    renderAt('/admin')
    expect(screen.getByText(/panel de administración/i)).toBeInTheDocument()
  })
})
