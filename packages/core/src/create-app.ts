import { Hono } from 'hono'
import type { TraceContext } from '@logifex/types'

export interface LogifexVariables {
  input?: {
    body?: unknown
    query?: unknown
    params?: unknown
    headers?: unknown
    cookies?: unknown
    files?: unknown
  }

  auth?:
    | {
        type: 'api-key'
        key: string
      }
    | {
        type: 'jwt'
        token: string
        payload: unknown
      }

  trace?: TraceContext
}

export function createLogifexApp<
  T extends Record<string, unknown> = {}
>() {
  return new Hono<{
    Variables: LogifexVariables & T
  }>()
}
