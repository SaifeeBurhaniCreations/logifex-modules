import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Card } from '../../src/primitives/Card'
import { registerUIEventHandler } from '../../src/events'

describe('Card', () => {
  it('hides restricted actions in simple mode', () => {
    render(
      <Card
        title="Test"
        mode="simple"
        actions={[
          {
            id: 'delete',
            label: 'Delete',
            capability: 'delete',
            intent: { type: 'node:delete' }
          }
        ]}
      >
        content
      </Card>
    )

    expect(screen.queryByText('Delete')).toBeNull()
  })

  it('emits event on action click', () => {
    const handler = vi.fn()
    registerUIEventHandler(handler)

    render(
      <Card
        title="Test"
        mode="pro"
        actions={[
          {
            id: 'edit',
            label: 'Edit',
            intent: { type: 'node:edit' }
          }
        ]}
      >
        content
      </Card>
    )

    fireEvent.click(screen.getByText('Edit'))
    expect(handler).toHaveBeenCalledOnce()
  })
})