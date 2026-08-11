import { reception } from '../../content/event'
import { formatVenueTime } from './formatVenueTime'
import { VenueCard } from './VenueCard'

export function ReceptionSection() {
  return (
    <VenueCard
      title="Recepción"
      name={reception.name}
      city={reception.city}
      address={reception.address}
      time={formatVenueTime(reception.dateTimeISO)}
      mapEmbedUrl={reception.mapEmbedUrl}
    />
  )
}
