import type { RefreshSession } from '../types'

export interface RefreshStore {
  get(token: string): Promise<RefreshSession | null>
  set(token: string, session: RefreshSession): Promise<void>
  delete(token: string): Promise<void>
  deleteFamily(familyId: string): Promise<void>
}