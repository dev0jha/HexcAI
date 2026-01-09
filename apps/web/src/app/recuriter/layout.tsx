import type React from "react"
import { RecruiterSidebar } from "@/components/layout/recuriter-sidebar"
import { RecruiterHeader } from "@/components/layout/recuriter-header"

export default function RecruiterLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <RecruiterSidebar />
      <RecruiterHeader />
      <main className="pt-16 md:ml-64">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  )
}
