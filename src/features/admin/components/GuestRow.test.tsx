import { fireEvent, render, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { Guest } from '../../../types/guest'
import { GuestRow } from './GuestRow'

const guest: Guest = {
  slug: 'abc123',
  displayName: 'Familia Pérez',
  maxCompanions: 2,
  rsvpStatus: 'confirmed',
  confirmedCompanions: 1,
  dietaryRestrictions: 'Sin gluten',
  message: 'Felicidades!',
  respondedAt: '2026-02-01T00:00:00.000Z',
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('GuestRow', () => {
  beforeEach(() => {
    Object.assign(navigator, { clipboard: { writeText: vi.fn().mockResolvedValue(undefined) } })
  })

  it('muestra nombre, estado, cupo, restricciones y mensaje', () => {
    render(<GuestRow guest={guest} onEdit={vi.fn()} onDelete={vi.fn()} />)

    expect(screen.getByText('Familia Pérez')).toBeInTheDocument()
    expect(screen.getByText('Confirmado')).toBeInTheDocument()
    expect(screen.getByText(/Cupo: 2/)).toBeInTheDocument()
    expect(screen.getByText(/Sin gluten/)).toBeInTheDocument()
    expect(screen.getByText(/Felicidades!/)).toBeInTheDocument()
  })

  it('copia el link único al portapapeles', async () => {
    render(<GuestRow guest={guest} onEdit={vi.fn()} onDelete={vi.fn()} />)

    fireEvent.click(screen.getByRole('button', { name: 'Copiar link' }))

    expect(navigator.clipboard.writeText).toHaveBeenCalledWith(
      `${window.location.origin}/i/abc123`,
    )
    expect(await screen.findByRole('button', { name: 'Copiado' })).toBeInTheDocument()
  })

  it('llama a onEdit y onDelete', () => {
    const onEdit = vi.fn()
    const onDelete = vi.fn()
    render(<GuestRow guest={guest} onEdit={onEdit} onDelete={onDelete} />)

    fireEvent.click(screen.getByRole('button', { name: 'Editar' }))
    fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onDelete).toHaveBeenCalledTimes(1)
  })
})
