import type { Context, Next } from 'hono'
import type { MiddlewareHandler } from 'hono'

export function composeMiddlewares(
  middlewares: MiddlewareHandler[]
): MiddlewareHandler {
  return async (c: Context, next: Next) => {
    let index = -1

    const dispatch = async (i: number): Promise<void> => {
      if (i <= index) {
        throw new Error('next() called multiple times')
      }

      index = i
      const fn = middlewares[i] ?? next
      if (!fn) return
      await fn(c, () => dispatch(i + 1))
    }

    await dispatch(0)
  }
}