import type { VerifyTokenResult } from './types'

export function verifyToken<TPayload>(
  options: {
    token: string
    verify: (token: string) => TPayload
  }
): VerifyTokenResult<TPayload> {
  try {
    const payload = options.verify(options.token)

    if ((payload as any)?.sub) {
      ;(payload as any).sub = String((payload as any).sub)
    }

    return {
      valid: true,
      payload
    }
  } catch (err: any) {
    return {
      valid: false,
      error: err?.name === 'TokenExpiredError'
        ? 'expired'
        : 'invalid'
    }
  }
}