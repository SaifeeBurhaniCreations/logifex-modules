
---

## **`logifex/core`**

````md
Core utilities and contracts for the Logifex ecosystem.

> ⚠️ **Status: Experimental**  
> This package is under active development. Breaking changes may occur before `v1.0.0`.

---

## Overview

`@logifex/core` provides the foundational building blocks used by all Logifex modules.

This package includes:

- Logifex application factory
- Shared error contracts
- Shared context typing
- Middleware composition utilities

You will **rarely interact with this package directly**.  
It exists to support other Logifex modules.

---

## Installation

```bash
pnpm add @logifex/core hono
````

---

## Usage

```ts
import { createLogifexApp } from '@logifex/core'

const app = createLogifexApp()

app.get('/', (c) => c.text('Hello'))

app.listen({ port: 3000 })
```

---

## Error Contract

All Logifex middleware returns errors in the following consistent format:

```json
{
  "success": false,
  "code": "FORBIDDEN",
  "message": "Reason"
}
```

This guarantees predictable error handling across all Logifex modules.

---

## Design Principles

* Explicit over implicit behavior
* No hidden global state
* Middleware-first architecture
* Strong TypeScript guarantees

---