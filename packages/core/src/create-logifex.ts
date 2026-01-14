import type { MiddlewareHandler } from 'hono'
import { createMiddlewareGroup } from './middleware-group'
import type { LogifexConfig } from './types/config'

export function createLogifex(
  config: LogifexConfig = {}
): MiddlewareHandler {
  return createMiddlewareGroup(config)
}
