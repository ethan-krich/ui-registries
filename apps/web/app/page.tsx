import { promises as fs } from "fs"
import path from "path"

import { RegistryMetadata } from "@/types/registry"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { ModeToggle } from "@/components/mode-toggle"

import { Faq } from "./components/Faq"
import PaginationMenu from "./components/Pagination"
import PreviewCard from "./components/PreviewCard"
import Results from "./components/Results"

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>
}) {
  const resolvedSearchParams = await searchParams
  const filePath = path.join(
    process.cwd(),
    "public",
    "r",
    "registries-metadata.json"
  )
  const fileContents = await fs.readFile(filePath, "utf8")
  const registryMetadata = JSON.parse(fileContents)

  return (
    <div className="">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <main className="bg-background flex flex-col items-center justify-center">
        <Results
          registryMetadata={registryMetadata}
          searchParams={resolvedSearchParams}
        />
        <div>
          <PaginationMenu
            metadataLength={registryMetadata.length}
            currentPage={parseInt(resolvedSearchParams.page || "1")}
          />
        </div>
        <div className="bg-card  rounded-t-4xl min-h-20 w-full border p-4">
          <Faq />
        </div>
      </main>
    </div>
  )
}
