import { fireEvent, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { EnvelopeIntro } from './EnvelopeIntro'

describe('EnvelopeIntro', () => {
  it('muestra el sello con el texto para abrir', () => {
    renderWithProviders(<EnvelopeIntro />)
    expect(screen.getByRole('button', { name: 'Click para abrir' })).toBeInTheDocument()
  })

  it('al hacer click dispara la ráfaga de partículas', async () => {
    const { container } = renderWithProviders(<EnvelopeIntro />)
    expect(container.querySelector('canvas')).not.toBeInTheDocument()

    fireEvent.click(screen.getByRole('button', { name: 'Click para abrir' }))

    await waitFor(() => expect(container.querySelector('canvas')).toBeInTheDocument())
  })

  it('el sobre desaparece del DOM por completo una vez termina de animarse', async () => {
    renderWithProviders(<EnvelopeIntro />)
    const seal = screen.getByRole('button', { name: 'Click para abrir' })

    fireEvent.click(seal)

    // Framer Motion anima la salida via su propio motor (no un setTimeout
    // controlable con fake timers) — se espera con timers reales a que
    // AnimatePresence termine de desmontar.
    await waitForElementToBeRemoved(seal, { timeout: 3000 })
  })
})
