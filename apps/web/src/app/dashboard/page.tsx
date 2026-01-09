import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScoreCard } from "@/components/developer/score-card"
import { VisibilityToggle } from "@/components/developer/visibility-toggle"
import { mockDevelopers, mockContactRequests, mockAnalysisResult } from "@/data/mock-data"
import { ArrowRight, GitBranch, Inbox, Search } from "lucide-react"

export default function DashboardPage() {
  const developer = mockDevelopers[0]
  const pendingRequests = mockContactRequests.filter(r => r.status === "pending")

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 mt-4 sm:mt-6">
      <div className="space-y-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold font-poppins">
            Welcome back, {developer.name.split(" ")[0]}
          </h1>
          <p className="text-muted-foreground mt-1">
            Here&apos;s an overview of your developer profile
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-8">
          <ScoreCard
            score={developer.score}
            showBreakdown
            breakdown={{
              codeQuality: 92,
              architecture: 88,
              security: 95,
              gitPractices: 90,
              documentation: 85,
            }}
          />

          <div className="space-y-6">
            <VisibilityToggle initialValue={developer.isOpenToRecruiters} score={developer.score} />

            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Inbox className="h-5 w-5 text-muted-foreground" />
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
                  ? `You have ${pendingRequests.length} pending request${pendingRequests.length > 1 ? "s" : ""}`
                  : "No pending requests"}
              </p>
              <Link href="/dashboard/requests">
                <Button variant="outline" className="w-full gap-2 bg-transparent">
                  View Requests
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </Card>
          </div>

          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <GitBranch className="h-5 w-5 text-muted-foreground" />
              <span className="font-semibold">Recent Analysis</span>
            </div>
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{mockAnalysisResult.name}</span>
                  <Badge variant="secondary">{mockAnalysisResult.totalScore}</Badge>
                </div>
                <p className="text-xs text-muted-foreground truncate">{mockAnalysisResult.url}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  <Badge variant="outline" className="text-xs">
                    {mockAnalysisResult.language}
                  </Badge>
                </div>
              </div>
              <Link href="/dashboard/analyze">
                <Button className="w-full gap-2">
                  <Search className="h-4 w-4" />
                  Analyze New Repo
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/dashboard/analyze">
              <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <Search className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Analyze Repository</h3>
                <p className="text-sm text-muted-foreground">Get AI feedback on your code</p>
              </Card>
            </Link>
            <Link href="/dashboard/requests">
              <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <Inbox className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">View Requests</h3>
                <p className="text-sm text-muted-foreground">Manage recruiter contacts</p>
              </Card>
            </Link>
            <Link href={`/profile/${developer.username}`}>
              <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <GitBranch className="h-8 w-8 text-primary mb-2" />
                <h3 className="font-semibold">Public Profile</h3>
                <p className="text-sm text-muted-foreground">See how recruiters view you</p>
              </Card>
            </Link>
            <Link href="/dashboard/settings">
              <Card className="p-4 hover:bg-accent/50 transition-colors cursor-pointer">
                <Badge className="h-8 w-8 flex items-center justify-center text-primary mb-2 bg-transparent p-0 text-2xl">
                  ⚙
                </Badge>
                <h3 className="font-semibold">Settings</h3>
                <p className="text-sm text-muted-foreground">Update your preferences</p>
              </Card>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
