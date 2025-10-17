import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export type RegistryDependencyListProps = {
  registryDependencies: string[]
}

export function RegistryDependencyList({
  registryDependencies,
}: RegistryDependencyListProps) {
  if (!registryDependencies || registryDependencies.length === 0) {
    return null
  }

  return (
    <>
      <b>Registry Dependencies:</b>{" "}
      {registryDependencies.map((dependency) => {
        let href = dependency
        try {
          new URL(dependency)
        } catch {
          href = `https://ui.shadcn.com/docs/components/${dependency}`
        }
        const splitDependency = dependency.split("/")
        return (
          <Badge key={dependency} className="m-2">
            <span className="flex flex-row items-center gap-2">
              <Link href={href} target="_blank">
                {splitDependency[splitDependency.length - 1]}
              </Link>
              <ExternalLinkIcon className="ml-auto h-4 w-4" />
            </span>
          </Badge>
        )
      })}
      <br />
    </>
  )
}
