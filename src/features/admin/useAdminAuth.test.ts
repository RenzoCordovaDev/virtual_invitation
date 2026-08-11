import { renderHook, waitFor } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import type { User } from 'firebase/auth'

const fakeUser = { email: 'admin@example.com' } as User

describe('useAdminAuth', () => {
  it('empieza en "loading"', async () => {
    vi.resetModules()
    vi.doMock('../../lib/firebase/adminAuth', () => ({
      subscribeToAuthState: () => () => {},
      verifyIsAdmin: vi.fn(),
    }))
    const { useAdminAuth } = await import('./useAdminAuth')

    const { result } = renderHook(() => useAdminAuth())

    expect(result.current.status).toBe('loading')
  })

  it('pasa a "unauthenticated" si no hay usuario', async () => {
    vi.resetModules()
    vi.doMock('../../lib/firebase/adminAuth', () => ({
      subscribeToAuthState: (cb: (user: User | null) => void) => {
        cb(null)
        return () => {}
      },
      verifyIsAdmin: vi.fn(),
    }))
    const { useAdminAuth } = await import('./useAdminAuth')

    const { result } = renderHook(() => useAdminAuth())

    await waitFor(() => expect(result.current.status).toBe('unauthenticated'))
  })

  it('pasa a "authorized" si el correo está en la allow-list', async () => {
    vi.resetModules()
    vi.doMock('../../lib/firebase/adminAuth', () => ({
      subscribeToAuthState: (cb: (user: User | null) => void) => {
        cb(fakeUser)
        return () => {}
      },
      verifyIsAdmin: vi.fn().mockResolvedValue(true),
    }))
    const { useAdminAuth } = await import('./useAdminAuth')

    const { result } = renderHook(() => useAdminAuth())

    await waitFor(() => expect(result.current.status).toBe('authorized'))
    expect(result.current.status === 'authorized' && result.current.user).toEqual(fakeUser)
  })

  it('pasa a "unauthorized" si el correo NO está en la allow-list', async () => {
    vi.resetModules()
    vi.doMock('../../lib/firebase/adminAuth', () => ({
      subscribeToAuthState: (cb: (user: User | null) => void) => {
        cb(fakeUser)
        return () => {}
      },
      verifyIsAdmin: vi.fn().mockResolvedValue(false),
    }))
    const { useAdminAuth } = await import('./useAdminAuth')

    const { result } = renderHook(() => useAdminAuth())

    await waitFor(() => expect(result.current.status).toBe('unauthorized'))
  })
})
