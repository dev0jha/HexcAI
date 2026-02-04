import {
   Pagination,
   PaginationContent,
   PaginationItem,
   PaginationLink,
   PaginationNext,
   PaginationPrevious,
   PaginationEllipsis,
} from "@/components/ui/pagination"

interface CustomPaginationProps {
   currentPage: number
   totalPages: number
   hasNext: boolean
   hasPrev: boolean
   onPageChange: (page: number) => void
   onNext: () => void
   onPrevious: () => void
}

export function CustomPagination({
   currentPage,
   totalPages,
   hasNext,
   hasPrev,
   onPageChange,
   onNext,
   onPrevious,
}: CustomPaginationProps) {
   const getVisiblePages = () => {
      const pages = []
      const showEllipsis = totalPages > 7

      if (!showEllipsis) {
         for (let i = 1; i <= totalPages; i++) {
            pages.push(i)
         }
      } else {
         if (currentPage <= 4) {
            for (let i = 1; i <= 5; i++) {
               pages.push(i)
            }
            pages.push("ellipsis")
            pages.push(totalPages)
         } else if (currentPage >= totalPages - 3) {
            pages.push(1)
            pages.push("ellipsis")
            for (let i = totalPages - 4; i <= totalPages; i++) {
               pages.push(i)
            }
         } else {
            pages.push(1)
            pages.push("ellipsis")
            for (let i = currentPage - 1; i <= currentPage + 1; i++) {
               pages.push(i)
            }
            pages.push("ellipsis")
            pages.push(totalPages)
         }
      }

      return pages
   }

   return (
      <Pagination>
         <PaginationContent>
            <PaginationItem>
               <PaginationPrevious
                  onClick={onPrevious}
                  className={!hasPrev ? "pointer-events-none opacity-50" : "cursor-pointer"}
               />
            </PaginationItem>

            {getVisiblePages().map((page, index) => (
               <PaginationItem key={index}>
                  {page === "ellipsis" ? (
                     <PaginationEllipsis />
                  ) : (
                     <PaginationLink
                        isActive={currentPage === page}
                        onClick={() => onPageChange(page as number)}
                        className="cursor-pointer"
                     >
                        {page}
                     </PaginationLink>
                  )}
               </PaginationItem>
            ))}

            <PaginationItem>
               <PaginationNext
                  onClick={onNext}
                  className={!hasNext ? "pointer-events-none opacity-50" : "cursor-pointer"}
               />
            </PaginationItem>
         </PaginationContent>
      </Pagination>
   )
}
