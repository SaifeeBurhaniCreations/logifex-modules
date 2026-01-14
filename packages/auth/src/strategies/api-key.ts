import type { Context } from 'hono'
import {
  createErrorResponse,
  LogifexErrorCode
} from '@logifex/core'
import type { AuthContext } from '../types/auth-context'

export interface ApiKeyAuthOptions {
  header?: string
  validate: (key: string, c: Context) => Promise<boolean>
}

export async function apiKeyAuth(
  c: Context,
  options: ApiKeyAuthOptions
): Promise<AuthContext> {
  const headerName = options.header ?? 'x-api-key'
  const apiKey = c.req.header(headerName)

  if (!apiKey) {
    throw createErrorResponse({
      code: LogifexErrorCode.UNAUTHORIZED,
      message: 'API key missing'
    })
  }

  const isValid = await options.validate(apiKey, c)

  if (!isValid) {
    throw createErrorResponse({
      code: LogifexErrorCode.UNAUTHORIZED,
      message: 'Invalid API key'
    })
  }

  return {
    type: 'api-key',
    key: apiKey
  }
}