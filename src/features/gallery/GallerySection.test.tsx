import { render, screen } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'

describe('GallerySection', () => {
  it('muestra "Próximamente" cuando no hay fotos ni historia todavía', async () => {
    vi.resetModules()
    vi.doMock('../../content/gallery', () => ({ galleryPhotos: [], ourStory: null }))
    const { GallerySection } = await import('./GallerySection')

    render(<GallerySection />)

    expect(screen.getByText('Próximamente')).toBeInTheDocument()
  })

  it('muestra la historia y las fotos cuando el contenido ya está cargado', async () => {
    vi.resetModules()
    vi.doMock('../../content/gallery', () => ({
      galleryPhotos: [{ src: '/foto1.jpg', alt: 'Teresa y Renzo en la playa' }],
      ourStory: 'Nos conocimos en 2019 y desde entonces no nos separamos.',
    }))
    const { GallerySection } = await import('./GallerySection')

    render(<GallerySection />)

    expect(screen.queryByText('Próximamente')).not.toBeInTheDocument()
    expect(
      screen.getByText('Nos conocimos en 2019 y desde entonces no nos separamos.'),
    ).toBeInTheDocument()
    expect(screen.getByAltText('Teresa y Renzo en la playa')).toBeInTheDocument()
  })
})
