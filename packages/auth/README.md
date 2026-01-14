
---

## **`logifex/auth`**

Authentication and authorization middleware for Logifex.

> ⚠️ **Status: Experimental**  
> This package is under active development. Breaking changes may occur before `v1.0.0`.  
> Version `0.2.0` introduces intentional breaking changes for security and scalability.

---

## Overview

`@logifex/auth` provides composable authentication and authorization middleware
designed to integrate cleanly into the Logifex request lifecycle.

It supports:

- JWT authentication (identity-only tokens)
- API key authentication
- Role-based authorization
- Dynamic permission resolution
- Refresh token rotation with pluggable stores (memory / Redis)

> ⚠️ JWT payloads should contain **identity only** (e.g. `sub`, `role`).  
> Permissions must NOT be embedded in JWTs.

---

## Installation

```bash
pnpm add @logifex/auth jsonwebtoken
```

To use Redis-backed refresh sessions, install ioredis:

```bash
pnpm add ioredis
```
---

## JWT Authentication

```ts
import { auth } from '@logifex/auth'
import jwt from 'jsonwebtoken'

const verify = async (token: string) => {
  try {
    return jwt.verify(token, 'secret')
  } catch {
    return null
  }
}

app.use(
  auth({
    strategy: 'jwt',
    options: { verify }
  })
)
```

---

## Accessing Auth Data

Authenticated user data is available via:

```ts
const auth = c.get('auth')
```

Example structure:

```json
{
  "type": "jwt",
  "payload": {
    "sub": "user_123",
    "role": "admin"
  }
}
```

---

## Authorization

### Require Role

```ts
requireRole('admin')
```

### Require Permission
Permissions are resolved dynamically at request time.

```ts
requirePermission(
  'user:create',
  async ({ sub, role }) => {
    if (role === 'admin') return ['user:create']
    return []
  }
)
```

These middleware can be composed after authentication.

---

## Refresh Tokens

Refresh token handling is **store-driven**.

Logifex provides:
- Rotation logic
- Replay protection
- Token family management

Your application provides a store implementation.

```ts
refreshSession({
  extractToken: (c) => c.req.header('x-refresh-token'),
  store: refreshStore,
  issueAccessToken: async (sub) =>
    jwt.sign({ sub }, SECRET, { expiresIn: '15m' })
})
```

Logifex owns refresh token lifecycle and security guarantees.
Your application provides a store implementation.

## Token Helpers

Utility helpers are provided for common token operations:

```ts
signToken()
verifyToken()
decodeToken()
```

---

Logifex defines the interface and expected behavior.
Your application owns cryptography and secrets.

> Token helpers are intentionally low-level and framework-agnostic.

---

## Design Principles

* Explicit authentication strategies
* Identity-only JWTs
* Store-driven refresh sessions
* Middleware-first composition
* Predictable request context

---