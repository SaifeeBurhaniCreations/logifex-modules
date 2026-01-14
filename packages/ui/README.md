
---

## **`logifex/ui`**

````md

Zod-based request validation middleware for Logifex.

> ⚠️ **Status: Experimental**  
> This package is under active development. Breaking changes may occur before `v1.0.0`.

---

## Overview
Mode-aware, hook-driven UI framework for the Logifex ecosystem.

## Design Principles

- UI emits intent, never side-effects
- Logic lives in hooks, not components
- Simple vs Pro is a behavior contract
- Backend sync is future-ready, not assumed
- No backend module dependencies

## Status

🚧 Early development (private)
---


import '@logifex/ui/foundation/css'
import { applyTheme, lightTheme } from '@logifex/ui'

applyTheme(lightTheme)
