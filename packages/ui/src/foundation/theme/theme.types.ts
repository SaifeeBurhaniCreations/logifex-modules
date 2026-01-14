export type ThemeName = 'light' | 'dark';

export interface ThemeDefinition {
  name: ThemeName

  colors: {
    background: string
    surface: string
    surfaceAlt: string

    textPrimary: string
    textSecondary: string
    textMuted: string

    border: string
    divider: string

    accent: string
    accentHover: string
    danger: string
  }
};