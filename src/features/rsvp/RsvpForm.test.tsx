import { fireEvent, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { submitRsvp } from '../../lib/firebase/guests'
import { renderWithProviders } from '../../test/renderWithProviders'
import type { Guest } from '../../types/guest'
import { RsvpForm } from './RsvpForm'

vi.mock('../../lib/firebase/guests', () => ({
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

describe('RsvpForm', () => {
  beforeEach(() => {
    vi.mocked(submitRsvp).mockReset()
  })

  it('el botón de enviar está deshabilitado hasta elegir asistencia', () => {
    renderWithProviders(<RsvpForm guest={guest} onSubmitted={vi.fn()} />)
    expect(screen.getByRole('button', { name: 'Confirmar respuesta' })).toBeDisabled()
  })

  it('confirmar asistencia muestra cupo de acompañantes y restricciones', () => {
    renderWithProviders(<RsvpForm guest={guest} onSubmitted={vi.fn()} />)
    fireEvent.click(screen.getByRole('button', { name: 'Sí, ahí estaré' }))

    expect(screen.getByText(/Acompañantes/)).toBeInTheDocument()
    expect(screen.getByText('Restricciones alimenticias (opcional)')).toBeInTheDocument()
  })

  it('envía la confirmación con el cupo acotado al máximo permitido', async () => {
    vi.mocked(submitRsvp).mockResolvedValue(undefined)
    const onSubmitted = vi.fn()
    renderWithProviders(<RsvpForm guest={guest} onSubmitted={onSubmitted} />)

    fireEvent.click(screen.getByRole('button', { name: 'Sí, ahí estaré' }))
    fireEvent.change(screen.getByLabelText(/Acompañantes/), { target: { value: '5' } })
    fireEvent.change(screen.getByLabelText('Restricciones alimenticias (opcional)'), {
      target: { value: 'Vegetariano' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar respuesta' }))

    await waitFor(() =>
      expect(submitRsvp).toHaveBeenCalledWith('abc123', {
        rsvpStatus: 'confirmed',
        confirmedCompanions: 2,
        dietaryRestrictions: 'Vegetariano',
        message: '',
      }),
    )
    await waitFor(() => expect(onSubmitted).toHaveBeenCalledTimes(1))
  })

  it('rechazar oculta el cupo y envía confirmedCompanions en 0', async () => {
    vi.mocked(submitRsvp).mockResolvedValue(undefined)
    renderWithProviders(<RsvpForm guest={guest} onSubmitted={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'No podré ir' }))
    expect(screen.queryByText(/Acompañantes/)).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Confirmar respuesta' }))

    await waitFor(() =>
      expect(submitRsvp).toHaveBeenCalledWith('abc123', {
        rsvpStatus: 'declined',
        confirmedCompanions: 0,
        dietaryRestrictions: '',
        message: '',
      }),
    )
  })

  it('muestra un error si falla el envío', async () => {
    vi.mocked(submitRsvp).mockRejectedValue(new Error('network'))
    renderWithProviders(<RsvpForm guest={guest} onSubmitted={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Sí, ahí estaré' }))
    fireEvent.click(screen.getByRole('button', { name: 'Confirmar respuesta' }))

    expect(
      await screen.findByText('No se pudo enviar tu respuesta. Intenta de nuevo.'),
    ).toBeInTheDocument()
  })
})
