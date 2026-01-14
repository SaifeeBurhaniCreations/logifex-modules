## **`logifex/auth`**

This guide explains how to migrate an application from
`@logifex/auth@0.1.x` to `@logifex/auth@0.2.0`.

Version `0.2.0` introduces **intentional breaking changes**
to improve security, scalability, and correctness.

---

## 🔴 Summary of Breaking Changes

| Area | 0.1.x | 0.2.0 |
|----|----|----|
JWT payload | Included permissions | Identity only (`sub`, `role`) |
Permissions | Read from JWT | Resolved dynamically |
Refresh tokens | App-managed | Store-managed |
Refresh API | `validate`, `revoke` | `store` abstraction |
Sessions | In-memory only | Memory / Redis |
Logout | Not supported | Supported |

---

## 1️⃣ Remove Permissions from JWT

### ❌ Old (0.1.x)
```ts
jwt.sign({
  sub,
  role,
  permissions
})
```

### ✅ New (0.2.0)
```ts
jwt.sign({
  sub,
  role
})
```
Permissions are no longer trusted from JWT.

---

## 2️⃣ Update requirePermission Usage

### ❌ Old
```ts
requirePermission('user:create')
```

### ✅ New
```ts
requirePermission('user:create', permissionResolver)
```

### Example resolver:

```ts
const permissionResolver = async ({ sub, role }) => {
  if (role === 'admin') return ['user:create']
  return []
}
```

### 3️⃣ Update Refresh Session Usage

### ❌ Old (0.1.x)
```ts
refreshSession({
  extractToken,
  validate,
  revoke,
  issueAccessToken,
  issueRefreshToken
})
```

### ✅ New (0.2.0)
```ts
refreshSession({
  extractToken,
  store,
  issueAccessToken
})
```

Refresh token validation and rotation are now handled by the store.

### 4️⃣ Update Login Handler Return Type

### ❌ Old (invalid)
```ts
async () => {
  return { accessToken, refreshToken }
}
```

### ✅ New
```ts
async (c) => {
  return c.json({ accessToken, refreshToken })
}
```

All handlers must return a Response.

### 5️⃣ (Optional) Enable Redis Refresh Store
```bash
pnpm add ioredis
```

```ts
import Redis from 'ioredis'
import { RedisRefreshStore } from '@logifex/auth'

const redis = new Redis()
const refreshStore = new RedisRefreshStore(redis)
```

---