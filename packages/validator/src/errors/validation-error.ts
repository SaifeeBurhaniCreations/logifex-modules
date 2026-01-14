import type { ZodIssue } from 'zod'
import type { ValidationConfig } from '../types/schema'

export interface ValidationError {
  source: keyof ValidationConfig
  issues: ZodIssue[]
}