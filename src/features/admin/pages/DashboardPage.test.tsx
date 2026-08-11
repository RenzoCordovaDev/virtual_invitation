import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import { MemoryRouter } from 'react-router'
import type { Guest } from '../../../types/guest'

function guest(overrides: Partial<Guest>): Guest {
  return {
    slug: 'x',
    displayName: 'X',
    maxCompanions: 1,
    rsvpStatus: 'pending',
    confirmedCompanions: 0,
    dietaryRestrictions: '',
    message: '',
    respondedAt: null,
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

describe('DashboardPage', () => {
  it('calcula correctamente los totales por estado y los acompañantes confirmados', async () => {
    vi.resetModules()
    vi.doMock('../useGuests', () => ({
      useGuests: () => ({
        loading: false,
        error: null,
        guests: [
          guest({ rsvpStatus: 'confirmed', confirmedCompanions: 2 }),
          guest({ rsvpStatus: 'confirmed', confirmedCompanions: 1 }),
          guest({ rsvpStatus: 'pending' }),
          guest({ rsvpStatus: 'declined' }),
        ],
      }),
    }))
    const { DashboardPage } = await import('./DashboardPage')

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('4')).toBeInTheDocument() // total
    expect(screen.getByText('3')).toBeInTheDocument() // acompañantes confirmados (2+1)
    expect(screen.getAllByText('2')).toHaveLength(1) // confirmados
    expect(screen.getAllByText('1')).toHaveLength(2) // pendientes Y rechazaron
  })

  it('muestra el error si falla la carga', async () => {
    vi.resetModules()
    vi.doMock('../useGuests', () => ({
      useGuests: () => ({ loading: false, error: 'No se pudieron cargar', guests: [] }),
    }))
    const { DashboardPage } = await import('./DashboardPage')

    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>,
    )

    expect(screen.getByText('No se pudieron cargar')).toBeInTheDocument()
  })
})
