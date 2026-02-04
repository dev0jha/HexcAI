import { Building2, Check, Clock, Mail, X } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { cn } from "@/lib/utils"
import type { ContactRequest } from "@/lib/queries/queryOptions"

export function RequestCard({
   request,
   onUpdateStatus,
}: {
   request: ContactRequest
   onUpdateStatus: (requestId: string, status: "accepted" | "rejected") => void
}) {
   return (
      <Card className="group flex flex-col gap-5 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 shadow-sm transition-all hover:shadow-md">
         {/* Header Section */}
         <RequestCardHeader request={request} />

         {/* Content Section */}
         <div className="flex flex-col gap-4">
            <p className="font-poppins text-sm leading-7 text-zinc-300">{request.message}</p>
            {/* Revealed Contact */}
            {request.status === "accepted" && request.recruiterEmail && (
               <div className="flex items-center gap-3 rounded-md border border-emerald-900/50 bg-emerald-950/20 px-4 py-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-500/10">
                     <Mail className="h-4 w-4 text-emerald-500" />
                  </div>
                  <div className="flex flex-col">
                     <span className="text-xs font-semibold tracking-wider text-emerald-500/80 uppercase">
                        Contact Email
                     </span>
                     <span className="text-sm font-medium text-emerald-100">
                        {request.recruiterEmail}
                     </span>
                  </div>
               </div>
            )}
         </div>

         {/* Footer / Actions Section - Separated by border */}
         <div className="mt-auto flex items-center justify-between gap-4 border-t border-zinc-800/60 pt-5">
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

            <RequestCardActions request={request} onUpdateStatus={onUpdateStatus} />
         </div>
      </Card>
   )
}

function RequestCardHeader({ request }: { request: ContactRequest }) {
   return (
      <div className="flex items-start justify-between gap-4">
         <div className="flex items-center gap-4">
            <Avatar className="h-12 w-12 shrink-0 border border-zinc-800">
               <AvatarImage
                  src="/recruiter-portrait-male-professional.jpg"
                  alt={request.recruiterName || "Recruiter"}
                  className="object-cover"
               />
               <AvatarFallback className="bg-zinc-800 font-medium text-zinc-400">
                  {request.recruiterName
                     ?.split(" ")
                     .map(n => n[0])
                     .join("") || "R"}
               </AvatarFallback>
            </Avatar>

            <div className="space-y-1">
               <h3 className="text-base leading-none font-semibold text-zinc-100">
                  {request.recruiterName || "Unknown Recruiter"}
               </h3>
               <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                  <Building2 className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{request.recruiterCompany || "Unknown Company"}</span>
               </div>
            </div>
         </div>

         <Badge
            variant="outline"
            className={cn(
               "px-3 py-3 text-xs font-medium capitalize transition-colors",
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
   onUpdateStatus,
}: {
   onUpdateStatus: (requestId: string, status: "accepted" | "rejected") => void
   request: ContactRequest
}) {
   function handleAccept(id: string) {
      onUpdateStatus(id, "accepted")
   }

   function handleReject(id: string) {
      onUpdateStatus(id, "rejected")
   }

   if (request.status !== "pending") return null

   return (
      <div className="flex items-center gap-3">
         <Button
            size="sm"
            variant="ghost"
            onClick={() => handleReject(request.id)}
            className="h-9 border-2 border-zinc-700 px-4 py-4.5 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
         >
            <X className="mr-2 h-4 w-4" />
            Decline
         </Button>
         <Button
            size="sm"
            onClick={() => handleAccept(request.id)}
            className="h-9 bg-white px-5 py-4 font-semibold text-black shadow-lg shadow-white/5 hover:bg-zinc-200"
         >
            <Check className="mr-2 h-4 w-4" />
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
