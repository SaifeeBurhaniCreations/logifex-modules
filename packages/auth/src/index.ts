import '@logifex/core'

export { auth } from './middleware/auth'

// token helpers
export { signToken } from './tokens/sign'
export { verifyToken } from './tokens/verify'
export { decodeToken } from './tokens/decode'

// require policies
export { requireRole, requirePermission, PermissionResolver } from './policies'

// refresh flow
export { refreshSession } from './refresh/refresh-middleware'
export { createRefreshToken } from './refresh/create-refresh-token'
export { extractRefreshToken } from './refresh/extract-refresh-token'
export { memoryRefreshStore } from './refresh/store/memory-refresh-store'
export { RedisRefreshStore } from './refresh/store/redis-refresh-store'
export type { RefreshStore } from './refresh/store/refresh-store'
export { logout } from './refresh/logout'

// types
export { AuthErrorCodes } from './errors'
export type {
  JwtPayloadBase,
  SignTokenOptions,
  VerifyTokenResult
} from './tokens/types'
