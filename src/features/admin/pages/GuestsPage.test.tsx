import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Guest } from '../../../types/guest'

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

async function setup(overrides: { reload?: ReturnType<typeof vi.fn> } = {}) {
  vi.resetModules()
  const reload = overrides.reload ?? vi.fn()
  vi.doMock('../useGuests', () => ({
    useGuests: () => ({ guests: [guest], loading: false, error: null, reload }),
  }))
  const createGuest = vi.fn().mockResolvedValue({ ...guest, slug: 'new1' })
  const updateGuest = vi.fn().mockResolvedValue(undefined)
  const deleteGuest = vi.fn().mockResolvedValue(undefined)
  vi.doMock('../../../lib/firebase/guests', () => ({ createGuest, updateGuest, deleteGuest }))

  const { GuestsPage } = await import('./GuestsPage')
  render(<GuestsPage />)

  return { createGuest, updateGuest, deleteGuest, reload }
}

describe('GuestsPage', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  it('muestra el invitado existente', async () => {
    await setup()
    expect(screen.getByText('Familia Pérez')).toBeInTheDocument()
  })

  it('agrega un invitado nuevo', async () => {
    const { createGuest, reload } = await setup()

    fireEvent.click(screen.getByRole('button', { name: 'Agregar invitado' }))
    fireEvent.change(screen.getByLabelText(/nombre \/ familia/i), {
      target: { value: 'Familia Nueva' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))

    await waitFor(() =>
      expect(createGuest).toHaveBeenCalledWith({ displayName: 'Familia Nueva', maxCompanions: 0 }),
    )
    await waitFor(() => expect(reload).toHaveBeenCalled())
  })

  it('edita un invitado existente', async () => {
    const { updateGuest, reload } = await setup()

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    fireEvent.change(screen.getByDisplayValue('Familia Pérez'), {
      target: { value: 'Familia Pérez Actualizada' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }))

    await waitFor(() =>
      expect(updateGuest).toHaveBeenCalledWith('abc123', {
        displayName: 'Familia Pérez Actualizada',
        maxCompanions: 2,
      }),
    )
    await waitFor(() => expect(reload).toHaveBeenCalled())
  })

  it('elimina un invitado', async () => {
    const { deleteGuest, reload } = await setup()

    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))

    await waitFor(() => expect(deleteGuest).toHaveBeenCalledWith('abc123'))
    await waitFor(() => expect(reload).toHaveBeenCalled())
  })

  it('muestra un error si falla la creación', async () => {
    vi.resetModules()
    vi.doMock('../useGuests', () => ({
      useGuests: () => ({ guests: [], loading: false, error: null, reload: vi.fn() }),
    }))
    vi.doMock('../../../lib/firebase/guests', () => ({
      createGuest: vi.fn().mockRejectedValue(new Error('permission-denied')),
      updateGuest: vi.fn(),
      deleteGuest: vi.fn(),
    }))
    const { GuestsPage } = await import('./GuestsPage')
    render(<GuestsPage />)

    fireEvent.click(screen.getByRole('button', { name: 'Agregar invitado' }))
    fireEvent.change(screen.getByLabelText(/nombre \/ familia/i), {
      target: { value: 'Familia X' },
    })
    fireEvent.click(screen.getByRole('button', { name: 'Crear' }))

    expect(await screen.findByText('No se pudo crear el invitado.')).toBeInTheDocument()
  })
})
