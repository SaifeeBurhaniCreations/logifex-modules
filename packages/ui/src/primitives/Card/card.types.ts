import type { ReactNode } from 'react'
import type { UIMode, UICapability } from '../../modes'

export interface CardAction {
  id: string
  label: string
  capability?: UICapability
  intent?: {
    type: string
    payload?: Record<string, unknown>
  }
}

export interface CardProps {
  title?: string
  description?: string

  mode: UIMode

  /**
   * Optional actions shown in header or footer
   */
  actions?: CardAction[]

  /**
   * Card content
   */
  children: ReactNode

  /**
   * Metadata passed to emitted events
   */
  eventMeta?: {
    source?: string
  }
}