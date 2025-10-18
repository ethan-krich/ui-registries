import Image from "next/image"
import Link from "next/link"
import { ExternalLinkIcon } from "lucide-react"

import { RegistryMetadata } from "@/types/registry"
import { getLinkPreviewImage, isValidUrl } from "@/lib/getLinkPreview"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import ImageWithFallback from "@/components/fallbackImage"

export default async function PreviewCard({
  registry,
}: {
  registry: RegistryMetadata
}) {
  const linkPreview = await getLinkPreviewImage(registry.homepage)
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
          src={linkPreview?.images?.[0] || "/placeholder.png"}
          alt={linkPreview?.title || "Placeholder"}
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
