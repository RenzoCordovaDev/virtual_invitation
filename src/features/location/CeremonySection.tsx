import { ceremony } from '../../content/event'
import { formatVenueTime } from './formatVenueTime'
import { VenueCard } from './VenueCard'

export function CeremonySection() {
  return (
    <VenueCard
      title="Ceremonia"
      name={ceremony.name}
      city={ceremony.city}
      address={ceremony.address}
      time={formatVenueTime(ceremony.dateTimeISO)}
      mapEmbedUrl={ceremony.mapEmbedUrl}
    />
  )
}
