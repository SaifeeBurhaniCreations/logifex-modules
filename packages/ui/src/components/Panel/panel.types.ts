import type { ReactNode } from 'react'
import type { UIMode, UICapability } from '../../modes'
import type { CardAction } from '../../primitives/Card'

export interface PanelSection {
  id: string
  title?: string
  content: ReactNode
  capability?: UICapability
}

export interface PanelProps {
  title: string
  description?: string

  mode: UIMode

  /**
   * High-level actions (edit, delete, etc.)
   */
  actions?: CardAction[]

  /**
   * Structured sections
   */
  sections?: PanelSection[]

  /**
   * Free-form content (advanced / animated UIs)
   */
  children?: ReactNode

  /**
   * Event metadata
   */
  eventMeta?: {
    source?: string
  }
}