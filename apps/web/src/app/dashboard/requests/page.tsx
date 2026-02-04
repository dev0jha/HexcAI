"use client"

import { IconMailForward } from "@tabler/icons-react"

import DashTitleShell from "@/components/dash-screentitle-text"
import { RequestCard } from "@/components/requests/request-card"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContactRequestsPagination } from "@/hooks/use-contact-requests"

export default function RequestsPage() {
   const {
      data,
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

   if (isLoading) {
      return (
         <div className="container mx-auto mt-2 px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
               <div className="text-zinc-400">Loading contact requests...</div>
            </div>
         </div>
      )
   }

   if (error) {
      return (
         <div className="container mx-auto mt-2 px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
               <div className="text-red-400">Error loading contact requests</div>
            </div>
         </div>
      )
   }

   return (
      <div className="container mx-auto mt-2 px-4 py-8 sm:px-6 lg:px-8">
         <div className="space-y-8">
            {/* Header */}
            <div className="w-full px-6">
               <DashTitleShell
                  title="Contact Requests"
                  description="Manage contact requests from recruiters"
               />
            </div>

            <Tabs defaultValue="pending" className="w-full p-4">
               <TabsList className="flex h-auto w-full gap-1 rounded-md border border-zinc-800 bg-zinc-900/50 p-1.5 sm:w-fit">
                  <TabsTrigger
                     value="pending"
                     className="h-10 rounded-full px-6 py-2.5 text-sm font-medium text-zinc-400 ring-0 transition-all hover:text-zinc-200 data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950"
                  >
                     Pending
                     {pendingRequests.length > 0 && (
                        <Badge
                           variant="secondary"
                           className="ml-2 h-5 min-w-5 rounded-full bg-zinc-200/90 px-1.5 text-[11px] text-zinc-900"
                        >
                           {pendingRequests.length}
                        </Badge>
                     )}
                  </TabsTrigger>
                  <TabsTrigger
                     value="accepted"
                     className="h-10 rounded-full px-6 py-2.5 text-sm font-medium text-zinc-400 ring-0 transition-all hover:text-zinc-200 data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950"
                  >
                     Accepted
                  </TabsTrigger>
                  <TabsTrigger
                     value="rejected"
                     className="h-10 rounded-full px-6 py-2.5 text-sm font-medium text-zinc-400 ring-0 transition-all hover:text-zinc-200 data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950"
                  >
                     Declined
                  </TabsTrigger>
               </TabsList>

               {/* Pending Content */}
               <TabsContent value="pending" className="mt-6">
                  {pendingRequests.length === 0 ? (
                     <EmptyState message="No pending requests" />
                  ) : (
                     <div className="space-y-4">
                        {pendingRequests.map(request => (
                           <RequestCard
                              key={request.id}
                              request={request}
                              onUpdateStatus={updateStatus}
                           />
                        ))}
                        {meta && meta.totalPages > 1 && (
                           <div className="mt-6">
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
                     </div>
                  )}
               </TabsContent>

               {/* Accepted Content */}
               <TabsContent value="accepted" className="mt-6">
                  {acceptedRequests.length === 0 ? (
                     <EmptyState message="No accepted requests" />
                  ) : (
                     <div className="space-y-4">
                        {acceptedRequests.map(request => (
                           <RequestCard
                              key={request.id}
                              request={request}
                              onUpdateStatus={updateStatus}
                           />
                        ))}
                     </div>
                  )}
               </TabsContent>

               {/* Rejected Content */}
               <TabsContent value="rejected" className="mt-6">
                  {rejectedRequests.length === 0 ? (
                     <EmptyState message="No declined requests" />
                  ) : (
                     <div className="space-y-4">
                        {rejectedRequests.map(request => (
                           <RequestCard
                              key={request.id}
                              request={request}
                              onUpdateStatus={updateStatus}
                           />
                        ))}
                     </div>
                  )}
               </TabsContent>
            </Tabs>
         </div>
      </div>
   )
}

const EmptyState = ({ message }: { message: string }) => (
   <Card className="relative rounded-lg border-dashed border-zinc-800 bg-zinc-800/20 p-8 text-center">
      <div className="flex w-full items-center justify-center text-zinc-500">
         <IconMailForward />
      </div>
      <p className="text-zinc-500">{message}</p>
   </Card>
)
