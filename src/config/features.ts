/**
 * Registro central de módulos — ver docs/PROJECT.md sección 2 y sección 4.
 * Apagar un flag debe poder desactivar el módulo sin tocar el resto.
 */
export const features = {
  countdown: true,
  gallery: true,
  location: true,
  dressCode: true,
  giftTable: true,
  musicPlayer: true,
  i18n: true,
  rsvp: true,
  admin: true,
} as const

export type FeatureKey = keyof typeof features

export function isFeatureEnabled(key: FeatureKey): boolean {
  return features[key]
}
