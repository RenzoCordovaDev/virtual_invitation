import { useState } from 'react'
import type { Guest } from '../../../types/guest'

const STATUS_LABEL: Record<Guest['rsvpStatus'], string> = {
  pending: 'Pendiente',
  confirmed: 'Confirmado',
  declined: 'Rechazó',
}

interface GuestRowProps {
  guest: Guest
  onEdit: () => void
  onDelete: () => void
}

export function GuestRow({ guest, onEdit, onDelete }: GuestRowProps) {
  const [copied, setCopied] = useState(false)
  const link = `${window.location.origin}/i/${guest.slug}`

  async function handleCopy() {
    await navigator.clipboard.writeText(link)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <li className="border-guinda/40 flex flex-col gap-2 rounded-lg border p-4">
      <div className="flex items-center justify-between">
        <span className="font-subtitle text-guinda-oscuro">{guest.displayName}</span>
        <span className="text-guinda text-sm">{STATUS_LABEL[guest.rsvpStatus]}</span>
      </div>
      <p className="text-guinda-oscuro text-sm">
        Cupo: {guest.maxCompanions} · Acompañantes confirmados: {guest.confirmedCompanions}
      </p>
      {guest.dietaryRestrictions && (
        <p className="text-guinda-oscuro text-sm">Restricciones: {guest.dietaryRestrictions}</p>
      )}
      {guest.message && <p className="text-guinda-oscuro text-sm">Mensaje: "{guest.message}"</p>}
      <div className="flex flex-wrap gap-3 text-sm">
        <button type="button" onClick={() => void handleCopy()} className="underline">
          {copied ? 'Copiado' : 'Copiar link'}
        </button>
        <button type="button" onClick={onEdit} className="underline">
          Editar
        </button>
        <button type="button" onClick={onDelete} className="underline">
          Eliminar
        </button>
      </div>
    </li>
  )
}
