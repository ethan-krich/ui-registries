"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { RegistryMetadata } from "@/types/registry"
import { isValidUrl } from "@/lib/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ImageWithFallback from "@/components/fallbackImage"

export default function PreviewCard({
  registry,
}: {
  registry: RegistryMetadata
}) {
  const hasValidHomepage = isValidUrl(registry.homepage)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-foreground text-2xl font-bold">
          {registry.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ImageWithFallback
          fallbackSrc="/placeholder.png"
          src={registry.imagePreview || "/placeholder.png"}
          alt={registry.name}
          width={500}
          height={500}
        />
      </CardContent>
      <CardFooter className="mt-auto flex gap-4">
        <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center">
          {hasValidHomepage ? (
            <Button variant="outline" asChild className="mt-auto sm:ml-auto">
              <Link href={registry.homepage}>
                <span>View Homepage</span>{" "}
                <ExternalLinkIcon className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <Button variant="outline" disabled className="mt-auto sm:ml-auto">
              <span>View Homepage</span>{" "}
              <ExternalLinkIcon className="h-4 w-4" />
            </Button>
          )}
          <Button asChild>
            <Link href={`/registry/${registry.name}`}>View registry</Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
