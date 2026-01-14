export interface RefreshSession {
  sub: string
  familyId: string
  tokenId: string
  expiresAt: number
}

export interface RefreshRotateResult {
  sub: string
  accessToken: string
  refreshToken: string
}
