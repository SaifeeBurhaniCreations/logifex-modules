import type { TraceContext } from '@logifex/types'

declare module 'hono' {
  interface ContextVariableMap {
    trace?: TraceContext
  }
}