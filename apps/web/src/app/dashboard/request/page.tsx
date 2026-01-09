"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockContactRequests } from "@/data/mock-data"
import type { ContactRequest } from "@/types"
import { Check, X, Building2, Mail, Clock } from "lucide-react"

export default function RequestsPage() {
  const [requests, setRequests] = useState<ContactRequest[]>(mockContactRequests)

  const pendingRequests = requests.filter(r => r.status === "pending")
  const acceptedRequests = requests.filter(r => r.status === "accepted")
  const rejectedRequests = requests.filter(r => r.status === "rejected")

  function handleAccept(id: string) {
    setRequests(prev =>
      prev.map(r =>
        r.id === id ? { ...r, status: "accepted", recruiterEmail: "revealed@email.com" } : r
      )
    )
  }

  function handleReject(id: string) {
    setRequests(prev => prev.map(r => (r.id === id ? { ...r, status: "rejected" } : r)))
  }

  function RequestCard({ request }: { request: ContactRequest }) {
    return (
      <Card className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-4">
            <Avatar className="h-12 w-12">
              <AvatarImage
                src="/recruiter-portrait-male-professional.jpg"
                alt={request.recruiterName}
              />
              <AvatarFallback>
                {request.recruiterName
                  .split(" ")
                  .map(n => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{request.recruiterName}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Building2 className="h-4 w-4" />
                {request.recruiterCompany}
              </div>
            </div>
          </div>
          <Badge
            variant={
              request.status === "accepted"
                ? "default"
                : request.status === "rejected"
                  ? "destructive"
                  : "secondary"
            }
          >
            {request.status}
          </Badge>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">{request.message}</p>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="h-3 w-3" />
          {new Date(request.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </div>

        {request.status === "pending" && (
          <div className="mt-4 flex flex-col sm:flex-row gap-2">
            <Button onClick={() => handleAccept(request.id)} className="gap-2 w-full sm:w-auto">
              <Check className="h-4 w-4" />
              Accept
            </Button>
            <Button
              variant="outline"
              onClick={() => handleReject(request.id)}
              className="gap-2 bg-transparent w-full sm:w-auto"
            >
              <X className="h-4 w-4" />
              Decline
            </Button>
          </div>
        )}

        {request.status === "accepted" && request.recruiterEmail && (
          <div className="mt-4 p-3 rounded-lg bg-primary/10 flex items-center gap-2">
            <Mail className="h-4 w-4 text-primary" />
            <span className="text-sm">Contact: {request.recruiterEmail}</span>
          </div>
        )}
      </Card>
    )
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-4 sm:mt-6 font-poppins">
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-poppins">Contact Requests</h1>
          <p className="text-muted-foreground mt-1 font-poppins">
            Manage contact requests from recruiters
          </p>
        </div>

        <Tabs defaultValue="pending" className="w-full">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="pending" className="gap-2 flex-1 sm:flex-none">
              Pending
              {pendingRequests.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {pendingRequests.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="accepted" className="flex-1 sm:flex-none">
              Accepted
            </TabsTrigger>
            <TabsTrigger value="rejected" className="flex-1 sm:flex-none">
              Declined
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="mt-6">
            {pendingRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No pending requests</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {pendingRequests.map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="accepted" className="mt-6">
            {acceptedRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No accepted requests</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {acceptedRequests.map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            {rejectedRequests.length === 0 ? (
              <Card className="p-8 text-center">
                <p className="text-muted-foreground">No declined requests</p>
              </Card>
            ) : (
              <div className="space-y-4">
                {rejectedRequests.map(request => (
                  <RequestCard key={request.id} request={request} />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
