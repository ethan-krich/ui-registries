import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

export default function PaginationMenu({
  metadataLength,
  currentPage,
}: {
  metadataLength: number
  currentPage: number
}) {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href={`?page=${currentPage - 1}`} />
        </PaginationItem>
        {Array.from({
          length: Math.ceil(metadataLength / 50),
        }).map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink href={`?page=${index + 1}`}>
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext href={`?page=${currentPage + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
