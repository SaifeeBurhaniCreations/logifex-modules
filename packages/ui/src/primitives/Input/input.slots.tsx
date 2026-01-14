import type { ReactNode } from 'react'

export function InputDebug({ value }: { value?: string }) {
  return (
    <div className="lx-input-debug">
      <small>Value: {value ?? '(empty)'}</small>
    </div>
  )
}

export function InputMeta({ children }: { children: ReactNode }) {
  return <div className="lx-input-meta">{children}</div>
}