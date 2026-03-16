import { Building2, Clock, Mail, X } from "lucide-react"
import { IconMessage } from "@tabler/icons-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

import type { ContactRequest } from "@/types"

export function RequestCard({
   request,
   onUpdateStatus,
   isSentRequest = false,
}: {
   request: any
   onUpdateStatus: (requestId: string, status: "accepted" | "rejected") => void
   isSentRequest?: boolean
}) {
   const isPending = request.status === "pending"

   const displayName = isSentRequest
      ? request.candidateName || request.candidateGithub || "Unknown"
      : request.recruiterName || "Unknown"
   const displaySubtitle = isSentRequest
      ? request.candidateGithub || ""
      : request.recruiterCompany || "Unknown Company"
   const avatarInitials = isSentRequest
      ? displayName
           ?.split(" ")
           .map(n => n[0])
           .join("") || "C"
      : displayName
           ?.split(" ")
           .map(n => n[0])
           .join("") || "R"

   return (
      <div className="group relative flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-zinc-800 bg-zinc-900/40 p-4 transition-all hover:border-zinc-700 hover:bg-zinc-900/80 hover:shadow-md">
         {/* Top Row: User Info & Date */}
         <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
               <Avatar className="h-9 w-9 shrink-0 border border-zinc-800">
                  <AvatarImage
                     src="/recruiter-portrait-male-professional.jpg"
                     alt={displayName}
                     className="object-cover"
                  />
                  <AvatarFallback className="bg-zinc-800 text-xs font-medium text-zinc-400">
                     {avatarInitials}
                  </AvatarFallback>
               </Avatar>

               <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-zinc-100">{displayName}</h3>
                  <div className="flex items-center gap-1 text-xs text-zinc-500">
                     <Building2 className="h-3 w-3 shrink-0" />
                     <span className="max-w-30 truncate">{displaySubtitle}</span>
                  </div>
               </div>
            </div>

            {/* Date - Pushed to top right */}
            <div className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-zinc-600 uppercase tracking-wide">
               <Clock className="h-3 w-3" />
               <span>
                  {new Date(request.createdAt).toLocaleDateString("en-US", {
                     month: "short",
                     day: "numeric",
                  })}
               </span>
            </div>
         </div>

         {/* Middle: Message */}
         <div className="min-h-12">
            <TooltipProvider>
               <Tooltip>
                  <TooltipTrigger>
                     <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400 cursor-default">
                        {request.message}
                     </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-zinc-950 border-zinc-800 text-zinc-300">
                     <p>{request.message}</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>

         <div className="mt-1 flex items-center justify-between pt-2 border-t border-zinc-800/50">
            {/* Status Badge */}
            {!isPending && (
               <Badge
                  variant="outline"
                  className={cn(
                     "h-6 px-2 text-[10px] uppercase tracking-wider",
                     getBadgeStyle(request.status)
                  )}
               >
                  {request.status}
               </Badge>
            )}

            {/* Content based on status */}
            {request.status === "accepted" ? (
               <Link
                  href={`/dashboard/messages?contactRequestId=${request.id}`}
                  className="ml-auto flex items-center gap-2 rounded bg-emerald-950/20 px-3 py-1.5 transition-colors hover:bg-emerald-950/30"
               >
                  <IconMessage className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                  <span className="text-xs font-medium text-emerald-200/90">Message</span>
               </Link>
            ) : request.status === "rejected" ? (
               <span className="text-xs text-zinc-600 italic ml-auto">Request declined</span>
            ) : (
               <div className="flex w-full items-center justify-between gap-2">
                  <Badge
                     variant="outline"
                     className="border-zinc-800 bg-zinc-900 text-zinc-500 hover:bg-zinc-900"
                  >
                     Pending
                  </Badge>
                  <div className="flex gap-2">
                     <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateStatus(request.id, "rejected")}
                        className="rounded-full p-3 text-zinc-500 hover:bg-red-500/10 hover:text-red-400"
                     >
                        <X className="h-4 w-4" />
                        Decline
                     </Button>
                     <Button
                        size="sm"
                        onClick={() => onUpdateStatus(request.id, "accepted")}
                        className="h-7 rounded-full bg-zinc-100 px-3 text-xs font-semibold text-zinc-950 hover:bg-zinc-300"
                     >
                        Accept
                     </Button>
                  </div>
               </div>
            )}
         </div>
      </div>
   )
}

const getBadgeStyle = (status: string) => {
   switch (status) {
      case "accepted":
         return "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
      case "rejected":
         return "bg-red-500/5 text-red-500 border-red-500/20"
      default:
         return "bg-zinc-800 text-zinc-400 border-zinc-700"
   }
}
