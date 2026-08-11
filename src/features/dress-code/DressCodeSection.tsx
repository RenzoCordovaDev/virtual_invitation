import { dressCode } from '../../content/event'
import { useI18n } from '../i18n'

export function DressCodeSection() {
  const { t, locale } = useI18n()

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">{t.dressCodeHeading}</h2>
      <p className="font-title text-3xl text-guinda">{dressCode.style[locale]}</p>
      <p className="text-guinda-oscuro">{t.dressCodeIntro}</p>
      <ul className="flex flex-wrap justify-center gap-2">
        {dressCode.prohibitedColors.map((color) => (
          <li
            key={color.es}
            className="border-guinda/40 text-guinda-oscuro rounded-full border px-4 py-1"
          >
            {color[locale]}
          </li>
        ))}
      </ul>
      <p className="text-guinda-oscuro/80 text-sm">{t.dressCodeNote}</p>
    </div>
  )
}
