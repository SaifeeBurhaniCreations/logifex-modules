export interface TraceContext {
  id: string
  source: 'incoming' | 'generated'
  startedAt: number
  durationMs?: number
}