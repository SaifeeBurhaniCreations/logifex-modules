import type { ZodSchema } from 'zod'

export interface ValidationConfig {
  body?: ZodSchema
  query?: ZodSchema
  params?: ZodSchema
  headers?: ZodSchema
  cookies?: ZodSchema
  files?: ZodSchema
}