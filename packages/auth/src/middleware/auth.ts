import type { MiddlewareHandler } from 'hono'
import { apiKeyAuth, ApiKeyAuthOptions } from '../strategies/api-key'
import { jwtAuth, JwtAuthOptions } from '../strategies/jwt'

type AuthOptions =
  | {
      strategy: 'api-key'
      options: ApiKeyAuthOptions
    }
  | {
      strategy: 'jwt'
      options: JwtAuthOptions
    }

export function auth(options: AuthOptions): MiddlewareHandler {
  return async (c, next) => {
    try {
      let authContext

      switch (options.strategy) {
        case 'api-key':
          authContext = await apiKeyAuth(c, options.options)
          break

        case 'jwt':
          authContext = await jwtAuth(c, options.options)
          break
      }

      c.set('auth', authContext)
      await next()
    } catch (error) {
      return c.json(error, 401)
    }
  }
}