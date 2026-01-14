import type { MiddlewareHandler } from 'hono'
import { createErrorResponse, LogifexErrorCode } from '@logifex/core'
import { MemoryRateLimitStore } from './store/memory-store'

const defaultStore = new MemoryRateLimitStore()

export interface RateLimitOptions {
  limit: number
  window: string | number
  key: (c: any) => string
}

function parseWindow(window: string | number): number {
  if (typeof window === 'number') return window

  const match = /^(\d+)(s|m|h)$/.exec(window)
  if (!match) throw new Error(`Invalid window: ${window}`)

  const value = Number(match[1])
  const unit = match[2]

  return unit === 's'
    ? value * 1000
    : unit === 'm'
    ? value * 60_000
    : value * 3_600_000
}

export function rateLimit(
  options: RateLimitOptions
): MiddlewareHandler {
  const windowMs = parseWindow(options.window)

  return async (c, next) => {
    const key = options.key(c)
    const { count, resetAt } =
      defaultStore.increment(key, windowMs)

    if (count > options.limit) {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.FORBIDDEN,
          message: 'Rate limit exceeded',
          details: {
            limit: options.limit,
            resetAt
          }
        }),
        429
      )
    }

    await next()
  }
}