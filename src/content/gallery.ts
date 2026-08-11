/**
 * Fotos e historia de la pareja — pendientes de que el usuario las provea
 * (ver PROGRESS.md "Bloqueados / pendientes de decisión"). Mientras estén
 * vacíos, GallerySection muestra un estado "Próximamente". Se completa acá,
 * sin tocar el componente.
 */

export interface GalleryPhoto {
  src: string
  alt: string
}

export const galleryPhotos: GalleryPhoto[] = []

// Bilingüe porque es contenido específico de esta boda, no copy fijo de la
// app (ver src/features/i18n/translations.ts para el heading/estado vacío).
export const ourStory: { es: string; en: string } | null = null
