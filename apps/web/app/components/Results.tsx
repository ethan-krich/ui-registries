"use client"

import { useEffect, useState } from "react"
import Fuse, { FuseResult } from "fuse.js"

import { RegistryMetadata } from "@/types/registry"
import { Input } from "@/components/ui/input"

import PreviewCard from "./PreviewCard"

export default function Results({
  registryMetadata,
  searchParams,
}: {
  registryMetadata: RegistryMetadata[]
  searchParams: { page: string }
}) {
  const itemsPerPage = 50
  const [currentMetadata, setCurrentMetadata] =
    useState<RegistryMetadata[]>(registryMetadata)
  const [query, setQuery] = useState<string>("")
  const [hasQueried, setHasQueried] = useState<boolean>(false)

  const fuse = new Fuse(registryMetadata, {
    keys: [
      "name",
      "items.title",
      "items.description",
      "items.name",
      "items.docs",
    ],
  })

  useEffect(() => {
    if (query) {
      const results = fuse.search(query)
      setCurrentMetadata(
        results.map((result: FuseResult<RegistryMetadata>) => result.item)
      )
      setHasQueried(true)
    }
    if (!query && hasQueried) {
      setCurrentMetadata(registryMetadata)
      setHasQueried(false)
    }
  }, [query])

  return (
    <>
      <div className="m-8 flex flex-col items-center justify-center gap-4 text-center">
        <h1 className="text-foreground text-5xl font-bold">
          Find the perfect UI registry.
        </h1>
        <p className="text-muted-foreground">
          Updated daily. Over 500 registries to choose from.
        </p>
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a registry"
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
        {currentMetadata
          .slice(
            (parseInt(searchParams.page || "1") - 1) * itemsPerPage,
            parseInt(searchParams.page || "1") * itemsPerPage
          )
          .map((registry: RegistryMetadata, index: number) => (
            <PreviewCard key={index} registry={registry} />
          ))}
      </div>
    </>
  )
}
