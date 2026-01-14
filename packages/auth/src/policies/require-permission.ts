import type { MiddlewareHandler } from 'hono'
import { createErrorResponse, LogifexErrorCode } from '@logifex/core'
import type { PermissionResolver } from './permission-resolver'

export function requirePermission(
  permission: string,
  resolvePermissions: PermissionResolver
): MiddlewareHandler {
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
    const sub = payload?.sub
    const role = payload?.role

    if (!sub) {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.UNAUTHORIZED,
          message: 'Invalid token payload'
        }),
        401
      )
    }

    const permissions = await resolvePermissions({ sub, role })

    if (!permissions.includes(permission)) {
      return c.json(
        createErrorResponse({
          code: LogifexErrorCode.FORBIDDEN,
          message: `Missing permission: ${permission}`
        }),
        403
      )
    }

    await next()
  }
}