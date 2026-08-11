import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { giftTable } from '../../content/giftTable'
import { GiftTableSection } from './GiftTableSection'

describe('GiftTableSection', () => {
  it('muestra los 4 métodos de pago con sus valores de informacion_base.md', () => {
    render(<GiftTableSection />)

    expect(screen.getByRole('heading', { name: 'Mesa de regalos' })).toBeInTheDocument()
    expect(screen.getByText('BCP')).toBeInTheDocument()
    expect(screen.getByText('Interbank')).toBeInTheDocument()
    expect(screen.getByText('Yape')).toBeInTheDocument()
    expect(screen.getByText('Plin')).toBeInTheDocument()
    expect(screen.getByText(giftTable.bcp)).toBeInTheDocument()
    expect(screen.getByText(giftTable.interbank)).toBeInTheDocument()
    expect(screen.getByText(giftTable.yape)).toBeInTheDocument()
    expect(screen.getByText(giftTable.plin)).toBeInTheDocument()
  })
})
