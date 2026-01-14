import type { MiddlewareHandler } from 'hono'
import { createErrorResponse, LogifexErrorCode } from '@logifex/core'
import { rotateRefreshToken } from './rotate-refresh-token'
import type { RefreshStore } from './store/refresh-store'

export function refreshSession(options: {
  extractToken: (c: any) => string | null
  store: RefreshStore
  issueAccessToken: (sub: string) => Promise<string>

  onRefresh?: (info: {
    sub: string
    accessToken: string
    refreshToken: string
  }) => void
}): MiddlewareHandler {

  return async (c) => {
    const token = options.extractToken(c)

    if (!token) {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.UNAUTHORIZED,
          message: 'Refresh token missing'
        }),
        401
      )
    }

    const result = await rotateRefreshToken({
      refreshToken: token,
      store: options.store,
      issueAccessToken: options.issueAccessToken
    })

    if (!result) {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.UNAUTHORIZED,
          message: 'Invalid or reused refresh token'
        }),
        401
      )
    }

    options.onRefresh?.(result)

    return c.json({
      success: true,
      ...result
    })
  }
}
