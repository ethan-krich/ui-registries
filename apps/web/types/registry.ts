/**
 * shadcn/ui Registry Schema
 * @see https://ui.shadcn.com/schema/registry.json
 * @see https://ui.shadcn.com/docs/registry/registry-item-json
 */
export type RegistryItem = {
  $schema?: string
  name: string
  type:
    | "registry:block"
    | "registry:component"
    | "registry:lib"
    | "registry:hook"
    | "registry:ui"
    | "registry:page"
    | "registry:file"
    | "registry:style"
    | "registry:theme"
    | "registry:item"
  title?: string
  description?: string
  author?: string
  dependencies?: string[]
  registryDependencies?: string[]
  files: {
    path: string
    type: string
    target?: string
  }[]
  tailwind?: {
    config?: Record<string, any>
  }
  cssVars?: {
    theme?: Record<string, string>
    light?: Record<string, string>
    dark?: Record<string, string>
  }
  css?: Record<string, any>
  envVars?: Record<string, string>
  docs?: string
  categories?: string[]
  meta?: Record<string, any>
}

export type RegistryMetadata = {
  $schema?: string
  name: string
  homepage: string
  github: string
  imagePreview: string
  items: RegistryItem[]
}
