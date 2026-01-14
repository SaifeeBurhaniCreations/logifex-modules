import type { RefreshStore } from './store/refresh-store'

export async function logout(
  store: RefreshStore,
  refreshToken: string
) {
  const session = await store.get(refreshToken)
  if (!session) return

  await store.deleteFamily(session.familyId)
}