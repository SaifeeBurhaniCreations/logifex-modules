/**
 * Core UI intent events
 * These must remain stable once published
 */
export const UI_EVENTS = {
  NODE_ADD: 'node:add',
  NODE_UPDATE: 'node:update',
  NODE_DELETE: 'node:delete',

  VARIABLE_SET: 'variable:set',
  VARIABLE_DELETE: 'variable:delete',

  FLOW_SAVE: 'flow:save',
  FLOW_RUN: 'flow:run',

  UI_ERROR: 'ui:error'
} as const