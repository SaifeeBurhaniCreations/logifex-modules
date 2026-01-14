export function generateMigration(
  lines: string[],
  version = 'Next'
): string {
  return `
# Migration Guide — ${version}

## Summary
${lines.join('\n')}

## Required Changes
- Review breaking changes
- Update your code accordingly
`.trim()
}