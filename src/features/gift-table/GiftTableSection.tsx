import { giftTable } from '../../content/giftTable'

const METHODS = [
  { key: 'bcp', label: 'BCP' },
  { key: 'interbank', label: 'Interbank' },
  { key: 'yape', label: 'Yape' },
  { key: 'plin', label: 'Plin' },
] as const

export function GiftTableSection() {
  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4 text-center">
      <h2 className="font-subtitle text-2xl text-guinda-oscuro">Mesa de regalos</h2>
      <p className="text-guinda-oscuro">
        Tu presencia es nuestro mejor regalo. Si deseas obsequiarnos algo más:
      </p>
      <dl className="flex w-full flex-col gap-2">
        {METHODS.map((method) => (
          <div
            key={method.key}
            className="border-guinda/40 flex items-center justify-between rounded-lg border px-4 py-2"
          >
            <dt className="font-subtitle text-guinda-oscuro">{method.label}</dt>
            <dd className="text-guinda font-medium">{giftTable[method.key]}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
