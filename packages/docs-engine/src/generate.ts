import type { GenerateDocsInput } from './types/input.js'

import { normalizeInput } from './normalize/normalize-input.js'
import { generateReadme } from './templates/readme.js'
import { generateChangelog } from './templates/changelog.js'
import { generateMigration } from './templates/migration.js'
import { formatMarkdown } from './formatter/format-markdown.js'
import { generatePrompt } from './prompt/generate-prompt.js'


export function generateDocs(input: GenerateDocsInput) {
  const lines = normalizeInput(input.rawContent)
  const output: Record<string, string> = {}

  for (const doc of input.docs) {
    if (doc === 'readme') {
      output.README = formatMarkdown(
        generateReadme(lines, input.target)
      )
    }

    if (doc === 'changelog') {
      output.CHANGELOG = formatMarkdown(
        generateChangelog(lines, input.version)
      )
    }

    if (doc === 'migration') {
      output.MIGRATION = formatMarkdown(
        generateMigration(lines, input.version)
      )
    }
  }

  return {
    files: output,
    prompt: generatePrompt(input)
  }
}