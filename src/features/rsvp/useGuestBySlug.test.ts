import { renderHook, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getGuestBySlug } from '../../lib/firebase/guests'
import type { Guest } from '../../types/guest'
import { useGuestBySlug } from './useGuestBySlug'

vi.mock('../../lib/firebase/guests', () => ({
  getGuestBySlug: vi.fn(),
}))

const guest: Guest = {
  slug: 'abc123',
  displayName: 'Familia Pérez',
  maxCompanions: 2,
  rsvpStatus: 'pending',
  confirmedCompanions: 0,
  dietaryRestrictions: '',
  message: '',
  respondedAt: null,
  createdAt: '2026-01-01T00:00:00.000Z',
}

describe('useGuestBySlug', () => {
  beforeEach(() => {
    vi.mocked(getGuestBySlug).mockReset()
  })

  it('sin slug se queda en loading (RsvpSection maneja ese caso aparte)', () => {
    const { result } = renderHook(() => useGuestBySlug(undefined))
    expect(result.current.status).toBe('loading')
    expect(getGuestBySlug).not.toHaveBeenCalled()
  })

  it('devuelve "loaded" con el invitado si el slug existe', async () => {
    vi.mocked(getGuestBySlug).mockResolvedValue(guest)
    const { result } = renderHook(() => useGuestBySlug('abc123'))

    expect(result.current.status).toBe('loading')
    await waitFor(() => expect(result.current.status).toBe('loaded'))
    expect(result.current.status === 'loaded' && result.current.guest).toEqual(guest)
  })

  it('devuelve "not-found" si el slug no existe', async () => {
    vi.mocked(getGuestBySlug).mockResolvedValue(null)
    const { result } = renderHook(() => useGuestBySlug('no-existe'))

    await waitFor(() => expect(result.current.status).toBe('not-found'))
  })

  it('devuelve "error" si falla la carga', async () => {
    vi.mocked(getGuestBySlug).mockRejectedValue(new Error('network'))
    const { result } = renderHook(() => useGuestBySlug('abc123'))

    await waitFor(() => expect(result.current.status).toBe('error'))
  })
})
