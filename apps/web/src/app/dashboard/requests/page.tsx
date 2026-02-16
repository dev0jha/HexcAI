"use client"

import { IconMailForward } from "@tabler/icons-react"
import { RequestCard } from "@/components/requests/request-card"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContactRequestsPagination } from "@/hooks/use-contact-requests"

import type { ContactRequest } from "@/lib/queries/query.types"

export default function RequestsPage() {
   const {
      meta,
      isLoading,
      error,
      updateStatus,
      pendingRequests,
      acceptedRequests,
      rejectedRequests,
      currentPage,
      nextPage,
      prevPage,
      goToPage,
   } = useContactRequestsPagination()

   if (isLoading) return <LoadingState />

   if (!!error) return <ErrorState />

   return (
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
         <div className="space-y-6">
            <Tabs defaultValue="pending" className="w-full mt-12">
               <div className="mb-6 flex items-center border-b border-zinc-800 pb-4">
                  <TabsList className="h-11 w-full gap-2 bg-transparent p-0 border-2 border-neutral-700/50 px-1">
                     <TabItem value="pending" count={pendingRequests.length} label="Pending" />
                     <TabItem value="accepted" count={0} label="Accepted" />
                     <TabItem value="rejected" count={0} label="Declined" />
                  </TabsList>
               </div>

               <TabsContent value="pending">
                  <RequestGrid
                     requests={pendingRequests}
                     emptyMsg="No pending requests"
                     onUpdate={updateStatus}
                  />
                  {meta && meta.totalPages > 1 && pendingRequests.length > 0 && (
                     <div className="mt-8">
                        <CustomPagination
                           currentPage={currentPage}
                           totalPages={meta.totalPages}
                           hasNext={meta.hasNext}
                           hasPrev={meta.hasPrev}
                           onPageChange={goToPage}
                           onNext={nextPage}
                           onPrevious={prevPage}
                        />
                     </div>
                  )}
               </TabsContent>

               <TabsContent value="accepted">
                  <RequestGrid
                     requests={acceptedRequests}
                     emptyMsg="No accepted requests"
                     onUpdate={updateStatus}
                  />
               </TabsContent>

               <TabsContent value="rejected">
                  <RequestGrid
                     requests={rejectedRequests}
                     emptyMsg="No declined requests"
                     onUpdate={updateStatus}
                  />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   )
}

const RequestGrid = ({
   requests,
   emptyMsg,
   onUpdate,
}: {
   requests: ContactRequest[]
   emptyMsg: string
   onUpdate: any
}) => {
   if (requests.length === 0) return <EmptyState message={emptyMsg} />

   return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
         {requests.map(request => (
            <RequestCard key={request.id} request={request} onUpdateStatus={onUpdate} />
         ))}
      </div>
   )
}

const TabItem = ({ value, count, label }: { value: string; count: number; label: string }) => (
   <TabsTrigger
      value={value}
      className="rounded-md border-2 border-neutral-800/35  px-4 py-2 text-xs font-medium text-zinc-400 transition-all data-[state=active]:bg-zinc-800 data-[state=active]:text-zinc-100"
   >
      {label}
      {count > 0 && value === "pending" && (
         <span className="ml-2 rounded-full bg-blue-500/10 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">
            {count}
         </span>
      )}
   </TabsTrigger>
)

const EmptyState = ({ message }: { message: string }) => (
   <div className="flex h-48 flex-col items-center justify-center gap-3 border-zinc-800 bg-zinc-500/10 border-2 text-center shadow-none rounded-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-zinc-800/50">
         <IconMailForward className="h-5 w-5 text-zinc-500" />
      </div>
      <p className="text-sm text-zinc-500">{message}</p>
   </div>
)

const LoadingState = () => (
   <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
         {[1, 2, 3].map(i => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-zinc-900/50" />
         ))}
      </div>
   </div>
)

const ErrorState = () => {
   return (
      <div className="flex h-[50vh] w-full items-center justify-center text-zinc-500">
         Error loading requests.
      </div>
   )
}
