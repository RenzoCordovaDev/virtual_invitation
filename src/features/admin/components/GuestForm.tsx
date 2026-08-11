import { useState, type FormEvent } from 'react'
import type { NewGuestInput } from '../../../types/guest'

interface GuestFormProps {
  initialValue?: NewGuestInput
  submitLabel: string
  onSubmit: (input: NewGuestInput) => void
  onCancel?: () => void
}

export function GuestForm({ initialValue, submitLabel, onSubmit, onCancel }: GuestFormProps) {
  const [displayName, setDisplayName] = useState(initialValue?.displayName ?? '')
  const [maxCompanions, setMaxCompanions] = useState(initialValue?.maxCompanions ?? 0)

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    if (!displayName.trim()) return
    onSubmit({ displayName: displayName.trim(), maxCompanions })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        Nombre / familia
        <input
          type="text"
          value={displayName}
          onChange={(event) => setDisplayName(event.target.value)}
          required
          className="border-guinda/40 rounded border px-3 py-2"
        />
      </label>
      <label className="flex flex-col gap-1 text-sm">
        Cupo de acompañantes
        <input
          type="number"
          min={0}
          value={maxCompanions}
          onChange={(event) => setMaxCompanions(Number(event.target.value))}
          className="border-guinda/40 rounded border px-3 py-2"
        />
      </label>
      <div className="flex gap-2">
        <button type="submit" className="bg-guinda text-marfil rounded-full px-4 py-2 text-sm">
          {submitLabel}
        </button>
        {onCancel && (
          <button type="button" onClick={onCancel} className="text-sm underline">
            Cancelar
          </button>
        )}
      </div>
    </form>
  )
}
