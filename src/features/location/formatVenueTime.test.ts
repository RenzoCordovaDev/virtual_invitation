import { describe, expect, it } from 'vitest'
import { formatVenueTime } from './formatVenueTime'

describe('formatVenueTime', () => {
  it('formatea las 5:00 p.m. en horario de Perú', () => {
    const formatted = formatVenueTime('2026-12-26T17:00:00-05:00')
    expect(formatted).toMatch(/5/)
    expect(formatted).toMatch(/p\.?\s?m\.?/i)
  })

  it('formatea las 7:00 p.m. en horario de Perú', () => {
    const formatted = formatVenueTime('2026-12-26T19:00:00-05:00')
    expect(formatted).toMatch(/7/)
    expect(formatted).toMatch(/p\.?\s?m\.?/i)
  })

  it('es independiente de la zona horaria en la que corre (usa America/Lima explícito)', () => {
    // Mismo instante, dos representaciones ISO distintas (offset -05:00 vs 'Z').
    // Deben coincidir porque formatVenueTime siempre proyecta a America/Lima.
    const fromPeruOffset = formatVenueTime('2026-12-26T17:00:00-05:00')
    const fromUtc = formatVenueTime('2026-12-26T22:00:00Z')
    expect(fromUtc).toBe(fromPeruOffset)
  })
})
