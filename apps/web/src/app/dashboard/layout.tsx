"use client"

import type React from "react"

import { DashboardHeader } from "@/components/layout/dashboard-header"
import {
   SidebarInset,
   SidebarProvider,
   Sidebar,
   SidebarFooter,
   SidebarHeader,
} from "@/components/ui/sidebar"
import { SiderbarFooterContent } from "@/components/layout/sidebar/sidebar-footer"
import { SidebarHeaderContent } from "@/components/layout/sidebar/sidebar-header"
import { CandidateSidebarMainContent } from "@/components/layout/sidebar/sidebar-maincontent"

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
   return (
      <SidebarProvider className="flex">
         <Sidebar className="border-r border-[#2c2c2c]">
            <SidebarHeader className="bg-[#191919]">
               <SidebarHeaderContent />
            </SidebarHeader>

            <CandidateSidebarMainContent />

            <SidebarFooter className="bg-[#191919]">
               <SiderbarFooterContent />
            </SidebarFooter>
         </Sidebar>
         <SidebarInset className="w-full gap-4 bg-[#121212]">
            <DashboardHeader />
            <div className="p-2 sm:p-4">{children}</div>
         </SidebarInset>
      </SidebarProvider>
   )
}
