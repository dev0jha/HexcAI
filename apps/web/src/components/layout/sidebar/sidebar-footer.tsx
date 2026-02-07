"use client"

import LogoutBtn from "@/components/auth/logout-btn"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { SidebarFooter, SidebarGroup } from "@/components/ui/sidebar"
import { useReactiveSession } from "@/lib/auth-client"
import { grabUserNameInitials } from "@/lib/info"
import { cn } from "@/lib/utils"

export function SiderbarFooterContent() {
   const { data: session, isLoading } = useReactiveSession()

   switch (true) {
      case isLoading:
         return <SidebarFooterSkeleton />

      case !session:
         return null

      default:
         return (
            <SidebarFooter
               className={cn(
                  "px-5 transition-all min-h-24",
                  "flex flex-col items-center justify-center px-0"
               )}
            >
               <SidebarGroup className="px-4">
                  <div className="px-2 py-2 text-xs text-neutral-500">Signed in as</div>

                  <div className={cn("flex gap-4 pb-2 text-sm")}>
                     <Avatar className="h-8 w-8">
                        <AvatarImage src={session.user.image ?? ""} />
                        <AvatarFallback>{grabUserNameInitials(session.user.name)}</AvatarFallback>
                     </Avatar>

                     <div>
                        <div className="font-medium text-white">{session.user.name}</div>
                        <div className="text-neutral-500">{session.user.email}</div>
                     </div>
                  </div>

                  <div className="pb-2">
                     <LogoutBtn />
                  </div>
               </SidebarGroup>
            </SidebarFooter>
         )
   }
}

function SidebarFooterSkeleton({ collapsed }: { collapsed?: boolean }) {
   return (
      <SidebarFooter
         className={cn(
            "px-5 animate-pulse min-h-24",
            collapsed && "flex flex-col items-center justify-center px-0"
         )}
      >
         <SidebarGroup className={cn(collapsed && "flex flex-col items-center gap-3")}>
            {!collapsed && (
               <div className="px-2 py-2">
                  <div className="h-3 w-24 rounded bg-neutral-700" />
               </div>
            )}

            <div
               className={cn(
                  "flex gap-4 pb-2 text-sm",
                  collapsed && "flex flex-col items-center gap-2"
               )}
            >
               {/* Avatar */}
               <div className="h-8 w-8 rounded-full bg-neutral-700" />

               {!collapsed && (
                  <div className="flex flex-col gap-2">
                     <div className="h-4 w-28 rounded bg-neutral-700" />
                     <div className="h-3 w-36 rounded bg-neutral-800" />
                  </div>
               )}
            </div>

            {!collapsed && (
               <div className="pb-2 w-full">
                  <div className="h-10 w-full rounded-md bg-neutral-700" />
               </div>
            )}
         </SidebarGroup>
      </SidebarFooter>
   )
}
