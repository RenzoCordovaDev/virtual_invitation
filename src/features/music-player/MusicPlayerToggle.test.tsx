import { fireEvent, screen } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'

describe('MusicPlayerToggle', () => {
  beforeEach(() => {
    window.HTMLMediaElement.prototype.play = vi.fn().mockResolvedValue(undefined)
    window.HTMLMediaElement.prototype.pause = vi.fn()
  })

  it('no renderiza nada si todavía no hay audio configurado', async () => {
    vi.resetModules()
    vi.doMock('../../content/music', () => ({ music: { title: 'Wonderwall', audioSrc: null } }))
    const { MusicPlayerToggle } = await import('./MusicPlayerToggle')
    const { renderWithProviders } = await import('../../test/renderWithProviders')

    renderWithProviders(<MusicPlayerToggle />)

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('reproduce y pausa al hacer click cuando hay audio configurado', async () => {
    vi.resetModules()
    vi.doMock('../../content/music', () => ({
      music: { title: 'Wonderwall', audioSrc: '/audio/wonderwall.mp3' },
    }))
    const { MusicPlayerToggle } = await import('./MusicPlayerToggle')
    const { renderWithProviders } = await import('../../test/renderWithProviders')

    renderWithProviders(<MusicPlayerToggle />)

    const playButton = screen.getByRole('button', { name: 'Reproducir "Wonderwall"' })
    fireEvent.click(playButton)

    expect(window.HTMLMediaElement.prototype.play).toHaveBeenCalledTimes(1)
    const pauseButton = screen.getByRole('button', { name: 'Pausar "Wonderwall"' })
    expect(pauseButton).toHaveAttribute('aria-pressed', 'true')

    fireEvent.click(pauseButton)

    expect(window.HTMLMediaElement.prototype.pause).toHaveBeenCalledTimes(1)
    expect(screen.getByRole('button', { name: 'Reproducir "Wonderwall"' })).toHaveAttribute(
      'aria-pressed',
      'false',
    )
  })
})
