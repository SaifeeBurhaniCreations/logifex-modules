/**
 * Available UI modes
 */
export type UIMode = 'simple' | 'pro'

/**
 * Capabilities are feature-level permissions
 * NOT components, NOT styles
 */
export type UICapability =
  | 'edit'
  | 'delete'
  | 'advanced-config'
  | 'bulk-actions'
  | 'debug'
  | 'raw-schema'
  | 'backend-sync'

/**
 * Mode definition contract
 */
export interface ModeDefinition {
  readonly mode: UIMode

  /**
   * Is a capability allowed in this mode?
   */
  allows(capability: UICapability): boolean

  /**
   * Optional behavior limits per mode
   */
  limits?: {
    maxItems?: number
    maxDepth?: number
  }
}