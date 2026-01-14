import type { MiddlewareHandler } from 'hono'
import type { LifecycleHooks } from './types'

export function lifecycle(
  hooks: LifecycleHooks = {}
): MiddlewareHandler {
  return async (c, next) => {
    try {
      if (hooks.onRequest) {
        await hooks.onRequest(c)
      }

      await next()

      if (hooks.onResponse) {
        await hooks.onResponse(c)
      }
    } catch (error) {
      if (hooks.onError) {
        await hooks.onError(c, error)
      }
      throw error
    }
  }
}