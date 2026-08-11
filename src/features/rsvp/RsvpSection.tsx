import { useState } from 'react'
import { useI18n } from '../i18n'
import { RsvpForm } from './RsvpForm'
import { useGuestBySlug } from './useGuestBySlug'

interface RsvpSectionProps {
  slug?: string
}

export function RsvpSection({ slug }: RsvpSectionProps) {
  const { t } = useI18n()
  const state = useGuestBySlug(slug)
  const [justSubmitted, setJustSubmitted] = useState(false)

  if (!slug) {
    return <p className="max-w-md text-center text-guinda-oscuro">{t.rsvpNoSlug}</p>
  }
  if (state.status === 'loading') {
    return <p className="text-guinda-oscuro">{t.rsvpLoading}</p>
  }
  if (state.status === 'not-found') {
    return <p className="max-w-md text-center text-guinda-oscuro">{t.rsvpNotFound}</p>
  }
  if (state.status === 'error') {
    return <p className="max-w-md text-center text-guinda-oscuro">{t.rsvpErrorLoading}</p>
  }

  return (
    <div className="flex w-full flex-col items-center gap-4 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">
        {t.rsvpHeadingPrefix} {state.guest.displayName}?
      </h2>
      {justSubmitted && <p role="status">{t.rsvpThankYou}</p>}
      <RsvpForm guest={state.guest} onSubmitted={() => setJustSubmitted(true)} />
    </div>
  )
}
