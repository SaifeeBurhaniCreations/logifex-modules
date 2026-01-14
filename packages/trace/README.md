
---

## **`logifex/trace`**

````md
Request tracing and correlation ID middleware for Logifex.

> ⚠️ **Status: Experimental**  
> This package is under active development. Breaking changes may occur before `v1.0.0`.

---

## Overview

`@logifex/trace` assigns a unique identifier to every incoming request.

It enables:
- request correlation across middleware
- easier debugging
- consistent tracing across responses

---

## Installation

```bash
pnpm add @logifex/trace