import type { ReactNode } from 'react'

export function CardHeader({ children }: { children: ReactNode }) {
  return <div className="lx-card-header">{children}</div>
}