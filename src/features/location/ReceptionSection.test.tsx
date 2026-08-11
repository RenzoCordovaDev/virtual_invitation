import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { reception } from '../../content/event'
import { renderWithProviders } from '../../test/renderWithProviders'
import { ReceptionSection } from './ReceptionSection'

describe('ReceptionSection', () => {
  it('usa los datos reales de la recepción desde src/content/event.ts', () => {
    renderWithProviders(<ReceptionSection />)

    expect(screen.getByRole('heading', { name: 'Recepción' })).toBeInTheDocument()
    expect(screen.getByText(reception.name)).toBeInTheDocument()
    expect(screen.getByTitle(`Mapa de ${reception.name}`)).toHaveAttribute(
      'src',
      reception.mapEmbedUrl,
    )
  })
})
