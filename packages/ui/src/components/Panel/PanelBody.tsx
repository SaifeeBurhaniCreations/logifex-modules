import type { ReactNode } from 'react'

export function PanelBody({ children }: { children: ReactNode }) {
  return <div className="lx-panel-body">{children}</div>
}