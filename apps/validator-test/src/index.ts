import { createLogifexApp } from '@logifex/core'
import { auth, verifyToken, requireRole, requirePermission, signToken, refreshSession } from '@logifex/auth'
import { validator } from '@logifex/validator'
import { rateLimitPerUser } from '@logifex/rate-limit'
import { trace } from '@logifex/trace'
import { lifecycle } from '@logifex/lifecycle'

import { z } from 'zod'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

const SECRET = 'secret'
const refreshStore = new Map<string, string>()

const verify = async (token: string) => {
  const result = verifyToken({
    token,
    verify: (t) => jwt.verify(t, SECRET) as any
  })

  return result.valid ? result.payload : null
}

const app: ReturnType<typeof createLogifexApp> = createLogifexApp()

app.use(trace())

app.use((c, next) => {
  console.log('[CHECK]', c.get('trace'))
  return next()
})

app.use(
  lifecycle({
    onRequest(c) {
      console.log('[REQ]', c.get('trace')?.id)
    },
    onResponse(c) {
      const trace = c.get('trace')
      console.log('[TRACE DONE]', trace)
    }
  })
)

app.get('/', (c) => {
  return c.json({
    success: true,
    message: 'Hello World'
  })
})

app.post('/login',
  rateLimitPerUser({ limit: 5, window: '1m' }),
  async (c) => {
  const user = {
    id: 'user_123',
    role: 'admin',
    permissions: ['user:create']
  }

  const accessToken = jwt.sign(
    {
      sub: user.id,
      role: user.role,
      permissions: user.permissions
    },
    SECRET,
    { expiresIn: '15m' }
  )

  const refreshToken = crypto.randomUUID()
  refreshStore.set(refreshToken, user.id)

  return c.json({
    success: true,
    accessToken,
    refreshToken
  })
})

app.post(
  '/refresh',
  refreshSession({
    extractToken: (c) =>
      c.req.header('x-refresh-token'),

    validate: async (token) => {
      const sub = refreshStore.get(token)
      return sub ? { sub } : null
    },

    revoke: async (token) => {
      refreshStore.delete(token)
    },

    issueAccessToken: async (sub) =>
      jwt.sign({ sub }, SECRET, { expiresIn: '15m' }),

    issueRefreshToken: async (sub) => {
      const token = crypto.randomUUID()
      refreshStore.set(token, sub)
      return token
    }
  })
)

app.post(
  '/users',
  auth({
    strategy: 'jwt',
    options: { verify }
  }),
  requireRole('admin'),
  requirePermission('user:create'),
  validator({
    body: z.object({
      name: z.string(),
      email: z.string().email()
    }),
    query: z.object({
      notify: z.enum(['true', 'false']).optional()
    })
  }),
  (c) => {
    const input = c.get('input')
    const auth = c.get('auth')

    return c.json({
      success: true,
      auth,
      body: input?.body,
      query: input?.query
    })
  }
)

export default app