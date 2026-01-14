import type { UIMode } from '../modes'
import type { CardAction } from '../primitives/Card'

/**
 * Generic adapter output for Card-like components
 */
export interface CardAdapterResult {
  title: string
  description?: string
  mode: UIMode
  actions: CardAction[]
  content: {
    label: string
    value: string
  }[]
}