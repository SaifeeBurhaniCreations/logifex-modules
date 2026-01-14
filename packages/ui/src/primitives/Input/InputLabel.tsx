import type { ReactNode } from 'react'

export function InputLabel({ children }: { children: ReactNode }) {
  return <label className="lx-input-label">{children}</label>
}