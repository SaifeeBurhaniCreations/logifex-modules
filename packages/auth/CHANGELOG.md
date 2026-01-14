## **`logifex/auth`**
# Changelog — @logifex/auth

All notable changes to this package are documented here.

This project follows Semantic Versioning.

## [0.2.0] — 2026-01-03

### 🚨 Breaking Changes
- Removed permissions from JWT payload
- `requirePermission` now requires a permission resolver
- Refresh session API replaced with store-based model
- Refresh token rotation is enforced
- Refresh token reuse protection added

### ✨ Added
- Redis-backed refresh store
- Memory refresh store abstraction
- Refresh token families
- Global logout support
- Optional `onRefresh` hook
- Stronger JWT payload typing

### 🔒 Security
- JWT now carries identity only
- Permissions resolved dynamically
- Refresh replay attacks prevented

---

## [0.1.1]
- Internal hardening
- Token normalization
- DX improvements

## [0.1.0]
- Initial release