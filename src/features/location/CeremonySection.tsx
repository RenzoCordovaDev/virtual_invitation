import { ceremony } from '../../content/event'
import { useI18n } from '../i18n'
import { formatVenueTime } from './formatVenueTime'
import { VenueCard } from './VenueCard'

export function CeremonySection() {
  const { t } = useI18n()

  return (
    <VenueCard
      title={t.ceremonyTitle}
      name={ceremony.name}
      city={ceremony.city}
      address={ceremony.address}
      time={formatVenueTime(ceremony.dateTimeISO)}
      mapEmbedUrl={ceremony.mapEmbedUrl}
    />
  )
}
