export type PermissionResolver = (
  params: {
    sub: string
    role?: string
  }
) => Promise<string[]>