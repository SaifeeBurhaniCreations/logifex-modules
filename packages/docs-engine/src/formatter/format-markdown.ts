export function formatMarkdown(md: string): string {
  return md.replace(/\n{3,}/g, '\n\n').trim() + '\n'
}