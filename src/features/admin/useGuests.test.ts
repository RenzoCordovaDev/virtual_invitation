import { renderHook, waitFor } from '@testing-library/react'
import { act } from 'react'
import { describe, expect, it, vi } from 'vitest'
import type { Guest } from '../../types/guest'

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

describe('useGuests', () => {
  it('carga los invitados al montar', async () => {
    vi.resetModules()
    vi.doMock('../../lib/firebase/guests', () => ({
      listGuests: vi.fn().mockResolvedValue([guest]),
    }))
    const { useGuests } = await import('./useGuests')

    const { result } = renderHook(() => useGuests())

    expect(result.current.loading).toBe(true)
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.guests).toEqual([guest])
    expect(result.current.error).toBeNull()
  })

  it('expone un error si falla la carga', async () => {
    vi.resetModules()
    vi.doMock('../../lib/firebase/guests', () => ({
      listGuests: vi.fn().mockRejectedValue(new Error('network error')),
    }))
    const { useGuests } = await import('./useGuests')

    const { result } = renderHook(() => useGuests())

    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.error).toBe('No se pudieron cargar los invitados.')
    expect(result.current.guests).toEqual([])
  })

  it('reload() vuelve a pedir los invitados', async () => {
    vi.resetModules()
    const listGuests = vi.fn().mockResolvedValue([guest])
    vi.doMock('../../lib/firebase/guests', () => ({ listGuests }))
    const { useGuests } = await import('./useGuests')

    const { result } = renderHook(() => useGuests())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(listGuests).toHaveBeenCalledTimes(1)

    await act(async () => {
      await result.current.reload()
    })

    expect(listGuests).toHaveBeenCalledTimes(2)
  })
})
