
---

## **`logifex/lifecycle`**

````md

Execution lifecycle hooks for Logifex.

> ⚠️ **Status: Experimental**  
> This package is under active development. Breaking changes may occur before `v1.0.0`.

---

## Overview

`@logifex/lifecycle` provides a middleware wrapper that exposes
request execution boundaries.

It allows you to hook into:

- request start
- successful response
- error handling

This module is intentionally minimal and unopinionated.

---

## Installation

```bash
pnpm add @logifex/lifecycle