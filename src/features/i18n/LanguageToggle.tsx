import { useI18n } from './useI18n'

export function LanguageToggle() {
  const { locale, toggleLocale } = useI18n()

  return (
    <button
      type="button"
      onClick={toggleLocale}
      aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a español'}
      className="border-guinda text-guinda fixed bottom-4 left-4 z-10 flex h-12 w-12 items-center justify-center rounded-full border bg-white shadow-lg"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  )
}
