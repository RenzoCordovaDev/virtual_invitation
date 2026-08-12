import type { Locale } from '../i18n/translations'

/**
 * Fecha completa (día de la semana, día, mes, año) siempre anclada a
 * horario de Perú — mismo criterio que formatVenueTime.ts — y en el
 * idioma activo, para que la cuenta regresiva no sea la única forma de
 * saber la fecha exacta del evento.
 */
export function formatEventDate(dateTimeISO: string, locale: Locale): string {
  const localeTag = locale === 'es' ? 'es-PE' : 'en-US'
  const formatted = new Intl.DateTimeFormat(localeTag, {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'America/Lima',
  }).format(new Date(dateTimeISO))

  // es-PE formatea en minúsculas ("sábado, 26 de..."); se capitaliza solo la
  // primera letra (Tailwind's `capitalize` capitalizaría cada palabra, ej.
  // "De Diciembre De", incorrecto en español).
  return formatted.charAt(0).toUpperCase() + formatted.slice(1)
}
