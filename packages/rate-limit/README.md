
---

## **`logifex/rate-limit`**


````md

Rate limiting middleware for Logifex.

> ⚠️ **Status: Experimental**  
> This package is under active development. Breaking changes may occur before `v1.0.0`.

---

## Overview

`@logifex/rate-limit` provides simple, composable rate limiting middleware
designed to integrate seamlessly with the Logifex ecosystem.

Version 1 uses an **in-memory store** with a **future-proof storage interface**.

---

## Installation

```bash
pnpm add @logifex/rate-limit
````

---

## Basic Usage

```ts
import { rateLimit } from '@logifex/rate-limit'

app.post(
  '/endpoint',
  rateLimit({
    limit: 100,
    window: '1m',
    key: (c) => c.req.ip
  }),
  handler
)
```

---

## Per-IP Rate Limiting

```ts
rateLimitPerIp({ limit: 50 })
```

Applies rate limits based on the request IP address.

---

## Per-User Rate Limiting

```ts
rateLimitPerUser({ limit: 10 })
```

Applies rate limits per authenticated user.

> Requires authentication middleware to be applied earlier in the chain.

---

## Error Response

When the rate limit is exceeded, the middleware returns:

```json
{
  "success": false,
  "code": "FORBIDDEN",
  "message": "Rate limit exceeded",
  "details": {
    "limit": 10,
    "resetAt": 1710000000000
  }
}
```

HTTP status: `429`

---

## Design Principles

* In-memory store by default
* Storage interface is replaceable
* No Redis required for v1
* Predictable, middleware-first behavior

Future versions will add Redis and KV-based adapters.

---