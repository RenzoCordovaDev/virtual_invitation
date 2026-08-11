import { galleryPhotos, ourStory } from '../../content/gallery'
import { useI18n } from '../i18n'

export function GallerySection() {
  const { t, locale } = useI18n()
  const hasContent = galleryPhotos.length > 0 || ourStory !== null

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">{t.galleryHeading}</h2>
      {hasContent ? (
        <>
          {ourStory && <p className="text-guinda-oscuro">{ourStory[locale]}</p>}
          {galleryPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {galleryPhotos.map((photo) => (
                <img key={photo.src} src={photo.src} alt={photo.alt} className="rounded-lg" />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="font-script text-guinda text-3xl">{t.galleryComingSoon}</p>
      )}
    </div>
  )
}
