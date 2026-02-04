"use client"

import type React from "react"

import { RecruiterHeader } from "@/components/layout/recuriter-header"
import { RecruiterSidebar } from "@/components/layout/recuriter-sidebar"
import { RecruiterSettingStore } from "@/hooks/scopedstores/recruiter-settings.store"

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
   return (
      <RecruiterSettingStore.Provider defaults={{ isSaving: false }}>
         <div className="dark min-h-screen bg-black text-white">
            <RecruiterSidebar />
            <RecruiterHeader />
            <main className="pt-16 md:ml-64">
               <div className="p-4 md:p-8">{children}</div>
            </main>
         </div>
      </RecruiterSettingStore.Provider>
   )
}
