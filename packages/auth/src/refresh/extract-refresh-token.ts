export function extractRefreshToken(
  c: any,
  options?: {
    cookieName?: string
    headerName?: string
  }
): string | null {
  return (
    c.req.cookie?.(options?.cookieName ?? 'refresh_token') ??
    c.req.header?.(options?.headerName ?? 'x-refresh-token') ??
    null
  )
}