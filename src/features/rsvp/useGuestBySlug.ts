import { useEffect, useState } from 'react'
import { getGuestBySlug } from '../../lib/firebase/guests'
import type { Guest } from '../../types/guest'

export type GuestFetchState =
  | { status: 'loading' }
  | { status: 'not-found' }
  | { status: 'error' }
  | { status: 'loaded'; guest: Guest }

export function useGuestBySlug(slug: string | undefined): GuestFetchState {
  const [state, setState] = useState<GuestFetchState>({ status: 'loading' })

  useEffect(() => {
    // Sin slug no hay nada que pedir — RsvpSection ya maneja ese caso antes
    // de usar este estado (ver src/features/rsvp/RsvpSection.tsx).
    if (!slug) return

    let cancelled = false
    // Si slug cambia sin que el componente se desmonte (navegar de un link
    // de invitado a otro), hay que volver a "loading" para no mostrar datos
    // del invitado anterior mientras se pide el nuevo.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({ status: 'loading' })

    getGuestBySlug(slug)
      .then((guest) => {
        if (cancelled) return
        setState(guest ? { status: 'loaded', guest } : { status: 'not-found' })
      })
      .catch(() => {
        if (!cancelled) setState({ status: 'error' })
      })

    return () => {
      cancelled = true
    }
  }, [slug])

  return state
}
