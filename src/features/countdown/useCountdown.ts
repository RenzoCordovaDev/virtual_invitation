import { useEffect, useState } from 'react'

export interface CountdownValue {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

function computeCountdown(targetISO: string): CountdownValue {
  const diffMs = new Date(targetISO).getTime() - Date.now()

  if (diffMs <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true }
  }

  const totalSeconds = Math.floor(diffMs / 1000)
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
    isPast: false,
  }
}

export function useCountdown(targetISO: string): CountdownValue {
  const [value, setValue] = useState(() => computeCountdown(targetISO))

  useEffect(() => {
    const interval = setInterval(() => {
      setValue(computeCountdown(targetISO))
    }, 1000)
    return () => clearInterval(interval)
  }, [targetISO])

  return value
}
