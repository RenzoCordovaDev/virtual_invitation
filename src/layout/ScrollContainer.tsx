import type { ReactNode } from 'react'

export function ScrollContainer({ children }: { children: ReactNode }) {
  return (
    <div className="h-dvh snap-y snap-mandatory overflow-y-scroll scroll-smooth">{children}</div>
  )
}
