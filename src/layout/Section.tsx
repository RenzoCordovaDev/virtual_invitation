import type { ReactNode } from 'react'

export function Section({ children }: { children: ReactNode }) {
  return (
    <section className="flex h-dvh snap-start snap-always items-center justify-center px-4">
      {children}
    </section>
  )
}
