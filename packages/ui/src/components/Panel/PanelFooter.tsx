import type { ReactNode } from 'react'

export function PanelFooter({ children }: { children: ReactNode }) {
  return <div className="lx-panel-footer">{children}</div>
}