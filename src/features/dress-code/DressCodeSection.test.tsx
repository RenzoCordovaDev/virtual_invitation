import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { dressCode } from '../../content/event'
import { DressCodeSection } from './DressCodeSection'

describe('DressCodeSection', () => {
  it('muestra el título, el estilo y todos los colores prohibidos de informacion_base.md', () => {
    render(<DressCodeSection />)

    expect(screen.getByRole('heading', { name: 'Código de vestimenta' })).toBeInTheDocument()
    expect(screen.getByText(dressCode.style)).toBeInTheDocument()
    for (const color of dressCode.prohibitedColors) {
      expect(screen.getByText(color)).toBeInTheDocument()
    }
  })
})
