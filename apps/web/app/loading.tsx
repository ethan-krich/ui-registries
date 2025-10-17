import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="grid w-full grid-cols-1 gap-4 p-8 md:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 50 }).map((_, index) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-10 w-1/2" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Skeleton className="mr-2 h-10 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="ml-auto mt-auto h-10 w-1/2" />
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
