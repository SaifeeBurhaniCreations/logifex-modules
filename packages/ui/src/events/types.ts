/**
 * Every UI event must be serializable
 */
export type UIEventPayload = Record<string, unknown>

/**
 * UI Intent Event
 */
export interface UIEvent<T extends UIEventPayload = UIEventPayload> {
  /**
   * Stable event name
   */
  type: string

  /**
   * Event payload (must be serializable)
   */
  payload: T

  /**
   * Optional metadata
   */
  meta?: {
    source?: string       // component name
    timestamp?: number
    mode?: 'simple' | 'pro'
  }
}