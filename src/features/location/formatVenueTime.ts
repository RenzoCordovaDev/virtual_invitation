/**
 * Formatea la hora de un venue siempre en horario de Perú (America/Lima),
 * sin importar la zona horaria del dispositivo del invitado — igual criterio
 * que src/content/event.ts (fechas ancladas con offset -05:00).
 */
export function formatVenueTime(dateTimeISO: string): string {
  return new Intl.DateTimeFormat('es-PE', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'America/Lima',
  }).format(new Date(dateTimeISO))
}
