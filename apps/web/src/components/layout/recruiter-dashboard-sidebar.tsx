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
import { IconSearch, IconSettings, IconUsers } from "@tabler/icons-react"
import { SidebarHeaderContent } from "@/components/layout/sidebar/sidebar-header"
import { SiderbarFooterContent } from "@/components/layout/sidebar/sidebar-footer"

const navItems = [
   { href: "/recruiter/discover", label: "Discover", icon: IconSearch },
   { href: "/recruiter/candidates", label: "My Candidates", icon: IconUsers },
   { href: "/recruiter/settings", label: "Settings", icon: IconSettings },
]

export function RecruiterDashboardSidebar() {
   return (
      <Sidebar>
         <SidebarHeader className="bg-[#191919]">
            <SidebarHeaderContent />
         </SidebarHeader>
         <SidebarContent className="bg-[#191919] flex items-center justify-start px-4">
            <SidebarMenu className="w-full mt-3">
               {navItems.map((item, idx) => {
                  const pathname = usePathname()
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
                              <item.icon className="h-4 w-4" />
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
