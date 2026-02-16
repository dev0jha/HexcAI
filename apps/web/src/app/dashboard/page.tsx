"use client"

import { useReactiveSession } from "@/lib/auth-client"
import { useDashboardData } from "@/hooks/screens/dashboard.hooks"
import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats, DashboardStatsSkeleton } from "@/components/dashboard/dashboard-stats"
import { CompetencyMatrix } from "@/components/dashboard/competency-matrix"
import { StatusCard } from "@/components/dashboard/status-card"
import { DashboardRequests } from "@/components/dashboard/dashboard-requests"

export default function DashboardPage() {
   const { session } = useReactiveSession()
   const {
      userLoading,
      profileCompleteness,
      stats,
      isOpenToRecruiters,
      publicProfileUrl,
      updateMutation,
      handleOpenToRecruitersChange,
   } = useDashboardData()

   const userName = session?.user.name.split(" ")[0] ?? ""

   if (userLoading) return <DashboardPageSkeleton />

   return (
      <div className="flex h-full w-full flex-col">
         <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 space-y-8">
            <DashboardHeader userName={userName} publicProfileUrl={publicProfileUrl} />

            <DashboardStats stats={stats} />

            <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
               <div className="space-y-8 lg:col-span-2">
                  <CompetencyMatrix />
               </div>

               <div className="space-y-8 lg:col-span-1">
                  <StatusCard
                     isOpenToRecruiters={isOpenToRecruiters}
                     profileCompleteness={profileCompleteness}
                     onToggleRecruiters={handleOpenToRecruitersChange}
                     isPending={updateMutation.isPending}
                  />
                  <DashboardRequests />
               </div>
            </div>
         </div>
      </div>
   )
}

function DashboardPageSkeleton() {
   return (
      <div className="flex h-full w-full flex-col">
         <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 space-y-8">
            <div className="h-20 w-full animate-pulse bg-zinc-800/50 rounded-xl" />
            <DashboardStatsSkeleton />
         </div>
      </div>
   )
}
