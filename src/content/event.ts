/**
 * Contenido real del evento, derivado a mano de informacion_base.md — ver
 * docs/PROJECT.md sección 7. Actualizar aquí cuando cambie ese archivo.
 */

export const couple = {
  bride: 'Teresa Vasquez',
  groom: 'Renzo Cordova',
} as const

export const ceremony = {
  name: 'Iglesia San Martín de Porres',
  city: 'Iquitos',
  address: 'Soledad 957',
  // 26 dic 2026, 5:00 p.m., hora de Perú (UTC-5, sin horario de verano).
  dateTimeISO: '2026-12-26T17:00:00-05:00',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3981.2647049846832!2d-73.26011512502605!3d-3.752438196221442!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ea10123efedf8d%3A0xf76ba1a9c0fcab89!2sParroquia%20San%20Mart%C3%ADn%20de%20Porres%20-%20Vicariato%20Apost%C3%B3lico%20de%20Iquitos.!5e0!3m2!1ses!2spe!4v1786461937086!5m2!1ses!2spe',
} as const

export const reception = {
  name: 'Colegio de Abogados de Loreto',
  city: 'Iquitos',
  address: 'Calle Echenique 390',
  dateTimeISO: '2026-12-26T19:00:00-05:00',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1990.6418807560362!2d-73.25358038376383!3d-3.7482543597252636!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91ea117ba659bfab%3A0xc2fc6dd3db9f9872!2sILUSTRE%20COLEGIO%20DE%20ABOGADOS%20DE%20LORETO!5e0!3m2!1ses!2spe!4v1786462154231!5m2!1ses!2spe',
} as const

export const dressCode = {
  style: 'Elegante',
  // Reservados para los novios y personas importantes del evento — sin
  // excepción (ver informacion_base.md).
  prohibitedColors: ['Blanco', 'Vino tinto / borgoña', 'Champagne', 'Palo rosa', 'Beige'],
  note: 'Esos colores están reservados para los novios y las personas importantes del evento.',
} as const
