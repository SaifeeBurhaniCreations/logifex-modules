import { describe, it, expect, vi } from 'vitest'
import { emitUIEvent, registerUIEventHandler } from '../src/events'

describe('UI events', () => {
  it('emits serializable intent', () => {
    const handler = vi.fn()
    registerUIEventHandler(handler)

    emitUIEvent({
      type: 'node:delete',
      payload: { nodeId: '123' },
      meta: { source: 'Card', mode: 'pro' }
    })

    expect(handler).toHaveBeenCalledOnce()
    expect(handler.mock.calls[0][0]).toMatchObject({
      type: 'node:delete',
      payload: { nodeId: '123' }
    })
  })
})