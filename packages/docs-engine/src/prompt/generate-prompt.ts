import type { GenerateDocsInput } from '../types/input.js'

export function generatePrompt(input: GenerateDocsInput): string {
  return `
You are a documentation assistant.

Generate the following documents:
${input.docs.join(', ')}

Target platform: ${input.target}
Version: ${input.version ?? 'unspecified'}
Breaking changes: ${input.breaking ? 'yes' : 'no'}

Raw notes:
${input.rawContent}

Output clean, production-ready markdown.
`.trim()
}