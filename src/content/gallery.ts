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

export const ourStory: string | null = null
