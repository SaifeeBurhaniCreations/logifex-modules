export function generateChangelog(
  lines: string[],
  version = 'Unreleased'
): string {
  return `
# Changelog

## [${version}]
${lines.map(l => `- ${l}`).join('\n')}
`.trim()
}