// src/modes/pro.ts
import { ModeDefinition, UICapability } from './types'

const PRO_CAPABILITIES: Set<UICapability> = new Set([
  'edit',
  'delete',
  'advanced-config',
  'bulk-actions',
  'debug',
  'raw-schema',
  'backend-sync'
])

export const ProMode: ModeDefinition = {
  mode: 'pro',

  allows(capability) {
    return PRO_CAPABILITIES.has(capability)
  },

  limits: {
    maxItems: Infinity,
    maxDepth: Infinity
  }
}