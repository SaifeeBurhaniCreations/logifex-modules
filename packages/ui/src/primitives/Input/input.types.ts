import type { ReactNode } from 'react'
import type { UIMode, UICapability } from '../../modes'
import type { UIEvent } from '../../events'

export type InputIntent =
  | UIEvent<{
      field?: string
      value: string
    }> & {
      type: 'input:change'
    }
  | UIEvent<{
      field?: string
    }> & {
      type: 'input:focus' | 'input:blur'
    }

export interface InputProps {
  id?: string
  label?: string
  value?: string
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  readOnly?: boolean

  mode: UIMode

  /**
   * Capability required to edit
   */
  capability?: UICapability

  /**
   * Intent factory (MUST return a valid UIEvent)
   */
  intent?: (value: string) => InputIntent

  message?: ReactNode
  children?: ReactNode
}
