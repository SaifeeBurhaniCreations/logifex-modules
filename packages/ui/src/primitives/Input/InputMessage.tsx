import type { ReactNode } from 'react'

export function InputMessage({ children }: { children: ReactNode }) {
  if (!children) return null
  return <div className="lx-input-message">{children}</div>
}