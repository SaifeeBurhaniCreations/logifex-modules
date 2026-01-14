# 📦 Logifex Framework — Continuation Context Document

> **Purpose:**
> This document provides full architectural context for continuing development of the **Logifex** modular backend framework.
> Paste this into a new ChatGPT chat and continue from there.

---

## 1️⃣ What is Logifex?

**Logifex** is a **modular, middleware-first backend framework** built on top of **Hono**.

Core principles:

* Middleware is the only abstraction
* No hidden global state
* Explicit composition
* Strong TypeScript contracts
* Each feature = independent module
* Core stays thin forever

Logifex is **not** a full framework like NestJS — it is a **composable backend toolkit**.

---

## 2️⃣ Core Architectural Rules (LOCKED)

These rules must NOT be violated:

1. **Core is thin**

   * No business logic
   * No feature logic
   * Only composition + contracts

2. **Modules never depend on each other directly**

   * They communicate only through:

     * Hono context
     * shared types (`@logifex/types` planned)

3. **No magic**

   * No auto-registration
   * No hidden hooks
   * Order is explicit

4. **Everything is middleware**

   * Auth, validation, tracing, rate-limit, lifecycle, etc.

---

## 3️⃣ Current Modules (IMPLEMENTED & STABLE)

### ✅ `@logifex/core` (published)

Responsibilities:

* `createLogifexApp()` → returns typed Hono app
* `createLogifex()` → middleware group wrapper
* middleware composition
* shared error contracts

Does NOT:

* log
* validate
* authenticate
* trace

---

### ✅ `@logifex/validator`

* Zod-based request validation
* Validates: body, query, params, headers, cookies
* Attaches validated data to context as `c.get('input')`
* Explicit schemas only (no inference magic)

---

### ✅ `@logifex/auth`

* JWT authentication
* API key authentication
* Role-based authorization
* Permission-based authorization
* Refresh-token flow (storage-agnostic)

Attaches:

```ts
c.get('auth')
```

---

### ✅ `@logifex/rate-limit`

* Rate limiting middleware
* V1 = in-memory store
* Per-IP and per-user helpers
* Future-proof storage interface

---

### ✅ `@logifex/trace`

Purpose:

* Request identity + timing

What it does:

* Reads incoming trace header (e.g. `x-request-id`)
* Generates trace ID if missing
* Attaches trace context to `c.get('trace')`
* Adds trace header to response
* Records:

  * `startedAt`
  * `durationMs` (computed in `finally`)

Important:

* `durationMs` is available **only after request completes**
* Outer middleware finishes last

TraceContext shape:

```ts
{
  id: string
  source: 'incoming' | 'generated'
  startedAt: number
  durationMs?: number
}
```

---

### ✅ `@logifex/lifecycle`

Purpose:

* Execution boundary hooks

Hooks:

```ts
onRequest(c)
onResponse(c)
onError(c, error)
```

Rules:

* Can be applied globally or per-route
* Multiple lifecycle middlewares can coexist
* Order matters (middleware order)
* No logging, no metrics, no opinions

Lifecycle is used to **observe**, not own logic.

---

## 4️⃣ Important Execution Insight (VERY IMPORTANT)

Middleware ordering rule:

> **Outer middleware finishes LAST.
> Inner middleware finishes FIRST.**

This explains why:

* `trace.durationMs` is not visible inside lifecycle `onResponse`
* It *is* visible after the entire request chain finishes

This is **correct behavior** and must be preserved.

---

## 5️⃣ Current State (as of now)

* Core + validator + auth + rate-limit + trace + lifecycle are working
* Trace timing implemented correctly
* READMEs are written and professional
* Core is published to npm
* Trace & lifecycle ready to publish after final confirmation

---

## 6️⃣ Design Decision (LOCKED)

**Trace owns timing**, not lifecycle.

* Trace sets `startedAt` + `durationMs`
* Lifecycle can observe timing but does not calculate it

This keeps responsibilities clean.

---

## 7️⃣ NEXT MODULES (PLANNED, NOT IMPLEMENTED)

### 🔜 Module 7 — Lifecycle (DONE)

Already implemented.

---

### 🔜 Module 8 — Timeout

Purpose:

* Abort requests exceeding time limit

Design:

* Built using lifecycle or middleware wrapper
* Uses `AbortController`
* No coupling with auth/validator
* Optional per-route or global

---

### 🔜 Module 9 — Structured Logging (Optional)

Purpose:

* Emit structured logs (JSON)

Design:

* Uses lifecycle hooks
* Logger is user-provided
* No logging dependency baked in

---

### 🔜 Module 10 — Error Normalization

Purpose:

* Normalize all errors at boundary

Design:

* Wrap final response
* Attach trace ID
* Consistent error shape

---

### 🔜 Module 11 — Metrics (Future)

* Counters
* Durations
* No Prometheus dependency
* Hook-based

---

## 8️⃣ Shared Types Strategy (Planned)

Future package:

```txt
@logifex/types
```

Will contain:

* TraceContext
* AuthContext
* InputContext
* RateLimitContext

Rule:

> Core may depend on types, but never on feature modules.

---

## 9️⃣ Non-Goals (DO NOT DO)

* Do NOT add decorators
* Do NOT add global config
* Do NOT add dependency injection
* Do NOT add reflection
* Do NOT auto-register modules

---

## 1️⃣0️⃣ How to Continue in Next Chat

In the next ChatGPT conversation:

1. Paste this document
2. Say:

   > “Continue Logifex development from this context”
3. Pick the next module (Timeout recommended)