import { generateDocs } from '@logifex/docs-engine'

export function renderApp(root: HTMLElement) {
  root.innerHTML = `
    <div class="app">
      <header class="header">
        <h1>Logifex Docs</h1>
        <p>Generate clean documentation or copy a ChatGPT-ready prompt.</p>
      </header>

      <section class="card">
        <label class="label">Input Notes</label>
        <textarea
          id="input"
          placeholder="Paste your notes, changelog entries, or migration steps..."
        ></textarea>

        <div class="options">
          <label class="checkbox">
            <input type="checkbox" value="readme" checked />
            README
          </label>
          <label class="checkbox">
            <input type="checkbox" value="changelog" />
            CHANGELOG
          </label>
          <label class="checkbox">
            <input type="checkbox" value="migration" />
            MIGRATION
          </label>
        </div>

        <div class="options">
          <label class="radio">
            <input type="radio" name="mode" value="output" checked />
            Formatted Output
          </label>
          <label class="radio">
            <input type="radio" name="mode" value="prompt" />
            ChatGPT Prompt
          </label>
        </div>

        <button id="generate" class="primary">
          Generate
        </button>
      </section>

      <section class="card output-card">
        <div class="output-header">
          <label class="label" id="output-title">Generated Output</label>
          <button id="copy" class="secondary">Copy</button>
        </div>
        <pre id="output"></pre>
      </section>
    </div>
  `

  const input = root.querySelector('#input') as HTMLTextAreaElement
  const output = root.querySelector('#output') as HTMLElement
  const button = root.querySelector('#generate') as HTMLButtonElement
  const copyBtn = root.querySelector('#copy') as HTMLButtonElement
  const title = root.querySelector('#output-title') as HTMLElement

  button.onclick = () => {
    const docs = Array.from(
      root.querySelectorAll<HTMLInputElement>('input[type=checkbox]:checked')
    ).map(c => c.value as 'readme' | 'changelog' | 'migration')

    const mode = (
      root.querySelector<HTMLInputElement>('input[name="mode"]:checked')!
        .value
    ) as 'output' | 'prompt'

    const result = generateDocs({
      rawContent: input.value,
      docs,
      target: 'npm'
    })

    if (mode === 'prompt') {
      title.textContent = 'ChatGPT Prompt'
      output.textContent = result.prompt
    } else {
      title.textContent = 'Generated Output'
      output.textContent = Object.entries(result.files)
        .map(([name, content]) => `# ${name}\n\n${content}`)
        .join('\n\n---\n\n')
    }
  }

  copyBtn.onclick = async () => {
    await navigator.clipboard.writeText(output.textContent ?? '')
    copyBtn.textContent = 'Copied!'
    setTimeout(() => (copyBtn.textContent = 'Copy'), 1200)
  }
}