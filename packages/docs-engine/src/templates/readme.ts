export function generateReadme(lines: string[], target: string): string {
  return `
# Project

## Overview
${lines.join('\n')}

## Installation
\`\`\`bash
npm install your-package
\`\`\`

## Usage
Describe how to use the project.

---
`.trim()
}