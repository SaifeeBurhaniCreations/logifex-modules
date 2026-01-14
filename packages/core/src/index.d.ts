import 'hono'

declare module 'hono' {
  interface ContextVariableMap {
    input?: {
      body?: unknown
      query?: unknown
      params?: unknown
      headers?: unknown
      cookies?: unknown
      files?: unknown
    }

    auth?:
      | {
          type: 'api-key'
          key: string
        }
      | {
          type: 'jwt'
          token: string
          payload: unknown
        }
  }
}