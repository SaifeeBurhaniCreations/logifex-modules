export const elevation = {
  0: 'none',
  1: '0 1px 2px rgba(0,0,0,0.08)',
  2: '0 2px 6px rgba(0,0,0,0.12)',
  3: '0 6px 16px rgba(0,0,0,0.16)'
} as const

export type ElevationToken = keyof typeof elevation;