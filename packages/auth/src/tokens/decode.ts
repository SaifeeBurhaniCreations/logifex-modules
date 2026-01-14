export function decodeToken<TPayload>(
  decode: (token: string) => TPayload | null,
  token: string
): TPayload | null {
  return decode(token)
}