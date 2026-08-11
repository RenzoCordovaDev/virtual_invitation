import { describe, expect, it } from 'vitest'
import { translations } from './translations'

describe('translations', () => {
  it('tiene exactamente las mismas claves en es y en', () => {
    const esKeys = Object.keys(translations.es).sort()
    const enKeys = Object.keys(translations.en).sort()
    expect(enKeys).toEqual(esKeys)
  })

  it('no tiene valores vacíos en ningún idioma', () => {
    for (const [locale, dict] of Object.entries(translations)) {
      for (const [key, value] of Object.entries(dict)) {
        expect(value.trim(), `${locale}.${key} está vacío`).not.toBe('')
      }
    }
  })
})
