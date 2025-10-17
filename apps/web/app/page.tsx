import { promises as fs } from "fs"
import path from "path"
import Image from "next/image"

import { RegistryMetadata } from "@/types/registry"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ModeToggle } from "@/components/mode-toggle"

import PreviewCard from "./components/PreviewCard"

export default async function Home({
  searchParams,
}: {
  searchParams: { page: string }
}) {
  const filePath = path.join(
    process.cwd(),
    "public",
    "r",
    "registries-metadata.json"
  )
  const fileContents = await fs.readFile(filePath, "utf8")
  const registryMetadata = JSON.parse(fileContents)
  const itemsPerPage = 50

  return (
    <div className="">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <main className="bg-background flex flex-col items-center justify-center">
        <div className="m-8 flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-foreground text-5xl font-bold">
            Find the perfect UI registry.
          </h1>
          <p className="text-muted-foreground">
            Updated daily. Over 500 registries to choose from.
          </p>
        </div>
        <div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
          {registryMetadata
            .slice(
              (parseInt(searchParams.page || "1") - 1) * itemsPerPage,
              parseInt(searchParams.page || "1") * itemsPerPage
            )
            .map((registry: RegistryMetadata, index: number) => (
              <PreviewCard key={index} registry={registry} />
            ))}
        </div>
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`?page=${parseInt(searchParams.page) - 1}`}
                />
              </PaginationItem>
              {Array.from({
                length: Math.ceil(registryMetadata.length / 50),
              }).map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink href={`?page=${index + 1}`}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href={`?page=${parseInt(searchParams.page) + 1}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  )
}
