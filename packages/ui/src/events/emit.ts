import { UIEvent } from './types'

export type UIEventHandler = (event: UIEvent) => void

let handler: UIEventHandler | null = null

/**
 * Register a global UI event handler
 * (App layer responsibility)
 */
export function registerUIEventHandler(fn: UIEventHandler) {
  handler = fn
}

/**
 * Emit a UI intent event
 */
export function emitUIEvent(event: UIEvent) {
  if (!handler) return
  handler(event)
}