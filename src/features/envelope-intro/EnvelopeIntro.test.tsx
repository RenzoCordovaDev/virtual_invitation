import { act, fireEvent, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { EnvelopeIntro } from './EnvelopeIntro'

describe('EnvelopeIntro', () => {
  afterEach(() => {
    vi.useRealTimers()
  })

  it('muestra el sello con el texto para abrir', () => {
    renderWithProviders(<EnvelopeIntro />)
    expect(screen.getByRole('button', { name: 'Click para abrir' })).toBeInTheDocument()
  })

  it('al hacer click, entra en estado "abriendo" y deshabilita el sello', () => {
    renderWithProviders(<EnvelopeIntro />)
    const seal = screen.getByRole('button', { name: 'Click para abrir' })

    fireEvent.click(seal)

    expect(seal).toBeDisabled()
    expect(seal.closest('.envelope-overlay')).toHaveClass('envelope-overlay--opening')
  })

  it('desaparece del DOM por completo una vez termina la animación', () => {
    vi.useFakeTimers()
    renderWithProviders(<EnvelopeIntro />)

    fireEvent.click(screen.getByRole('button', { name: 'Click para abrir' }))
    // Sigue en el DOM mientras anima, pero aria-hidden (ya no debe anunciarse
    // a lectores de pantalla), por eso se consulta con { hidden: true }.
    expect(
      screen.getByRole('button', { name: 'Click para abrir', hidden: true }),
    ).toBeInTheDocument()

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(screen.queryByRole('button', { name: 'Click para abrir' })).not.toBeInTheDocument()
  })
})
