import { describe, expect, it } from 'vitest'
import { formatEventDate } from './formatEventDate'

describe('formatEventDate', () => {
  it('formatea la fecha completa en español con el primer carácter en mayúscula', () => {
    const formatted = formatEventDate('2026-12-26T17:00:00-05:00', 'es')
    expect(formatted[0]).toBe(formatted[0].toUpperCase())
    expect(formatted).toContain('26')
    expect(formatted.toLowerCase()).toContain('diciembre')
    expect(formatted).toContain('2026')
  })

  it('formatea la fecha completa en inglés', () => {
    const formatted = formatEventDate('2026-12-26T17:00:00-05:00', 'en')
    expect(formatted).toContain('December')
    expect(formatted).toContain('26')
    expect(formatted).toContain('2026')
  })

  it('es independiente de la zona horaria de origen (usa America/Lima explícito)', () => {
    const fromPeruOffset = formatEventDate('2026-12-26T17:00:00-05:00', 'es')
    const fromUtc = formatEventDate('2026-12-26T22:00:00Z', 'es')
    expect(fromUtc).toBe(fromPeruOffset)
  })
})
