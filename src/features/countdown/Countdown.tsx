import { ceremony } from '../../content/event'
import { useCountdown } from './useCountdown'

const UNITS = [
  { key: 'days', label: 'Días' },
  { key: 'hours', label: 'Horas' },
  { key: 'minutes', label: 'Minutos' },
  { key: 'seconds', label: 'Segundos' },
] as const

export function Countdown() {
  const countdown = useCountdown(ceremony.dateTimeISO)

  if (countdown.isPast) {
    return (
      <p className="font-script text-center text-5xl text-guinda">¡Ya nos casamos!</p>
    )
  }

  return (
    <div className="flex flex-col items-center gap-8 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">
        Falta muy poco para decir &ldquo;sí&rdquo;
      </h2>
      <div className="flex gap-4">
        {UNITS.map((unit) => (
          <div
            key={unit.key}
            className="flex min-w-20 flex-col items-center rounded-lg bg-champagne px-4 py-3"
          >
            <span className="font-title text-4xl text-guinda">{countdown[unit.key]}</span>
            <span className="text-sm tracking-wide text-guinda-oscuro uppercase">
              {unit.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
