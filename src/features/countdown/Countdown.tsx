import { ceremony } from '../../content/event'
import { useI18n } from '../i18n'
import { useCountdown } from './useCountdown'

const UNIT_KEYS = [
  'countdownDays',
  'countdownHours',
  'countdownMinutes',
  'countdownSeconds',
] as const

export function Countdown() {
  const { t } = useI18n()
  const countdown = useCountdown(ceremony.dateTimeISO)

  if (countdown.isPast) {
    return <p className="font-script text-center text-5xl text-guinda">{t.countdownIsPast}</p>
  }

  const values = {
    countdownDays: countdown.days,
    countdownHours: countdown.hours,
    countdownMinutes: countdown.minutes,
    countdownSeconds: countdown.seconds,
  }

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">{t.countdownHeading}</h2>
      <div className="flex gap-4">
        {UNIT_KEYS.map((key) => (
          <div
            key={key}
            className="flex min-w-20 flex-col items-center rounded-lg bg-champagne px-4 py-3"
          >
            <span className="font-title text-4xl text-guinda">{values[key]}</span>
            <span className="text-sm tracking-wide text-guinda-oscuro uppercase">{t[key]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
