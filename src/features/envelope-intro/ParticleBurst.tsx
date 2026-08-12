import { useEffect, useRef } from 'react'

interface ParticleBurstProps {
  active: boolean
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  vr: number
  size: number
  color: string
}

const COLORS = ['#C9A96E', '#7B1F3A', '#F7E7CE']
const PARTICLE_COUNT = 46
const DURATION_MS = 1600

/**
 * Ráfaga de pétalos/destellos al abrir el sobre. Usa <canvas> a propósito:
 * animar ~45 partículas con física (gravedad, rotación, fade) via DOM/CSS
 * sería mucho más pesado que dibujarlas directo en un canvas por frame.
 */
export function ParticleBurst({ active }: ParticleBurstProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return

    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const dpr = window.devicePixelRatio || 1
    canvas.width = window.innerWidth * dpr
    canvas.height = window.innerHeight * dpr
    ctx.scale(dpr, dpr)

    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2

    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => {
      const angle = Math.random() * Math.PI * 2
      const speed = 2 + Math.random() * 4.5
      return {
        x: cx,
        y: cy,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 2.5,
        rotation: Math.random() * 360,
        vr: (Math.random() - 0.5) * 8,
        size: 4 + Math.random() * 6,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    })

    let start: number | null = null
    let frameId: number

    function frame(timestamp: number) {
      start ??= timestamp
      const progress = Math.min((timestamp - start) / DURATION_MS, 1)

      ctx!.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        p.vy += 0.08
        p.rotation += p.vr

        ctx!.save()
        ctx!.translate(p.x, p.y)
        ctx!.rotate((p.rotation * Math.PI) / 180)
        ctx!.globalAlpha = 1 - progress
        ctx!.fillStyle = p.color
        ctx!.beginPath()
        ctx!.ellipse(0, 0, p.size, p.size * 0.6, 0, 0, Math.PI * 2)
        ctx!.fill()
        ctx!.restore()
      }

      if (progress < 1) {
        frameId = requestAnimationFrame(frame)
      }
    }

    frameId = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(frameId)
  }, [active])

  if (!active) return null

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[60]"
      style={{ width: '100vw', height: '100vh' }}
    />
  )
}
