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
        <div className="bg-card  rounded-t-4xl min-h-20 w-full border p-4">
          <Accordion type="single" defaultValue="item-1">
            <AccordionItem value="item-1">
              <AccordionTrigger>What is UI Registries?</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  UI Registries is a complete list of every shadcn/ui registry
                  on Github updated daily. It is a place to browse for your next
                  UI library or component.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                How are the registries updated?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Every day the list is updated with the latest registries from
                  Github. It uses the Github API to search for all files called
                  registry.json. It ensures that the file is valid and there are
                  no duplicates and then adds it to the list.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>
                How can I add my registry to the list?
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">
                  Unlike the official shadcn/ui registry, UI Registries does not
                  require you to create a pull request to add your registry. In
                  fact your registry is probaly already in the list. The
                  requirments are simple:{" "}
                  <b>It should follow the shadcn/ui registry format</b> and{" "}
                  <b>be public on Github</b>. If you meet these requirements,
                  your registry will be added to the list within 24 hours.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  )
}
