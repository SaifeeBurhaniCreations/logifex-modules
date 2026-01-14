import { describe, it, expect } from 'vitest'
import { createNodeCardAdapter } from '../../src/adapters'

describe('Node adapter', () => {
  it('returns valid Card adapter result', () => {
    const result = createNodeCardAdapter({
      nodeId: 'n1',
      nodeName: 'Input',
      nodeType: 'input',
      mode: 'simple'
    })

    expect(result.title).toBe('Input')
    expect(result.actions.length).toBeGreaterThan(0)

    // Contract-level check
    result.actions.forEach(action => {
      expect(action).toHaveProperty('id')
      expect(action).toHaveProperty('label')
    })
  })
})