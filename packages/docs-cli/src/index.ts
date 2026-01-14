#!/usr/bin/env node

import { generateDocs } from '@logifex/docs-engine'
import fs from 'fs'
import readline from 'readline'

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
})

rl.question('Paste your notes:\n', raw => {
  const result = generateDocs({
    docs: ['readme'],
    target: 'npm',
    rawContent: raw
  })

  for (const [name, content] of Object.entries(result.files)) {
    fs.writeFileSync(`${name}.md`, content)
    console.log(`✔ ${name}.md generated`)
  }

  fs.writeFileSync('.logifex-prompt.txt', result.prompt)
  console.log('✔ Prompt generated')

  rl.close()
})