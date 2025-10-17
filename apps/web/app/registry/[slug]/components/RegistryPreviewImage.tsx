import ImageWithFallback from "@/components/fallbackImage"

export type RegistryPreviewImageProps = {
  src: string | undefined
  alt: string
}

export function RegistryPreviewImage({ src, alt }: RegistryPreviewImageProps) {
  return (
    <ImageWithFallback
      src={src || "/placeholder.png"}
      alt={alt}
      width={1000}
      height={1000}
      className="m-4 w-full object-cover"
      fallbackSrc="/placeholder.png"
    />
  )
}
