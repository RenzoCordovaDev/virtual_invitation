export type Locale = 'es' | 'en'

export interface Translations {
  countdownHeading: string
  countdownDays: string
  countdownHours: string
  countdownMinutes: string
  countdownSeconds: string
  countdownIsPast: string
  ceremonyTitle: string
  receptionTitle: string
  dressCodeHeading: string
  dressCodeIntro: string
  dressCodeNote: string
  giftTableHeading: string
  giftTableIntro: string
  galleryHeading: string
  galleryComingSoon: string
  musicPlayerPlayPrefix: string
  musicPlayerPausePrefix: string
  rsvpNoSlug: string
  rsvpLoading: string
  rsvpNotFound: string
  rsvpErrorLoading: string
  rsvpHeadingPrefix: string
  rsvpThankYou: string
  rsvpAttendingYes: string
  rsvpAttendingNo: string
  rsvpCompanionsLabel: string
  rsvpDietaryLabel: string
  rsvpMessageLabel: string
  rsvpSubmitLabel: string
  rsvpSubmittingLabel: string
  rsvpSubmitError: string
}

export const translations: Record<Locale, Translations> = {
  es: {
    countdownHeading: 'Falta muy poco para decir "sí"',
    countdownDays: 'Días',
    countdownHours: 'Horas',
    countdownMinutes: 'Minutos',
    countdownSeconds: 'Segundos',
    countdownIsPast: '¡Ya nos casamos!',
    ceremonyTitle: 'Ceremonia',
    receptionTitle: 'Recepción',
    dressCodeHeading: 'Código de vestimenta',
    dressCodeIntro: 'Por favor evita estos colores:',
    dressCodeNote:
      'Esos colores están reservados para los novios y las personas importantes del evento.',
    giftTableHeading: 'Mesa de regalos',
    giftTableIntro: 'Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo más:',
    galleryHeading: 'Nuestra historia',
    galleryComingSoon: 'Próximamente',
    musicPlayerPlayPrefix: 'Reproducir',
    musicPlayerPausePrefix: 'Pausar',
    rsvpNoSlug: 'Usa el link personal que te compartimos para confirmar tu asistencia.',
    rsvpLoading: 'Cargando…',
    rsvpNotFound: 'No encontramos tu invitación. Verifica el link que te compartimos.',
    rsvpErrorLoading: 'No se pudo cargar tu invitación. Intenta de nuevo más tarde.',
    rsvpHeadingPrefix: '¿Nos acompañas,',
    rsvpThankYou: '¡Gracias por confirmar! Puedes actualizar tu respuesta cuando quieras.',
    rsvpAttendingYes: 'Sí, ahí estaré',
    rsvpAttendingNo: 'No podré ir',
    rsvpCompanionsLabel: 'Acompañantes',
    rsvpDietaryLabel: 'Restricciones alimenticias (opcional)',
    rsvpMessageLabel: 'Mensaje para los novios (opcional)',
    rsvpSubmitLabel: 'Confirmar respuesta',
    rsvpSubmittingLabel: 'Enviando…',
    rsvpSubmitError: 'No se pudo enviar tu respuesta. Intenta de nuevo.',
  },
  en: {
    countdownHeading: 'Just a little longer to say "I do"',
    countdownDays: 'Days',
    countdownHours: 'Hours',
    countdownMinutes: 'Minutes',
    countdownSeconds: 'Seconds',
    countdownIsPast: 'We just got married!',
    ceremonyTitle: 'Ceremony',
    receptionTitle: 'Reception',
    dressCodeHeading: 'Dress code',
    dressCodeIntro: 'Please avoid these colors:',
    dressCodeNote: "Those colors are reserved for the couple and the event's special guests.",
    giftTableHeading: 'Gift registry',
    giftTableIntro: "Your presence is our greatest gift. If you'd still like to give something:",
    galleryHeading: 'Our story',
    galleryComingSoon: 'Coming soon',
    musicPlayerPlayPrefix: 'Play',
    musicPlayerPausePrefix: 'Pause',
    rsvpNoSlug: 'Use the personal link we shared with you to RSVP.',
    rsvpLoading: 'Loading…',
    rsvpNotFound: "We couldn't find your invitation. Check the link we shared with you.",
    rsvpErrorLoading: 'Could not load your invitation. Please try again later.',
    rsvpHeadingPrefix: 'Will you join us,',
    rsvpThankYou: 'Thanks for confirming! You can update your answer anytime.',
    rsvpAttendingYes: "Yes, I'll be there",
    rsvpAttendingNo: "I can't make it",
    rsvpCompanionsLabel: 'Companions',
    rsvpDietaryLabel: 'Dietary restrictions (optional)',
    rsvpMessageLabel: 'Message for the couple (optional)',
    rsvpSubmitLabel: 'Submit RSVP',
    rsvpSubmittingLabel: 'Submitting…',
    rsvpSubmitError: 'Could not submit your RSVP. Please try again.',
  },
}
