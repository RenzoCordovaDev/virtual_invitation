interface VenueCardProps {
  title: string
  name: string
  city: string
  address: string
  time: string
  mapEmbedUrl: string
}

export function VenueCard({ title, name, city, address, time, mapEmbedUrl }: VenueCardProps) {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-3 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">{title}</h2>
      <p className="font-title text-3xl text-guinda">{name}</p>
      <p className="text-guinda-oscuro">
        {time} · {address}, {city}
      </p>
      <iframe
        src={mapEmbedUrl}
        title={`Mapa de ${name}`}
        className="h-56 w-full rounded-lg border-0"
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  )
}
