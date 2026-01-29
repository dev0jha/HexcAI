import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import ScorePieChart from "@/components/developer/score-pie-chart"
import { VisibilityToggle } from "@/components/developer/visibility-toggle"
import { mockDevelopers, mockContactRequests, mockAnalysisResult } from "@/data/mock-data"
import { DashboardCard } from "@/components/layout/dashboard-card"
import { IconArrowRight, IconGitBranch, IconInbox } from "@tabler/icons-react"
import DashTitleShell from "@/components/dash-screentitle-text"

export default async function DashboardPage() {
  const developer = mockDevelopers[0]
  const pendingRequests = mockContactRequests.filter(r => r.status === "pending")

  return (
    <div className="container mx-auto px-2 sm:px-6 lg:px-8 py-4 sm:py-8 lg:py-10">
      <div className="">
        <div className="mb-6">
          <DashTitleShell
            title={`Welcome back, ${developer.name.split(" ")[0]}`}
            description="Here's an overview of your developer profile"
          />
        </div>

        {/* Top Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* Score */}
          <DashboardCard className="p-6 border-dashed bg-transparent relative">
            <h2 className="text-lg font-semibold mb-2 px-2">Score Breakdown</h2>

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
            <VisibilityToggle initialValue={developer.isOpenToRecruiters} score={developer.score} />

            <DashboardCard className="relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <IconInbox className="h-5 w-5 text-muted-foreground" />
                  <span className="font-semibold">Contact Requests</span>
                </div>

                {pendingRequests.length > 0 && (
                  <Badge variant="secondary" className="bg-primary/20 text-primary">
                    {pendingRequests.length} new
                  </Badge>
                )}
              </div>

              <p className="text-sm text-muted-foreground mb-4">
                {pendingRequests.length > 0
                  ? `You have ${pendingRequests.length} pending request${pendingRequests.length > 1 ? "s" : ""
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
          <DashboardCard className="p-6 border-dashed bg-transparent relative">
            <div className="flex items-center gap-2 mb-4">
              <IconGitBranch className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Recent Analysis</span>
            </div>

            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{mockAnalysisResult.name}</span>
                  <Badge variant="secondary">{mockAnalysisResult.totalScore}</Badge>
                </div>

                <p className="text-xs text-muted-foreground truncate">{mockAnalysisResult.url}</p>

                <div className="flex gap-1 mt-2">
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
