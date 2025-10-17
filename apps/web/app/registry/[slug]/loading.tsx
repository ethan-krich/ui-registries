import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="mb-8 flex gap-4">
      <div className="flex h-screen w-3/4 flex-col">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="flex h-screen w-1/4 flex-col">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  )
}
