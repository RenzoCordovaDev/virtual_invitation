import { useState } from 'react'
import { createGuest, deleteGuest, updateGuest } from '../../../lib/firebase/guests'
import type { NewGuestInput } from '../../../types/guest'
import { GuestForm } from '../components/GuestForm'
import { GuestRow } from '../components/GuestRow'
import { useGuests } from '../useGuests'

export function GuestsPage() {
  const { guests, loading, error, reload } = useGuests()
  const [editingSlug, setEditingSlug] = useState<string | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [actionError, setActionError] = useState<string | null>(null)

  async function handleAdd(input: NewGuestInput) {
    setActionError(null)
    try {
      await createGuest(input)
      setShowAddForm(false)
      await reload()
    } catch {
      setActionError('No se pudo crear el invitado.')
    }
  }

  async function handleEdit(slug: string, input: NewGuestInput) {
    setActionError(null)
    try {
      await updateGuest(slug, input)
      setEditingSlug(null)
      await reload()
    } catch {
      setActionError('No se pudo actualizar el invitado.')
    }
  }

  async function handleDelete(slug: string) {
    setActionError(null)
    try {
      await deleteGuest(slug)
      await reload()
    } catch {
      setActionError('No se pudo eliminar el invitado.')
    }
  }

  return (
    <div className="mx-auto max-w-3xl p-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-title text-3xl text-guinda">Invitados</h1>
        <button
          type="button"
          onClick={() => setShowAddForm((prev) => !prev)}
          className="bg-guinda text-marfil rounded-full px-4 py-2 text-sm"
        >
          {showAddForm ? 'Cancelar' : 'Agregar invitado'}
        </button>
      </div>

      {actionError && <p className="mb-4 text-sm text-red-700">{actionError}</p>}

      {showAddForm && (
        <div className="border-guinda/40 mb-6 rounded-lg border p-4">
          <GuestForm onSubmit={(input) => void handleAdd(input)} submitLabel="Crear" />
        </div>
      )}

      {loading && <p>Cargando…</p>}
      {error && <p className="text-red-700">{error}</p>}
      {!loading && !error && guests.length === 0 && <p>Todavía no hay invitados.</p>}

      <ul className="flex flex-col gap-3">
        {guests.map((guest) =>
          editingSlug === guest.slug ? (
            <li key={guest.slug} className="border-guinda/40 rounded-lg border p-4">
              <GuestForm
                initialValue={{
                  displayName: guest.displayName,
                  maxCompanions: guest.maxCompanions,
                }}
                onSubmit={(input) => void handleEdit(guest.slug, input)}
                onCancel={() => setEditingSlug(null)}
                submitLabel="Guardar"
              />
            </li>
          ) : (
            <GuestRow
              key={guest.slug}
              guest={guest}
              onEdit={() => setEditingSlug(guest.slug)}
              onDelete={() => void handleDelete(guest.slug)}
            />
          ),
        )}
      </ul>
    </div>
  )
}
