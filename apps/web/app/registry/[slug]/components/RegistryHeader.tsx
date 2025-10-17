import ImageWithFallback from "@/components/fallbackImage"

export type RegistryHeaderProps = {
  iconSrc: string | undefined
  name: string
}

export function RegistryHeader({ iconSrc, name }: RegistryHeaderProps) {
  return (
    <div className="flex flex-row items-end gap-4">
      <ImageWithFallback
        src={iconSrc || "/shadcn.png"}
        alt={name}
        width={50}
        height={50}
        fallbackSrc="/shadcn.png"
        className="rounded-md border"
      />
      <h1 className="text-foreground text-6xl font-bold">@{name}</h1>
    </div>
  )
}
