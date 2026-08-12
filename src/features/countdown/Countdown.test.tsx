import { screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { Countdown } from './Countdown'

describe('Countdown', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('muestra los días, horas, minutos y segundos restantes', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-12-25T17:00:00-05:00'))

    renderWithProviders(<Countdown />)

    expect(screen.getByText('Días')).toBeInTheDocument()
    expect(screen.getByText('Horas')).toBeInTheDocument()
    expect(screen.getByText('Minutos')).toBeInTheDocument()
    expect(screen.getByText('Segundos')).toBeInTheDocument()
    expect(screen.getByText('1')).toBeInTheDocument()
  })

  it('muestra la fecha completa del evento (no solo la cuenta regresiva)', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-12-25T17:00:00-05:00'))

    renderWithProviders(<Countdown />)

    expect(screen.getByText('Sábado, 26 de diciembre de 2026')).toBeInTheDocument()
  })

  it('muestra un mensaje alternativo cuando la fecha ya pasó', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2027-01-01T00:00:00-05:00'))

    renderWithProviders(<Countdown />)

    expect(screen.getByText('¡Ya nos casamos!')).toBeInTheDocument()
    expect(screen.queryByText('Días')).not.toBeInTheDocument()
  })
})
