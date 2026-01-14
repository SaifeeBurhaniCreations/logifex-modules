import type { ReactNode } from 'react'

export function PanelHeader({ children }: { children: ReactNode }) {
  return <div className="lx-panel-header">{children}</div>
}