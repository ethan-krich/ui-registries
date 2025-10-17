import Link from "next/link"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export type RegistrySidebarProps = {
  githubUrl: string
  homepage?: string
}

export function RegistrySidebar({ githubUrl, homepage }: RegistrySidebarProps) {
  return (
    <div className="sticky top-0 m-8 mr-auto flex h-full w-1/4 flex-col gap-4 p-4">
      <Button variant="outline" className="flex flex-row justify-start" asChild>
        <Link href={githubUrl} target="_blank">
          <span>Github</span>
          <GithubIcon className="ml-auto h-4 w-4" />
        </Link>
      </Button>
      {homepage ? (
        <Button asChild className="flex flex-row justify-start gap-2">
          <Link href={homepage} target="_blank">
            <span>Homepage</span>
            <ExternalLinkIcon className="ml-auto h-4 w-4" />
          </Link>
        </Button>
      ) : null}
    </div>
  )
}
