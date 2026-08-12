import { useState } from 'react'
import { useI18n } from '../i18n'
import './EnvelopeIntro.css'

// Debe cubrir la transición más larga definida en EnvelopeIntro.css
// (halves: 200ms de delay + 700ms de transición) antes de desmontar.
const ANIMATION_DURATION_MS = 1000

export function EnvelopeIntro() {
  const { t } = useI18n()
  const [isOpening, setIsOpening] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  if (isDismissed) {
    return null
  }

  function handleOpen() {
    setIsOpening(true)
    setTimeout(() => setIsDismissed(true), ANIMATION_DURATION_MS)
  }

  return (
    <div
      className={`envelope-overlay${isOpening ? ' envelope-overlay--opening' : ''}`}
      aria-hidden={isOpening}
    >
      <div className="envelope-half envelope-half--top" />
      <div className="envelope-half envelope-half--bottom" />
      <div className="envelope-flap" />
      {/* El texto visible ya es un nombre accesible claro — no se agrega
          aria-label distinto para no violar WCAG 2.5.3 (Label in Name). */}
      <button type="button" onClick={handleOpen} className="envelope-seal" disabled={isOpening}>
        {t.envelopeSealText}
      </button>
    </div>
  )
}
