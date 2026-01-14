// Dev only remove in production
import { UIEvent } from './types'

type Listener = (event: UIEvent) => void

const listeners = new Set<Listener>()

export function subscribe(listener: Listener) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function publish(event: UIEvent) {
  listeners.forEach(listener => listener(event))
}
