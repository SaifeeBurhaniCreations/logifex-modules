import type { DocType } from './doc-type.js'
import type { Target } from './target.js'

export interface GenerateDocsInput {
  docs: DocType[]
  target: Target
  rawContent: string
  version?: string
  breaking?: boolean
}