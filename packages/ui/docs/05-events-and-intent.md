# Events & Intent

Logifex UI never performs side effects.

Instead, it emits **intent events**.

```ts
{
  type: 'node:delete',
  payload: { nodeId: '123' }
}
```
Explain event handler registration.
