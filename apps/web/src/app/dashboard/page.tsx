import Link from "next/link"

import { IconArrowRight, IconGitBranch, IconInbox } from "@tabler/icons-react"

import DashTitleShell from "@/components/dash-screentitle-text"
import ScorePieChart from "@/components/developer/score-pie-chart"
import { VisibilityToggle } from "@/components/developer/visibility-toggle"
import { DashboardCard } from "@/components/layout/dashboard-card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { mockAnalysisResult, mockContactRequests, mockDevelopers } from "@/data/mock-data"

export default async function DashboardPage() {
   const developer = mockDevelopers[0]
   const pendingRequests = mockContactRequests.filter(r => r.status === "pending")

   return (
      <div className="container mx-auto px-2 py-4 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
         <div className="">
            <div className="mb-6">
               <DashTitleShell
                  title={`Welcome back, ${developer.name.split(" ")[0]}`}
                  description="Here's an overview of your developer profile"
               />
            </div>

            {/* Top Grid */}
            <div className="mb-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
               {/* Score */}
               <DashboardCard className="relative border-dashed bg-transparent p-6">
                  <h2 className="mb-2 px-2 text-lg font-semibold">Score Breakdown</h2>

                  <div className="flex items-center justify-center py-4">
                     <ScorePieChart
                        scores={{
                           codeQuality: 92,
                           architecture: 88,
                           security: 95,
                           gitPractices: 90,
                           documentation: 85,
                        }}
                        totalScore={developer.score}
                     />
                  </div>
               </DashboardCard>

               {/* Middle Column */}
               <div className="space-y-6">
                  <VisibilityToggle
                     initialValue={developer.isOpenToRecruiters}
                     score={developer.score}
                  />

                  <DashboardCard className="relative">
                     <div className="mb-4 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                           <IconInbox className="text-muted-foreground h-5 w-5" />
                           <span className="font-semibold">Contact Requests</span>
                        </div>

                        {pendingRequests.length > 0 && (
                           <Badge variant="secondary" className="bg-primary/20 text-primary">
                              {pendingRequests.length} new
                           </Badge>
                        )}
                     </div>

                     <p className="text-muted-foreground mb-4 text-sm">
                        {pendingRequests.length > 0
                           ? `You have ${pendingRequests.length} pending request${
                                pendingRequests.length > 1 ? "s" : ""
                             }`
                           : "No pending requests"}
                     </p>

                     <Link href="/dashboard/requests">
                        <Button variant="outline" className="w-full gap-2 bg-transparent">
                           View Requests
                           <IconArrowRight className="h-4 w-4" />
                        </Button>
                     </Link>
                  </DashboardCard>
               </div>

               {/* Recent Analysis */}
               <DashboardCard className="relative border-dashed bg-transparent p-6">
                  <div className="mb-4 flex items-center gap-2">
                     <IconGitBranch className="text-muted-foreground h-5 w-5" />
                     <span className="font-semibold">Recent Analysis</span>
                  </div>

                  <div className="space-y-4">
                     <div className="border-border rounded-lg border p-4">
                        <div className="mb-2 flex items-center justify-between">
                           <span className="font-medium">{mockAnalysisResult.name}</span>
                           <Badge variant="secondary">{mockAnalysisResult.totalScore}</Badge>
                        </div>

                        <p className="text-muted-foreground truncate text-xs">
                           {mockAnalysisResult.url}
                        </p>

                        <div className="mt-2 flex gap-1">
                           <Badge variant="outline" className="text-xs">
                              {mockAnalysisResult.language}
                           </Badge>
                        </div>
                     </div>
                  </div>
               </DashboardCard>
            </div>
         </div>
      </div>
   )
}
