import React from 'react'
import { Card } from '../../primitives/Card'
import { useMode } from '../../modes'
import type { PanelProps, PanelSection } from './panel.types'

export function Panel(props: PanelProps) {
  const {
    title,
    description,
    mode,
    actions = [],
    sections = [],
    children,
    eventMeta
  } = props

  const modeDef = useMode(mode)

  const visibleSections = sections.filter(section => {
    if (!section.capability) return true
    return modeDef.allows(section.capability)
  })

  return (
    <Card
      title={title}
      description={description}
      mode={mode}
      actions={actions}
      eventMeta={eventMeta}
    >
      {/* Structured sections (Simple + Pro) */}
      {visibleSections.map(section => (
        <div key={section.id} className="lx-panel-section">
          {section.title && (
            <h4 className="lx-panel-section-title">
              {section.title}
            </h4>
          )}
          <div className="lx-panel-section-body">
            {section.content}
          </div>
        </div>
      ))}

      {/* Pro escape hatch */}
      {modeDef.allows('advanced-config') && children}
    </Card>
  )
}