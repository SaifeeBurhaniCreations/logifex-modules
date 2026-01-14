import type { Context } from 'hono'

export interface LifecycleHooks {
  onRequest?: (c: Context) => void | Promise<void>
  onResponse?: (c: Context) => void | Promise<void>
  onError?: (c: Context, error: unknown) => void | Promise<void>
}