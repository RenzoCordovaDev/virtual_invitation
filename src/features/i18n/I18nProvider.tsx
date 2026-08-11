import { useState, type ReactNode } from 'react'
import { I18nContext, type I18nContextValue } from './context'
import { translations, type Locale } from './translations'

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('es')

  const value: I18nContextValue = {
    locale,
    t: translations[locale],
    toggleLocale: () => setLocale((prev) => (prev === 'es' ? 'en' : 'es')),
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
