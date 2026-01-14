import type { ThemeDefinition } from './theme.types'

export function applyTheme(theme: ThemeDefinition) {
  const root = document.documentElement

  Object.entries(theme.colors).forEach(([key, value]) => {
    root.style.setProperty(`--lx-${key}`, value)
  })

  root.setAttribute('data-theme', theme.name)
};