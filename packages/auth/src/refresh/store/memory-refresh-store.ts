import type { RefreshStore } from './refresh-store'
import type { RefreshSession } from '../types'

const store = new Map<string, RefreshSession>()

export const memoryRefreshStore: RefreshStore = {
  async get(token) {
    return store.get(token) ?? null
  },

  async set(token, session) {
    store.set(token, session)
  },

  async delete(token) {
    store.delete(token)
  },

  async deleteFamily(familyId) {
    for (const [key, value] of store) {
      if (value.familyId === familyId) {
        store.delete(key)
      }
    }
  }
}