import { ceremony } from '../../content/event'
import { useI18n } from '../i18n'
import { formatEventDate } from './formatEventDate'
import { useCountdown } from './useCountdown'

const UNIT_KEYS = [
  'countdownDays',
  'countdownHours',
  'countdownMinutes',
  'countdownSeconds',
] as const

export function Countdown() {
  const { t, locale } = useI18n()
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
      <p className="text-guinda-oscuro/70 -mt-6 text-sm">
        {formatEventDate(ceremony.dateTimeISO, locale)}
      </p>
      <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
        {UNIT_KEYS.map((key) => (
          <div
            key={key}
            className="flex min-w-14 flex-col items-center rounded-lg bg-champagne px-2 py-3 sm:min-w-20 sm:px-4"
          >
            <span className="font-title text-3xl text-guinda sm:text-4xl">{values[key]}</span>
            <span className="text-xs tracking-wide text-guinda-oscuro uppercase sm:text-sm">
              {t[key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
