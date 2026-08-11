import { reception } from '../../content/event'
import { useI18n } from '../i18n'
import { formatVenueTime } from './formatVenueTime'
import { VenueCard } from './VenueCard'

export function ReceptionSection() {
  const { t } = useI18n()

  return (
    <VenueCard
      title={t.receptionTitle}
      name={reception.name}
      city={reception.city}
      address={reception.address}
      time={formatVenueTime(reception.dateTimeISO)}
      mapEmbedUrl={reception.mapEmbedUrl}
    />
  )
}
