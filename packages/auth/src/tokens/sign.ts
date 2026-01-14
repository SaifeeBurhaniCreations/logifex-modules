export function signToken<TPayload extends object>(
  options: {
    payload: TPayload
    sign: (payload: TPayload, options: { expiresIn: string | number }) => string
    expiresIn: string | number
  }
): string {
  return options.sign(options.payload, {
    expiresIn: options.expiresIn
  })
}