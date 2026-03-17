import { Building2, Clock, X } from "lucide-react"
import { IconMessage } from "@tabler/icons-react"
import Link from "next/link"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RequestCard({
   request,
   onUpdateStatus,
   isSentRequest = false,
   hasConversation = false,
}: {
   request: any
   onUpdateStatus: (requestId: string, status: "accepted" | "rejected") => void
   isSentRequest?: boolean
   hasConversation?: boolean
}) {
   const isPending = request.status === "pending"
   const isAccepted = request.status === "accepted"

   const displayName = isSentRequest
      ? request.candidateName || request.candidateGithub || "Unknown"
      : request.recruiterName || "Unknown"
   const displaySubtitle = isSentRequest
      ? request.candidateGithub || ""
      : request.recruiterCompany || "Unknown Company"
   const avatarInitials = isSentRequest
      ? displayName
           ?.split(" ")
           .map((n: string) => n[0])
           .join("") || "C"
      : displayName
           ?.split(" ")
           .map((n: string) => n[0])
           .join("") || "R"

   const messageLink = isSentRequest
      ? `/recruiter/messages?contactRequestId=${request.id}`
      : `/dashboard/messages?contactRequestId=${request.id}`

   return (
      <div className="group relative flex flex-col justify-between gap-3 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-900/40 p-4 transition-all hover:border-neutral-700 hover:bg-neutral-900/80 hover:shadow-md">
         {/* Top Row: User Info & Date */}
         <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
               <Avatar className="h-9 w-9 shrink-0 border border-neutral-800">
                  <AvatarImage
                     src="/recruiter-portrait-male-professional.jpg"
                     alt={displayName}
                     className="object-cover"
                  />
                  <AvatarFallback className="bg-neutral-800 text-xs font-medium text-neutral-400">
                     {avatarInitials}
                  </AvatarFallback>
               </Avatar>

               <div className="flex flex-col">
                  <h3 className="text-sm font-semibold text-neutral-100">{displayName}</h3>
                  <div className="flex items-center gap-1 text-xs text-neutral-500">
                     <Building2 className="h-3 w-3 shrink-0" />
                     <span className="max-w-30 truncate">{displaySubtitle}</span>
                  </div>
               </div>
            </div>

            {/* Date - Pushed to top right */}
            <div className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-neutral-600 uppercase tracking-wide">
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
                     <p className="line-clamp-2 text-xs leading-relaxed text-neutral-400 cursor-default">
                        {request.message}
                     </p>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs bg-neutral-950 border-neutral-800 text-neutral-300">
                     <p>{request.message}</p>
                  </TooltipContent>
               </Tooltip>
            </TooltipProvider>
         </div>

         <div className="mt-1 flex items-center justify-between pt-2 border-t border-neutral-800/50">
            {/* Content based on status */}
            {isAccepted ? (
               <Link
                  href={messageLink}
                  className="ml-auto flex items-center gap-2 rounded-md bg-neutral-200/80 px-3 py-1.5 transition-all hover:bg-neutral-100/90 border border-neutral-400/30 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1)]"
               >
                  <IconMessage className="h-3.5 w-3.5 shrink-0 text-neutral-700" />
                  <span className="text-xs font-medium text-neutral-800 text-shadow-sm">
                     {hasConversation ? "Go to chat" : "Message"}
                  </span>
               </Link>
            ) : request.status === "rejected" ? (
               <span className="text-xs text-neutral-600 italic ml-auto">Request declined</span>
            ) : isPending ? (
               <div className="flex w-full items-center justify-between gap-2">
                  <span className="text-xs text-neutral-500 italic">Pending</span>
                  <div className="flex gap-2">
                     <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onUpdateStatus(request.id, "rejected")}
                        className="rounded-full p-3 text-neutral-500 hover:bg-red-500/10 hover:text-red-400 border-neutral-700"
                     >
                        <X className="h-4 w-4" />
                        Decline
                     </Button>
                     <Button
                        size="sm"
                        onClick={() => onUpdateStatus(request.id, "accepted")}
                        className="h-7 rounded-full bg-neutral-100 px-3 text-xs font-semibold text-neutral-950 hover:bg-neutral-300"
                     >
                        Accept
                     </Button>
                  </div>
               </div>
            ) : null}
         </div>
      </div>
   )
}
