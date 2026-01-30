"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockContactRequests } from "@/data/mock-data"
import { ContactRequest } from "@/types"
import { RequestCard } from "@/components/requests/request-card"
import DashTitleShell from "@/components/dash-screentitle-text"
import { IconMailForward } from "@tabler/icons-react"

export default function RequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>(mockContactRequests)

  const pendingRequests = requests.filter(r => r.status === "pending")
  const acceptedRequests = requests.filter(r => r.status === "accepted")
  const rejectedRequests = requests.filter(r => r.status === "rejected")

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-2">
      <div className="space-y-8">
        {/* Header */}
        <div className="w-full px-6">
          <DashTitleShell
            title="Contact Requests"
            description="Manage contact requests from recruiters"
          />
        </div>

        <Tabs defaultValue="pending" className="w-full p-4">
          <TabsList className="w-full sm:w-fit h-auto bg-zinc-900/50 border border-zinc-800 p-1.5 rounded-md flex gap-1">
            <TabsTrigger
              value="pending"
              className="rounded-full px-6 py-2.5 h-10 text-sm font-medium data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950 text-zinc-400 hover:text-zinc-200 transition-all ring-0"
            >
              Pending
              {pendingRequests.length > 0 && (
                <Badge
                  variant="secondary"
                  className="ml-2 h-5 min-w-5 rounded-full bg-zinc-200/90 text-zinc-900 px-1.5 text-[11px]"
                >
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="accepted"
              className="rounded-full px-6 py-2.5 h-10 text-sm font-medium data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950 text-zinc-400 hover:text-zinc-200 transition-all ring-0"
            >
              Accepted
            </TabsTrigger>
            <TabsTrigger
              value="rejected"
              className="rounded-full px-6 py-2.5 h-10 text-sm font-medium data-[state=active]:bg-zinc-100 data-[state=active]:text-zinc-950 text-zinc-400 hover:text-zinc-200 transition-all ring-0"
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
                  <RequestCard key={request.id} request={request} setRequests={setRequests} />
                ))}
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
                  <RequestCard key={request.id} request={request} setRequests={setRequests} />
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
                  <RequestCard key={request.id} request={request} setRequests={setRequests} />
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
  <Card className="p-8 text-center border-dashed border-zinc-800 rounded-lg bg-zinc-800/20 relative">
    <div className="w-full flex items-center justify-center  text-zinc-500">
      <IconMailForward />
    </div>
    <p className="text-zinc-500">{message}</p>
  </Card>
)
