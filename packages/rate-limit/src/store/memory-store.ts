interface Entry {
  count: number
  resetAt: number
}

export class MemoryRateLimitStore {
  private map = new Map<string, Entry>()

  increment(key: string, windowMs: number) {
    const now = Date.now()
    const entry = this.map.get(key)

    if (!entry || entry.resetAt <= now) {
      const resetAt = now + windowMs
      this.map.set(key, { count: 1, resetAt })
      return { count: 1, resetAt }
    }

    entry.count++
    return { count: entry.count, resetAt: entry.resetAt }
  }
}