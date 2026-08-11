/**
 * Datos de mesa de regalos — placeholders tomados de informacion_base.md.
 * Los números reales NUNCA se comitean al repo público (ver docs/PROJECT.md
 * sección 8): cuando el usuario los provea, se cargan vía un mecanismo local
 * no versionado (mismo criterio que informacion_base.local.md /
 * .env.local), no directo acá.
 */
export const giftTable = {
  bcp: 'XXXXXXXXXX',
  interbank: 'XXXXXXXXX',
  yape: 'XXXXXXX',
  plin: 'XXXXX',
} as const
