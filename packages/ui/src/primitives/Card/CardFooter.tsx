import type { ReactNode } from 'react'

export function CardFooter({ children }: { children: ReactNode }) {
  return <div className="lx-card-footer">{children}</div>
}