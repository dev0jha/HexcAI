import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Check, X, Building2, Mail, Clock } from "lucide-react"

import type { ContactRequest } from "@/types"
import { cn } from "@/lib/utils"

export function RequestCard({
  request,
  setRequests,
}: {
  request: ContactRequest
  setRequests: React.Dispatch<React.SetStateAction<ContactRequest[]>>
}) {
  return (
    <Card className="group flex flex-col gap-5 p-6 rounded-xl border border-zinc-800 bg-zinc-900/50 shadow-sm transition-all hover:shadow-md">
      {/* Header Section */}
      <RequestCardHeader request={request} />

      {/* Content Section */}
      <div className="flex flex-col gap-4">
        <p className="text-sm font-poppins leading-7 text-zinc-300">{request.message}</p>

        {/* Revealed Contact */}
        {request.status === "accepted" && request.recruiterEmail && (
          <div className="flex items-center gap-3 rounded-md border border-emerald-900/50 bg-emerald-950/20 px-4 py-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
              <Mail className="h-4 w-4 text-emerald-500" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-emerald-500/80 uppercase font-semibold tracking-wider">
                Contact Email
              </span>
              <span className="text-sm font-medium text-emerald-100">{request.recruiterEmail}</span>
            </div>
          </div>
        )}
      </div>

      {/* Footer / Actions Section - Separated by border */}
      <div className="mt-auto pt-5 border-t border-zinc-800/60 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 text-xs font-medium text-zinc-500">
          <Clock className="h-3.5 w-3.5" />
          <span>
            {new Date(request.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
        </div>

        <RequestCardActions request={request} setRequests={setRequests} />
      </div>
    </Card>
  )
}

function RequestCardHeader({ request }: { request: ContactRequest }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12 border border-zinc-800 shrink-0">
          <AvatarImage
            src="/recruiter-portrait-male-professional.jpg"
            alt={request.recruiterName}
            className="object-cover"
          />
          <AvatarFallback className="bg-zinc-800 text-zinc-400 font-medium">
            {request.recruiterName
              .split(" ")
              .map(n => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <h3 className="font-semibold text-zinc-100 text-base leading-none">
            {request.recruiterName}
          </h3>
          <div className="flex items-center gap-1.5 text-sm text-zinc-400">
            <Building2 className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{request.recruiterCompany}</span>
          </div>
        </div>
      </div>

      <Badge
        variant="outline"
        className={cn(
          "capitalize px-3 py-3 text-xs font-medium transition-colors",
          getBadgeStyle(request.status)
        )}
      >
        {request.status}
      </Badge>
    </div>
  )
}

function RequestCardActions({
  request,
  setRequests,
}: {
  setRequests: React.Dispatch<React.SetStateAction<ContactRequest[]>>
  request: ContactRequest
}) {
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

  if (request.status !== "pending") return null

  return (
    <div className="flex items-center gap-3">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => handleReject(request.id)}
        className="h-9 py-4.5 px-4 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 border-2 border-zinc-700 hover:border-zinc-700"
      >
        <X className="h-4 w-4 mr-2" />
        Decline
      </Button>
      <Button
        size="sm"
        onClick={() => handleAccept(request.id)}
        className="h-9 px-5 bg-white text-black hover:bg-zinc-200 font-semibold shadow-lg shadow-white/5 py-4"
      >
        <Check className="h-4 w-4 mr-2" />
        Accept
      </Button>
    </div>
  )
}

const getBadgeStyle = (status: string) => {
  switch (status) {
    case "accepted":
      return "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    case "rejected":
      return "bg-red-500/10 text-red-400 border-red-500/20"
    default:
      return "bg-zinc-800 text-zinc-400 border-zinc-700"
  }
}
