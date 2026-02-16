"use client"

import Link from "next/link"
import { IconArrowUpRight, IconBriefcase, IconCheck, IconX } from "@tabler/icons-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useContactRequests } from "@/hooks/use-contact-requests"

export function DashboardRequests() {
   const { pendingRequests, isLoading, updateStatus } = useContactRequests({ limit: 5 })

   if (isLoading) {
      return <Skeleton />
   }

   const recentRequest = pendingRequests[0]

   return (
      <div className="flex flex-col rounded-xl border border-zinc-800 bg-neutral-800/20 backdrop-blur-sm">
         <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
               <IconBriefcase className="h-4 w-4 text-zinc-400" />
               Requests
            </h3>
            {pendingRequests.length > 0 && (
               <span className="rounded-full bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 text-[10px] font-bold text-blue-400">
                  {pendingRequests.length} New
               </span>
            )}
         </div>

         <div className="flex-1 overflow-hidden">
            {recentRequest ? (
               <div className="divide-y divide-zinc-800/50">
                  <div className="p-4">
                     <div className="flex items-start gap-3">
                        <Avatar className="h-8 w-8 border border-zinc-800">
                           <AvatarImage
                              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${recentRequest.recruiterName}`}
                           />
                           <AvatarFallback>RC</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                           <div className="flex items-center justify-between mb-1">
                              <p className="text-sm font-medium text-zinc-200 truncate">
                                 {recentRequest.recruiterName}
                              </p>
                              <span className="text-[10px] text-zinc-500">
                                 {formatRelativeTime(recentRequest.createdAt)}
                              </span>
                           </div>
                           <p className="text-xs text-zinc-400 mb-3 truncate">
                              {recentRequest.recruiterCompany ?? "Recruiter"}
                           </p>

                           <div className="flex gap-2">
                              <Button
                                 size="sm"
                                 className="h-7 flex-1 bg-zinc-50 text-zinc-900 hover:bg-zinc-200 text-xs"
                                 onClick={() => updateStatus(recentRequest.id, "accepted")}
                              >
                                 <IconCheck className="mr-1.5 h-3 w-3" />
                                 Accept
                              </Button>
                              <Button
                                 size="sm"
                                 variant="outline"
                                 className="h-7 flex-1 border-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs hover:bg-zinc-800"
                                 onClick={() => updateStatus(recentRequest.id, "rejected")}
                              >
                                 <IconX className="mr-1.5 h-3 w-3" />
                                 Ignore
                              </Button>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-12 w-12 rounded-full bg-zinc-900 flex items-center justify-center mb-3 border border-zinc-800">
                     <IconCheck className="h-6 w-6 text-zinc-600" />
                  </div>
                  <p className="text-sm text-zinc-500">All caught up!</p>
               </div>
            )}
         </div>

         <div className="border-t border-zinc-800 p-2">
            <Link href="/dashboard/requests">
               <Button
                  variant="ghost"
                  className="w-full text-xs text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/50 h-8"
               >
                  View Request History
                  <IconArrowUpRight className="ml-2 h-3 w-3" />
               </Button>
            </Link>
         </div>
      </div>
   )
}

function formatRelativeTime(date: Date | string): string {
   const now = new Date()
   const then = new Date(date)
   const diffMs = now.getTime() - then.getTime()
   const diffMins = Math.floor(diffMs / 60000)
   const diffHours = Math.floor(diffMins / 60)
   const diffDays = Math.floor(diffHours / 24)

   if (diffMins < 1) return "Just now"
   if (diffMins < 60) return `${diffMins}m ago`
   if (diffHours < 24) return `${diffHours}h ago`
   if (diffDays < 7) return `${diffDays}d ago`
   return then.toLocaleDateString()
}

function Skeleton() {
   return (
      <div className="flex flex-col rounded-xl border border-zinc-800 bg-neutral-800/20 backdrop-blur-sm">
         <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <h3 className="text-base font-semibold text-zinc-100 flex items-center gap-2">
               <IconBriefcase className="h-4 w-4 text-zinc-400" />
               Requests
            </h3>
         </div>
         <div className="p-4">
            <div className="flex items-start gap-3">
               <div className="h-8 w-8 rounded-full bg-zinc-800 animate-pulse" />
               <div className="flex-1 space-y-2">
                  <div className="h-4 w-24 bg-zinc-800 animate-pulse rounded" />
                  <div className="h-3 w-32 bg-zinc-800 animate-pulse rounded" />
                  <div className="flex gap-2 mt-3">
                     <div className="h-7 flex-1 bg-zinc-800 animate-pulse rounded" />
                     <div className="h-7 flex-1 bg-zinc-800 animate-pulse rounded" />
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
