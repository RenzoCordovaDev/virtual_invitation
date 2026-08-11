import { galleryPhotos, ourStory } from '../../content/gallery'

export function GallerySection() {
  const hasContent = galleryPhotos.length > 0 || ourStory !== null

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">Nuestra historia</h2>
      {hasContent ? (
        <>
          {ourStory && <p className="text-guinda-oscuro">{ourStory}</p>}
          {galleryPhotos.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {galleryPhotos.map((photo) => (
                <img key={photo.src} src={photo.src} alt={photo.alt} className="rounded-lg" />
              ))}
            </div>
          )}
        </>
      ) : (
        <p className="font-script text-guinda text-3xl">Próximamente</p>
      )}
    </div>
  )
}
