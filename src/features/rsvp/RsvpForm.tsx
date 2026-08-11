import { useState, type FormEvent } from 'react'
import { submitRsvp } from '../../lib/firebase/guests'
import type { Guest } from '../../types/guest'
import { useI18n } from '../i18n'

interface RsvpFormProps {
  guest: Guest
  onSubmitted: () => void
}

export function RsvpForm({ guest, onSubmitted }: RsvpFormProps) {
  const { t } = useI18n()
  const [attending, setAttending] = useState<'confirmed' | 'declined' | null>(
    guest.rsvpStatus === 'pending' ? null : guest.rsvpStatus,
  )
  const [companions, setCompanions] = useState(guest.confirmedCompanions)
  const [dietaryRestrictions, setDietaryRestrictions] = useState(guest.dietaryRestrictions)
  const [message, setMessage] = useState(guest.message)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!attending) return

    setSubmitting(true)
    setError(null)
    try {
      await submitRsvp(guest.slug, {
        rsvpStatus: attending,
        confirmedCompanions: attending === 'confirmed' ? companions : 0,
        dietaryRestrictions,
        message,
      })
      onSubmitted()
    } catch {
      setError(t.rsvpSubmitError)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={(event) => void handleSubmit(event)} className="flex w-full max-w-md flex-col gap-4">
      <div className="flex gap-3">
        <button
          type="button"
          onClick={() => setAttending('confirmed')}
          aria-pressed={attending === 'confirmed'}
          className={
            attending === 'confirmed'
              ? 'bg-guinda text-marfil flex-1 rounded-full border px-4 py-2'
              : 'border-guinda/40 text-guinda-oscuro flex-1 rounded-full border px-4 py-2'
          }
        >
          {t.rsvpAttendingYes}
        </button>
        <button
          type="button"
          onClick={() => setAttending('declined')}
          aria-pressed={attending === 'declined'}
          className={
            attending === 'declined'
              ? 'bg-guinda text-marfil flex-1 rounded-full border px-4 py-2'
              : 'border-guinda/40 text-guinda-oscuro flex-1 rounded-full border px-4 py-2'
          }
        >
          {t.rsvpAttendingNo}
        </button>
      </div>

      {attending === 'confirmed' && guest.maxCompanions > 0 && (
        <label className="flex flex-col gap-1 text-sm">
          {t.rsvpCompanionsLabel} (0–{guest.maxCompanions})
          <input
            type="number"
            min={0}
            max={guest.maxCompanions}
            value={companions}
            onChange={(event) =>
              setCompanions(
                Math.min(guest.maxCompanions, Math.max(0, Number(event.target.value))),
              )
            }
            className="border-guinda/40 rounded border px-3 py-2"
          />
        </label>
      )}

      {attending === 'confirmed' && (
        <label className="flex flex-col gap-1 text-sm">
          {t.rsvpDietaryLabel}
          <textarea
            value={dietaryRestrictions}
            onChange={(event) => setDietaryRestrictions(event.target.value)}
            className="border-guinda/40 rounded border px-3 py-2"
          />
        </label>
      )}

      <label className="flex flex-col gap-1 text-sm">
        {t.rsvpMessageLabel}
        <textarea
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="border-guinda/40 rounded border px-3 py-2"
        />
      </label>

      {error && <p className="text-sm text-red-700">{error}</p>}

      <button
        type="submit"
        disabled={!attending || submitting}
        className="bg-guinda text-marfil rounded-full px-4 py-2 disabled:opacity-50"
      >
        {submitting ? t.rsvpSubmittingLabel : t.rsvpSubmitLabel}
      </button>
    </form>
  )
}
