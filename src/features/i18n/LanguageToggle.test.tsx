import { fireEvent, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { renderWithProviders } from '../../test/renderWithProviders'
import { LanguageToggle } from './LanguageToggle'

describe('LanguageToggle', () => {
  it('empieza ofreciendo cambiar a inglés y alterna al hacer click', () => {
    renderWithProviders(<LanguageToggle />)

    const button = screen.getByRole('button', { name: 'Switch to English' })
    expect(button).toHaveTextContent('EN')

    fireEvent.click(button)

    expect(screen.getByRole('button', { name: 'Cambiar a español' })).toHaveTextContent('ES')
  })
})
