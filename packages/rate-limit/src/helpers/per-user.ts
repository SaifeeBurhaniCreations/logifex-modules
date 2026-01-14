import { rateLimit } from '../rate-limit'

export function rateLimitPerUser(options: {
  limit: number
  window?: string | number
}) {
  return rateLimit({
    limit: options.limit,
    window: options.window ?? '1m',
    key: (c) =>
      c.get('auth')?.payload?.sub ?? 'anonymous'
  })
}