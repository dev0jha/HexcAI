"use client"

import { useQuery } from "@tanstack/react-query"
import { IconMailForward } from "@tabler/icons-react"
import { RequestCard } from "@/components/requests/request-card"
import { CustomPagination } from "@/components/ui/custom-pagination"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useContactRequestsPagination } from "@/hooks/use-contact-requests"
import { useSentContactRequestsPagination } from "@/hooks/use-sent-contact-requests"
import { useConversations } from "@/hooks/use-messages"
import { createUserSettingsQueryOptions } from "@/lib/queries/queryOptions"

export default function RequestsPage() {
   const { data: userSettings } = useQuery(createUserSettingsQueryOptions())
   const isRecruiter = !!(userSettings?.success && userSettings.settings?.role === "recruiter")

   const receivedRequests = useContactRequestsPagination()
   const sentRequests = useSentContactRequestsPagination()
   const { conversations } = useConversations()

   const pendingRequests = isRecruiter
      ? sentRequests.pendingRequests
      : receivedRequests.pendingRequests
   const acceptedRequests = isRecruiter
      ? sentRequests.acceptedRequests
      : receivedRequests.acceptedRequests
   const rejectedRequests = isRecruiter
      ? sentRequests.rejectedRequests
      : receivedRequests.rejectedRequests
   const isLoading = isRecruiter ? sentRequests.isLoading : receivedRequests.isLoading
   const error = isRecruiter ? sentRequests.error : receivedRequests.error
   const meta = isRecruiter ? sentRequests.meta : receivedRequests.meta
   const currentPage = isRecruiter ? sentRequests.currentPage : receivedRequests.currentPage
   const nextPage = isRecruiter ? sentRequests.nextPage : receivedRequests.nextPage
   const prevPage = isRecruiter ? sentRequests.prevPage : receivedRequests.prevPage
   const goToPage = isRecruiter ? sentRequests.goToPage : receivedRequests.goToPage
   const updateStatus = isRecruiter ? () => {} : receivedRequests.updateStatus

   if (isLoading) return <LoadingState />

   if (!!error) return <ErrorState />

   return (
      <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
         <div className="space-y-6">
            <Tabs defaultValue="accepted" className="w-full mt-12">
               <div className="mb-6 flex items-center border-b border-zinc-800 pb-4">
                  <TabsList className="h-11 w-full gap-2 bg-transparent p-0 border-2 border-neutral-700/50 px-1">
                     <TabItem value="accepted" count={acceptedRequests.length} label="Accepted" />
                     <TabItem value="pending" count={pendingRequests.length} label="Pending" />
                     <TabItem value="rejected" count={rejectedRequests.length} label="Declined" />
                  </TabsList>
               </div>

               <TabsContent value="accepted">
                  <RequestGrid
                     requests={acceptedRequests}
                     conversations={conversations}
                     emptyMsg={isRecruiter ? "No accepted requests" : "No accepted requests"}
                     onUpdate={updateStatus}
                     isSentRequest={isRecruiter}
                  />
               </TabsContent>

               <TabsContent value="pending">
                  <RequestGrid
                     requests={pendingRequests}
                     conversations={conversations}
                     emptyMsg={
                        isRecruiter ? "You haven't sent any requests yet" : "No pending requests"
                     }
                     onUpdate={updateStatus}
                     isSentRequest={isRecruiter}
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

               <TabsContent value="rejected">
                  <RequestGrid
                     requests={rejectedRequests}
                     conversations={conversations}
                     emptyMsg={isRecruiter ? "No declined requests" : "No declined requests"}
                     onUpdate={updateStatus}
                     isSentRequest={isRecruiter}
                  />
               </TabsContent>
            </Tabs>
         </div>
      </div>
   )
}

const RequestGrid = ({
   requests,
   conversations,
   emptyMsg,
   onUpdate,
   isSentRequest,
}: {
   requests: any[]
   conversations: any[]
   emptyMsg: string
   onUpdate: any
   isSentRequest: boolean
}) => {
   if (requests.length === 0) return <EmptyState message={emptyMsg} />

   return (
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
         {requests.map(request => {
            const hasConversation = conversations.some(c => c.contactRequestId === request.id)
            return (
               <RequestCard
                  key={request.id}
                  request={request}
                  onUpdateStatus={onUpdate}
                  isSentRequest={isSentRequest}
                  hasConversation={hasConversation}
               />
            )
         })}
      </div>
   )
}

const TabItem = ({ value, count, label }: { value: string; count: number; label: string }) => (
   <TabsTrigger
      value={value}
      className="rounded-md border-2 border-neutral-800/35 px-4 py-2 text-xs font-medium text-neutral-400 transition-all data-[state=active]:bg-neutral-800 data-[state=active]:text-neutral-100"
   >
      {label}
      {count > 0 && (
         <span className="ml-2 rounded-full bg-neutral-700/50 px-1.5 py-0.5 text-[10px] font-bold text-neutral-300">
            {count}
         </span>
      )}
   </TabsTrigger>
)

const EmptyState = ({ message }: { message: string }) => (
   <div className="flex h-48 flex-col items-center justify-center gap-3 border-neutral-800 bg-neutral-500/10 border-2 text-center shadow-none rounded-md">
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-neutral-800/50">
         <IconMailForward className="h-5 w-5 text-neutral-500" />
      </div>
      <p className="text-sm text-neutral-500">{message}</p>
   </div>
)

const LoadingState = () => (
   <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
         {[1, 2, 3].map(i => (
            <div key={i} className="h-40 animate-pulse rounded-lg bg-neutral-900/50" />
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
