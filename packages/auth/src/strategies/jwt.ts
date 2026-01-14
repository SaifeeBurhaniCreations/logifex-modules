import type { Context } from 'hono'
import {
  createErrorResponse,
  LogifexErrorCode
} from '@logifex/core'

export interface JwtBasePayload {
  sub: string
  role?: string
}

export interface JwtAuthOptions<TPayload extends JwtBasePayload = JwtBasePayload> {
  header?: string
  verify: (token: string, c: Context) => Promise<TPayload | null>
}

export async function jwtAuth<TPayload extends JwtBasePayload>(
  c: Context,
  options: JwtAuthOptions<TPayload>
) {
  const headerName = options.header ?? 'authorization'
  const authHeader = c.req.header(headerName)

  if (!authHeader?.startsWith('Bearer ')) {
    throw createErrorResponse({
      code: LogifexErrorCode.UNAUTHORIZED,
      message: 'Missing or invalid Authorization header'
    })
  }

  const token = authHeader.slice(7)

  const payload = await options.verify(token, c)

  if (!payload) {
    throw createErrorResponse({
      code: LogifexErrorCode.UNAUTHORIZED,
      message: 'Invalid or expired token'
    })
  }

  return {
    type: 'jwt' as const,
    token,
    payload
  }
}