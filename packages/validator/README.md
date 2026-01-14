
---

## **`logifex/validator`**

````md

Zod-based request validation middleware for Logifex.

> ⚠️ **Status: Experimental**  
> This package is under active development. Breaking changes may occur before `v1.0.0`.

---

## Overview

`@logifex/validator` provides explicit, predictable request validation using Zod.

It can validate:

- Request body
- Query parameters
- Route parameters
- Headers
- Cookies

---

## Installation

```bash
pnpm add @logifex/validator zod
````

---

## Basic Usage

```ts
import { validator } from '@logifex/validator'
import { z } from 'zod'

app.post(
  '/users',
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
    return c.json(input)
  }
)
```

---

## Accessing Validated Data

Validated input is available via:

```ts
c.get('input')
```

Structure:

```ts
{
  body?: unknown
  query?: unknown
  params?: unknown
  headers?: unknown
  cookies?: unknown
}
```

---

## Validation Errors

When validation fails, the middleware returns:

```json
{
  "success": false,
  "code": "VALIDATION_ERROR",
  "errors": []
}
```

HTTP status: `400`

---

## Design Principles

* No schema inference magic
* No runtime mutation
* Explicit validation per route
* Predictable middleware behavior

---