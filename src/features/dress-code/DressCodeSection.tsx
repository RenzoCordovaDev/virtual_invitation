import { dressCode } from '../../content/event'

export function DressCodeSection() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">Código de vestimenta</h2>
      <p className="font-title text-3xl text-guinda">{dressCode.style}</p>
      <p className="text-guinda-oscuro">Por favor evita estos colores:</p>
      <ul className="flex flex-wrap justify-center gap-2">
        {dressCode.prohibitedColors.map((color) => (
          <li
            key={color}
            className="border-guinda/40 text-guinda-oscuro rounded-full border px-4 py-1"
          >
            {color}
          </li>
        ))}
      </ul>
      <p className="text-guinda-oscuro/80 text-sm">{dressCode.note}</p>
    </div>
  )
}
