import { createContext } from 'react'
import type { Locale, Translations } from './translations'

export interface I18nContextValue {
  locale: Locale
  t: Translations
  toggleLocale: () => void
}

export const I18nContext = createContext<I18nContextValue | null>(null)
