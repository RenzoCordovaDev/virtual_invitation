import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { VenueCard } from './VenueCard'

describe('VenueCard', () => {
  it('muestra título, nombre, hora, dirección y el mapa embebido', () => {
    render(
      <VenueCard
        title="Ceremonia"
        name="Iglesia de Prueba"
        city="Iquitos"
        address="Calle Falsa 123"
        time="5:00 p. m."
        mapEmbedUrl="https://maps.example.com/embed"
      />,
    )

    expect(screen.getByRole('heading', { name: 'Ceremonia' })).toBeInTheDocument()
    expect(screen.getByText('Iglesia de Prueba')).toBeInTheDocument()
    expect(screen.getByText(/5:00 p\. m\. · Calle Falsa 123, Iquitos/)).toBeInTheDocument()

    const map = screen.getByTitle('Mapa de Iglesia de Prueba')
    expect(map.tagName).toBe('IFRAME')
    expect(map).toHaveAttribute('src', 'https://maps.example.com/embed')
  })
})
