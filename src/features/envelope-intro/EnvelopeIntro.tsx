import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { ParticleBurst } from './ParticleBurst'

const HALF_TRANSITION = { duration: 0.9, delay: 0.3, ease: [0.65, 0, 0.35, 1] as const }
const FLAP_TRANSITION = { duration: 0.5, ease: 'easeIn' as const }
const SEAL_PULSE = { duration: 2.4, repeat: Infinity, ease: 'easeInOut' as const }

export function EnvelopeIntro() {
  const { t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)
  const [showParticles, setShowParticles] = useState(false)

  // Idempotente a propósito: mientras el sobre termina de animarse hacia
  // afuera (AnimatePresence), un doble click en el sello no hace nada nuevo
  // (setState con el mismo valor no vuelve a renderizar).
  function handleOpen() {
    setIsOpen(true)
    setShowParticles(true)
  }

  return (
    <>
      <ParticleBurst active={showParticles} />
      <AnimatePresence>
        {!isOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            <motion.div
              className="from-guinda-oscuro to-guinda absolute inset-x-0 top-0 h-1/2 bg-linear-to-b"
              exit={{ y: '-100%' }}
              transition={HALF_TRANSITION}
            />
            <motion.div
              className="from-guinda-oscuro to-guinda absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t"
              exit={{ y: '100%' }}
              transition={HALF_TRANSITION}
            />

            <motion.div
              className="from-guinda-oscuro to-guinda absolute inset-x-0 top-0 h-[32vh] bg-linear-to-br"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                transformPerspective: 1000,
                transformOrigin: 'top center',
              }}
              exit={{ rotateX: -160, opacity: 0 }}
              transition={FLAP_TRANSITION}
            />

            <div className="absolute inset-0 flex items-center justify-center">
              <motion.button
                type="button"
                onClick={handleOpen}
                animate={{ scale: [1, 1.06, 1] }}
                transition={SEAL_PULSE}
                exit={{ scale: 0, opacity: 0, transition: { duration: 0.3 } }}
                aria-label={t.envelopeSealText}
                className="border-oro from-oro to-guinda-oscuro/60 text-champagne flex h-28 w-28 flex-col items-center justify-center gap-1 rounded-full border-2 bg-radial shadow-[0_0_40px_rgba(201,169,110,0.35)]"
              >
                <span className="font-script text-2xl">T&amp;R</span>
                <span className="text-[0.6rem] tracking-widest uppercase">
                  {t.envelopeSealText}
                </span>
              </motion.button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  )
}
