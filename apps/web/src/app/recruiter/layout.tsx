"use client"

import type React from "react"

import { DashboardHeader } from "@/components/layout/dashboard-header"
import { RecruiterDashboardSidebar } from "@/components/layout/recruiter-dashboard-sidebar"
import { RecruiterSettingStore } from "@/hooks/scopedstores/recruiter-settings.store"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
   return (
      <RecruiterSettingStore.Provider defaults={{ isSaving: false }}>
         <SidebarProvider className="flex bg-[#121212]">
            <div className="relative flex min-h-screen bg-[#121212]">
               <RecruiterDashboardSidebar />
            </div>

            <SidebarInset className="w-full gap-4 bg-[#121212] p-2 pt-20 sm:p-6 md:pt-6">
               <DashboardHeader />
               <div className="p-2 sm:p-4">{children}</div>
            </SidebarInset>
         </SidebarProvider>
      </RecruiterSettingStore.Provider>
   )
}
