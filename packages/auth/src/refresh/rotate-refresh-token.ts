import type { RefreshStore } from './store/refresh-store'
import type { RefreshRotateResult } from './types'
import { createRefreshToken } from './create-refresh-token'

export async function rotateRefreshToken(options: {
  refreshToken: string
  store: RefreshStore
  issueAccessToken: (sub: string) => Promise<string>
}): Promise<RefreshRotateResult | null> {

  const session = await options.store.get(options.refreshToken)
  if (!session) return null

  // 🔒 replay detection
  if (session.expiresAt < Date.now()) {
    await options.store.deleteFamily(session.familyId)
    return null
  }

  // revoke used token
  await options.store.delete(options.refreshToken)

  const accessToken = await options.issueAccessToken(session.sub)

  const next = createRefreshToken()

  await options.store.set(next.token, {
    sub: session.sub,
    tokenId: next.tokenId,
    familyId: session.familyId,
    expiresAt: Date.now() + 7 * 24 * 60 * 60 * 1000
  })

  return {
    sub: session.sub,
    accessToken,
    refreshToken: next.token
  }
}