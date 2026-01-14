import { UI_EVENTS } from '../events'
import type { CardAdapterResult } from './adapter.types'
import type { UIMode } from '../modes'

/**
 * This function is an ADAPTER.
 * It may use hooks internally in a real app.
 *
 * UI components must NEVER call hooks directly.
 */
export function createNodeCardAdapter(params: {
  nodeId: string
  mode: UIMode

  // these would normally come from hooks
  nodeName: string
  nodeType: string
}) : CardAdapterResult {

  const { nodeId, nodeName, nodeType, mode } = params

  return {
    title: nodeName,
    description: `Type: ${nodeType}`,
    mode,

    actions: [
      {
        id: 'edit',
        label: 'Edit',
        capability: 'edit',
        intent: {
          type: UI_EVENTS.NODE_UPDATE,
          payload: { nodeId }
        }
      },
      {
        id: 'delete',
        label: 'Delete',
        capability: 'delete',
        intent: {
          type: UI_EVENTS.NODE_DELETE,
          payload: { nodeId }
        }
      }
    ],

    content: [
      { label: 'ID', value: nodeId },
      { label: 'Type', value: nodeType }
    ]
  }
}