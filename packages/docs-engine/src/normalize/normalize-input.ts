export function normalizeInput(raw: string): string[] {
  return raw
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
}