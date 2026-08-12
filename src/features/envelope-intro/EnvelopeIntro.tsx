import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { useI18n } from '../i18n'
import { EnvelopeFace } from './EnvelopeFace'
import { ParticleBurst } from './ParticleBurst'

const HALF_TRANSITION = { duration: 0.9, delay: 0.35, ease: [0.65, 0, 0.35, 1] as const }
const FACE_TRANSITION = { duration: 0.35, ease: 'easeIn' as const }
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
            {/* Cuerpo del sobre: se parte en dos para revelar el contenido. */}
            <motion.div
              className="bg-guinda absolute inset-x-0 top-0 h-1/2"
              exit={{ y: '-100%' }}
              transition={HALF_TRANSITION}
            />
            <motion.div
              className="bg-guinda absolute inset-x-0 bottom-0 h-1/2"
              exit={{ y: '100%' }}
              transition={HALF_TRANSITION}
            />

            {/* Dorso con las 4 solapas — se desvanece antes de que el
                cuerpo se parta. className fija el tamaño explícito: al
                animar "scale" este div pasa a ser containing block de los
                "absolute inset-0" de EnvelopeFace, y sin tamaño propio
                colapsaría a 0x0 durante la transición. */}
            <motion.div
              className="absolute inset-0"
              exit={{ opacity: 0, scale: 0.94 }}
              transition={FACE_TRANSITION}
            >
              <EnvelopeFace />
            </motion.div>

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
