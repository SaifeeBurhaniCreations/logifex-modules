import type { ReactNode } from 'react'

export function CardBody({ children }: { children: ReactNode }) {
  return <div className="lx-card-body">{children}</div>
}