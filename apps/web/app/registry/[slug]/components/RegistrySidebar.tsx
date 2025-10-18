import Link from "next/link"
import { ExternalLinkIcon, GithubIcon } from "lucide-react"

import { Button } from "@/components/ui/button"

export type RegistrySidebarProps = {
  githubUrl: string
  homepage?: string
}

export function RegistrySidebar({ githubUrl, homepage }: RegistrySidebarProps) {
  return (
    <div className="m-4 flex w-full flex-col gap-4 p-4 sm:m-8 lg:sticky lg:top-0 lg:mr-auto lg:h-full lg:w-1/4">
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
