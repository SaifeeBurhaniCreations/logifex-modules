export const sizing = {
  xs: '24px',
  sm: '32px',
  md: '40px',
  lg: '48px',
  xl: '64px',
  full: '100%'
} as const

export type SizeToken = keyof typeof sizing;