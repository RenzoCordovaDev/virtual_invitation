import { useCallback, useEffect, useState } from 'react'
import { listGuests } from '../../lib/firebase/guests'
import type { Guest } from '../../types/guest'

export function useGuests() {
  const [guests, setGuests] = useState<Guest[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const reload = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      setGuests(await listGuests())
    } catch {
      setError('No se pudieron cargar los invitados.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    // Carga inicial de datos (patrón estándar fetch-on-mount); reload() ya
    // pasa por setState solo dentro de sus propios callbacks, no de forma
    // sincrónica en el cuerpo del efecto.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void reload()
  }, [reload])

  return { guests, loading, error, reload }
}
