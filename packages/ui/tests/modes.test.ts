import { describe, it, expect } from 'vitest'
import { useMode } from '../src/modes'

describe('Mode system', () => {
  it('simple mode blocks advanced capabilities', () => {
    const mode = useMode('simple')

    expect(mode.allows('edit')).toBe(true)
    expect(mode.allows('delete')).toBe(false)
    expect(mode.allows('advanced-config')).toBe(false)
  })

  it('pro mode allows all capabilities', () => {
    const mode = useMode('pro')

    expect(mode.allows('delete')).toBe(true)
    expect(mode.allows('advanced-config')).toBe(true)
  })
})