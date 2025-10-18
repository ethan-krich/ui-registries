import ImageWithFallback from "@/components/fallbackImage"

export type RegistryHeaderProps = {
  iconSrc: string | undefined
  name: string
}

export function RegistryHeader({ iconSrc, name }: RegistryHeaderProps) {
  return (
    <div className="flex flex-row items-end gap-2 sm:gap-4">
      <ImageWithFallback
        src={iconSrc || "/shadcn.png"}
        alt={name}
        width={50}
        height={50}
        fallbackSrc="/shadcn.png"
        className="h-8 w-8 rounded-md border sm:h-12 sm:w-12"
      />
      <h1 className="text-foreground text-3xl font-bold sm:text-4xl lg:text-6xl">
        @{name}
      </h1>
    </div>
  )
}
