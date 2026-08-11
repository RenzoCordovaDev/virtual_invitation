import { act, render, renderHook, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { I18nProvider } from './I18nProvider'
import { useI18n } from './useI18n'

describe('useI18n', () => {
  it('lanza un error si se usa fuera de I18nProvider', () => {
    expect(() => renderHook(() => useI18n())).toThrow('useI18n debe usarse dentro de')
  })

  it('empieza en español y toggleLocale cambia a inglés y viceversa', () => {
    const { result } = renderHook(() => useI18n(), { wrapper: I18nProvider })

    expect(result.current.locale).toBe('es')
    expect(result.current.t.dressCodeHeading).toBe('Código de vestimenta')

    act(() => {
      result.current.toggleLocale()
    })

    expect(result.current.locale).toBe('en')
    expect(result.current.t.dressCodeHeading).toBe('Dress code')

    act(() => {
      result.current.toggleLocale()
    })

    expect(result.current.locale).toBe('es')
  })

  it('todos los consumidores dentro del mismo provider comparten el idioma', () => {
    function Consumer({ testId }: { testId: string }) {
      const { t } = useI18n()
      return <span data-testid={testId}>{t.galleryHeading}</span>
    }

    render(
      <I18nProvider>
        <Consumer testId="a" />
        <Consumer testId="b" />
      </I18nProvider>,
    )

    expect(screen.getByTestId('a')).toHaveTextContent('Nuestra historia')
    expect(screen.getByTestId('b')).toHaveTextContent('Nuestra historia')
  })
})
