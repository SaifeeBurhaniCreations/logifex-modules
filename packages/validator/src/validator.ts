import type { Context, MiddlewareHandler } from 'hono'
import type { ValidationConfig } from './types/schema'
import type { ValidatedData } from './types/output'
import type { ValidationError } from './errors/validation-error'
import { validateSource } from './internal/validate'
import { normalizeHeaders } from './schema/normalize'
import { createErrorResponse, LogifexErrorCode } from '@logifex/core'

async function extractInputs(
  c: Context
): Promise<Record<keyof ValidationConfig, unknown>> {
  return {
    body: c.req.header('content-type')?.includes('application/json')
      ? await c.req.json().catch(() => ({}))
      : undefined,

    query: c.req.query(),
    params: c.req.param(),
    headers: normalizeHeaders(c.req.header()),

    cookies: Object.fromEntries(
      c.req
        .header('cookie')
        ?.split(';')
        .map(pair =>
          pair.trim().split('=').map(decodeURIComponent) as [string, string]
        ) ?? []
    ),

    files: undefined
  }
}

export function validator(
  config: ValidationConfig
): MiddlewareHandler {
  return async (c, next) => {
    const inputs = await extractInputs(c)

    const validated: Partial<ValidatedData> = {}
    const errors: ValidationError[] = []

    for (const source of Object.keys(config) as Array<
      keyof ValidationConfig
    >) {
      const result = await validateSource(
        config[source],
        inputs[source],
        source
      )

      if (result.success) {
        validated[source] = result.data
      } else {
        errors.push(result.error)
      }
    }

if (errors.length > 0) {
  return c.json(
    createErrorResponse({
      code: LogifexErrorCode.VALIDATION_ERROR,
      message: 'Request validation failed',
      details: errors.reduce<Record<string, unknown>>((acc, err) => {
        acc[err.source] = err.issues.map(issue => ({
          path: issue.path,
          message: issue.message
        }))
        return acc
      }, {})
    }),
    400
  )
}

    c.set('input', validated)
    await next()
  }
}