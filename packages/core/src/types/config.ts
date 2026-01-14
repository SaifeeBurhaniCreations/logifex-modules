import type { LogifexMiddleware } from './middleware'

export interface LogifexConfig {
  middlewares?: LogifexMiddleware[]
}