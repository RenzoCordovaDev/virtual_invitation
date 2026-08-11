import { useEffect, useState } from 'react'
import type { User } from 'firebase/auth'
import { subscribeToAuthState, verifyIsAdmin } from '../../lib/firebase/adminAuth'

export type AdminAuthState =
  | { status: 'loading' }
  | { status: 'unauthenticated' }
  | { status: 'unauthorized'; user: User }
  | { status: 'authorized'; user: User }

export function useAdminAuth(): AdminAuthState {
  const [state, setState] = useState<AdminAuthState>({ status: 'loading' })

  useEffect(() => {
    const unsubscribe = subscribeToAuthState((user) => {
      if (!user?.email) {
        setState({ status: 'unauthenticated' })
        return
      }
      void verifyIsAdmin(user.email).then((isAdmin) => {
        setState(isAdmin ? { status: 'authorized', user } : { status: 'unauthorized', user })
      })
    })
    return unsubscribe
  }, [])

  return state
}
