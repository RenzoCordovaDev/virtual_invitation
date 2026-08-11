import { screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { getGuestBySlug } from '../../lib/firebase/guests'
import { renderWithProviders } from '../../test/renderWithProviders'
import type { Guest } from '../../types/guest'
import { RsvpSection } from './RsvpSection'

vi.mock('../../lib/firebase/guests', () => ({
  getGuestBySlug: vi.fn(),
  submitRsvp: vi.fn(),
}))

const guest: Guest = {
  slug: 'abc123',
  displayName: 'Familia Pérez',
  maxCompanions: 2,
  rsvpStatus: 'pending',
  confirmedCompanions: 0,
  dietaryRestrictions: '',
  message: '',
  respondedAt: null,
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('RsvpSection', () => {
  it('sin slug muestra el mensaje de usar el link personal', () => {
    renderWithProviders(<RsvpSection />)
    expect(
      screen.getByText('Usa el link personal que te compartimos para confirmar tu asistencia.'),
    ).toBeInTheDocument()
  })

  it('muestra "no encontrada" si el slug no corresponde a ningún invitado', async () => {
    vi.mocked(getGuestBySlug).mockResolvedValue(null)
    renderWithProviders(<RsvpSection slug="no-existe" />)

    expect(
      await screen.findByText(
        'No encontramos tu invitación. Verifica el link que te compartimos.',
      ),
    ).toBeInTheDocument()
  })

  it('muestra un error si falla la carga', async () => {
    vi.mocked(getGuestBySlug).mockRejectedValue(new Error('network'))
    renderWithProviders(<RsvpSection slug="abc123" />)

    expect(
      await screen.findByText('No se pudo cargar tu invitación. Intenta de nuevo más tarde.'),
    ).toBeInTheDocument()
  })

  it('muestra el saludo personalizado y el formulario cuando el invitado existe', async () => {
    vi.mocked(getGuestBySlug).mockResolvedValue(guest)
    renderWithProviders(<RsvpSection slug="abc123" />)

    expect(await screen.findByText(/Familia Pérez/)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sí, ahí estaré' })).toBeInTheDocument()
  })
})
