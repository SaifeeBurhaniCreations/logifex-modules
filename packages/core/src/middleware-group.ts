import type { MiddlewareHandler } from 'hono'
import { composeMiddlewares } from './internal/compose'
import type { LogifexConfig } from './types/config'

export function createMiddlewareGroup(
  config: LogifexConfig
): MiddlewareHandler {
  const middlewares = config.middlewares ?? []

  return composeMiddlewares(middlewares)
}