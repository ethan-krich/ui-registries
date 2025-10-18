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
      className="m-2 w-full object-cover sm:m-4"
      fallbackSrc="/placeholder.png"
    />
  )
}
