import { renderHook, act } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { useCountdown } from './useCountdown'

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('calcula los días/horas/minutos/segundos restantes', () => {
    vi.setSystemTime(new Date('2026-12-25T17:00:00-05:00'))
    const { result } = renderHook(() => useCountdown('2026-12-26T17:00:00-05:00'))

    expect(result.current).toEqual({
      days: 1,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: false,
    })
  })

  it('se actualiza cada segundo', () => {
    vi.setSystemTime(new Date('2026-12-26T16:59:59-05:00'))
    const { result } = renderHook(() => useCountdown('2026-12-26T17:00:00-05:00'))

    expect(result.current.seconds).toBe(1)
    expect(result.current.isPast).toBe(false)

    act(() => {
      vi.advanceTimersByTime(1000)
    })

    expect(result.current.isPast).toBe(true)
  })

  it('marca isPast en true cuando la fecha objetivo ya pasó', () => {
    vi.setSystemTime(new Date('2027-01-01T00:00:00-05:00'))
    const { result } = renderHook(() => useCountdown('2026-12-26T17:00:00-05:00'))

    expect(result.current).toEqual({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isPast: true,
    })
  })
})
