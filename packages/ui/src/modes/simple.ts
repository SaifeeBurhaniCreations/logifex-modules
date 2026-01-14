import { ModeDefinition, UICapability } from './types'

const SIMPLE_CAPABILITIES: Set<UICapability> = new Set([
  'edit'
])

export const SimpleMode: ModeDefinition = {
  mode: 'simple',

  allows(capability) {
    return SIMPLE_CAPABILITIES.has(capability)
  },

  limits: {
    maxItems: 20,
    maxDepth: 3
  }
}