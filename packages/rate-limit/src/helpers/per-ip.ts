import { rateLimit } from '../rate-limit'

export function rateLimitPerIp(options: {
  limit: number
  window?: string | number
}) {
  return rateLimit({
    limit: options.limit,
    window: options.window ?? '1m',
    key: (c) => c.req.header('x-forwarded-for') ?? 'unknown-ip'
  })
}