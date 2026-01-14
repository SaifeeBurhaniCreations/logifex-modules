import type { MiddlewareHandler } from 'hono'
import { TRACE_HEADER, TRACE_CONTEXT_KEY } from './constants'
import { generateTraceId } from './internal/generate-id'
import type { TraceContext } from '@logifex/types'

export function trace(): MiddlewareHandler {
  return async (c, next) => {
    const incoming = c.req.header(TRACE_HEADER)

    const trace: TraceContext = {
      id: incoming ?? generateTraceId(),
      source: incoming ? 'incoming' : 'generated',
      startedAt: Date.now()
    }

    c.set(TRACE_CONTEXT_KEY, trace)

    c.header(TRACE_HEADER, trace.id)

    try {
      await next()
    } finally {
      trace.durationMs = Date.now() - trace.startedAt
    }
  }
}