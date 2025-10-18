import { notFound } from "next/navigation"
import fetchMeta from "fetch-meta-tags"

import { RegistryMetadata } from "@/types/registry"
import { getLinkPreviewImage } from "@/lib/getLinkPreview"

import { RegistryHeader } from "./components/RegistryHeader"
import { RegistryInfo } from "./components/RegistryInfo"
import { RegistryPreviewImage } from "./components/RegistryPreviewImage"
import { RegistrySidebar } from "./components/RegistrySidebar"

export default async function RegistryPage({
  params,
}: {
  params: { slug: string }
}) {
  const slug = decodeURIComponent(params.slug)
  const registryMetadataRaw = await fetch(
    `${process.env.APP_URL}/r/registries-metadata.json`
  )
  const registryMetadata = await registryMetadataRaw.json()

  const registry: RegistryMetadata = registryMetadata.find(
    (registry: RegistryMetadata) => registry.name === slug
  )

  if (!registry) {
    return notFound()
  }

  const meta = await fetchMeta(registry.homepage)
  const github = `https://github.com/${registry.github}`
  const linkPreview = await getLinkPreviewImage(registry.homepage)

  return (
    <div className="flex flex-col gap-4 lg:flex-row">
      <div className="flex w-full flex-col lg:w-3/4">
        <div className="m-4 sm:m-8">
          <RegistryHeader iconSrc={meta.icon} name={registry.name} />
          <RegistryPreviewImage
            src={linkPreview?.images?.[0]}
            alt={registry.name}
          />
        </div>

        <RegistryInfo
          registry={registry}
          title={meta.title}
          description={meta.description}
        />
      </div>
      <RegistrySidebar githubUrl={github} homepage={registry.homepage} />
    </div>
  )
}
