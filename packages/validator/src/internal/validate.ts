import type { ZodSchema } from 'zod'
import type { ValidationError } from '../errors/validation-error'
import type { ValidationConfig } from '../types/schema'

export async function validateSource(
  schema: ZodSchema | undefined,
  data: unknown,
  source: keyof ValidationConfig
): Promise<
  | { success: true; data: unknown }
  | { success: false; error: ValidationError }
> {
  if (!schema) {
    return { success: true, data: undefined }
  }

  const result = await schema.safeParseAsync(data)

  if (!result.success) {
    return {
      success: false,
      error: {
        source,
        issues: result.error.issues
      }
    }
  }

  return { success: true, data: result.data }
}