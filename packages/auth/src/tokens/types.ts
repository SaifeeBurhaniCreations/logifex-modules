export interface JwtPayloadBase {
  sub: string
  iat?: number
  exp?: number
}

export interface SignTokenOptions<TPayload extends object> {
  payload: TPayload
  expiresIn: string | number
}

export interface VerifyTokenResult<TPayload> {
  valid: boolean
  payload?: TPayload
  error?: 'expired' | 'invalid'
}