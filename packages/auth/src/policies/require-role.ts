import type { MiddlewareHandler } from 'hono'
import { createErrorResponse, LogifexErrorCode } from '@logifex/core'

export function requireRole(requiredRole: string): MiddlewareHandler {
  return async (c, next) => {
    const auth = c.get('auth')

    if (!auth || auth.type !== 'jwt') {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.UNAUTHORIZED,
          message: 'Authentication required'
        }),
        401
      )
    }

    const payload = auth.payload as any
    const role = payload?.role

    if (!role) {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.FORBIDDEN,
          message: 'Role not present in token'
        }),
        403
      )
    }

    if (role !== requiredRole) {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.FORBIDDEN,
          message: `Requires role: ${requiredRole}`
        }),
        403
      )
    }

    await next()
  }
}