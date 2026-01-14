import React from 'react'
import { useMode } from '../../modes'
import { emitUIEvent } from '../../events'
import type { CardProps, CardAction } from './card.types'

export function Card(props: CardProps) {
  const {
    title,
    description,
    actions = [],
    mode,
    children,
    eventMeta
  } = props

  const modeDef = useMode(mode)

  function handleAction(action: CardAction) {
    if (!action.intent) return

    emitUIEvent({
      type: action.intent.type,
      payload: action.intent.payload ?? {},
      meta: {
        source: eventMeta?.source ?? 'Card',
        mode
      }
    })
  }

  const visibleActions = actions.filter(action => {
    if (!action.capability) return true
    return modeDef.allows(action.capability)
  })

  return (
    <div className="lx-card">
      {(title || visibleActions.length > 0) && (
        <div className="lx-card-header">
          {title && <h3>{title}</h3>}
          {description && <p>{description}</p>}

          {visibleActions.length > 0 && (
            <div className="lx-card-actions">
              {visibleActions.map(action => (
                <button
                  key={action.id}
                  onClick={() => handleAction(action)}
                >
                  {action.label}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="lx-card-body">
        {children}
      </div>
    </div>
  )
}