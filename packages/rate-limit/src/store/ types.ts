export interface RateLimitStore {
  increment(
    key: string,
    windowMs: number
  ): { count: number; resetAt: number }
}
