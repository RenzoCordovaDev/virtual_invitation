import { screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { ceremony } from '../../content/event'
import { renderWithProviders } from '../../test/renderWithProviders'
import { CeremonySection } from './CeremonySection'

describe('CeremonySection', () => {
  it('usa los datos reales de la ceremonia desde src/content/event.ts', () => {
    renderWithProviders(<CeremonySection />)

    expect(screen.getByRole('heading', { name: 'Ceremonia' })).toBeInTheDocument()
    expect(screen.getByText(ceremony.name)).toBeInTheDocument()
    expect(screen.getByTitle(`Mapa de ${ceremony.name}`)).toHaveAttribute(
      'src',
      ceremony.mapEmbedUrl,
    )
  })
})
