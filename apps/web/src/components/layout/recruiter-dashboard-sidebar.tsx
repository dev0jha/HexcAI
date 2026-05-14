"use client"

import {
   Sidebar,
   SidebarHeader,
   SidebarFooter,
   SidebarContent,
   SidebarMenu,
   SidebarMenuItem,
   SidebarMenuButton,
} from "@/components/ui/sidebar"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { IconSearch, IconSettings, IconUsers, IconMessage } from "@tabler/icons-react"
import { SidebarHeaderContent } from "@/components/layout/sidebar/sidebar-header"
import { SiderbarFooterContent } from "@/components/layout/sidebar/sidebar-footer"
import { useUnreadStream } from "@/hooks/use-unread-stream"

const navItems = [
   { href: "/recruiter/discover", label: "Discover", icon: IconSearch },
   { href: "/recruiter/candidates", label: "My Candidates", icon: IconUsers },
   { href: "/recruiter/messages", label: "Messages", icon: IconMessage, showDot: true },
   { href: "/recruiter/settings", label: "Settings", icon: IconSettings },
]

export function RecruiterDashboardSidebar() {
   const pathname = usePathname()
   const { totalUnread } = useUnreadStream()

   return (
      <Sidebar>
         <SidebarHeader className="bg-[#191919]">
            <SidebarHeaderContent />
         </SidebarHeader>
         <SidebarContent className="bg-[#191919] flex items-center justify-start px-4">
            <SidebarMenu className="w-full mt-3 gap-[1.8]">
               {navItems.map((item, idx) => {
                  const isActive =
                     pathname === item.href ||
                     (pathname.startsWith(item.href + "/") && item.href !== "/recruiter")

                  return (
                     <SidebarMenuItem key={`${idx}-${item.href}`}>
                        <Link href={item.href}>
                           <SidebarMenuButton
                              isActive={isActive}
                              className={cn(
                                 "text-zinc-400 hover:bg-white/5 hover:text-white data-[active=true]:bg-white/10 data-[active=true]:text-white"
                              )}
                           >
                              <div className="relative">
                                 <item.icon className="h-4 w-4" />
                                 {item.showDot && totalUnread > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-blue-500 rounded-full w-2 h-2" />
                                 )}
                              </div>
                              <span>{item.label}</span>
                           </SidebarMenuButton>
                        </Link>
                     </SidebarMenuItem>
                  )
               })}
            </SidebarMenu>
         </SidebarContent>
         <SidebarFooter className="bg-[#191919]">
            <SiderbarFooterContent />
         </SidebarFooter>
      </Sidebar>
   )
}
