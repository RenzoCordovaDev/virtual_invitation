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
  },
}
