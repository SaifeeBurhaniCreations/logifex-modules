import type { LogifexErrorCode } from './error-codes'

export interface LogifexErrorResponse<TDetails = unknown> {
  success: false
  code: LogifexErrorCode | string
  message: string
  details?: TDetails
}

export function createErrorResponse<TDetails = unknown>(
  params: {
    code: LogifexErrorCode | string
    message: string
    details?: TDetails
  }
): LogifexErrorResponse<TDetails> {
  return {
    success: false,
    code: params.code,
    message: params.message,
    details: params.details
  }
}