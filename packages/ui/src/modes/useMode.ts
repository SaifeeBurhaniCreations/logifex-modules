import { ModeDefinition, UIMode } from './types'
import { SimpleMode } from './simple'
import { ProMode } from './pro'

const MODES: Record<UIMode, ModeDefinition> = {
  simple: SimpleMode,
  pro: ProMode
}

/**
 * Resolve a mode definition
 *
 * UI components should NEVER switch modes themselves.
 */
export function useMode(mode: UIMode): ModeDefinition {
  return MODES[mode]
}