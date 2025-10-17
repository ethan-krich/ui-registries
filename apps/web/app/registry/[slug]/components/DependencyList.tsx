import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { Badge } from "@/components/ui/badge"

export type DependencyListProps = {
  dependencies: string[]
}

export function DependencyList({ dependencies }: DependencyListProps) {
  if (!dependencies || dependencies.length === 0) {
    return null
  }

  return (
    <>
      <b>Dependencies:</b>{" "}
      {dependencies.map((dependency) => (
        <Badge key={dependency} className="m-2">
          <span className="flex flex-row items-center gap-2">
            <Link
              href={`https://www.npmjs.com/package/${dependency}`}
              target="_blank"
            >
              {dependency}
            </Link>
            <ExternalLinkIcon className="ml-auto h-4 w-4" />
          </span>
        </Badge>
      ))}
      <br />
    </>
  )
}
