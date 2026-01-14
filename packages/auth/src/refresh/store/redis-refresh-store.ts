import type { Redis } from 'ioredis'
import type { RefreshStore } from './refresh-store'
import type { RefreshSession } from '../types'

export class RedisRefreshStore implements RefreshStore {
  constructor(
    private redis: Redis,
    private prefix = 'logifex:refresh'
  ) {}

  private key(token: string) {
    return `${this.prefix}:token:${token}`
  }

  private familyKey(familyId: string) {
    return `${this.prefix}:family:${familyId}`
  }

  async get(token: string): Promise<RefreshSession | null> {
    const raw = await this.redis.get(this.key(token))
    return raw ? JSON.parse(raw) : null
  }

  async set(token: string, session: RefreshSession): Promise<void> {
    const ttl =
      Math.floor((session.expiresAt - Date.now()) / 1000)

    await this.redis
      .multi()
      .set(this.key(token), JSON.stringify(session), 'EX', ttl)
      .sadd(this.familyKey(session.familyId), token)
      .exec()
  }

  async delete(token: string): Promise<void> {
    const session = await this.get(token)
    if (!session) return

    await this.redis
      .multi()
      .del(this.key(token))
      .srem(this.familyKey(session.familyId), token)
      .exec()
  }

  async deleteFamily(familyId: string): Promise<void> {
    const members =
      await this.redis.smembers(this.familyKey(familyId))

    if (members.length) {
      const pipeline = this.redis.multi()
      for (const token of members) {
        pipeline.del(this.key(token))
      }
      pipeline.del(this.familyKey(familyId))
      await pipeline.exec()
    }
  }
}