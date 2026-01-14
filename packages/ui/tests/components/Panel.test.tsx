/// <reference types="vitest/globals" />

import { render, screen } from '@testing-library/react'
import { Panel } from '../../src/components/Panel'

describe('Panel', () => {
  it('renders only allowed sections', () => {
    render(
      <Panel
        title="Settings"
        mode="simple"
        sections={[
          {
            id: 'advanced',
            title: 'Advanced',
            capability: 'advanced-config',
            content: <div>Advanced</div>
          }
        ]}
      />
    )

    expect(screen.queryByText('Advanced')).toBeNull()
  })
})